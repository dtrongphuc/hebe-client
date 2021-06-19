import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

export default function Hero({ title, background, heroText }) {
	return (
		<div className='collection__hero'>
			<div
				className='collection__hero__wrapper'
				style={{ backgroundImage: `url(${background})` }}
			>
				<div className='collection__hero__content'>
					<Container fluid='lg' className='hero__content__grid'>
						<h1 className='hero__content__heading'>{title}</h1>
						<div
							className='hero__content__text'
							dangerouslySetInnerHTML={{ __html: heroText }}
						></div>
					</Container>
				</div>
				<div className='collection__hero__overlay'></div>
			</div>
		</div>
	);
}

Hero.propTypes = {
	title: PropTypes.string,
	background: PropTypes.string,
	heroText: PropTypes.string,
};
