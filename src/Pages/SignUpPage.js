import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../backendConfig';
import { useNavigate } from "react-router-dom";
import './SignUpPage.css'; 

export const SignUpPage = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDesc] = useState('');
    const [interests, setInterests] = useState(null);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        console.log("INSIDE USE EFFECT OF SIGN UP PAGE");
        if (props.isUserLoggedIn) {
            console.log("NAVIGATE TO FEED FROM SIGN UP PAGE");
            navigate("/");
        }
    }, [props]);

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }

    const handleCategorySelectionChange = (event) => {
        const categoryIds = Array.from(event.target.selectedOptions, (option) => (option.value));
        setInterests(categoryIds.map((categoryId)=> ({categoryId: categoryId})));
        setSelectedCategoryIds(categoryIds);
    }

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        const newUserObj = {
            firstName,
            lastName,
            email,
            password,
            description,
            interests
        };

        postSignupReq(newUserObj).then(() => {
            props.handleAuthentication(true)
        }).catch(() => props.handleAuthentication(false));
    }

    const postSignupReq = async (user) => {
        const response = await fetch(`${BACKEND_URL}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user),
            mode: 'cors',
        });
        console.log("RESPONSE IS ", response);
        const data = await response.json();
        sessionStorage.setItem('JWT_TOKEN', data.token);
        return data.token;
    }

    const categoryOptions = props.categories ? props.categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.category}</option>) : null;

    return (
        <Container>
            <Row className='row-signup-form m-3'>
                <Card>
                    <Card.Title className='text-center m-3'>Welcome to the Discussion Platform. Please Sign Up</Card.Title>
                    <Form className='signup-form p-3' onSubmit={handleSignupSubmit}>
                        <Form.Group className="mb-3" controlId="firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter First Name" onChange={handleFirstNameChange} value={firstName} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Last Name" onChange={handleLastNameChange} value={lastName} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={email} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="description">
                            <Form.Label>Desribe yourself</Form.Label>
                            <Form.Control type="m" placeholder="Enter a description" onChange={handleDescChange} value={description} />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                        <Form.Label>What are your interests?</Form.Label>
                            <Form.Select multiple value={selectedCategoryIds} onChange={handleCategorySelectionChange}>
                                ${categoryOptions}
                            </Form.Select>
                        </Form.Group>
                        <Row>
                            <Button className='btn-signup' variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </Row>
        </Container>
    )
}

export default SignUpPage;