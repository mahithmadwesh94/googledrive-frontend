import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Nav, Navbar } from 'react-bootstrap';
import ProfileIcon from './ProfileIcon';
import AppsIcon from '@material-ui/icons/Apps';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SearchIcon from '@material-ui/icons/Search';
import TuneIcon from '@material-ui/icons/Tune';
import './Navbar.css';



function Header() {
    return (
        <div>
            <Navbar style={{ borderBottom: '.1px solid' }}>
                <Container fluid>
                    <Navbar.Brand href="#home"><img style={{ objectFit: 'contain', width: '50px', height: '50px', marginRight: 10 }} src="https://cdn1.iconfinder.com/data/icons/logotypes/32/google-drive-512.png" alt="" />Drive</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="d-flex">
                        <Nav className="ms-5 pe-5 ">
                            <div className="header-search">
                                <SearchIcon style={{ paddingTop: 10, width: 30, height: 30, color: 'black' }} />
                                <input type="text" placeholder="Search" style={{ width: '100%' }} />
                                <TuneIcon style={{ paddingTop: 10, width: 30, height: 30, cursor: 'pointer' }} />
                            </div>
                        </Nav>
                        <Nav className="ms-auto pe-5 ">
                            <Nav.Link href="#home" className="pt-3 "><HelpOutlineIcon /></Nav.Link>
                            <Nav.Link href="#home" className="pt-3 "><SettingsIcon /></Nav.Link>
                            <Nav.Link href="#home" className="pt-3 "><AppsIcon /></Nav.Link>
                            <ProfileIcon icon={<profilePic />} />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
