import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from "react-router-dom";
import { fetchUserBasedOnJWT, postAuthenticationRequest } from '../Utils';
import { login } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

function LoginPage(props) {
    console.log("RENDERING LOGIN PAGE");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (props.isUserLoggedIn) {
            navigate(props.redirectUrl ? props.redirectUrl : "/");
        }
    }, [props])

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLoginSubmit = (event) => {

        event.preventDefault();

        if (!email || !password || email.trim() === '' || password === '') {
            return;
        }

        //send an authentication request to backend
        const user = {
            email,
            password
        };

        //After login - I need to fetch the user
        postAuthenticationRequest(user).then((jwt_token) => fetchUserBasedOnJWT(jwt_token)).then((user) => {
           dispatch(login(user));
            navigate("/feed");
        }).catch((err) => {
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
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={email} name="email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} name="password" />
                        </Form.Group>
                        {showErrAlert && <Alert className='w-25 m-auto mb-3' variant="danger" onClose={() => setShowErrAlert(false)} dismissible>
                            <p>
                                {errMsg}
                            </p>
                        </Alert>}
                        <Row className='mb-2'>
                            <Button className='w-75 m-auto dark-bg light-txt-color btn-hover-dark' type="submit">
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