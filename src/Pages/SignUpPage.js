import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from 'react';
import { BACKEND_URL } from '../backendConfig';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserBasedOnJWT } from '../Utils';
import { login } from '../features/user/userSlice';
import './SignUpPage.css';

export const SignUpPage = () => {
    console.log("RENDERING SIGN UP PAGE");
    const categories = useSelector((state) => state.categories.categories);
    const user = useSelector((state) => state.user.user);

    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [description, setDesc] = useState('');
    const [interests, setInterests] = useState(null);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/feed");
        }
    }, [user]);

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
        setInterests(categoryIds.map((categoryId) => ({ categoryId: categoryId })));
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

        postSignupReq(newUserObj).then((jwt_token) => fetchUserBasedOnJWT(jwt_token)).then((user) => {
            dispatch(login({
                user
            }));
            navigate("/feed");
        }).catch((err) => {
            setShowErrAlert(true);
            setErrMsg(err.message);
        });
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

        if (response.ok) {
            const data = await response.json();
            sessionStorage.setItem('JWT_TOKEN', data.token);
            return data.token;
        }
        else if (response.status === 400) {
            throw new Error("Bad request was sent. Kindly verify your details again");
        }
        else {
            throw new Error("There was an error.Please try again.");
        }
    }

    const categoryOptions = categories ? categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.category}</option>) : null;

    return (
        <Container>
            <Row className='row-signup-form m-3'>
                <Card className='shadow'>
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
                        {showErrAlert && <Alert className='w-25 m-auto mb-3' variant="danger" onClose={() => setShowErrAlert(false)} dismissible>
                            <p>
                                {errMsg}
                            </p>
                        </Alert>}
                        <Row>
                            <Button className='w-75 m-auto dark-bg light-txt-color btn-hover-dark' type="submit">
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