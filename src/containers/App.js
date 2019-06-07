import React, {Component} from 'react';
import Particles from 'react-particles-js';
import Navigation from '../components/js/Navigation';
import Rank from '../components/js/Rank';
import Logo from '../components/js/Logo';
import ImageLinkForm from '../components/js/ImageLinkForm';
import FaceRecognition from '../components/js/FaceRecognition';
import SignIn from '../components/js/SignIn';
import Register from '../components/js/Register';
import Clarifai from 'clarifai';
import 'tachyons';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'a9f14c51e25149479e18ee68eb3fa84b'
});

const particlesOptions = {
  particles: {
    number: {
      value:50,
      density: {
        enable:true,
        value_area:500,    
      }
    }
  }
}

class App extends Component {
  // STATE DECLARATION AND INITIALIZATION
  constructor() {
    super()
      this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        signedIn: false
    }
  }

  // TRIGGERED EVERYTIME INPUT CHANGES
  onInputChange = (event) => {
    // ** Set input to user value
      this.setState({input: event.target.value})
  }

  // Function used to calculate boundig box boundaries
  calculateFaceLocation = response => {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return ({
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
    });
  }

  displayFaceBox = box => {
    console.log(box);
    this.setState({box: box});
  }

  // TRIGGERED EVERYTIME BUTTON IS CLICKED
  // app.models.predit is an asynchronous Clarifai syntax
  onButtonClick = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err)); 
  }

  onRouteChange = (route) => {
    route==='home' ? this.setState({signedIn: true}) : this.setState({signedIn: false});
    this.setState({route: route});
  }

  render() {
  	return (
  	  	<div className="App">
  	  	    <Particles className='particles'
            		params={particlesOptions}
          	/>
  		    <Navigation onRouteChange={this.onRouteChange}
                      signedIn={this.state.signedIn}
          />
          { this.state.route === 'home' ?
              <div>
                <Rank />
                <Logo />
                <ImageLinkForm onInputChange={this.onInputChange} 
                                onButtonClick={this.onButtonClick}
                />
                <FaceRecognition imageUrl={this.state.imageUrl}
                                   box={this.state.box}
                />
              </div>  
    		      : this.state.route === 'signin' ?
                <SignIn onRouteChange={this.onRouteChange}/>
              : 
                <Register onRouteChange={this.onRouteChange}/>
          }
    		</div>            
    );
  }
}

export default App;
