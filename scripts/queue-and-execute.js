const { network, ethers } = require("hardhat");
const {
  NEW_STORE_VALUE,
  PROPOSAL_DESCRIPTION,
  FUNC,
  MIN_DELAY,
} = require("../helper-hardhat-config");
const { moveBlocks } = require("../utils/move-blocks");
const { moveTime } = require("../utils/move-time");
const chainId = network.config.chainId;

async function queueAndExecute() {
  const args = [NEW_STORE_VALUE];
  const box = await ethers.getContract("Box");
  const encodedFunctionCall = box.interface.encodeFunctionData(FUNC, args);
  const descriptionHash = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
  );

  const governor = await ethers.getContract("GovernorContract");
  console.log("Queueing-----------------------");
  const queueTx = await governor.queue(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );
  await queueTx.wait(1);

  if (chainId == 31337) {
    await moveBlocks(MIN_DELAY + 1);
    await moveTime(1);
  }

  console.log("Executing--------------------");
  const execute = await governor.execute(
    [box.address],
    [0],
    [encodedFunctionCall],
    descriptionHash
  );

  await executeTx.wait(1)

  const boxNewValue = await governor.retrieve()
  console.log(`New box value is ${await boxNewValue.toString()}`)
}
queueAndExecute()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
