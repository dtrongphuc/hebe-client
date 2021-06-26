import React, { useState, useEffect } from 'react';
import CustomerLayout from 'layouts/CustomerLayout';
import { Link } from 'react-router-dom';
import FormAddress from 'components/FormAddress/FormAddress';
import './styles.scss';
import { getAllAddresses } from 'services/AddressApi';
import AddressList from 'components/AddressList/AddressList';
import ModalLoading from 'components/ModalLoading/ModalLoading';

function AddressesPage() {
	const [pageState, setPageState] = useState({
		loading: false,
		error: '',
	});
	const [addresses, setAddresses] = useState(null);
	const [addressForm, setAddressForm] = useState({
		show: false,
		action: 'add',
	});

	useEffect(() => {
		const getAddresses = async () => {
			setPageState((prevState) => ({ ...prevState, loading: true }));
			try {
				const response = await getAllAddresses();
				if (response) {
					setAddresses(response?.addresses);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setPageState((prevState) => ({ ...prevState, loading: false }));
			}
		};

		getAddresses();
	}, []);

	return (
		<CustomerLayout>
			<div className='container-lg'>
				<div className='row'>
					<div className='col-12'>
						<div className='account-header'>
							<h2 className='account-title'>My Account</h2>
							<button
								type='button'
								className='btn-black'
								onClick={() =>
									setAddressForm((prevState) => ({
										show: !prevState.show,
										action: 'add',
									}))
								}
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
					{addressForm?.show && (
						<div className='col-12 mt-4'>
							<FormAddress
								action={addressForm.action}
								title='Add a New Address'
								cancel={() =>
									setAddressForm((prevState) => ({ ...prevState, show: false }))
								}
							/>
						</div>
					)}
					<div className='col-12 mt-4'>
						<p className='account__col-title'>Your Addresses</p>
						{addresses && <AddressList addresses={addresses} />}
					</div>
				</div>
			</div>
			<ModalLoading loading={pageState.loading} />
		</CustomerLayout>
	);
}

export default AddressesPage;
