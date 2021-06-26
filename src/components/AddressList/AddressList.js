import React from 'react';
import PropTypes from 'prop-types';
import AddressItem from './AddressItem';
import { Link } from 'react-router-dom';

function AddressList({ addresses }) {
	return (
		<>
			{addresses?.map((address) => (
				<div key={address._id}>
					<AddressItem address={address} />
					<div className='d-flex mt-3'>
						<Link
							to='#'
							className='text-dark text-decoration-underline h7-text'
						>
							Edit
						</Link>
						<Link
							to='#'
							className='ml-2 text-dark text-decoration-underline h7-text'
						>
							Delete
						</Link>
					</div>
					<hr className='hr--small' />
				</div>
			))}
		</>
	);
}

AddressList.propTypes = {
	addresses: PropTypes.array,
};

export default AddressList;
