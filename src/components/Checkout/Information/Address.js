import React from 'react';
// import PropTypes from 'prop-types';
import './AddressStyles.scss';
import TextField from '../TextField/TextField';

function Address(props) {
	return (
		<section className='section-info'>
			<h2 className='section-info__heading'>Shipping address</h2>
			<div className='row'>
				<div className='col-12 col-md-6'>
					<div className=''>
						<TextField placeholder='First name' />
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='mt-3 mt-md-0'>
						<TextField placeholder='Last name' />
					</div>
				</div>
			</div>
			<div className='mt-3'>
				<TextField placeholder='Company (optional)' />
			</div>
			<div className='mt-3'>
				<TextField placeholder='Address' />
			</div>
			<div className='mt-3'>
				<TextField placeholder='Apartment, suite, etc. (optional)' />
			</div>
			<div className='mt-3'>
				<TextField placeholder='City' />
			</div>
			<div className='row'>
				<div className='col-12 col-md-6'>
					<div className='mt-3'>
						<TextField placeholder='Country/region' />
					</div>
				</div>
				<div className='col-12 col-md-6'>
					<div className='mt-3'>
						<TextField placeholder='Postal code' />
					</div>
				</div>
			</div>
			<div className='mt-3'>
				<TextField placeholder='Phone (optional)' />
			</div>
		</section>
	);
}

// Address.propTypes = {};

export default Address;
