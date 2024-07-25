const { network, ethers } = require("hardhat");

const {networkConfig} = require("../helper-hardhat-config")
module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const timeLock = await ethers.getContract("Timelock", deployer);
  const governor = await ethers.getContract("GovernorContract", deployer);

  log(`Setting up Roles------------`)
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

    const proposerTx= await timeLock.grantRole(proposerRole, governor.address)
    await proposerTx.wait(1)

    const executorRoleTx = await timeLock.grantRole(proposerRole, networkConfig[chainId]["ADDRESS_ZERO"])
    await executorRoleTx.wait(1)

    const revokeTx = await timeLock.revokeRole(adminRole, deployer)
    await revokeTx.wait(1)


    
    
};
module.exports.tags = ["all", "hi"]
