import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'antd';
import GeneralCard from './GeneralCard';
import AttributeCard from './AttributeCard';
import ProductConditionCard from './ProductConditionCard';
import CustomerConditionCard from './CustomerConditionCard';

function DiscountForm({ form, initialFormValues, onFinish, loading = false }) {
	const [showProductCondition, setShowProductCondition] = useState(false);

	useEffect(() => {
		form.setFieldsValue(initialFormValues);
		if (form.getFieldValue('apply_to') === 'specific_products') {
			setShowProductCondition(true);
		}
	}, [form, initialFormValues]);

	const applyToChange = () => {
		if (form.getFieldValue('apply_to') === 'specific_products') {
			setShowProductCondition(true);
		} else if (showProductCondition) {
			setShowProductCondition(false);
		}
	};

	return (
		<Form
			layout='vertical'
			form={form}
			initialValues={initialFormValues}
			onFinish={onFinish}
			onFinishFailed={({ values, errorFields, outOfDate }) =>
				console.log(values)
			}
		>
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={15}>
					<Row gutter={[{ xs: 16, lg: 0 }, 16]}>
						<Col span={24}>
							<GeneralCard loading={loading} />
						</Col>
						<Col span={24}>
							{showProductCondition && <ProductConditionCard />}
						</Col>
					</Row>
				</Col>
				<Col xs={24} lg={9}>
					<Row gutter={[{ xs: 16, lg: 0 }, 16]}>
						<Col span={24}>
							<AttributeCard applyToChange={applyToChange} loading={loading} />
						</Col>
						<Col span={24}>
							<CustomerConditionCard loading={loading} />
						</Col>
					</Row>
				</Col>
			</Row>
		</Form>
	);
}

DiscountForm.propTypes = {
	initialFormValues: PropTypes.object,
	onFinish: PropTypes.func,
	loading: PropTypes.bool,
};

export default DiscountForm;
