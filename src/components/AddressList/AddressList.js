import React from 'react';
import PropTypes from 'prop-types';
import AddressItem from './AddressItem';
import AddressControl from './AddressControl';

function AddressList({ addresses }) {
	return (
		<>
			{addresses?.map((address) => (
				<div key={address._id}>
					<AddressItem address={address} />
					<AddressControl addressId={address._id} />
				</div>
			))}
		</>
	);
}

AddressList.propTypes = {
	addresses: PropTypes.array,
};

export default AddressList;
