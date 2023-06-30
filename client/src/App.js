import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Title from './components/layout/Title';
import AddPersonSecTitle from './components/layout/AddPersonSecTitle';
import AddPerson from './components/forms/AddPerson';
import Persons from './components/lists/Persons';
import AddCarSecTitle from './components/layout/AddCarSecTitle';
import AddCar from './components/forms/AddCar';
import RecordSecTitle from './components/layout/RecodSecTitle';
import ShowPage from './components/page/ShowPage';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Title />
              <AddPersonSecTitle />
              <AddPerson />
              <AddCarSecTitle />
              <AddCar />
              <RecordSecTitle />
              <Persons />
            </>
          } />
          <Route path="/people/:personID" element={<ShowPage />} />
        </Routes>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;