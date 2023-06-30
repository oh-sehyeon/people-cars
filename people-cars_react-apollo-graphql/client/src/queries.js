import { gql } from '@apollo/client';

export const GET_PERSONS = gql`
  {
    persons {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
    addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation RemovePerson($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_PERSON_CARS = gql`
  query GetPersonCars($personID: String!) {
    person(id: $personID) {
      cars {
        year
        make
        model
        price
        id
        personID
      }
    }
  }
`;


export const ADD_CAR = gql`
  mutation AddCar($year: Int!, $make: String!, $model: String!, $price: Float!, $id: String!, $personID: String!) {
    addCar(year: $year, make: $make, model: $model, price: $price, id: $id, personID: $personID) {
      year
      make
      model
      price
      id
      personID
    }
  }
`;


export const UPDATE_CAR = gql`
  mutation UpdateCar($id: String!, $year: Int!, $make: String!, $model: String!, $price: Float!) {
    updateCar(id: $id, year: $year, make: $make, model: $model, price: $price) {
      id
      year
      make
      model
      price
      personID
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!, $personID: String!) {
    removeCar(id: $id, personID: $personID) {
      year
      make
      model
      price
      id
      personID
    }
  }
`;

export const GET_PERSON_WITH_CARS = gql`
  query GetPersonWithCars($personID: String!) {
    person(id: $personID) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        model
        price
      }
    }
  }
`;