import React, { useEffect } from 'react';
import CustomerLayout from 'layouts/CustomerLayout';
import { Link } from 'react-router-dom';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddressThunk } from 'features/address/addressSlice';
// import PropTypes from 'prop-types'

function AccountPage() {
	const dispatch = useDispatch();
	const count = useSelector((state) => state.address?.count);

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
						<p className='account-text'>Dương Phúc</p>
						<Link
							className='account-text account-text--small account-link'
							to='/account/addresses'
						>
							View Addresses ({count})
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
