import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from 'react';
import './LoginPage.css';
import { BACKEND_URL } from '../backendConfig';
import { Link, useNavigate } from "react-router-dom";


function LoginPage(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isInputInvalid, setInputInvalid] = useState(false);
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (props.isUserLoggedIn) {
            navigate(props.redirectUrl ? props.redirectUrl : "/");
        }
    }, [props])


    const postAuthenticationRequest = async (user) => {
        const response = await fetch(`${BACKEND_URL}/auth/authenticate`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),

            mode: 'cors',
        });
        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('JWT_TOKEN', data.token);
            return data.token;
        }
        else if (response.status === 403) {
            throw new Error("Invalid email/password");
        }
        else {
            throw new Error("There was an error.Please try again.");
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setInputInvalid(false);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setInputInvalid(false);
    }

    const handleLoginSubmit = (event) => {

        event.preventDefault();

        if (!email || !password || email.trim() === '' || password === '') {
            setInputInvalid(true);
            return;
        }

        //send an authentication request to backend
        const user = {
            email,
            password
        };

        //After login - I need to fetch the user
        postAuthenticationRequest(user).then(() => props.handleAuthentication(true)
        ).catch((err) => {
            setShowErrAlert(true);
            setErrMsg(err.message);
            props.handleAuthentication(false)
        });
    }

    return (
        <Container>
            <Row className='row-login-form m-3'>
                <Card className='shadow'>
                    <Card.Title className='text-center m-3'>Welcome to the Discussion Platform. Please Login</Card.Title>
                    <Form className='login-form p-3' onSubmit={handleLoginSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                        </Form.Group>
                        {showErrAlert && <Alert className='w-25 m-auto mb-3' variant="danger" onClose={() => setShowErrAlert(false)} dismissible>
                            <p>
                                {errMsg}
                            </p>
                        </Alert>}
                                <Row className='mb-2'>
                                    <Button className='w-75 m-auto dark-bg light-txt-color btn-hover-dark'  type="submit">
                                        Login
                                    </Button>
                                </Row>
                                <Row className='mb-2'>
                                    <Link to="/signup" className='link-signup p-0'>
                                        <Button className='w-75 m-auto dark-bg light-txt-color btn-hover-dark' type="submit">
                                            Create Account
                                        </Button>
                                    </Link>

                                </Row>
                            </Form>
                        </Card>
            </Row>
                </Container>
                );
}

                export default LoginPage;