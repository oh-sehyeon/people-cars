import { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_PERSONS, GET_PERSON_CARS } from '../../queries';

const AddCar = () => {
    const styles = getStyles()

    const [form] = Form.useForm();
    const { loading, error, data, refetch } = useQuery(GET_PERSONS);
    const [persons, setPersons] = useState([]);
    const [personID, setPersonID] = useState(null);
    const [addCar] = useMutation(ADD_CAR, {
        onCompleted: () => {
            refetch();
            form.resetFields();
        },
    });

    useEffect(() => {
        if (!loading && data) {
        setPersons(data.persons);
        }
    }, [loading, data]);

    const onFinish = (values) => {
        const { year, make, model, price } = values;
        addCar({
        variables: {
            year: parseInt(year),
            make,
            model,
            price: parseFloat(price),
            id: uuidv4(),
            personID,
        },
        refetchQueries: [{ query: GET_PERSON_CARS, variables: { personID } }],
        })
        .catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        console.log(personID);
    }, [personID]);

    const handlePersonSelect = (value) => {
        setPersonID(value);
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Form
        form={form}
        name='add-car-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={styles.container}
        >
        <Form.Item label='Year' name='year' rules={[{ required: true, message: 'Year is required' }]}>
            <Input placeholder='Year' type='number' min='0' style={{ width: '90px' }}/>
        </Form.Item>
        <Form.Item label='Make' name='make' rules={[{ required: true, message: 'Make is required' }]}>
            <Input placeholder='Make' style={{ width: '160px' }} />
        </Form.Item>
        <Form.Item label='Model' name='model' rules={[{ required: true, message: 'Model is required' }]}>
            <Input placeholder='Model' style={{ width: '160px' }} />
        </Form.Item>
        <Form.Item label='Price' name='price' rules={[{ required: true, message: 'Price is required' }]}>
            <Input placeholder='Price' type='number' step='1.00' min='0' style={{ width: '120px' }}/>
        </Form.Item>
        <Form.Item label='Person' name='personID' rules={[{ required: true, message: 'Select a Person' }]}>
            <Select placeholder='Select a Person' onChange={handlePersonSelect}>
            {persons.map((person) => (
                <Select.Option key={person.id} value={person.id}>
                {`${person.firstName} ${person.lastName}`}
                </Select.Option>
            ))}
            </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
            {() => (
            <Button
                type='primary'
                htmlType='submit'
                disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
            >
                Add Car
            </Button>
            )}
        </Form.Item>
        </Form>
    );
};

const getStyles = () => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '40px', 
        borderBottom: '1px solid lightgrey',
        width: '100%',
        paddingBottom: '45px'
    }
})

export default AddCar;









/* import { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_CAR, GET_PERSON_CARS, GET_PERSONS } from '../../queries';

const AddCar = () => {
    const [form] = Form.useForm();
    const { loading, error, data } = useQuery(GET_PERSONS);
    const [persons, setPersons] = useState([]);
    const [personID, setPersonID] = useState(null);

    useEffect(() => {
        if (!loading && data) {
            setPersons(data.persons);
        }
    }, [loading, data]);

    const onFinish = (values) => {
        console.log("Okkk")
    };

    useEffect(() => {
        console.log(personID);
    }, [personID]);

    const handlePersonSelect = (value) => {
        setPersonID(value);
    };

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Form
        form={form}
        name='add-car-form'
        layout='inline'
        onFinish={onFinish}
        size='large'
        style={{ marginBottom: '40px' }}
        >
            <Form.Item label='Year' name='year' rules={[{ required: true, message: 'Year is required' }]}>
                <Input placeholder='Year' type='number' />
            </Form.Item>
            <Form.Item label='Make' name='make' rules={[{ required: true, message: 'Make is required' }]}>
                <Input placeholder='Make' />
            </Form.Item>
            <Form.Item label='Model' name='model' rules={[{ required: true, message: 'Model is required' }]}>
                <Input placeholder='Model' />
            </Form.Item>
            <Form.Item label='Price' name='price' rules={[{ required: true, message: 'Price is required' }]}>
                <Input placeholder='Price' type='number' step='0.01' />
            </Form.Item>
            <Form.Item
                label='Person'
                name='personID'
                rules={[{ required: true, message: 'Select a Person' }]}
            >
                <Select placeholder='Select a Person' onChange={handlePersonSelect}>
                    {persons.map((person) => (
                    <Select.Option key={person.id} value={person.id}>
                        {`${person.firstName} ${person.lastName}`}
                    </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item shouldUpdate={true}>
                {() => (
                <Button
                    type='primary'
                    htmlType='submit'
                    disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length}
                >
                    Add Car
                </Button>
                )}
            </Form.Item>
        </Form>
    );
};

export default AddCar; */