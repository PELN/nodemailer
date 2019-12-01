// import React from 'react';
// import GoogleLogin from 'react-google-login';
// import config from '../../config';
// import Profile from '../Profile/Profile';

// export default class LoginGoogle extends React.Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             isAuthenticated: false,
//             userID: '',
//             name: '',
//             email: '',
//             picture: '',
//             tokenId: ''
//         };
//     };

//     responseGoogle = response => {
//         console.log(response);
//         this.setState({
//             isLoggedIn: true,
//             userID: response.profileObj.googleId,
//             name: response.profileObj.givenName,
//             email: response.profileObj.email,
//             picture: response.profileObj.imageUrl,
//             tokenId: response.Zi.id_token
//         });
//         const id_token = this.state.tokenId;
//         localStorage.setItem('token', id_token);
//     };

//     onFailure = response => {
//         console.log(response);
//     };
   
//     render() {
//         let googleContent;  
//         if(this.state.isLoggedIn) {
//             googleContent = (
//                 <div className="profileContainer">
//                      <div className="profileinfo">
//                          <img src={this.state.picture} alt={this.state.name}/>
//                          <h2>Welcome, {this.state.name}</h2>
//                          <h5>With the email: {this.state.email}</h5>
//                      </div>
//                     <Profile/>
//                 </div>
//             );
//         } else {
//             googleContent = (
//                 <GoogleLogin
//                     clientId={config.GOOGLE_CLIENT_ID}
//                     buttonText="Login"
//                     onSuccess={this.responseGoogle}
//                     onFailure={this.onFailure}
//                     cookiePolicy={'single_host_origin'}
//                 />
//             );
//         };

//         return(
//            <div className="GoogleContainer">
//                {googleContent}
//            </div>
//         );
//     };
// };
