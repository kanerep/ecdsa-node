const secp = require('ethereum-cryptography/secp256k1')
const { toHex } = require('ethereum-cryptography/utils')

function createPrivateKey() {
	const privateKey = secp.utils.randomPrivateKey()
	return toHex(privateKey)
}

function createPublicKey(privateKey) {
	return toHex(secp.getPublicKey(privateKey))
}

for (let i = 0; i < 3; i++) {
	const privateKey = createPrivateKey()
	const publicKey = createPublicKey(privateKey)
	console.log({ privateKey, publicKey })
}
