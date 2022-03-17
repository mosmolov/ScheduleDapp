//SPDX-License-Identifier: MIT
pragma solidity >=0.7.3;
pragma experimental ABIEncoderV2;
contract Schedule {
    struct Event {
        uint256 order;
        uint256 startTime;
        uint256 endTime;
        string name;
    }
    uint256 numOfEvents;
    string public name;
    string public date;
    Event[] events;
    event updatedSchedule(string eventName, uint256 startTime, uint256 endTime);

    constructor(string memory myName, string memory myDate) {
        name = myName;
        date = myDate;
    }
    function addEvent(uint256 order, uint256 startTime, uint256 endTime, string memory nameOfEvent) public {
        numOfEvents++;
        events.push(Event(order, startTime, endTime, nameOfEvent));
        emit updatedSchedule(nameOfEvent, startTime, endTime);
    }
    function getAllEvents() public view returns (Event[] memory){
        return events;
    }
}