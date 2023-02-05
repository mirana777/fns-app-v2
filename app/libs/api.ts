import { utils } from 'ethers'
import { NoteError, NoteSuccess } from './utils'
import { formatTime } from './filters'
import { CONTRACT_ADDRESS } from '~~/constants'
import {
  useContractIRegistrarController,
  useContractPublicResolver,
  useContractIRegistrar,
  useContractFNSRegistry,
  useContractReverseRegistrar
} from '~~/libs/contract'
import { eventHub } from '~~/libs/event-hub'

function listenTx(tx: any) {
  if (!tx) return

  tx.wait()
    .then(({ status }: any) => {
      if (status === 1) {
        eventHub.emit('update')
        NoteSuccess('Transaction has taken effect !')
      } else {
        NoteError('Transaction failed !')
      }
    })
    .catch(error => {
      console.log('Tx Error', error)
    })
}

export default {
  async getNameInfo(name: string) {
    const Name = {
      name,
      available: false,
      address: '',
      expires: '',
      contenthash: '',
      registrant: '',
      controller: ''
    } as any

    const IRegistrarController = (await useContractIRegistrarController()) as any
    const _name = name.replace(/\.fil$/, '')
    Name.available = await IRegistrarController.available(_name)

    if (!Name.available) {
      const PublicResolver = (await useContractPublicResolver()) as any
      const IRegistrar = (await useContractIRegistrar()) as any
      const FNSRegistry = (await useContractFNSRegistry()) as any
      const namehash = utils.namehash(name)

      const [controller, registrant, address, expires, contenthash] = await Promise.all([
        FNSRegistry.owner(namehash),
        IRegistrar.ownerOf(utils.keccak256(utils.toUtf8Bytes(_name))),
        PublicResolver['addr(bytes32,uint256)'](namehash, 461),
        IRegistrarController.nameExpires(_name),
        PublicResolver.contenthash(namehash)
      ])

      Name.controller = controller
      Name.registrant = registrant
      Name.address = utils.toUtf8String(address)
      Name.expires = `Expires at ${formatTime(expires, 'YYYY-MM-DD HH:mm:ss')} UTC`
      Name.contenthash = contenthash
    }

    return Name
  },

  async estimateTxFee(name: string, duration: number) {
    const contract = (await useContractIRegistrarController()) as any
    const _name = name.replace(/\.fil$/, '')
    return contract.rentPrice(_name, duration)
  },

  async registerName(
    name: string,
    owner: string,
    duration: number,
    fee: string,
    resolver = CONTRACT_ADDRESS.PublicResolver,
    data = [],
    reverseRecord = true
  ) {
    const contract = (await useContractIRegistrarController()) as any
    const _name = name.replace(/\.fil$/, '')
    const tx = await contract.register(_name, owner, duration, resolver, data, reverseRecord, {
      value: utils.parseEther(fee)
    })
    listenTx(tx)
  },

  async renewName(name: string, duration: number, fee: string) {
    const contract = (await useContractIRegistrarController()) as any
    const _name = name.replace(/\.fil$/, '')
    const tx = await contract.renew(_name, duration, {
      value: utils.parseEther(fee)
    })
    listenTx(tx)
  },

  async setAddress(name: string, address: string) {
    const contract = (await useContractPublicResolver()) as any
    const namehash = utils.namehash(name)
    const tx = await contract['setAddr(bytes32,uint256,bytes)'](
      namehash,
      461,
      utils.toUtf8Bytes(address),
      { value: 0 }
    )
    listenTx(tx)
  },

  async setContent(name: string, contenthash: string) {
    const contract = (await useContractPublicResolver()) as any
    const namehash = utils.namehash(name)
    const tx = await contract.setContenthash(namehash, utils.namehash(contenthash))
    listenTx(tx)
  },

  async findNamesViaAddress(address: string) {
    const ReverseRegistrar = (await useContractReverseRegistrar()) as any
    const PublicResolver = (await useContractPublicResolver()) as any
    const node = await ReverseRegistrar.node(address)
    return PublicResolver.name(node)
  },

  async getAllNamesOf(address: string) {
    // 查询一个账户拥有的所有 .fil 二级域名 的方法:
    // 调用 Registrar 的 balanceOf(addr) 获得个数 n
    // 枚举 i = [0, n), 分别调用 Registrar 的 tokenOfOwnerByIndex(addr, i) 获得所有 tokenId
    // 每个 tokenId 调用 Registrar 的 name(tokenId) 获取名称
    // registrar 使用上面最新的 abi, 如果 contract.name(tokenId) 不行, 就用 contract["name(uint256)"](tokenId)

    const contract = (await useContractIRegistrar()) as any
    const count = await contract.balanceOf(address)
    const tokenIds = await Promise.all(
      Array.from({ length: count }).map((_, index) => contract.tokenOfOwnerByIndex(address, index))
    )
    const _names = await Promise.all(tokenIds.map(tokenId => contract.name(tokenId)))
    const names = await Promise.all(_names.map(name => this.getNameInfo(`${name}.fil`)))

    return names
  }
}
