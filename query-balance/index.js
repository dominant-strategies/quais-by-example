const { quais } = require("quais");

const provider = new quais.providers.JsonRpcProvider(`https://rpc.cyprus1.colosseum.quaiscan.io`)

const address = '0x12d93219393DD6365552e5c8F3ea011C8c1F2edB'

const main = async () => {
    const balance = await provider.getBalance(address)
    console.log(`\nQUAI Balance of ${address} --> ${quais.utils.formatEther(balance)} QUAI\n`)
}

main()