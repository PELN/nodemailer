import React from 'react';
import './Profile.css';
import SentEmails from './SentEmails';
import SendEmail from './SendEmail';

export default class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            message: 'Loading...'
        }
    }

    componentDidMount() {
        fetch('/profile')
            .then(res => res.text())
            .then(res => this.setState({message: res}));
    }

    render() {
        return(
            <div>
                <h2>Profile page</h2>
                <p>{this.state.message}</p>
                <div className="emailFormContainer">
                    <SendEmail/>
                </div>

                <div className="sentEmailsContainer">
                    <SentEmails/>
                </div>
            </div>  
        );
    };
}
