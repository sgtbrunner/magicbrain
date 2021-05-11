import React from 'react';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value.toLowerCase() });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      this.onRegisterSubmit();
    }
  };

  onRegisterSubmit = () => {
    if (this.state.name && this.state.email && this.state.password) {
      fetch('https://shielded-reaches-78464.herokuapp.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        }),
      })
        .then((response) => response.json())
        .then((user) => {
          if (user.id) {
            this.props.loadUser(user);
            this.props.onRouteChange('home'); //As Register is a class, it automatically receives props from App.js and (props) are accessed through this.props.
            window.alert(`User ${user.name} succesfully registered!`);
          } else {
            window.alert(user);
            this.props.clearFields();
          }
        });
    } else {
      window.alert('Name, Email and Password fields should be filled in!');
    }
  };

  render() {
    return (
      <article
        className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form smaller"
        onKeyPress={this.handleKeyPress}
      >
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0 noselect">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                  required
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
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
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
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
                value="Register"
                onClick={this.onRegisterSubmit}
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
