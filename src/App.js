import { useEffect, useState, useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Context as AuthContext } from './context/AuthContext';
// Components
import AuthForm from './components/AuthForm';
import Home from './pages/Home';
import UserShow from './pages/UserShow';
import LeftBar from './components/LeftBar';

// styles

import './stylesheets/pages/home.scss';
import './stylesheets/tweets/newTweetForm.scss';
import './stylesheets/tweets/singleTweet.scss';
import './stylesheets/users/form.scss';
import './stylesheets/users/profile.scss';
import './stylesheets/master.scss';

function App() {
  const [auth, setAuth] = useState(false);
  const { tryLocalSignin, logoutUser } = useContext(AuthContext);
  useEffect(() => {
    if (localStorage.token) {
      const login = async () => {
        await tryLocalSignin();
        setAuth(true);
      };
      login();
    }
  }, []);
  console.log('AUTH', auth);
  if (!auth) {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <AuthForm setAuth={() => setAuth(!auth)} />}
          />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <LeftBar
        logoutUser={() => {
          setAuth(false);
          logoutUser();
        }}
      />
      <div className="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/users/:id" component={UserShow} />
          <Route exact path="/profile" component={UserShow} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
