(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,,function(e,t,a){e.exports=a.p+"static/media/brain.7467e8cb.png"},function(e,t,a){e.exports=a(24)},,,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(6),r=a.n(i),l=(a(17),a(1)),o=a(2),c=a(4),m=a(3),d=a(5),u=a(8),h=a.n(u),p=(a(18),function(e){var t=e.onRouteChange;return e.signedIn?s.a.createElement("nav",{className:"navigation-bar"},s.a.createElement("p",{className:"f4 link dim black underline pa3 pointer noselect",onClick:function(){return t("signin")}},"Sign Out")):s.a.createElement("nav",{className:"navigation-bar"},s.a.createElement("p",{className:"f4 link dim black underline pa3 pointer noselect",onClick:function(){return t("signin")}},"Sign In"),s.a.createElement("p",{className:"f4 link dim black underline pa3 pointer noselect",onClick:function(){return t("register")}},"Register"))}),g=function(e){var t=e.name,a=e.entries;return s.a.createElement("div",null,s.a.createElement("div",{className:"white f4"},"Hello ".concat(t,", your current entry count is...")),s.a.createElement("div",{className:"white f2"},a))},b=a(9),f=a.n(b),w=a(10),E=a.n(w),v=(a(19),function(){return s.a.createElement("div",{className:"ma4 mt0 tiltbox centered"},s.a.createElement(f.a,{className:"Tilt shadow-2",options:{max:100},style:{height:130,width:130}},s.a.createElement("div",{className:"Tilt-inner pa4 tiltbox"},s.a.createElement("img",{className:"noselect",src:E.a,alt:"logo"}))))}),N=(a(20),function(e){var t=e.onInputChange,a=e.onButtonClick;return s.a.createElement("div",null,s.a.createElement("p",{className:"f3 smaller"},"The ",s.a.createElement("b",null,"MagicBrain")," will detect faces in your pictures. Give it a try!"),s.a.createElement("div",{className:"centered smaller"},s.a.createElement("div",{className:"pa4 br3 custom-shadow-w form centered smaller"},s.a.createElement("input",{className:"f4 pa2 w-70 centered ba",type:"text",placeholder:"enter the image URL here",onChange:t}),s.a.createElement("button",{className:"w-30 f4 link ph3 pv2 dib light bg-light-purple noselect",onClick:a},"Detect"))))}),y=(a(21),function(e){var t=e.imageUrl,a=e.box;return s.a.createElement("div",{className:"centered ma"},s.a.createElement("div",{className:"absolute mt2"},s.a.createElement("img",{id:"inputimage",alt:"",src:t,width:"500px",heigh:"auto"}),s.a.createElement("div",{className:"bounding-box",style:{top:a.topRow,right:a.rightCol,bottom:a.bottomRow,left:a.leftCol}})))}),C=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).onEmailChange=function(t){e.setState({signInEmail:t.target.value.toLowerCase()})},e.onPasswordChange=function(t){e.setState({signInPassword:t.target.value})},e.handleKeyPress=function(t){"Enter"===t.key&&e.onSignInSubmit()},e.onSignInSubmit=function(){e.state.signInEmail&&e.state.signInPassword?fetch("https://shielded-reaches-78464.herokuapp.com/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e.state.signInEmail,password:e.state.signInPassword})}).then(function(e){return e.json()}).then(function(t){t.id?(e.props.loadUser(t),e.props.onRouteChange("home")):(window.alert("Invalid user and/or password"),e.props.clearFields())}):window.alert("Email and Password fields should be filled in")},e.state={signInEmail:"",signInPassword:""},e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return s.a.createElement("article",{className:"br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form smaller",onKeyPress:this.handleKeyPress},s.a.createElement("main",{className:"pa4 black-80"},s.a.createElement("div",{className:"measure"},s.a.createElement("fieldset",{id:"sign_in",className:"ba b--transparent ph0 mh0"},s.a.createElement("legend",{className:"f2 fw6 ph0 mh0 noselect"},"Sign In"),s.a.createElement("div",{className:"mt3"},s.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"email-address"},"Email"),s.a.createElement("input",{className:"pa2 input-reset ba bg-white w-100",type:"email",name:"email-address",id:"email-address",onChange:this.onEmailChange,required:!0})),s.a.createElement("div",{className:"mv3"},s.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"password"},"Password"),s.a.createElement("input",{className:"pa2 input-reset ba bg-white w-100",type:"password",name:"password",id:"password",onChange:this.onPasswordChange,required:!0}))),s.a.createElement("div",{className:""},s.a.createElement("input",{className:"b ph3 pv2 input-reset ba b--black bg-lightest-blue grow pointer f6 dib",type:"submit",value:"Sign in",onClick:this.onSignInSubmit})),s.a.createElement("div",{className:"lh-copy mt3"},s.a.createElement("p",{className:"f5 link dim black db pointer",onClick:function(){return e.props.onRouteChange("register")}},"Register now, it's free!")))))}}]),t}(s.a.Component),k=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).onNameChange=function(t){e.setState({name:t.target.value})},e.onEmailChange=function(t){e.setState({email:t.target.value.toLowerCase()})},e.onPasswordChange=function(t){e.setState({password:t.target.value})},e.handleKeyPress=function(t){"Enter"===t.key&&e.onRegisterSubmit()},e.onRegisterSubmit=function(){e.state.name&&e.state.email&&e.state.password?fetch("https://shielded-reaches-78464.herokuapp.com/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e.state.name,email:e.state.email,password:e.state.password})}).then(function(e){return e.json()}).then(function(t){t.id?(e.props.loadUser(t),e.props.onRouteChange("home"),window.alert("User ".concat(t.name," succesfully registered!"))):(window.alert(t),e.props.clearFields())}):window.alert("Name, Email and Password fields should be filled in!")},e.state={name:"",email:"",password:""},e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("article",{className:"br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center form smaller",onKeyPress:this.handleKeyPress},s.a.createElement("main",{className:"pa4 black-80"},s.a.createElement("div",{className:"measure"},s.a.createElement("fieldset",{id:"sign_up",className:"ba b--transparent ph0 mh0"},s.a.createElement("legend",{className:"f2 fw6 ph0 mh0 noselect"},"Register"),s.a.createElement("div",{className:"mt3"},s.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"email-address"},"Name"),s.a.createElement("input",{className:"pa2 input-reset ba bg-white w-100",type:"text",name:"name",id:"name",onChange:this.onNameChange,required:!0})),s.a.createElement("div",{className:"mt3"},s.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"email-address"},"Email"),s.a.createElement("input",{className:"pa2 input-reset ba bg-white w-100",type:"email",name:"email-address",id:"email-address",onChange:this.onEmailChange,required:!0})),s.a.createElement("div",{className:"mv3"},s.a.createElement("label",{className:"db fw6 lh-copy f6",htmlFor:"password"},"Password"),s.a.createElement("input",{className:"pa2 input-reset ba bg-white w-100",type:"password",name:"password",id:"password",onChange:this.onPasswordChange,required:!0}))),s.a.createElement("div",{className:""},s.a.createElement("input",{className:"b ph3 pv2 input-reset ba b--black bg-lightest-blue grow pointer f6 dib",type:"submit",value:"Register",onClick:this.onRegisterSubmit})))))}}]),t}(s.a.Component),S=(a(22),a(23),{particles:{number:{value:50,density:{enable:!0,value_area:500}}}}),I=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(c.a)(this,Object(m.a)(t).call(this))).loadUser=function(t){e.setState({user:{id:t.id,name:t.name,email:t.email,entries:t.entries,joined:t.joined}})},e.onInputChange=function(t){e.setState({input:t.target.value})},e.calculateFaceLocation=function(e){var t=e.outputs[0].data.regions[0].region_info.bounding_box,a=document.getElementById("inputimage"),n=Number(a.width),s=Number(a.height);return{leftCol:t.left_col*n,topRow:t.top_row*s,rightCol:n-t.right_col*n,bottomRow:s-t.bottom_row*s}},e.displayFaceBox=function(t){e.setState({box:t})},e.onImageDetect=function(){e.setState({imageUrl:e.state.input}),fetch("https://shielded-reaches-78464.herokuapp.com/imageurl",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({input:e.state.input})}).then(function(e){return e.json()}).then(function(t){t&&fetch("https://shielded-reaches-78464.herokuapp.com/image",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:e.state.user.id})}).then(function(e){return e.json()}).then(function(t){return e.setState(Object.assign(e.state.user,{entries:t}))}).catch(console.log),e.displayFaceBox(e.calculateFaceLocation(t))}).catch(function(e){window.alert("Please submit a valid image URL!")})},e.onRouteChange=function(t){"home"===t?e.setState({signedIn:!0}):e.setState({signedIn:!1}),e.setState({route:t}),e.setState({imageUrl:""})},e.clearFields=function(){document.getElementById("name")&&(document.getElementById("name").value=""),document.getElementById("email-address").value="",document.getElementById("password").value=""},e.state={input:"",imageUrl:"",box:{},route:"signin",signedIn:!1,user:{id:"",name:"",email:"",entries:0,joined:""}},e}return Object(d.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(h.a,{className:"particles",params:S}),s.a.createElement(p,{onRouteChange:this.onRouteChange,signedIn:this.state.signedIn}),"home"===this.state.route?s.a.createElement("div",null,s.a.createElement(g,{name:this.state.user.name,entries:this.state.user.entries}),s.a.createElement(v,null),s.a.createElement(N,{onInputChange:this.onInputChange,onButtonClick:this.onImageDetect}),s.a.createElement(y,{imageUrl:this.state.imageUrl,box:this.state.box})):"signin"===this.state.route?s.a.createElement(C,{loadUser:this.loadUser,onRouteChange:this.onRouteChange,clearFields:this.clearFields,handleKeyPress:this.handleKeyPress}):s.a.createElement(k,{loadUser:this.loadUser,onRouteChange:this.onRouteChange,clearFields:this.clearFields,handleKeyPress:this.handleKeyPress}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[11,1,2]]]);
//# sourceMappingURL=main.fb31f918.chunk.js.map