import server from './server'
import * as secp from 'ethereum-cryptography/secp256k1'
import { toHex } from 'ethereum-cryptography/utils'
import CopyText from './CopyText'

function Wallet({
	address,
	setAddress,
	balance,
	setBalance,
	privateKey,
	setPrivateKey,
}) {
	async function onChange(evt) {
		const pKey = evt.target.value
		setPrivateKey(pKey)
		if (pKey) {
			const hexAddress = `0x${toHex(secp.getPublicKey(pKey, false).slice(-20))}`
			setAddress(hexAddress)
			const {
				data: { balance },
			} = await server.get(`balance/${hexAddress}`)
			setBalance(balance)
		} else {
			setBalance(0)
		}
	}

	return (
		<div className='container wallet'>
			<h1>Your Wallet</h1>

			<label>
				Private Key
				<input
					placeholder='Type your Private Key, for example: 0x1'
					value={privateKey}
					onChange={onChange}
				></input>
			</label>
			<div className='address-container'>
				<label>
					Address{' '}
					<strong>
						{address
							? `${address.slice(0, 5)}...${address.slice(36, address.length)}`
							: 'not generated yet'}
					</strong>
				</label>
				<CopyText textToCopy={address} />
			</div>
			<div className='balance'>Balance: {balance}</div>
		</div>
	)
}

export default Wallet
