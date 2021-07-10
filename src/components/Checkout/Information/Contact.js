import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './ContactStyles.scss';
import Avatar from 'assets/img/account_info.png';

function Contact() {
	const { email, firstName, lastName } = useSelector((state) => state.user);

	return (
		<section className='section-info'>
			<h2 className='section-info__heading'>Contact information</h2>
			<div className='contact-info'>
				<img src={Avatar} alt='' className='avatar' />
				<div>
					<p className='section-info__text'>
						<span className='text-capitalize'>{`${firstName} ${lastName} `}</span>
						({email})
					</p>
					<Link
						to='/logout'
						className='section-info__text section-info__text--bold'
					>
						Log out
					</Link>
				</div>
			</div>
		</section>
	);
}

export default Contact;
