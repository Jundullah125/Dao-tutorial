const {ethers, network} = require("hardhat")
const{ verify} = require("../utils/verify");
const{developmentChains,  networkConfig} = require("../helper-hardhat-config")


module.exports = async function ({getNamedAccounts, deployments,}) {
  
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId


  

  log("----------------------------------------------------");
  log("Deploying GovernanceToken and waiting for confirmations...");



  const args = []



   const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    // waitConfirmations: network.config.blockConfirmations || 1,
  });
  

  log(`GovernanceToken at ${ await governanceToken.address}`);

  if ((chainId !== 31337) && process.env.ETHERSCAN_API_KEY) {
    await verify(governanceToken.address, []);
  }
  
  const delegate = async (governanceTokenAddress, delegatedAccount) => {
    const governanceToken = await ethers.getContractAt("GovernanceToken", governanceTokenAddress);
    const transactionResponse = await governanceToken.delegate(delegatedAccount);
    await transactionResponse.wait(1);
    console.log(`Checkpoints: ${await governanceToken.numCheckpoints(delegatedAccount)}`);
    
      log(`Delegating to ${deployer}`);
      await delegate(governanceToken.address, deployer);
      log("Delegated!");
};

}

module.exports.tags =  ["all", "a"]
