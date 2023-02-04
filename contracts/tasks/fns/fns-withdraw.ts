import { formatEther } from "@ethersproject/units";
import { task } from "hardhat/config";
import { txParams, AddressZero } from "../../scripts/common";
import { RegistrarController } from "../../typechain-types";

task("fns-withdraw", "Withdraw fund from RegistrarController")
  .addOptionalParam("controller", "Specifiy a different controller to withdraw")
  .setAction(async ({ controller }, hre) => {
    const [operator] = await hre.ethers.getSigners();
    let registrarController: RegistrarController = await hre.ethers.getContract("RegistrarController");
    if (controller && controller.toLowerCase() != AddressZero) {
      registrarController = registrarController.attach(controller);
    }
    console.log(`Withdraw FIL from ${registrarController.address}`);

    const overrides = txParams(await operator.provider!.getFeeData());
    const balance = await operator.provider!.getBalance(registrarController.address);

    if (balance.isZero()) {
      console.log(`Balance is 0, no need to withdraw`);
    } else {
      console.log(`Withdraw all ${formatEther(balance)} FIL to owner`);
      const tx = await registrarController.withdraw(overrides);
      console.log(`> tx: ${tx.hash}`);
      await tx.wait();
    }
  });
