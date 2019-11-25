import React from 'react';
// import './Profile.css';

export default class SentEmails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            emails: []
        }
    }

    componentDidMount() {
        fetch('/emails', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(emails => this.setState(emails));
        console.log(this.state.emails);

    };

    render() {

        return(
            <div>
                <h2>Sent emails</h2>

            </div>
            // <div>
            //     <h3>Sent emails</h3>
            //     {this.state.emails.map((email) => {
            //         return (
                    
            //         )
            //     })}
            // </div>
        );
    };
};