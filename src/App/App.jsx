import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Particles from 'react-particles-js';

import Header from '../components/Header';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import api from '../utils/api.utils';
import { PARTICLE_OPTIONS } from '../utils/constants.utils';
import { getUserFromLocalStorage } from '../utils/functions.utils';
import 'tachyons';
import './App.css';

const INITIAL_USER_DATA = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: '',
};

const App = () => {
  const [state, setState] = useState({
    input: '',
    imageUrl: '',
  });

  const [user, setUser] = useState(INITIAL_USER_DATA);

  const [box, setBox] = useState({
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
    leftCol: 0,
  });

  const history = useHistory();
  const { input, imageUrl } = state;
  const { id, name, entries } = user;

  useEffect(() => {
    const loggedInUser = getUserFromLocalStorage();
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
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

  const onInputChange = (event) => {
    setState({ ...state, input: event.target.value });
  };

  const calculateFaceLocation = (response) => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox({ ...box });
  };

  const onImageDetect = () => {
    setState({ ...state, imageUrl: input });
    api
      .getImageBoundary({ input })
      .then((response) => {
        if (response.outputs) {
          api
            .updateImageCount({ id })
            .then((count) => setUser({ ...user, entries: Number(count) }));
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => {
        alert(err);
        window.alert('Unable to process your image. Please try a different image later!');
      });
  };

  return (
    <div className="App">
      <Particles className="particles" params={PARTICLE_OPTIONS} />
      <Header isUserSignedIn={!!user.id} />
      <Switch>
        <Route exact path="/">
          <Redirect to={user.id ? '/home' : '/signin'} />
        </Route>
        <Route path="/signin" render={() => <SignIn loadUser={loadUser} />} />
        <Route path="/register" render={() => <Register loadUser={loadUser} />} />
        <Route
          path="/home"
          render={() => (
            <Home
              name={name}
              entries={entries}
              imageUrl={imageUrl}
              box={box}
              onInputChange={onInputChange}
              onImageDetect={onImageDetect}
            />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
