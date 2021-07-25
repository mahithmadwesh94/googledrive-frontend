import React, { useEffect } from 'react';
import Header from '../components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import { store } from '../store';
import { useHistory } from 'react-router-dom'

function Home() {
    let history = useHistory();

    useEffect(() => {
        if (!store.getState().login && !store.getState().token) {
            history.push('/login')
        }
    }, [])


    return (
        <div>
            <Header />
            <Container>
                <Row>
                    <Col xs={1}></Col>
                    <Col>

                        <h1>
                            Main content and Application functionality will be here
                        </h1>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Home
