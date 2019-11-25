import React from 'react';

export default class SentEmails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailList: [],
            subject: ''
        }
    }

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
                    emailList: emails.emails,
                    subject: emails.emails[0].subject
            });
        });
        console.log(this.state.emailList);
        console.log('subject', this.state.subject);
    };

    render() {
        
        return(
            <div className="emailContainer">
                <h2>Sent emails</h2>               
                {this.state.emailList.map(email =>
                    <div>
                        <hr/>
                        <h5>Subject: {email.subject}</h5>
                        <p>To: {email.to}</p>
                        <p>From: {email.from}</p>
                        <p>Message:<br/> {email.html}</p>
                    </div>
                )}
            </div>
           
        );
    };
};