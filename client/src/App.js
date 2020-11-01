import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './containers/landing';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import Home from './containers/home';
import DebateDetails from './components/debateDetails'
import { ProtectedRoute } from './containers/protectedRoute'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Landing}/>
          <ProtectedRoute path='/home' component={Home}/>
          <ProtectedRoute path='/debates/:id' component={DebateDetails}/>
          <Route path='*' component={() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
