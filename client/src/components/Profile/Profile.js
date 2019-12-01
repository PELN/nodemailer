import React, { useState } from 'react';
import './Profile.css';
import SentEmails from './SentEmails';
import SendEmail from './SendEmail';
import { Button, Modal } from 'react-bootstrap';

export default function Profile() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
        <div className="profileContainer">
            <div className="left">
                <h2>Profile</h2>
                <div className="emailFormContainer">
                    <Button className="emailBtn" variant="primary" onClick={handleShow}>
                        Compose new email
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                            <SendEmail/>
                        </Modal.Body>

                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="right">
                <div className="sentEmailsContainer">
                    <SentEmails/>
                </div>
            </div>
        </div>  
    );
};

