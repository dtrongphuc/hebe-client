import React, { useEffect } from 'react';
import CustomerLayout from 'layouts/CustomerLayout';
import { Link } from 'react-router-dom';
import './styles.scss';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { countAddresses, getDefaultAddress } from 'services/AddressApi';
import AddressItem from 'components/AddressList/AddressItem';
// import PropTypes from 'prop-types'

function AccountPage() {
	const dispatch = useDispatch();
	const [defaultAddress, setDefaultAddress] = useState(null);
	const [addressCount, setAddressCount] = useState(0);

	useEffect(() => {
		const getCountAddresses = async () => {
			try {
				const response = await countAddresses();
				setAddressCount(response?.count);
			} catch (error) {
				console.log(error);
			}
		};

		const getAddress = async () => {
			try {
				const response = await getDefaultAddress();
				setDefaultAddress(response?.address);
			} catch (error) {
				console.log(error);
			}
		};

		getCountAddresses();
		getAddress();
	}, [dispatch]);

	return (
		<CustomerLayout>
			<div className='container-lg'>
				<div className='row'>
					<div className='col-12'>
						<div className='account-header'>
							<h2 className='account-title'>My Account</h2>
						</div>
						<hr className='hr--small' />
					</div>
					<div className='col-12 col-md-8 mt-2'>
						<p className='account__col-title'>Order History</p>
						<small className='account-text account-text--small'>
							You haven't placed any orders yet.
						</small>
					</div>
					<div className='col-12 col-md-4 mt-2'>
						<p className='account__col-title'>Account Details</p>
						{defaultAddress && (
							<AddressItem address={defaultAddress} showDefault={false} />
						)}
						<Link
							className='account-text account-text--small account-link'
							to='/account/addresses'
						>
							View Addresses ({addressCount})
						</Link>
					</div>
				</div>
			</div>
		</CustomerLayout>
	);
}

// AccountPage.propTypes = {

// }

export default AccountPage;
