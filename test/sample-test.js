const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyToken", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const MyToken = await ethers.getContractFactory("MyToken");
    const myToken = await MyToken.deploy();
    await myToken.deployed();

    const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
    const metadataURI = 'cid/test.png';

    let balance = await myToken.balanceOf(recipient);
    expect(balance).to.equal(0);

    const newlyMintedToken = await myToken.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') });

    //wait until the transaction is mined
    await newlyMintedToken.wait();

    balance = await myToken.balanceOf(recipient)
    expect(balance).to.equal(1);

    expect (await myToken.isContentOwned(metadataURI)).to.equal(true);

  });
});
