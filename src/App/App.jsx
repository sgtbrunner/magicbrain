import React, { useState } from 'react';
import Particles from 'react-particles-js';

import Navigation from '../components/Navigation';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import Register from '../pages/Register';
import api from '../utils/api.utils';
import PARTICLE_OPTIONS from '../utils/constants.utils';
import 'tachyons';
import './App.css';

const App = () => {
  const [state, setState] = useState({
    input: '',
    imageUrl: '',
    route: 'signin',
    signedIn: false,
  });

  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const [box, setBox] = useState({
    topRow: 0,
    rightCol: 0,
    bottomRow: 0,
    leftCol: 0,
  });

  const { input, imageUrl, route, signedIn } = state;
  const { id, name, entries } = user;

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: Number(data.entries),
      joined: data.joined,
    });
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

  const onRouteChange = (route) => {
    setState({ ...state, signedIn: route === 'home', route, imageUrl: '' });
  };

  const clearFields = () => {
    if (document.getElementById('name')) {
      document.getElementById('name').value = '';
    }
    document.getElementById('email-address').value = '';
    document.getElementById('password').value = '';
  };

  return (
    <div className="App">
      <Particles className="particles" params={PARTICLE_OPTIONS} />
      <Navigation onRouteChange={onRouteChange} signedIn={signedIn} />
      {route === 'home' && (
        <Home
          name={name}
          entries={entries}
          imageUrl={imageUrl}
          box={box}
          onInputChange={onInputChange}
          onImageDetect={onImageDetect}
        />
      )}
      {route === 'signin' && (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} clearFields={clearFields} />
      )}
      {route === 'register' && (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} clearFields={clearFields} />
      )}
    </div>
  );
};

export default App;
