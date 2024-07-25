const networkConfig = {
  31337: {
    name: ["localhost", "hardhat"],
    QUORUM_PERCENTAGE: 4,
    MIN_DELAY: "3600",
    VOTING_DELAY: 5,
    VOTING_PERIOD: 1,
    ADDRESS_ZERO: "0x0000000000000000000000000000000000000000",
    // NEW_STORE_VALUE: "77",
    // FUNC: "store",
    PROPOSAL_DESCRIPTION: "Proposal #1 77 in the Box!",
  },
  11155111: {
    name: "sepolia",
    QUORUM_PERCENTAGE: "4",
    MIN_DELAY: "3600",
    VOTING_DELAY: "5",
    VOTING_PERIOD: "1",
    ADDRESS_ZERO: "0x0000000000000000000000000000000000000000",
    // NEW_STORE_VALUE: "77",
    // FUNC: "store",
    PROPOSAL_DESCRIPTION: "Proposal #1 77 in the Box!",
  },
};
const developmentChains = ["hardhat", "localhost"];
const NEW_STORE_VALUE = "77";
const FUNC = "store";
const PROPOSAL_DESCRIPTION = "Proposal #1: Store 77 in the Box!";
const VOTING_DELAY = 1;
const VOTING_PERIOD = 5;
const proposalFiles = "proposals.json";
const MIN_DELAY = "3600"

module.exports = {
  networkConfig,
  developmentChains,
  NEW_STORE_VALUE,
  FUNC,
  PROPOSAL_DESCRIPTION,
  VOTING_DELAY,
  VOTING_PERIOD,
  proposalFiles,
  MIN_DELAY
};
