/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, NavLink, Row } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { LOGIN, store } from '../store';
import { Link, useHistory } from 'react-router-dom';



function ResetPassword(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [show, setShow] = useState(true);

    let history = useHistory();

    useEffect(() => {
        if (props.match.params.route === 'newPassword') {
            setShow(false)
        }
    }, [])

    const handleNext = () => {


        if (!username) {
            toast.error("Username or Email is Required", {
                position: toast.POSITION.TOP_CENTER
            });

        } else {
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(username))) {
                toast.error("Input should be in username@example.com", {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                //API to check user
                axios.post(`${process.env.REACT_APP_USER_API_URL}/resetPassword/checkUser`, {
                    "email": username
                }).then(response => {
                    if (response.data) {
                        toast.success(response.data.message, {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                    console.log(response.data)
                })
                    .catch(err => console.log(err))

            }

        }
    }

    const handleBack = () => {
        setShow(true);
        setUserName('')
        setPassword('')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!password || !confirm) {
            toast.error("Please enter a password to continue Reseting Password", {
                position: toast.POSITION.TOP_CENTER
            });
        } else if (password !== confirm) {
            toast.error("Passwords do not match", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            console.log(store.getState().token)
            axios.post(`${process.env.REACT_APP_USER_API_URL}/resetPassword/newPassword`, {
                "token": store.getState().token,
                "password": password
            }).then(response => {
                toast.success(response.data.messsage, {
                    position: toast.POSITION.TOP_CENTER
                })
                history.replace('/home');
            })
                .catch(err => {
                    let message = err.response.data.message
                    toast.error(message, {
                        position: toast.POSITION.TOP_CENTER
                    })
                    history.replace('/login');
                })
        }
    }

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>

                    <Card style={{ width: '38rem', height: '35rem', marginTop: 200 }} className="text-center">
                        <Card.Title><img style={{ width: 524, height: 124, objectFit: 'contain' }} src="https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_2x1.jpg" alt="google" /></Card.Title>
                        <Card.Title>Reset</Card.Title>
                        <Card.Text>to continue to Google Drive</Card.Text>
                        <form style={{}}>
                            {show && <TextField
                                required
                                id="username"
                                label="Email or Username"
                                variant="outlined"
                                type="email"
                                value={username}
                                style={{ width: '500px' }}
                                onChange={(event) => setUserName(event.target.value)}

                            />}
                            {!show && <div><TextField
                                required
                                id="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                style={{ width: '500px' }}
                                onChange={(event) => setPassword(event.target.value)}

                            />
                                <TextField
                                    required
                                    id="password"
                                    label="Confirm"
                                    variant="outlined"
                                    type="password"
                                    value={confirm}
                                    style={{ width: '500px', marginTop: 20 }}
                                    onChange={(event) => setConfirm(event.target.value)}

                                /></div>
                            }
                        </form>
                        <Card.Text>Not your computer? Use Guest mode to sign in privately.</Card.Text>
                        <Card.Body>
                            <div className="create-links ">
                                {show && <Button className="ms-2 me-2" type="submit" onClick={handleNext}>Next</Button>}
                                {!show && <Button className="ms-2 me-2" onClick={handleSubmit} type="submit">Reset Password</Button>}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col><ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                /></Col>
            </Row>
        </Container>
    )
}

export default ResetPassword;
