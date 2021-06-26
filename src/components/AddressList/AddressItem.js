import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormAddress from 'components/FormAddress/FormAddress';
import { Link } from 'react-router-dom';
function AddressItem({ address }) {
	const [addressValue, setAddressValue] = useState(null);
	const [addressForm, setAddressForm] = useState({
		show: false,
		action: 'edit',
	});

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
			<div className='d-flex mt-3'>
				<Link
					to='#'
					className='text-dark text-decoration-underline h6-text'
					onClick={() =>
						setAddressForm((prevState) => ({
							...prevState,
							show: !prevState.show,
						}))
					}
				>
					Edit
				</Link>
				<Link
					to='#'
					className='ml-2 text-dark text-decoration-underline h6-text'
				>
					Delete
				</Link>
			</div>
			<hr className='hr--small' />
			{addressForm?.show && (
				<div className='mt-4'>
					<FormAddress
						action={addressForm.action}
						title='Edit address'
						id={address._id}
						cancel={() =>
							setAddressForm((prevState) => ({ ...prevState, show: false }))
						}
					/>
				</div>
			)}
		</div>
	);
}

AddressItem.propTypes = {
	address: PropTypes.object,
};

export default AddressItem;
