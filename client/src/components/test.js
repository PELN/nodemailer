import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.css';
// import axios from 'axios';

export default class Login extends React.Component {
// THIS WORKS??!??!!? WITH GETTING USERS/LOGIN
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    };
    
    componentDidMount() {
        this.callApi()
          .then(res => this.setState({ response: res.express }))
          .catch(err => console.log(err));
      }
      
      callApi = async () => {
        const response = await fetch('/users/login/');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        
        return body;
      };
      
      handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/users/login/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.state.email, password: this.state.password }),
        });
        // const body = await response.text();
        
        // this.setState({ responseToPost: body });
      };

    render() {

    return(
        
        // <div className="form-container">
        //     <form onSubmit={this.submitHandler}>
        //         <input type="email" id="email" value={this.state.email} onChange={e => this.setState({email: e.target.value })}/>
        //         <input type="password" id="password" value={this.state.password} onChange={e => this.setState({password: e.target.value })}/>
        //         <button type="submit">Login</button>
        //     </form>
        // </div>
        
        // <React.Fragment>
        // <p>{this.state.response}</p>
        // <div className="form-container">
        //     <h2>Login</h2>
        //     <form onSubmit={this.handleSubmit} method="POST">
        //         <Form.Group controlId="formBasicEmail">
        //             <Form.Label>Email address</Form.Label>
        //             <Form.Control type="email" placeholder="Enter email"/>
        //         </Form.Group>
        //         <Form.Group controlId="formBasicPassword">
        //             <Form.Label>Password</Form.Label>
        //             <Form.Control type="password" placeholder="Password"/>
        //         </Form.Group>
        //         <Button variant="primary" type="submit">Login</Button>
        //     </form>
        //     <p>Don't have an account? <button type="button">Sign up</button></p>
        // </div>
        // </React.Fragment>

        // <div>
        //     <p>{this.state.response}</p>
        //     <form onSubmit={this.handleSubmit}>
        //     <p>
        //         <strong>Post to Server:</strong>
        //     </p>
        //     <input
        //         type="text"
        //         value={this.state.post}
        //         onChange={e => this.setState({ post: e.target.value })}
        //     />
        //     <button type="submit">Submit</button>
        //     </form>
        //     <p>{this.state.responseToPost}</p>
        // </div>

    );
};
}





// ************ output json obj sent emails ****************
// import React from 'react';
// // import './Profile.css';

// export default class SentEmails extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             emails: {}
//         }
//     }

//     componentDidMount() {
//         fetch('/emails', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         })
//             .then(response => response.json())
//             .then(emails => this.setState(emails));
//             console.log(this.state.emails);
//     };

//     render() {

//         return(
//             <div>
//                 <h2>Sent emails</h2>
//                 {JSON.stringify(this.state.emails)}
//             </div>
           
//         );
//     };
// };








// import React from 'react';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { Redirect } from 'react-router-dom';
// // import decode from 'jwt-decode';
// import './Login.css';

// export default class Login extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             email: '',
//             password: '',
//             responseToPost: ''
//         }
//     }

//     handleSubmit = async e => {
//         e.preventDefault();
//         const email = this.state.email;
//         const password = this.state.password;
//         console.log(email, password);

//         await fetch('/users/login', {
//             method: 'POST',
//             body: JSON.stringify({
//                 email: this.state.email, 
//                 password: this.state.password
//             }),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then((response) => {
//             console.log(response);
//             if (response.status === 200) {
//                 console.log('you have been logged in')
//                 // set token 
//                 console.log(response.headers.get('auth-token'));
//                 let token = response.headers.get('auth-token');
//                 localStorage.setItem('auth-token', token);
//                 // this.setState();
//                 // this.props.history.push("/profile"); // Redirect
//             } else if (response.status === 401) {
//                 response.json().then(function(object){
//                     const errorMsg = object.message;
//                     console.log(errorMsg);
//                     // this.setState({responseToPost: this.state.errorMsg});
//                 });
//             };
//         });
//     };

//     isAuthenticated() {
//         let token = localStorage.getItem('auth-token');
//         return token && token.length > 10;
//     }

//     render() {
//         const isAlreadyAuthenticated = this.isAuthenticated();
//         return(
//             <div>
//                 {isAlreadyAuthenticated ? <Redirect to={{pathname: '/profile'}}/> : (
                
//                 <div>
//                 <h2>Login</h2>
//                 <p>{this.state.responseToPost}</p>
//                 <form onSubmit={this.handleSubmit} method="POST">
//                     <Form.Group controlId="formBasicEmail">
//                         <Form.Label>Email address</Form.Label>
//                         <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={e => this.setState({email: e.target.value })}/>
//                     </Form.Group>
//                     <Form.Group controlId="formBasicPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control type="password" placeholder="Enter password" value={this.state.password} onChange={e => this.setState({password: e.target.value })}/>
//                     </Form.Group>
//                     <Button variant="primary" type="submit">Login</Button>
//                 </form>
//                 <p>Don't have an account? <a href="/signup">Sign up now</a></p>
//                 </div>
//                 )}
                
//             </div>
//         );
//     };
// }
