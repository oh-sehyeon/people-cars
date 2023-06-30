import { useMutation } from '@apollo/client'
import { GET_PERSON_CARS, REMOVE_CAR } from '../../queries'

import { DeleteOutlined } from '@ant-design/icons'

const RemoveCar = ({ id, personID }) => {
    const [removeCar] = useMutation(REMOVE_CAR, {
        variables: { id, personID },
        update(cache) {
            const { person } = cache.readQuery({
                query: GET_PERSON_CARS,
                variables: { personID },
            });

            cache.writeQuery({
                query: GET_PERSON_CARS,
                variables: { personID },
                data: {
                    person: {
                        ...person,
                        cars: person.cars.filter((car) => car.id !== id),
                    },
                },
            });
        },
    });

    const handleButtonClick = () => {
        removeCar({
            variables: { id, personID },
        }).catch((error) => {
            console.log('Error removing car:', error.message);
        });
    };

    return (
        <DeleteOutlined
            key="delete"
            onClick={handleButtonClick}
            style={{ color: 'red' }}
        />
    );
};

export default RemoveCar;