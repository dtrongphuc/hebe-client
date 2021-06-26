import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

function AddressItem({ address }) {
	const [addressValue, setAddressValue] = useState(null);
	useEffect(() => {
		if (address) {
			let array = Object.values(
				Object.fromEntries(
					Object.entries(address)?.filter(
						(couple) =>
							couple[0] !== 'firstname' &&
							couple[0] !== 'lastname' &&
							couple[0] !== 'isDefault'
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
				{address.isDefault === true && '(Default)'}
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
