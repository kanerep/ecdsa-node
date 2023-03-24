function Transactions({ transactions }) {
	return (
		<div className='container wallet'>
			<h1>Transactions</h1>
			<table className='transactions'>
				<thead>
					<tr>
						<th>Sender</th>
						<th>Recipient</th>
						<th>Amount</th>
						<th>Signature</th>
					</tr>
				</thead>
				<tbody>
					{transactions.length === 0 && (
						<tr>
							<td colSpan='4' style={{ textAlign: 'center' }}>
								No transactions yet
							</td>
						</tr>
					)}
					{transactions.length > 0 &&
						transactions.map((transaction, index) => (
							<tr className='transaction' key={index}>
								<td className='transaction-sender'>
									{transaction.sender.slice(0, 3)}...
								</td>
								<td className='transaction-recipient'>
									{transaction.recipient.slice(0, 3)}...
								</td>
								<td className='transaction-amount'>{transaction.amount}</td>
								<td className='transaction-signature'>
									{transaction.signature.slice(0, 3)}...
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	)
}

export default Transactions
