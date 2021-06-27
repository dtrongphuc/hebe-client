import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormAddress from 'components/FormAddress/FormAddress';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllAddressThunk,
	openEditForm,
} from 'features/address/addressSlice';
import { deleteAddressById } from 'services/AddressApi';
function AddressItem({ address }) {
	const dispatch = useDispatch();
	const { addressForm } = useSelector((state) => state.address);
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

	const handleDeleteClick = async () => {
		let result = window.confirm(
			'Are you sure you wish to delete this address?'
		);
		if (!result) {
			return;
		}

		try {
			await deleteAddressById(address._id);
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(getAllAddressThunk());
		}
	};

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
					onClick={() => dispatch(openEditForm(address._id))}
				>
					Edit
				</Link>
				<Link
					to='#'
					className='ml-2 text-dark text-decoration-underline h6-text'
					onClick={handleDeleteClick}
				>
					Delete
				</Link>
			</div>
			<hr className='hr--small' />
			{addressForm?.open &&
				addressForm.type === 'edit' &&
				addressForm.editId === address._id && (
					<div className='mt-4'>
						<FormAddress title='Edit address' id={address._id} />
					</div>
				)}
		</div>
	);
}

AddressItem.propTypes = {
	address: PropTypes.object,
};

export default AddressItem;
