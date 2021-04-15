import { useEffect, useState, useContext } from 'react';
import './App.css';
import AuthForm from './components/AuthForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Context as AuthContext } from './context/AuthContext';
// Components
import Home from './pages/Home';
import UserShow from './pages/UserShow';
// styles

import './stylesheets/Pages/home.scss';
import './stylesheets/Tweets/newTweetForm.scss';
import './stylesheets/Tweets/singleTweet.scss';
import './stylesheets/Users/form.scss';
import './stylesheets/Users/profile.scss';
import './stylesheets/master.scss';

function App() {
  const [auth, setAuth] = useState(false);
  const { tryLocalSignin } = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.token) {
      const login = async () => {
        await tryLocalSignin();
        setAuth(true);
      };
      login();
    }
  }, []);
  if (!auth) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AuthForm} />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users/:id" component={UserShow} />
      </Switch>
    </Router>
  );
}

export default App;
