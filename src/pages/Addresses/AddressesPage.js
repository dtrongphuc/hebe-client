import React, { useState } from 'react';
import CustomerLayout from 'layouts/CustomerLayout';
import { Link } from 'react-router-dom';
import FormAddress from 'components/FormAddress/FormAddress';
import './styles.scss';

function AddressesPage() {
	const [showAddAddress, setShowAddAddress] = useState(false);

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
								onClick={() => setShowAddAddress((prevState) => !prevState)}
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
					{showAddAddress && (
						<div className='col-12 mt-4'>
							<FormAddress />
						</div>
					)}
					<div className='col-12 mt-4'>
						<p className='account__col-title'>Your Addresses</p>
					</div>
				</div>
			</div>
		</CustomerLayout>
	);
}

export default AddressesPage;
