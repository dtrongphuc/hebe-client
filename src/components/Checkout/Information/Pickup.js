import React from 'react';
import './PickupStyles.scss';

function Pickup() {
	return (
		<section className='section-info'>
			<h2 className='section-info__heading'>Pickup locations</h2>
			<div className='radio-content'>
				<div className='radio-wrapper'>
					<input
						type='radio'
						name='location'
						id='ship'
						className='checkout-radio'
						checked
						onChange={() => {}}
					/>
					<label htmlFor='ship' className='pickup-label'>
						<div className='d-flex align-items-center justify-content-between'>
							<span className='pickup-label__text'>Hebe Boutique</span>
							<span className='pickup-label__text pickup-label__text--bold'>
								Free
							</span>
						</div>
						<div className='row'>
							<div className='col-12 col-sm-8'>
								<span className='pickup-label__text pickup-label__text--sm'>
									450 Queen Street, Kuripuni, WGN, Masterton
								</span>
							</div>
							<div className='col-12 col-sm-4'>
								<span className='pickup-label__text pickup-label__text--sm text-sm-right d-block'>
									Usually ready in 2 hours
								</span>
							</div>
						</div>
					</label>
				</div>
			</div>
		</section>
	);
}

export default Pickup;
