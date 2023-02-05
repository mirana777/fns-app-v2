# Fns-app-v2

FNS is a decentralized name service based on the Filecoin EVM. It resolves Metadata into easy-to-read xxx.fil names. fns.fil subdomains (such as alice.fns.fil) are distinguished from other domains by non-transferable SBT to ensure identity uniqueness. 

We are Filfox team and we devoted ourselves to the development of FVM ecology and won the [Filecoin — FEVM Building Blocks](https://ethglobal.com/showcase/fns-filecoin-naming-service-czomc) award with FNS in HACK FEVM. 

During Space Warp, we upgraded the UI/UX of FNS app and contracts and deployed multicall tool contracts on hyperspace. Welcome to try and test our [new app](http://app.filns.domains/)!

Meanwhile, we hope that FNS can be used as a basic tool for the Filecoin ecosystem to help ecological projects provide users with better user experience. Therefore, we integrated FNS in Filfox explorer as [FNS Lookup](https://hyperspace.filfox.info/en/fns) in this hackthon to provide more functions for Filfox explorer users, also provides an example for how to integrate FNS into your own project.


## Contracts
All contracts source code and scripts for deployments and tasks can be found in [/contracts](https://github.com/mirana777/fns-app-v2/tree/master/contracts).

### Contracts deployed
Multicall: 0x7d130b04797a50fa2a9a80fad01a6a74deaa1f4b

FNSRegistry: 0x889d4f6667ab1aa0a77bc8befbfc9dca5d6ead3d

ReverseRegistrar: 0x7b053507c2e0f9be1632c4b17c2e871c1770cb14

Registrar: 0xf87d4c3c91555fecfe684fa58dd26a817c75892b

FixedPriceOracle: 0xc6eb63fc822d78cd800588584be31ff271e1d458

RegistrarController: 0x12aea3f77ae98b33f27f20825b15e4ab8b381684

PublicResolver: 0xe2c015abb52e22227354f78297f0c2de3807b311


## APP V2
Source code of APP V2 and commands can be found in [/app](https://github.com/mirana777/fns-app-v2/tree/master/app).

### APP V2 deployed

http://app.filns.domains/