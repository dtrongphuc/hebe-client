import React from 'react';
import ProductForm from 'admin/components/ProductForm/ProductForm';

function AddProductPage() {
	return (
		<div
			className='site-layout-background'
			style={{ padding: 24, minHeight: 360, margin: '16px 0' }}
		>
			<ProductForm />
		</div>
	);
}

export default AddProductPage;
