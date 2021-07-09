import React from 'react';
import { Link } from 'react-router-dom';
import './ContactStyles.scss';

function Contact() {
	return (
		<section className='section-info'>
			<h2 className='section-info__heading'>Contact information</h2>
			<div className='contact-info'>
				<img
					src='//cdn.shopify.com/proxy/29c1df4b0a7877e4b53c6d9b10201bf41a4249dc40e0320639e7ea8a2d71072f/www.gravatar.com/avatar/407de42f9c56a1fc27c8fc5ecd259c2f.jpg?s=100&d=https%3A%2F%2Fcdn.shopify.com%2Fshopifycloud%2Fshopify%2Fassets%2Fno-gravatar-new-04e7c2331218ac202e79e31be502fd5631bc96cb0206580dbcb0720ebbbd7c73_100x100.png'
					alt=''
					className='avatar'
				/>
				<div>
					<p className='section-info__text'>
						Duong Trong Phuc (dangcapbp36@gmail.com)
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
