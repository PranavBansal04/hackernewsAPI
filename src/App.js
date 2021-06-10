
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import PostDetails from './components/PostDetails';
import Home from './components/Home'

function App() {

  return (
    <div className="App">
      
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/post/:id' component={PostDetails} />
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
