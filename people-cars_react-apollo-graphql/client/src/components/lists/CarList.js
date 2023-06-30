import { useQuery } from '@apollo/client'
import { GET_PERSON_CARS } from '../../queries'
import { List } from 'antd'
import Car from '../listItems/Car'

const CarList = ({ personID }) => {
    const styles = getStyles()

    const { loading, error, data } = useQuery(GET_PERSON_CARS, {
        variables: { personID }
    })

    if (loading) return 'Loading...'
    if (error) return `Error! ${error.message}`

    console.log('data', data)

    return (
        <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.person.cars.map((car) => (
            <List.Item key={car.id}>
                <Car id={car.id} year={car.year} make={car.make} model={car.model} price={car.price} personID={personID}></Car>
            </List.Item>
        ))}
        </List>
    )
}

const getStyles = () => ({
    list: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px'
    }
})

export default CarList;