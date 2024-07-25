const { ethers, network } = require("hardhat");
const verify = require("../utils/verify");
const {networkConfig} = require("../helper-hardhat-config")

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;



  log(`Deploying TimeLock Contract`)

  const args = [
    
    networkConfig[chainId]["MIN_DELAY"],
    [],
    [],
    deployer
]

  const timeLock = await deploy("Timelock", {
    from: deployer,
    args: args,
    log: true,
    // waitConfirmations: network.config.blockConfirmations,
  });



  if ((chainId !== 31337) && process.env.ETHERSCAN_API_KEY) {
    await verify(timeLock.address, args);
  }

  log(" TimeLock has been deployed-----------------------");
};
module.exports.tags = ["all", "a"];
