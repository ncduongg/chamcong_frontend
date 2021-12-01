import AdminLayout from 'layouts/Admin';
import HomeLayouts from 'layouts/Home';
import { Redirect, Route, Switch } from 'react-router';
import './App.css';
function App() {
  return (
    <>
      <Switch>
        <Redirect from="/" to="/Home" exact />
        <Route path='/Home' component={HomeLayouts} />
        <Route path="/Admin" component={AdminLayout} />
      </Switch>
    </>
  );
}

export default App;
