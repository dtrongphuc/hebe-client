import CustomerLayout from 'layouts/CustomerLayout';
import React from 'react';
import { Container } from 'react-bootstrap';
import CartItem from './CartItem';
import Button from 'components/FormControl/Button';

import './styles.scss';
import { useSelector } from 'react-redux';
import { productPriceString } from 'utils/util';
import { useHistory } from 'react-router-dom';

function CartPage() {
	const { shoppingCart, numberCart, total } = useSelector(
		(state) => state.cart
	);
	let history = useHistory();

	return (
		<CustomerLayout>
			<div className='cart-wrapper'>
				<Container fluid='lg'>
					<div className='cart-main'>
						<h2 className='cart-h2'>Shopping Cart</h2>
						<div className='cart-list'>
							{shoppingCart?.products?.map((item) => (
								<div key={item._id}>
									<CartItem item={item} />
								</div>
							))}
						</div>
						{numberCart > 0 ? (
							<div className='mt-5 cart-checkout'>
								<div className='d-flex align-items-center justify-content-between mb-4 ml-auto'>
									<span>Subtotal:</span>
									<span style={{ fontSize: '1.4rem' }}>
										{productPriceString(total)}
									</span>
								</div>
								<Button onClick={() => history.push('/checkout')}>
									Check Out
								</Button>
							</div>
						) : (
							<div className='text-center display-4'>Your cart is empty</div>
						)}
					</div>
				</Container>
			</div>
		</CustomerLayout>
	);
}

export default CartPage;
