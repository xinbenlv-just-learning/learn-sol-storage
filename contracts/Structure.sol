// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

struct FooStruct {
    uint256 fooVal1;
    uint256 fooVal2;
}

contract FooStractPlayground {
    FooStruct item1;
    FooStruct item2;

    constructor() {
        item1 = FooStruct(0x110012, 0x110023);
    }
}
