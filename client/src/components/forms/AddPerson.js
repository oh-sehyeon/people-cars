import { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useMutation } from '@apollo/client'
import { ADD_PERSON, GET_PERSONS } from '../../queries'

const AddPerson = () => {
  const styles = getStyles()

  const [id] = useState(uuidv4())
  const [addPerson] = useMutation(ADD_PERSON, {
    onCompleted: () => {
        form.resetFields();
    },
  })

  const [form] = Form.useForm()
  const [, forceUpdate] = useState()

  useEffect(() => {
    forceUpdate({})
  }, [])

  const onFinish = values => {
    const { firstName, lastName } = values

    addPerson({
      variables: {
        id,
        firstName,
        lastName
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PERSONS })
        cache.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            persons: [...data.persons, addPerson]
          }
        })
      }
    })
  }

  return (
    <Form
      form={form}
      name='add-person-form'
      layout='inline'
      onFinish={onFinish}
      size='large'
      style={styles.container}
    >
      <Form.Item>First Name:</Form.Item>
      <Form.Item
        name='firstName'
        rules={[{ required: true, message: 'Please input your first name!' }]}
      >
        <Input placeholder='First Name' />
      </Form.Item>
      <Form.Item>Last Name:</Form.Item>
      <Form.Item
        name='lastName'
        rules={[{ required: true, message: 'Please input your last name!' }]}
      >
        <Input placeholder='Last Name' />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type='primary'
            htmlType='submit'
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}

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

export default AddPerson
