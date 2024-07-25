 const{network, ethers} = require("hardhat")
  const {networkConfig} = require("../helper-hardhat-config")
   
  module.exports = async function ({getNamedAccounts, deployments}){
    const {deploy, log} = deployments
    const {deployer} = await getNamedAccounts()
    const chainId = network.config.chainId

    log("Deploying Box Contract---------------------------")

    const box = await deploy("Box", {
        from: deployer,
        args: [], 
        log: true,
        waitConfirmations: network.config.blockConfirmations

    })

    const timeLock = await ethers.getContract("Timelock")
    console.log(`timeLock address is ${timeLock.address}`)
    const boxContract =  await ethers.getContractAt("Box", box.address)
     
    const transferOwnershipTx = await boxContract.transferOwnership(timeLock.address)
    await transferOwnershipTx.wait(1)
    log(`OwnerShip has been successfully transfered...`)
  }