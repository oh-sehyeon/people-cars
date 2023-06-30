import { Card } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCar from '../forms/UpdateCar'

const Car = props => {
    const { id, year, make, model, price, personID} = props
    const styles = getStyles()
    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => {
        setEditMode(!editMode)
    }

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(price);

    return (
        <div>
        {editMode ? (
        <UpdateCar
        id={id}
        year={year}
        make={make}
        model={model}
        price={price}
        onButtonClick={handleButtonClick}
        />
        ) : (
        <Card
        style={styles.card}
        actions={[
            <EditOutlined key='edit' onClick={handleButtonClick} />,
            <RemoveCar id={id} personID={personID} />
        ]}
        >
            {year} {make} {model} - {formattedPrice}
        </Card>
        )}
        </div>
    )
}

const getStyles = () => ({
    card: {
        width: '1200px',
        marginTop: '20px',
        backgroundColor: '#F0F0F0',
        fontWeight: '400'
    }
})

export default Car;