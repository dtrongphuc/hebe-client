import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ShopChild({ categories, brands }) {
	return (
		<div className='nav-child'>
			<div className='container-lg'>
				<div className='row'>
					<div className='col-3'>
						<p className='nav-child__col-title'>SHOP BY</p>
					</div>
					<div className='col-9'>
						<p className='nav-child__col-title'>BRANDS</p>
					</div>
				</div>
				<div className='row'>
					<div className='col-3'>
						<ul className='nav-child__list'>
							{categories?.map((category) => (
								<li key={category.name} className='nav-child__item'>
									<Link to={`/collections/${category.path}`}>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='col-9'>
						<div className='row'>
							{brands?.map((brand) => (
								<div key={brand.name} className='col-4'>
									<div className='nav-child__item'>
										<Link to={`/collections/${brand.path}`}>{brand.name}</Link>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

ShopChild.propTypes = {
	categories: PropTypes.array,
	brands: PropTypes.array,
};

export default ShopChild;
