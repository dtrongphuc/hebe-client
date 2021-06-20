import React from 'react';
import CustomerLayout from 'layouts/CustomerLayout';
import { Link } from 'react-router-dom';
import './styles.scss';
// import PropTypes from 'prop-types'

function AccountPage() {
	return (
		<CustomerLayout>
			<div className='container'>
				<div className='row'>
					<div className='col-12'>
						<h2 className='account-title'>My Account</h2>
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
							View Addresses (0)
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
