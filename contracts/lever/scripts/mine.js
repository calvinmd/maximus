const MINE_BLOCK_COUNT = 100

const mineBlock = () => new Promise((resolve, reject) => {
    return web3.currentProvider.send({
        'jsonrpc': "2.0",
        "method": "evm_mine",
        'params': [],
    }, (res) => resolve(res))
})

const mineBlocks = async (numOfBlocks) => {
    for (let i = 0; i < numOfBlocks; i++) {
        await mineBlock()
    }
}

module.exports = async () => {

    try {
        await mineBlocks(MINE_BLOCK_COUNT)
        console.log(`Mined: ${MINE_BLOCK_COUNT} blocks`)
    } catch (error) {
        console.log(error)
    }

    process.exit()
}
