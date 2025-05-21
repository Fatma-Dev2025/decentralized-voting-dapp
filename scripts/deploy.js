const hre = require("hardhat");

async function main() {
  const proposalNames = ["Proposal 1", "Proposal 2", "Proposal 3"];
  const Voting = await hre.ethers.getContractFactory("Voting");
  const voting = await Voting.deploy(proposalNames);

  await voting.deployed();

  console.log("Voting contract deployed to:", voting.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

