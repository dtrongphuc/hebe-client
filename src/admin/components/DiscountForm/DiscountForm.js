import React from 'react';
import { Form, Row, Col } from 'antd';
import GeneralCard from './GeneralCard';
import AttributeCard from './AttributeCard';
import ProductConditionCard from './ProductConditionCard';

const initialValues = {
	layout: 'vertical',
};

function DiscountForm({ form, onFinish }) {
	return (
		<Form
			layout='vertical'
			form={form}
			initialValues={initialValues}
			onFinish={onFinish}
			onFinishFailed={({ values, errorFields, outOfDate }) =>
				console.log(values)
			}
		>
			<Row gutter={[16, 16]}>
				<Col xs={24} lg={15}>
					<Row gutter={[{ xs: 16, lg: 0 }, 16]}>
						<Col span={24}>
							<GeneralCard />
						</Col>
						<Col span={24}>
							<ProductConditionCard />
						</Col>
					</Row>
				</Col>
				<Col xs={24} lg={9}>
					<Row gutter={[{ xs: 16, lg: 0 }, 16]}>
						<Col span={24}>
							<AttributeCard />
						</Col>
					</Row>
				</Col>
			</Row>
		</Form>
	);
}

export default DiscountForm;
