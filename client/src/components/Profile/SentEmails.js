import React from 'react';
import './Profile.css';

export default class SentEmails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailList: []
        };
    };

    async componentDidMount() {
        await fetch('/emails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'applicaton/json'
            }
        })
        .then(response => response.json())
        .then(
            (emails) => { 
                this.setState({
                    emailList: emails.emails
            });
        });
        console.log(this.state.emailList);
    };

    render() {
        
        return(
            <div className="emailContainer">
                <h2>Sent emails</h2>
                <div className="email">     
                    {this.state.emailList.map(email =>
                        <div>
                            <hr/>
                            <h5>Subject: {email.subject}</h5>
                            <p>To: {email.to}</p>
                            <p>From: {email.from}</p>
                            <p className="messageBox">Message:<br/> {email.html}</p>
                        </div>
                    )}
                </div> 
            </div>
        );
    };
};