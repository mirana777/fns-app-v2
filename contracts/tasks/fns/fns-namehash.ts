import { namehash } from "ethers/lib/utils";
import { task } from "hardhat/config";
import { TLD_FIL_NAME } from "../../scripts/common";

task("fns-namehash", "Hash fns names to node")
  .addVariadicPositionalParam("names", "Full FNS names to hash", [TLD_FIL_NAME, `resolver.${TLD_FIL_NAME}`, `addr.reverse`])
  .setAction(async ({ names }, hre) => {
    for (const name of names) {
      console.log(`[${name}]: ${namehash(name)}`);
    }
  });
