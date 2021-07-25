import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Container, NavLink, Row } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { LOGIN, store } from '../store';
import { Link, useHistory } from 'react-router-dom';



function Login(props) {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [show, setShow] = useState(true);

    let history = useHistory();

    useEffect(() => {
        if (store.token && store.login)
            history.replace('/')
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
                setShow(false)
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
        if (!password) {
            toast.error("Please enter a password to continue Signing In", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            axios.post(`${process.env.REACT_APP_USER_API_URL}/login`, {
                "email": username,
                "password": password
            }).then(response => {
                console.log(response.data)
                store.dispatch({ type: LOGIN, token: response.data.token, firstName: response.data.firstName, lastName: response.data.lastName })
                if (store.getState().token && store.getState().login) {
                    history.replace('/');
                    setShow(true);
                    setUserName('')
                    setPassword('')
                }

            })
                .catch(err =>

                    toast.error(err.response.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    }))
        }
    }

    return (
        <Container>
            <Row>
                <Col></Col>
                <Col>

                    <Card style={{ width: '38rem', height: '29rem', marginTop: 200 }} className="text-center">
                        <Card.Title><img style={{ width: 524, height: 124, objectFit: 'contain' }} src="https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_2x1.jpg" alt="google" /></Card.Title>
                        <Card.Title>Sign In</Card.Title>
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
                            {!show && <TextField
                                required
                                id="password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                value={password}
                                style={{ width: '500px' }}
                                onChange={(event) => setPassword(event.target.value)}

                            />}
                            <Link to='/resetPassword' className="text-start" style={{ paddingLeft: 60, color: 'darkblue', cursor: 'pointer' }}>Forgot password?</Link>
                        </form>
                        <Card.Text>Not your computer? Use Guest mode to sign in privately.</Card.Text>
                        <Card.Body>
                            <div className="create-links">
                                {show && <Link to='/register'>Create Account</Link>}
                                {!show && <NavLink onClick={handleBack}>Back</NavLink>}
                                {show && <Button className="ms-2 me-2" type="submit" onClick={handleNext}>Next</Button>}
                                {!show && <Button className="ms-2 me-2" onClick={handleSubmit} type="submit">Sign In</Button>}
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

export default Login
