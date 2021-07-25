import React, { Component } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class SignUp extends Component {

    handleSubmit = (values) => {

        if (values.firstName && values.email && values.password && values.password && values.confirm) {
            if (values.password !== values.confirm) {
                toast.error("Passwords do not match", {
                    position: toast.POSITION.TOP_CENTER
                });
            } else {
                //API to register user
                console.log(values)
                axios.post(`${process.env.REACT_APP_USER_API_URL}/register`, {
                    "email": values.email,
                    "username": values.email,
                    "firstName": values.firstName,
                    "secondName": values.lastName,
                    "password": values.password
                }).then(response => {
                    console.log(response.data)
                    if (response.data) {
                        toast.success("Register Success. Please Check your Entered Email for Completing Registration", {
                            position: toast.POSITION.TOP_CENTER
                        });
                    }
                })
                    .catch(err => {
                        toast.error("Could not register. Please try again or Contact Administrator", {
                            position: toast.POSITION.TOP_CENTER
                        });
                        console.log(err)
                    })
            }

        } else {

        }
    }
    render() {
        return (
            <>
                <Formik initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirm: ''
                }}
                    validate={values => {
                        const errors = {}

                        if (!values.firstName) {
                            errors.firstName = 'First Name is required'
                        }

                        if (!values.email) {
                            errors.email = 'Email is required'
                        } else {
                            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(values.email))) {
                                errors.email = 'Incorrect Email format'
                            }
                        }

                        if (!values.password) {
                            errors.password = 'Password is required'
                        }

                        if (!values.confirm) {
                            errors.confirm = 'Confirm Password'
                        }

                        return errors;

                    }}>
                    {({ values }) => {
                        return (

                            <Container>

                                <Card style={{ marginTop: 200 }} >
                                    <Row>
                                        <Col>
                                            <Card.Title><img style={{ width: 524, height: 124, objectFit: 'contain' }} src="https://storage.googleapis.com/gd-wagtail-prod-assets/original_images/evolving_google_identity_2x1.jpg" alt="google" /></Card.Title>
                                            <Card.Title style={{ paddingLeft: 60 }}>Create your Account</Card.Title>
                                            <Card.Text style={{ paddingLeft: 60 }}>to continue to Google Drive</Card.Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form autoComplete="false">
                                                <Row className="text-center">
                                                    <Col className="col-spacing">
                                                        <Field placeholder="First Name" type="text" name='firstName' value={values.firstName} />
                                                        <ErrorMessage name="firstName" component="div" className="error" />
                                                    </Col>
                                                    <Col className="col-spacing">
                                                        <Field placeholder="Last Name" type="text" name='lastName' value={values.lastName} />
                                                        <ErrorMessage name="lastName" component="div" className="error" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingLeft: 60 }}>
                                                    <Col className="col-spacing">
                                                        <Field style={{ width: '68%' }} placeholder="Email" type="email" name='email' value={values.email} />
                                                        <ErrorMessage name="email" component="div" className="error" />
                                                    </Col>
                                                </Row>
                                                <Row className="text-center">
                                                    <Col className="col-spacing">
                                                        <Field placeholder="Password" type="email" name='password' value={values.password} />
                                                        <ErrorMessage name="password" component="div" className="error" />
                                                    </Col>
                                                    <Col className="col-spacing">
                                                        <Field placeholder="confirm" type="email" name='confirm' value={values.confirm} />
                                                        <ErrorMessage name="confirm" component="div" className="error" />
                                                    </Col>
                                                </Row>
                                                <Row style={{ paddingLeft: 60 }}>
                                                    <Col className="col-spacing"><Link to='/login'>Sign In Instead</Link></Col>
                                                    <Col className="col-spacing">
                                                        <Button type="button" onClick={() => this.handleSubmit(values)}>Sign Up</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Col>
                                        <Col>
                                            <img style={{ width: '500px', height: '500px', objectFit: 'contain', marginTop: -120 }} src="https://ssl.gstatic.com/accounts/signup/glif/account.svg" alt="Sign Up" />
                                        </Col>
                                    </Row>
                                </Card>
                                <ToastContainer
                                    position="top-center"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop={false}
                                    closeOnClick
                                    rtl={false}
                                    pauseOnFocusLoss
                                    draggable
                                    pauseOnHover
                                />
                            </Container>

                        )
                    }}

                </Formik>
            </>
        )
    }
}
