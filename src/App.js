import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CreateProfile from './Components/CreateProfile/CreateProfile';
import ShowProfile from './Components/ShowProfile/ShowProfile';
import PausedProfile from './Components/PausedProfile/PausedProfile';
import Navigation from './Components/Navigation/Navigation';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation></Navigation>
        <Switch>
          <Route exact path='/'>
          <ShowProfile></ShowProfile>
          </Route>
          <Route exact path='/createProfile'>
            <CreateProfile></CreateProfile>
          </Route>
          <Route exact path='/showProfile'>
            <ShowProfile></ShowProfile>
          </Route>
          <Route exact path='/pausedProfile'>
            <PausedProfile></PausedProfile>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
