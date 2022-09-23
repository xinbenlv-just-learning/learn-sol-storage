// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract AllAboutStorage {
    uint256 O_0_valUint256;
    uint256 O_1_valUint256;
    uint256[] O_2_valUint256Array;
    mapping(uint256 => uint256) O_3_valUint256Mapping;
    constructor() {
        O_0_valUint256 = 1000;
        O_1_valUint256 = 1001;
        O_2_valUint256Array = new uint256[](10);
        O_2_valUint256Array[0] = 1002;
        O_2_valUint256Array[1] = 1003;
        O_2_valUint256Array[2] = 1004;
        O_3_valUint256Mapping[0x1234] = 1005;
        O_3_valUint256Mapping[0x5678] = 1006;
    }
}
