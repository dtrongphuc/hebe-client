import CustomerLayout from 'layouts/CustomerLayout';
import React from 'react';
import { Container } from 'react-bootstrap';
import CartItem from './CartItem';
import Button from 'components/FormControl/Button';

import './styles.scss';
import { useSelector } from 'react-redux';

function CartPage() {
	const { shoppingCart, numberCart } = useSelector((state) => state.cart);

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
								<Button>Check Out</Button>
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
