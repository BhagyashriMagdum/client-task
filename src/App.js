
// import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EventEdit from './EventEdit';
import EventList from './EventList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={EventList}></Route>
            <Route path="/edit/:eventid" component={EventEdit}></Route>
          </Switch>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
