import React from 'react';
import './Profile.css';

export default class SentEmails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emailList: [],
            isLoaded: false,
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
                    emailList: emails.emails,
                    isLoaded: true
            });
        });
        console.log(this.state.emailList);
    };

    render() {
        const { isLoaded, emailList } = this.state;
        
        if (!isLoaded) {
            return <div>Loading...</div>;
        } else {     
            return(
                <div className="emailContainer">
                    <h2>Sent emails</h2>
                    <div className="email">     
                        {emailList.map(email =>
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
        }
    };
};