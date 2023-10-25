import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


function Header() {
    return (
        <div>
            <Navbar className="bg-primary">
                <Container>
                    <Navbar.Brand className="pb-2">
                        <a href="/">
                            <i class="fa-solid fa-people-group fa-bounce me-3 fa-2x" style={{ color: "#ffffff" }}></i>
                        </a>
                        <Link to={"/"}><span className="text-white">EMS Application</span></Link></Navbar.Brand>
                </Container>
            </Navbar>
        </div >
    )
}


export default Header