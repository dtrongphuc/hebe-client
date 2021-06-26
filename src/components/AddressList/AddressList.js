import React from 'react';
import PropTypes from 'prop-types';
import AddressItem from './AddressItem';

function AddressList({ addresses }) {
	return (
		<>
			{addresses?.map((address) => (
				<div key={address._id}>
					<AddressItem address={address} />
				</div>
			))}
		</>
	);
}

AddressList.propTypes = {
	addresses: PropTypes.array,
};

export default AddressList;
