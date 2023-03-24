const express = require('express')
const app = express()
const cors = require('cors')
const port = 3042

app.use(cors())
app.use(express.json())

const balances = {
	'0x0546c4c9ff0cf1878cd15b76f7e6812fd1fe419c': 100,
	'0x75c00b4ea09016051dba06f49f83f3a7ba604e8c': 50,
	'0x61307a0acc6868071c3e68a3a45b07e27023a9c0': 75,
}

app.get('/balance/:address', (req, res) => {
	const { address } = req.params
	const balance = balances[address] || 0
	res.send({ balance })
})

app.post('/send', (req, res) => {
	// TODO: get a signature fromt he client-side application
	// recover the public address from the signature

	const { sender, recipient, amount } = req.body

	setInitialBalance(sender)
	setInitialBalance(recipient)

	if (balances[sender] < amount) {
		res.status(400).send({ message: 'Not enough funds!' })
	} else {
		balances[sender] -= amount
		balances[recipient] += amount
		res.send({ balance: balances[sender] })
	}
})

app.listen(port, () => {
	console.log(`Listening on port ${port}!`)
})

function setInitialBalance(address) {
	if (!balances[address]) {
		balances[address] = 0
	}
}
