import find from 'lodash.find'
import remove from 'lodash.remove'
import { v4 as uuidv4 } from 'uuid';

const personsDataArray = [
  {
    id: '1',
    firstName: 'Se Hyeon',
    lastName: 'Oh',
    cars: [
      {
        id: '1',
        year: 2020,
        make: 'Toyota',
        model: 'Camry',
        price: 25000,
        personID: '1'
      },
      {
        id: '2',
        year: 2018,
        make: 'Honda',
        model: 'Accord',
        price: 22000,
        personID: '1'
      }
    ]
  },
  {
    id: '2',
    firstName: 'Harry',
    lastName: 'Potter',
    cars: [
      {
        id: '4',
        year: 2018,
        make: 'Rolls Royce',
        model: 'Phantom',
        price: 500000000,
        personID: '2'
      },
    ]
  },
  {
    id: '3',
    firstName: 'John',
    lastName: 'Doe',
    cars: [
      {
        id: '3',
        year: 2019,
        make: 'Ford',
        model: 'Mustang',
        price: 35000,
        personID: '3'
      }
    ]
  }
]

const typeDefs = `
  type Person {
    id: String!
    firstName: String
    lastName: String
    cars: [Car!]!
  }

  type Car {
    id: String!
    year: Int!
    make: String!
    model: String!
    price: Float!
    personID: String!
  }

  type Query {
    person(id: String!): Person
    persons: [Person]
    getPersonCars(personID: String!): [Car!]!
    personWithCars(id: String!): Person 
  }

  type Mutation {
    addPerson(id: String!, firstName: String!, lastName: String!): Person
    updatePerson(id: String!, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
    addCar(year: Int!, make: String!, model: String!, price: Float!, id: String!, personID: String!): Car
    updateCar(id: String!, year: Int!, make: String!, model: String!, price: Float!): Car
    removeCar(id: String!, personID: String!): Car
  }
`

const resolvers = {
  Query: {
    persons: () => personsDataArray,
    person: (parent, args) => {
      return find(personsDataArray, { id: args.id })
    },
    getPersonCars: (parent, { personID }) => {
      const person = find(personsDataArray, { id: personID });
      if (!person) {
        throw new Error(`Couldn't find person with id ${personID}`);
      }
      const cars = person.cars.map((car) => {
        const year = car.year !== null ? car.year : 0;
  
        return {
          ...car,
          year,
        };
      });
      return cars;
    },
    personWithCars: (parent, { id }) => {
      const person = find(personsDataArray, { id });
      if (!person) {
        throw new Error(`Couldn't find person with id ${id}`);
      }

      return person;
    },
  },
  Mutation: {
    addPerson: (root, args) => {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
        cars: [],
      }

      personsDataArray.push(newPerson)

      return newPerson
    },
    addCar: (root, args) => {
      const { year, make, model, price, id, personID } = args;

      const person = find(personsDataArray, { id: personID });
      if (!person) {
        throw new Error(`Couldn't find person with id ${personID}`);
      }

      const newCar = {
        id: uuidv4(),
        year,
        make,
        model,
        price,
        personID,
      };

      person.cars.push(newCar);

      return newCar;
    },
    updateCar: (root, args) => {
      const { id, year, make, model, price } = args;
      const person = personsDataArray.find((person) => person.cars.some((car) => car.id === id));
      if (!person) {
        throw new Error(`Couldn't find car with id ${id}`);
      }

      const car = person.cars.find((car) => car.id === id);
      car.year = year;
      car.make = make;
      car.model = model;
      car.price = price;

      return car;
    },
    removePerson: (root, args) => {
      const removedPerson = find(personsDataArray, { id: args.id })
      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      remove(personsDataArray, c => {
        return c.id === removedPerson.id
      })

      return removedPerson
    },
      removeCar: (root, args) => {
        const { id, personID } = args;
    
        const person = find(personsDataArray, { id: personID });
        if (!person) {
          throw new Error(`Couldn't find person with id ${personID}`);
        }
    
        const carIndex = person.cars.findIndex((car) => car.id === id);
        if (carIndex === -1) {
          throw new Error(`Couldn't find car with id ${id}`);
        }
    
        const removedCar = person.cars[carIndex];
        person.cars.splice(carIndex, 1);
    
        return removedCar;
      },    
  }
}

export { typeDefs, resolvers }