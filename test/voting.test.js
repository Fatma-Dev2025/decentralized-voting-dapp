const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting contract", function () {
  let Voting, voting, owner, addr1;

  beforeEach(async function () {
    Voting = await ethers.getContractFactory("Voting");
    [owner, addr1] = await ethers.getSigners();
    voting = await Voting.deploy(["Proposal 1", "Proposal 2"]);
    await voting.deployed();
  });

  it("Should initialize with correct proposal names", async function () {
    expect(await voting.getProposalCount()).to.equal(2);
    const proposal = await voting.getProposal(0);
    expect(proposal.name).to.equal("Proposal 1");
  });

  it("Should allow a user to vote once", async function () {
    await voting.connect(addr1).vote(0);
    const proposal = await voting.getProposal(0);
    expect(proposal.voteCount).to.equal(1);
  });

  it("Should not allow double voting", async function () {
    await voting.connect(addr1).vote(0);
    await expect(voting.connect(addr1).vote(1)).to.be.revertedWith("Already voted.");
  });

  it("Should reject invalid proposal index", async function () {
    await expect(voting.connect(addr1).vote(5)).to.be.revertedWith("Invalid proposal.");
  });
});
    
