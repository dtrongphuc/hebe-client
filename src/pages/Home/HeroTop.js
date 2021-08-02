import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { getBanner } from 'services/SettingApi';
import { useState } from 'react';

export default function HeroTop() {
	const [banner, setBanner] = useState(null);

	const handleScrollClick = (e) => {
		e.preventDefault();

		let element = document.getElementById('scroll');
		element.scrollIntoView({
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		const fetch = async () => {
			try {
				const response = await getBanner();
				if (response?.success) {
					setBanner(response?.banner);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetch();
	}, []);

	return (
		<div className='hero'>
			<div
				className='hero__wrapper'
				style={{ backgroundImage: `url(${banner?.image?.src})` }}
			>
				<Container>
					<div className='hero__content'>
						<p>{banner?.title}</p>
						<Link to={`/collections/${banner?.brand?.path}`}>Shop now</Link>
					</div>
				</Container>
				<div className='hero__overlay'></div>
				<div className='scroll-icon'>
					<Link to='#scroll' onClick={handleScrollClick}>
						<FontAwesomeIcon icon={faChevronDown} />
					</Link>
				</div>
				<div id='scroll'></div>
			</div>
		</div>
	);
}
