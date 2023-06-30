import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PERSON_WITH_CARS } from '../../queries';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ShowPage = () => {
    const styles = getStyles();

    const { personID } = useParams();

    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
        variables: { personID: personID },
    });

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const { person } = data;

    return (
        <div style={styles.div}>
            <h1 style={styles.name}>
                {person.firstName} {person.lastName}
            </h1>
            <h2 style={styles.carTitle}>Cars:</h2>
            <ul>
                {person.cars.map((car) => (
                <li style={styles.listItem} key={car.id}>
                    {car.year} {car.make} {car.model} - ${car.price}
                </li>
                ))}
            </ul>
            <Link style={styles.anchor} to="/">GO BACK HOME</Link>
        </div>
    );
};

const getStyles = () => ({
    div: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        margin: '10px',
        marginBottom: '30px'
    },
    carTitle: {
        margin: '10px',
        marginBottom: '5px',
        fontWeight: '500'
    },
    listItem: {
        listStyle: 'none'
    },
    anchor: {
        textDecoration: 'none',
        color: '#034694',
        fontWeight: 'Bold',
        marginTop: '50px'
    }
});

export default ShowPage;
