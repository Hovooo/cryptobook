require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/6ea8a15801bf434c8c00ffb5ef83ff28", //Infura url with projectId
      accounts: [
        "17b4180590aa9dbc49457e7ecfb3318bdf16ca4efbc9af866a202f3efad05555",
      ], // add the account that will deploy the contract (private key)
    },
  },
};
