import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/navigation.component';
import Rank from '../components/Rank/rank.component';
import Logo from '../components/Logo/logo.component';
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

class App extends Component {
  // STATE DECLARATION AND INITIALIZATION
  constructor() {
    super();
    this.state = {
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
    };
  }

  // CALLED EVERYTIME A USER LOGS IN
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  // TRIGGERED EVERYTIME INPUT CHANGES
  onInputChange = (event) => {
    // ** Set input to user value
    this.setState({ input: event.target.value });
  };

  // Function used to calculate boundig box boundaries
  calculateFaceLocation = (response) => {
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

  displayFaceBox = (box) => {
    this.setState({ box });
  };

  // TRIGGERED EVERYTIME DETECT BUTTON IS CLICKED
  // app.models.predit is an asynchronous Clarifai syntax
  onImageDetect = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://shielded-reaches-78464.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.outputs) {
          fetch('https://shielded-reaches-78464.herokuapp.com/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => this.setState(Object.assign(this.state.user, { entries: count })))
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => {
        window.alert('Please submit a valid image URL!');
      });
  };

  onRouteChange = (route) => {
    route === 'home' ? this.setState({ signedIn: true }) : this.setState({ signedIn: false });
    this.setState({ route });
    this.setState({ imageUrl: '' });
  };

  clearFields = () => {
    if (document.getElementById('name')) {
      document.getElementById('name').value = '';
    }
    document.getElementById('email-address').value = '';
    document.getElementById('password').value = '';
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} signedIn={this.state.signedIn} />
        {this.state.route === 'home' ? (
          <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <Logo />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onImageDetect} />
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
          </div>
        ) : this.state.route === 'signin' ? (
          <SignIn
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            clearFields={this.clearFields}
          />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
            clearFields={this.clearFields}
          />
        )}
      </div>
    );
  }
}

export default App;
