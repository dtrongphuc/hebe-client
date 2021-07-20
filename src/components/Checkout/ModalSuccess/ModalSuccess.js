import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import ThankYou from 'assets/img/fireworks.png';
import { useRef } from 'react';

function ModalSuccess({ show, close }) {
	const modalRef = useRef();

	return (
		<div
			ref={modalRef}
			id='modal-success__container'
			className={`${show ? 'active' : ''}`}
		>
			<div className='modal-success__background'>
				<div className='modal-success__body'>
					<img src={ThankYou} alt='Thank You' className='modal-success__img' />
					<p className='text'>Thank you for your order!</p>
					<svg
						className='modal-svg'
						xmlns='http://www.w3.org/2000/svg'
						width='100%'
						height='100%'
						preserveAspectRatio='none'
					>
						<rect
							x='0'
							y='0'
							width='100%'
							height='100%'
							fill='none'
							rx='4'
							ry='4'
						></rect>
					</svg>
					<button type='button' onClick={close}>
						Continue to shopping
					</button>
				</div>
			</div>
		</div>
	);
}

ModalSuccess.propTypes = {
	show: PropTypes.bool,
	close: PropTypes.func,
};

export default ModalSuccess;
