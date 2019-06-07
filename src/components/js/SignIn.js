import React from 'react';

const SignIn = ({onRouteChange}) => {
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form smaller">
        <main className="pa4 black-80">
            <div className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                  <legend className="f1 fw6 ph0 mh0 noselect">Sign In</legend>
                    <div className="mt3">
                      <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                      <input 
                        className="pa2 input-reset ba bg-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                         />
                    </div>
                    <div className="mv3">
                      <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                      <input 
                        className="pa2 input-reset ba bg-white w-100" 
                        type="password" 
                        name="password"  
                        id="password" 
                        />
                    </div>
                </fieldset>
                  <div className="">
                    <input
                      className="b ph3 pv2 input-reset ba b--black bg-lightest-blue grow pointer f6 dib" 
                      type="submit" 
                      value="Sign in"
                      onClick={() => onRouteChange('home')}
                    />
                  </div>
                  <div className="lh-copy mt3">
                    <p className="f5 link dim black db pointer"
                       onClick={() => onRouteChange('register')}
                    >
                      Register now, it's free!
                    </p>
                  </div>
            </div>
          </main>
    </article>
  );
}

export default SignIn;