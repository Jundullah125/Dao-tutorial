const { ethers, network } = require("hardhat");
const {
  proposalFiles,
  developmentChains,
  VOTING_PERIOD,
} = require("../helper-hardhat-config");
const fs = require("fs-extra");
const { moveBlocks } = require("../utils/move-blocks");
const proposalIndex = 0;
const chainId = network.config.chainId;

async function main() {
  const proposals = JSON.parse(fs.readFileSync(proposalFiles, "utf8"));
  const proposalId = proposals[network.config.chainId][proposalIndex];
  console.log(proposalId);
  //Voting Way
  //0 = Against, 1 = For, 2 = Abstain
  const voteWay = 1;
  const reason = "I like it";
  const governor = await ethers.getContract("GovernorContract");
  const voteTxResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  );
  await voteTxResponse.wait(1);
  const proposalState = await governor.state(proposalId);
  console.log(`Current Proposal State: ${proposalState}`);

  console.log("You have voted------------------------------");
  if (chainId == 31337) {
    await moveBlocks(VOTING_PERIOD + 1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
