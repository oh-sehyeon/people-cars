import find from 'lodash.find'
import remove from 'lodash.remove'
import { v4 as uuidv4 } from 'uuid';

const people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates'
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs'
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds'
  }
]

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personID: '1'
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personID: '1'
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personID: '1'
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personID: '2'
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personID: '2'
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personID: '2'
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personID: '3'
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personID: '3'
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personID: '3'
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

const pplCarDataArray = people.map(person => {
  const filteredCars = cars.filter(car => car.personID === person.id)
    .map(car => ({
      id: car.id,
      year: parseInt(car.year),
      make: car.make,
      model: car.model,
      price: parseInt(car.price),
      personID: car.personID
    }));

  return {
    id: person.id,
    firstName: person.firstName,
    lastName: person.lastName,
    cars: filteredCars
  };
});

const resolvers = {
  Query: {
    persons: () => pplCarDataArray,
    person: (parent, args) => {
      return find(pplCarDataArray, { id: args.id })
    },
    getPersonCars: (parent, { personID }) => {
      const person = find(pplCarDataArray, { id: personID });
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
      const person = find(pplCarDataArray, { id });
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

      pplCarDataArray.push(newPerson)

      return newPerson
    },
    addCar: (root, args) => {
      const { year, make, model, price, id, personID } = args;

      const person = find(pplCarDataArray, { id: personID });
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
      const person = pplCarDataArray.find((person) => person.cars.some((car) => car.id === id));
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
      const removedPerson = find(pplCarDataArray, { id: args.id })
      if (!removedPerson) {
        throw new Error(`Couldn't find person with id ${args.id}`)
      }

      remove(pplCarDataArray, c => {
        return c.id === removedPerson.id
      })

      return removedPerson
    },
      removeCar: (root, args) => {
        const { id, personID } = args;
    
        const person = find(pplCarDataArray, { id: personID });
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

export { typeDefs, resolvers, pplCarDataArray }