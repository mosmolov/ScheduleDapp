const { ethers } = require("hardhat");
async function main(){
  const Schedule = await ethers.getContractFactory("Schedule");
  const schedule = await Schedule.deploy("John", "March 1, 2022");
  await schedule.deployed();
  console.log("Contract deployed to address: ", schedule.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
