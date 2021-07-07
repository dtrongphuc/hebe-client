import React, { useEffect, useState } from 'react';
import ProductDetail from 'components/ProductDetail/ProductDetail';
import CustomerLayout from 'layouts/CustomerLayout';
import { useParams } from 'react-router-dom';
import { getProductByPathName } from 'services/ProductApi';

export default function ProductDetailPage() {
	const [product, setProduct] = useState(null);
	const { productPath } = useParams();

	useEffect(() => {
		(async function () {
			try {
				const response = await getProductByPathName(productPath);
				if (response) {
					setProduct(response);
				}
			} catch (error) {
				console.log(error.data);
			}
		})();
	}, [productPath]);

	return (
		<CustomerLayout>
			{product && <ProductDetail product={product} />}
		</CustomerLayout>
	);
}
