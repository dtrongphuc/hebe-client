import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
function AddressItem({ address, showDefault = true }) {
	const [addressValue, setAddressValue] = useState(null);

	useEffect(() => {
		if (address) {
			let array = Object.values(
				Object.fromEntries(
					Object.entries(address)?.filter(
						(couple) =>
							couple[0] !== 'firstname' &&
							couple[0] !== 'lastname' &&
							couple[0] !== 'isDefault' &&
							couple[0] !== '_id'
					)
				)
			);

			setAddressValue(array);
		}
	}, [address]);

	return (
		<div>
			<p className='h5-text'>
				{address.firstname} {address.lastname}{' '}
				{showDefault && address.isDefault === true && '(Default)'}
			</p>

			{addressValue &&
				addressValue.map((row) => {
					return (
						<p className='h6-text' key={row}>
							{row}
						</p>
					);
				})}
		</div>
	);
}

AddressItem.propTypes = {
	address: PropTypes.object,
};

export default AddressItem;
