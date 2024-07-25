const { ethers, network } = require("hardhat");
const {
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  developmentChains,
  VOTING_DELAY,
  VOTING_PERIOD,
  proposalFiles,
  networkConfig,
} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");
const fs = require("fs-extra");
const chainId = network.config.chainId;

async function propose() {
  const governor = await ethers.getContract("GovernorContract");
  const box = await ethers.getContract("Box");
  console.log(`new store value is ${NEW_STORE_VALUE}`);

  const encodedFunctionCall = box.interface.encodeFunctionData(FUNC, [
    NEW_STORE_VALUE,
  ]);

  console.log(`Making the proposal on ${box.address}`);

  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    PROPOSAL_DESCRIPTION
  );
  const proposeReceipt = await proposeTx.wait(1);

  if (chainId == 31337) {
    await moveBlocks(VOTING_DELAY + 1);
  }
  const proposalId = proposeReceipt.events[0].args.proposalId;
  let proposals = JSON.parse(fs.readFileSync(proposalFiles, "utf8"));
  proposals[network.config.chainId.toString()].push(proposalId.toString());
  fs.writeFileSync(proposalFiles, JSON.stringify(proposals));

  console.log("You have proposed");
}

propose()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
