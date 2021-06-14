import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Particles from 'react-particles-js';

import Header from '../components/Header';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import { PARTICLE_OPTIONS } from '../utils/constants.utils';
import { getUserFromLocalStorage } from '../utils/functions.utils';
import 'tachyons';
import './App.css';

const INITIAL_USER_DATA = {
  id: 0,
  name: '',
  email: '',
  entries: 0,
  joined: '',
};

const App = () => {
  const [user, setUser] = useState(INITIAL_USER_DATA);

  const history = useHistory();

  useEffect(() => {
    const loggedInUser = getUserFromLocalStorage();
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser({ ...foundUser, entries: Number(foundUser.entries) });
      history.push('/home');
    }
  }, [history]);

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: Number(data.entries),
      joined: data.joined,
    });
    history.push('/home');
  };

  const clearUser = () => setUser(INITIAL_USER_DATA);

  const isUserSignedIn = !!user.id;

  return (
    <div className="App">
      <Particles className="particles" params={PARTICLE_OPTIONS} />
      <Header isUserSignedIn={isUserSignedIn} clearUser={clearUser} />
      <Switch>
        <Route exact path="/">
          <Redirect to={isUserSignedIn ? '/home' : '/signin'} />
        </Route>
        <Route path="/signin" render={() => <SignIn loadUser={loadUser} />} />
        <Route path="/register" render={() => <Register loadUser={loadUser} />} />
        <Route
          path="/home"
          render={() =>
            isUserSignedIn ? (
              <Home user={user} setUser={setUser} />
            ) : (
              <Redirect to={{ pathname: '/signin' }} />
            )
          }
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
