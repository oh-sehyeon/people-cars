import { useMutation } from '@apollo/client';
import { Button, Form, Input, InputNumber } from 'antd';
import { useEffect, useState } from 'react';
import { UPDATE_CAR } from '../../queries'

const UpdateCar = (props) => {
    const { id, year, make, model, price } = props;
    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    const [updateCar] = useMutation(UPDATE_CAR);

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = (values) => {
        const { year, make, model, price } = values;

        updateCar({
            variables: {
                id,
                year,
                make,
                model,
                price,
            },
        });
        props.onButtonClick();
    };

    return (
        <Form
        form={form}
        name="update-car-form"
        layout="inline"
        onFinish={onFinish}
        initialValues={{
            year,
            make,
            model,
            price,
        }}
        size="large"
        >
        <Form.Item
            name="year"
            rules={[{ required: true, message: 'Please input the year!' }]}
        >
            <InputNumber placeholder="Year" />
        </Form.Item>
        <Form.Item
            name="make"
            rules={[{ required: true, message: 'Please input the make!' }]}
        >
            <Input placeholder="Make" />
        </Form.Item>
        <Form.Item
            name="model"
            rules={[{ required: true, message: 'Please input the model!' }]}
        >
            <Input placeholder="Model" />
        </Form.Item>
        <Form.Item
            name="price"
            rules={[{ required: true, message: 'Please input the price!' }]}
        >
            <InputNumber placeholder="Price" />
        </Form.Item>
        <Form.Item shouldUpdate={true}>
            {() => (
            <Button
                type="primary"
                htmlType="submit"
                disabled={
                (!form.isFieldTouched('year') &&
                    !form.isFieldTouched('make') &&
                    !form.isFieldTouched('model') &&
                    !form.isFieldTouched('price')) ||
                form.getFieldsError().filter(({ errors }) => errors.length).length
                }
            >
                Update Car
            </Button>
            )}
        </Form.Item>
        <Button onClick={props.onButtonClick}>Cancel</Button>
        </Form>
    );
};

export default UpdateCar;