import { ethers} from "hardhat";
import hre from "hardhat";
import {zeroPad, arrayify, hexlify, hexConcat, concat, keccak256} from "ethers/lib/utils";
import { BigNumber} from 'ethers';

async function main() {
  const ContractFactor = await ethers.getContractFactory("K");
  const contract = await ContractFactor.deploy();

  await contract.deployed();

  await printSlot(contract.address, "0x00"); // expected to be 1001 as value of O_0_valUint256
  await printSlot(contract.address, "0x01"); // expected to be 1001 as value of O_1_valUint256
  await printSlot(contract.address, "0x02"); // expected to be 10 as the length of O_2_valUint256Array
  await printSlot(contract.address, "0x03"); // expected to be 0 because O_3_valUint256Mapping is a mapping

}

async function printSlot(address:string, index:string | null, beforeKeccak256?:string) {
  if (!index && beforeKeccak256) index = keccak256(beforeKeccak256);
  else index = hexlify(zeroPad(index as string, 32));
  const value = await hre.network.provider.send("eth_getStorageAt", [
    address,
    index,
  ]);


  console.log(`slot ${index} = ${value}, in decimal: ${parseInt(value, 16)}\n${beforeKeccak256 ? "beforeKeccak256:"+beforeKeccak256 : ""}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
