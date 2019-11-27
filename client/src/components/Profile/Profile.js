import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Profile.css';
import SentEmails from './SentEmails';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            html: '',
            responseToPost: {
                type: null,
                message: null
            }
        }
    }

    handleSubmit = async e => {
        e.preventDefault();

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
                console.log('Email has been sent');
                this.setState({responseToPost : {type: 'success', message: 'Your email was sent!'}})
                // this.props.history.push("/"); // Redirect
            } else if (response.status === 400) {
                response.json().then(function(object){
                    const errorMsg = object.message;
                    console.log(errorMsg);
                });
                this.setState({responseToPost : {type: 'error', message: 'Something went wrong. Please try again.'}})
            };
        });
    };


    render() {
        const { responseToPost, subject, message } = this.state;

        return(
            <div>
                <h2>Profile page</h2>
                <div className="emailFormContainer">
                    <h3>Send an email</h3>
                    <p className={responseToPost.type}>{responseToPost.message}</p>
                    <form onSubmit={this.handleSubmit} method="POST">
                        <Form.Group>
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Subject" value={subject} onChange={e => this.setState({subject: e.target.value })}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows="7" type="textarea" placeholder="Enter message" value={message} onChange={e => this.setState({message: e.target.value })}/>
                        </Form.Group>
                        <Button variant="primary" type="submit">Send email</Button>
                    </form>
                </div>

                <div className="sentEmailsContainer">
                    <SentEmails/>
                </div>
                
            </div>
            
        );
    };
}
