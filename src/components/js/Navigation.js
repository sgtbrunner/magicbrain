import React from 'react';
import '../css/Navigation.css';

const Navigation = ({onRouteChange, signedIn}) => {
	if(!signedIn){
		return (
			<nav className="navigation-bar">
				<p className ="f4 link dim black underline pa3 pointer noselect"
				   onClick={() => onRouteChange('signin')}
				   >Sign In
				</p>			
				<p className ="f4 link dim black underline pa3 pointer noselect"
				   onClick={() => onRouteChange('register')}
				   >Register
				</p>
			</nav>			
		)
	} else {
		return (
			<nav className="navigation-bar">
				<p className ="f4 link dim black underline pa3 pointer noselect"
				   onClick={() => onRouteChange('signin')}
				   >Sign Out
				</p>
			</nav>		
		)
	}
}

export default Navigation;