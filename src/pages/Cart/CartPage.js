import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import CartItem from './CartItem';
import Button from 'components/FormControl/Button';

import './styles.scss';
import { useSelector } from 'react-redux';
import { priceString } from 'utils/util';
import { useHistory } from 'react-router-dom';
import { checkCart } from 'services/CartApi';

function CartPage() {
	const { shoppingCart, numberCart, total } = useSelector(
		(state) => state.cart
	);
	let history = useHistory();
	const [loading, setLoading] = useState(false);
	const [invalidCartItem, setInvalidCartItem] = useState([]);

	const onCheckoutClicked = async () => {
		try {
			setLoading(true);
			const response = await checkCart();
			if (response.success && response?.invalid.length > 0) {
				setInvalidCartItem([...response.invalid]);
				setLoading(false);

				return;
			}
			return history.push('/checkout/information');
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<div className='cart-wrapper'>
			<Container fluid='lg'>
				<div className='cart-main'>
					<h2 className='cart-h2'>Shopping Cart</h2>
					<div className='cart-list'>
						{shoppingCart?.products?.map((item) => {
							let invalidIndex = invalidCartItem.indexOf(item._id);
							return (
								<div key={item._id}>
									<CartItem item={item} invalidIndex={invalidIndex} />
								</div>
							);
						})}
					</div>
					{numberCart > 0 ? (
						<div className='mt-5 cart-checkout'>
							<div className='d-flex align-items-center justify-content-between mb-4 ml-auto'>
								<span>Subtotal:</span>
								<span style={{ fontSize: '1.4rem' }}>{priceString(total)}</span>
							</div>
							<Button onClick={onCheckoutClicked} loading={loading}>
								Check Out
							</Button>
						</div>
					) : (
						<div className='text-center display-4'>Your cart is empty</div>
					)}
				</div>
			</Container>
		</div>
	);
}

export default CartPage;
