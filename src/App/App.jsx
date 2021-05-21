import React, { useState } from 'react';
import Particles from 'react-particles-js';

import Navigation from '../components/Navigation';
import Rank from '../components/Rank';
import Logo from '../components/Logo';
import ImageLinkForm from '../components/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import 'tachyons';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500,
      },
    },
  },
};

const App = () => {
  const [state, setState] = useState({
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    signedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    },
  });

  const { input, imageUrl, box, route, signedIn, user } = state;

  const loadUser = (data) => {
    setState({
      ...state,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
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
    setState({ ...state, box });
  };

  const onImageDetect = () => {
    setState({ imageUrl: input });
    fetch('https://shielded-reaches-78464.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.outputs) {
          fetch('https://shielded-reaches-78464.herokuapp.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => setState({ ...state, user: { ...user, entries: count } }))
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => {
        window.alert('Please submit a valid image URL!');
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
      <Particles className="particles" params={particlesOptions} />
      <Navigation onRouteChange={onRouteChange} signedIn={signedIn} />
      {route === 'home' ? (
        <div>
          <Rank name={user.name} entries={user.entries} />
          <Logo />
          <ImageLinkForm onInputChange={onInputChange} onButtonClick={onImageDetect} />
          <FaceRecognition imageUrl={imageUrl} box={box} />
        </div>
      ) : route === 'signin' ? (
        <SignIn loadUser={loadUser} onRouteChange={onRouteChange} clearFields={clearFields} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} clearFields={clearFields} />
      )}
    </div>
  );
};

export default App;
