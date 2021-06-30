import CustomerLayout from 'layouts/CustomerLayout';
import React from 'react';
import { Container } from 'react-bootstrap';
import CartItem from './CartItem';
import Button from 'components/FormControl/Button';

import './styles.scss';

function CartPage() {
	return (
		<CustomerLayout>
			<div className='cart-wrapper'>
				<Container fluid='lg'>
					<div className='cart-main'>
						<h2 className='cart-h2'>Shopping Cart</h2>
						<div className='cart-list'>
							<CartItem />
						</div>
						<div className='mt-5 cart-checkout'>
							<Button>Check Out</Button>
						</div>
					</div>
				</Container>
			</div>
		</CustomerLayout>
	);
}

export default CartPage;
