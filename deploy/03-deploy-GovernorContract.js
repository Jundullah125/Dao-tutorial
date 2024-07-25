const { network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat-config");

module.exports = async function ({ getNamedAccounts, deployments }) {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;

  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("Timelock");
  log(`Deploying Governor Token contract`);


  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      networkConfig[chainId]["VOTING_DELAY"],
      networkConfig[chainId]["VOTING_PERIOD"],
      networkConfig[chainId]["QUORUM_PERCENTAGE"],
    ],
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });

  log(`Governance contract deployed at ${governorContract.address}`);
};

module.exports.tags = ["all", "a"];
