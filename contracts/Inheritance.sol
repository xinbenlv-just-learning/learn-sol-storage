// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract O {
    uint256 itemO;
    constructor() {
        itemO = 0x22220001;
    }
}

contract A is O {
    uint256 itemA;
    constructor() {
        itemA = 0x22220002;
    }
}
contract B is O {
    uint256 itemB;
    constructor() {
        itemB = 0x22220003;
    }
}
contract K is A,B {
    uint256 itemK;
    constructor() {
        itemK = 0x22220004;
    }
}
