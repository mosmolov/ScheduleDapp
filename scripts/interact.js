const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const deploy = require("./deploy");
const hre = require("hardhat");
const { ethers } = require("hardhat");
const contract = require("../artifacts/contracts/Schedule.sol/Schedule.json");
const contractAddress = deploy.deploy();
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

const scheduleContract = new ethers.Contract(contractAddress, contract.abi, signer);

async function main()
{
    console.log(`This is ${await scheduleContract.name()}'s schedule for ${await scheduleContract.date()}`);
    const tx = await scheduleContract.addEvent(1, 3, 5, "Haircut");
    await tx.wait();
}

main();
