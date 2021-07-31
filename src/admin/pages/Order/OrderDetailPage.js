import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import General from 'admin/components/OrderCards/General';
import Products from 'admin/components/OrderCards/Products';
import BillingAddress from 'admin/components/OrderCards/BillingAddress';
import { getOrderById } from 'services/OrderApi';
import Summary from 'admin/components/OrderCards/Summary';
import Delivery from 'admin/components/OrderCards/Delivery';
import Payment from 'admin/components/OrderCards/Payment';

function OrderDetailPage() {
	let { id } = useParams();
	const [loading, setLoading] = useState(false);
	const [order, setOrder] = useState(null);

	useEffect(() => {
		const getOrderInfo = async () => {
			try {
				setLoading(true);
				const response = await getOrderById(id);
				if (response?.success) {
					setOrder(response.order);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		getOrderInfo();
	}, [id]);

	return (
		<Row gutter={16}>
			<Col span={15}>
				<Row gutter={[0, 16]}>
					<Col span={24}>
						<General
							loading={loading}
							data={{
								account: order?.account,
								order: { number: order?.orderNumber, date: order?.createdAt },
							}}
						/>
					</Col>
					<Col span={24}>
						<Products loading={loading} data={order?.products} />
					</Col>
					<Col span={24}>
						<Delivery
							loading={loading}
							data={{
								deliveryMethod: order?.deliveryMethod,
								shippingMethod: order?.shippingMethod,
								paymentMethod: order?.paymentMethod,
								pickupLocation: order?.pickupLocation,
								shipmentStatus: order?.shipmentStatus,
							}}
						/>
					</Col>
					<Col span={24}>
						<Payment
							loading={loading}
							data={{
								paymentMethod: order?.paymentMethod,
								paymentStatus: order?.paymentStatus,
							}}
						/>
					</Col>
				</Row>
			</Col>
			<Col span={9}>
				<Row gutter={[0, 16]}>
					<Col span={24}>
						<BillingAddress loading={loading} data={order?.billInfo} />
					</Col>
					<Col span={24}>
						<Summary
							loading={loading}
							data={{
								subTotal:
									order?.lastPrice -
										order?.voucherPrice -
										order?.shippingPrice || 0,
								shipping: order?.shippingPrice || 0,
								tax: 0,
								discount: order?.voucherPrice,
								grandTotal: order?.lastPrice,
							}}
						/>
					</Col>
				</Row>
			</Col>
		</Row>
	);
}

export default OrderDetailPage;
