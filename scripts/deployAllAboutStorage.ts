import { ethers} from "hardhat";
import hre from "hardhat";
import {zeroPad, arrayify, hexlify, hexConcat, concat, keccak256} from "ethers/lib/utils";
import { BigNumber} from 'ethers';

async function main() {
  const ContractFactor = await ethers.getContractFactory("AllAboutStorage");
  const contract = await ContractFactor.deploy();

  await contract.deployed();

  await printSlot(contract.address, "0x00"); // expected to be 1001 as value of O_0_valUint256
  await printSlot(contract.address, "0x01"); // expected to be 1001 as value of O_1_valUint256
  await printSlot(contract.address, "0x02"); // expected to be 10 as the length of O_2_valUint256Array
  await printSlot(contract.address, "0x03"); // expected to be 0 because O_3_valUint256Mapping is a mapping

  const slotOf_O_2_valUint256Array = "0x02";
  const baseIndex = zeroPad( slotOf_O_2_valUint256Array , 32);
  const slotBase_O2 = keccak256(baseIndex);
  // Content of the array
  await printSlot(contract.address, (BigNumber.from(slotBase_O2)).add(0).toHexString()); // expected to be 1003 as the value of O_2_valUint256Array[0]
  await printSlot(contract.address, (BigNumber.from(slotBase_O2)).add(1).toHexString()); // expected to be 1003 as the value of O_2_valUint256Array[1]
  await printSlot(contract.address, (BigNumber.from(slotBase_O2)).add(2).toHexString()); // expected to be 1003 as the value of O_2_valUint256Array[2]

  // Content of the mapping
  const slotOf_O_3_valUint256Mapping = "0x03";
  const baseIndexO3 = zeroPad( slotOf_O_3_valUint256Mapping , 32);
  const key1_O3 = zeroPad( "0x1234" , 32);
  const key2_O3 = zeroPad( "0x5678" , 32);
  await printSlot(contract.address, null, hexlify(concat([key1_O3, baseIndexO3]))); // expected to be 1005 as the value of O_3_valUint256Mapping[0x1234]
  await printSlot(contract.address, null, hexlify(concat([key2_O3, baseIndexO3]))); // expected to be 1006 as the value of O_3_valUint256Mapping[0x5678]
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
