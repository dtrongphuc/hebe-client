import React from 'react';
import ProductDetail from 'components/ProductDetail/ProductDetail';
import CustomerLayout from 'layouts/CustomerLayout';

export default function ProductDetailPage() {
	return (
		<CustomerLayout>
			<ProductDetail />
		</CustomerLayout>
	);
}
