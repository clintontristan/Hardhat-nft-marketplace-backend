const { LogDescription } = require("ethers/lib/utils")
const {network, deployments} = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({getNamedAccounts, deployments}) => {
    const {deploy, log} = deployments
    const { deployer} = await getNamedAccounts()   

    const args = []
    const basicNft = await deploy("BasicNft", {
        from: deployer,
        args: args,
        logs: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    if (!developmentChains.includes(network.name) || process.env.ETHERSCAN_API_KEY) {
        log("Verifying ...")
        await verify(basicNft.address, args)
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "basicnft"]