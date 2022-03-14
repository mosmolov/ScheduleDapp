//SPDX-License-Identifier: MIT
pragma solidity >=0.7.3;

contract Schedule{
    struct mySchedule{
        string name;
        mapping(uint256 => string) schedule;
    }

    mySchedule private schedule;
    event UpdatedSchedule();

    constructor(){

    }
    function addTimes(uint256 startTime, string endTime, string event,)
    {

    }
}