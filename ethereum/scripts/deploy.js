const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deployed with: ", deployer.address);

  const ContactFactory = await hre.ethers.getContractFactory("ContactFactory");
  const contactFactory = await ContactFactory.deploy();

  await contactFactory.deployed();

  console.log("ContactFactory:", contactFactory.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
