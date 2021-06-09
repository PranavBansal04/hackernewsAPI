import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Navbar, Button,Nav,Form,FormControl } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';


function App() {

  const handleClick = () => {
    // setLoader(true);
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((response) => {
        console.log(response.data.data);
        // setUserData(response.data.data);
        // setTimeout(function(){ setLoader(false); }, 500);

      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>
      </header>
      <Router>
        <div>
          <h2>Welcome to React Router Tutorial</h2>

          <hr />
          <Switch>
            {/* <Route exact path='/' component={Home} />
            <Route path='/contact' component={Contact} />
            <Route path='/about' component={About} /> */}
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
