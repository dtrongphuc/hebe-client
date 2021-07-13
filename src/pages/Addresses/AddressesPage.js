import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import FormAddress from 'components/FormAddress/FormAddress';
import './styles.scss';
import AddressList from 'components/AddressList/AddressList';
import ModalLoading from 'components/ModalLoading/ModalLoading';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddressThunk, openAddForm } from 'features/address/addressSlice';

function AddressesPage() {
	const dispatch = useDispatch();

	const addresses = useSelector((state) => state.address?.addresses);
	const loading = useSelector((state) => state.address?.isLoading);
	const addressForm = useSelector((state) => state.address?.addressForm);

	useEffect(() => {
		const getAddresses = async () => {
			try {
				dispatch(getAllAddressThunk());
			} catch (error) {
				console.log(error);
			}
		};

		getAddresses();
	}, [dispatch]);

	return (
		<div className='container-lg'>
			<div className='row'>
				<div className='col-12'>
					<div className='account-header'>
						<h2 className='account-title'>My Account</h2>
						<button
							type='button'
							className='btn-black'
							onClick={() => {
								console.log('click');
								dispatch(openAddForm());
							}}
						>
							Add a New Address
						</button>
					</div>
					<hr className='hr--small' />
				</div>
				<div className='col-12 mt-2'>
					<Link
						className='account-text account-text--small account-link'
						to='/account'
					>
						&#8592; Return to Account Details
					</Link>
				</div>
				{addressForm?.open && addressForm?.type === 'add' && (
					<div className='col-12 mt-4'>
						<FormAddress title='Add a New Address' />
					</div>
				)}
				<div className='col-12 mt-4'>
					<p className='account__col-title'>Your Addresses</p>
					{addresses && <AddressList addresses={addresses} />}
				</div>
			</div>
			<ModalLoading loading={loading} />
		</div>
	);
}

export default AddressesPage;
