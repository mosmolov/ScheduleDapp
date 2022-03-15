const { ethers } = require("hardhat");
const hre = require("hardhat");
module.exports.deploy = async function(){
  const Schedule = await ethers.getContractFactory("Schedule");
  const schedule = await Schedule.deploy("John", "March 1, 2022");
  await schedule.deployed();
  console.log("Contract deployed to address: ", schedule.address);
  return schedule.address;
  
}


//0x271f2d5f3775a252b018c74692666Ac604D5D2BB