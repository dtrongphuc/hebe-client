import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

function ModalLoading({ loading }) {
	return (
		<div className={`modal-loading ${loading ? 'd-flex' : 'd-none'}`}>
			<div className='lds-ripple'>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}

ModalLoading.propTypes = {
	loading: PropTypes.bool,
};

export default ModalLoading;
