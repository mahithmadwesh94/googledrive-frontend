import './App.css';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import Home from './components/Home';
import SignUp from './components/SignUp';
import VerifyUser from './components/VerifyUser';
import ResetPassword from './components/ResetPassword';


function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={SignUp} />
          <Route path='/verifyUser/:route/:token' component={VerifyUser} />
          <Route path='/resetPassword/:route' component={ResetPassword} />
          <Route path='/resetPassword/' component={ResetPassword} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
