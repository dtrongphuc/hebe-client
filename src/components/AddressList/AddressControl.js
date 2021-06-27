import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAllAddressThunk,
	openEditForm,
} from 'features/address/addressSlice';
import { deleteAddressById } from 'services/AddressApi';
import FormAddress from 'components/FormAddress/FormAddress';

function AddressControl({ addressId }) {
	const dispatch = useDispatch();
	const { addressForm } = useSelector((state) => state.address);

	const handleDeleteClick = async () => {
		let result = window.confirm(
			'Are you sure you wish to delete this address?'
		);
		if (!result) {
			return;
		}

		try {
			await deleteAddressById(addressId);
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(getAllAddressThunk());
		}
	};
	return (
		<>
			<div className='d-flex mt-3'>
				<Link
					to='#'
					className='text-dark text-decoration-underline h6-text'
					onClick={() => dispatch(openEditForm(addressId))}
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
				addressForm.editId === addressId && (
					<div className='mt-4'>
						<FormAddress title='Edit address' id={addressId} />
					</div>
				)}
		</>
	);
}

AddressControl.propTypes = {
	addressId: PropTypes.string,
};

export default AddressControl;
