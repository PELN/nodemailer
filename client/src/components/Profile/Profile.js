import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import SentEmails from './SentEmails';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            html: '',
            responseToPost: ''
        }
    }

    handleSubmit = async e => {
        e.preventDefault();
        const subject = this.state.subject;
        const message = this.state.message;
        console.log(subject, message);

        await fetch('/emails/send', {
            method: 'POST',
            body: JSON.stringify({
                subject: this.state.subject, 
                message: this.state.message
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applicaton/json'
            }
        }).then((response) => {
            console.log(response);
            if (response.status === 200) {
                console.log('Email has been sent')
                // this.props.history.push("/"); // Redirect
            } else if (response.status === 400) {
                response.json().then(function(object){
                    const errorMsg = object.message;
                    console.log(errorMsg);
                    // this.setState({responseToPost: this.state.errorMsg});
                });
            };
        });
    };


    render() {
        return(
            <div>
                <h2>Profile page</h2>
                <h3>Send an email</h3>
                <p>{this.state.responseToPost}</p>
                <form onSubmit={this.handleSubmit} method="POST">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Subject</Form.Label>
                        <Form.Control type="text" placeholder="Subject" value={this.state.subject} onChange={e => this.setState({subject: e.target.value })}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Message</Form.Label>
                        <Form.Control type="text" placeholder="Enter message" value={this.state.message} onChange={e => this.setState({message: e.target.value })}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Send email</Button>
                </form>

                <SentEmails/>
            </div>
            
        );
    };
}
