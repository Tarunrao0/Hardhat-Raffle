const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

// arguements passed in the constructor of VRFCoordinatorV2Mock

const BASE_FEE = ethers.utils.parseEther("0.25") //the premium cost to deploy the coordinator contract (in LINK)
const GAS_PRICE_LINK = 1e9 // gas price to deploy the contract

module.exports = async function ({ getNamedAccounts, deployments}) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    // deploying on the local host

    if (developmentChains.includes(network.name)){
        log("Local network detected! Deploying mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args, 
        })
        log ("Mocks deployed!")
        log ("----------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]