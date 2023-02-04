import { task } from "hardhat/config";
import { getMulticall, getReverseNode, tryMulticall, txParams } from "../../scripts/common";
import { Multicall, PublicResolver, ReverseRegistrar } from "../../typechain-types";

task("fns-reverse-set", "Set reverse name for address")
  .addParam("name", "reverse name of the address")
  .setAction(async ({ name }, hre) => {
    const resolver: PublicResolver = await hre.ethers.getContract("PublicResolver");
    const reverseRegistrar: ReverseRegistrar = await hre.ethers.getContract("ReverseRegistrar");
    const [operator] = await hre.ethers.getSigners();
    const overrides = txParams(await operator.provider!.getFeeData());
    console.log(`Set reverse name: ${operator.address} => ${name}`);
    const tx = await reverseRegistrar.setName(name, overrides);
    console.log(`> tx: ${tx.hash}`);
    await tx.wait();
  });

task("fns-reverse", "Query reverse info")
  .addVariadicPositionalParam("addrs", "Addresses to query", [])
  .setAction(async ({ addrs }, hre) => {
    const resolver: PublicResolver = await hre.ethers.getContract("PublicResolver");
    if (addrs.length == 0) {
      addrs = (await hre.ethers.getSigners()).map(s => s.address);
    }
    // const reverseRegistrar: ReverseRegistrar = await hre.ethers.getContract("ReverseRegistrar");
    // for (const addr of addrs) {
    //   // const node = await reverseRegistrar.node(addr);
    //   const node = getReverseNode(addr);
    //   console.debug(`node: ${node}`);
    //   const name = await resolver.name(node);
    //   console.log(`${addr}: ${name}`);
    // }

    // use multicall
    const mc = await getMulticall(hre);
    const ret = await mc.callStatic.tryAggregate(
      false,
      addrs.map((addr: string) => {
        return {
          target: resolver.address,
          callData: resolver.interface.encodeFunctionData("name", [getReverseNode(addr)]),
        };
      }),
    );
    for (const i in addrs) {
      const name = resolver.interface.decodeFunctionResult("name", ret[i][1]);
      console.log(`${addrs[i]}: ${name}`);
    }
  });
