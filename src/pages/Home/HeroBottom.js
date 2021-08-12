import React from 'react';
import './styles.scss';
import Background from 'assets/img/homepage_lower_image.jpg';
import { Link } from 'react-router-dom';

export default function HeroBottom() {
	return (
		<div className='hero'>
			<div
				className='hero__wrapper'
				style={{ backgroundImage: `url(${Background})` }}
			>
				<div className='content-center'>
					<Link to='collections/my-boyfriends-back'>
						<div className='hero__content--center'>
							<p>Shop My Boyfriends Back</p>
						</div>
					</Link>
				</div>
			</div>
		</div>
	);
}
