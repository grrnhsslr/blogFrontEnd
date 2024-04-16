import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

type NavigationProps = {
    isLoggedIn: boolean
}

export default function Navigation({ isLoggedIn }:NavigationProps){
    console.log('Navigation component is being redn')

    const [backgroundTheme, setBackgroundTheme] = useState('dark');
   
    return (
        <Navbar data-bs-theme={backgroundTheme} bg={backgroundTheme} expand='lg'>
            <Container fluid>
                <Navbar.Brand href='/'>Kekambas Blog</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav className='me-auto'>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link href='/'>Create Post</Nav.Link>
                                <Nav.Link href='/'>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href='/'>Sign Up</Nav.Link>
                                <Nav.Link href='/'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                        <Button onClick={() => setBackgroundTheme(backgroundTheme === 'dark' ? 'light' : 'dark')} >Change Background</Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}