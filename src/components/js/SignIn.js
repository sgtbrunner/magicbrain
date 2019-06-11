import React from 'react';

class SignIn extends React.Component {
  constructor() {
    super()
      this.state = {
        signInEmail: '',
        signInPassword: ''
      }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value.toLowerCase()});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.onSignInSubmit();
    }
  }

  onSignInSubmit = () => {
    if(this.state.signInEmail && this.state.signInPassword) {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "email": this.state.signInEmail,
          "password": this.state.signInPassword
        })
      })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user);
          this.props.onRouteChange('home'); //As Register is a class, it automatically receives props from App.js and (props) are accessed through this.props.
        } else {
          window.alert('Invalid user and/or password');
          this.props.clearFields();
        }
      });
    } else {
      window.alert ('Email and Password fields should be filled in');
    }
  }

  render() {
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form smaller"
               onKeyPress={this.handleKeyPress} 
      >
          <main className="pa4 black-80">
              <div className="measure">
                  <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0 noselect">Sign In</legend>
                      <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                          className="pa2 input-reset ba bg-white w-100" 
                          type="email" 
                          name="email-address"  
                          id="email-address"
                          onChange={this.onEmailChange}
                          required
                        />
                      </div>
                      <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                          className="pa2 input-reset ba bg-white w-100" 
                          type="password" 
                          name="password"  
                          id="password"
                          onChange={this.onPasswordChange}
                          required 
                        />
                      </div>
                  </fieldset>
                    <div className="">
                      <input
                        className="b ph3 pv2 input-reset ba b--black bg-lightest-blue grow pointer f6 dib" 
                        type="submit" 
                        value="Sign in"
                        onClick={this.onSignInSubmit}                 
                      />
                    </div>
                    <div className="lh-copy mt3">
                      <p className="f5 link dim black db pointer"
                         onClick={() => this.props.onRouteChange('register')} //As SignIn is a class, it automatically 
                         // receives props from App.js and (props) are accessed through this.props.
                      >
                        Register now, it's free!
                      </p>
                    </div>
              </div>
            </main>
      </article>
    );
  }
}

export default SignIn;