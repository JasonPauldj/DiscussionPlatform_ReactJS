import { useState } from "react";
import { updateUser } from "../Utils";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from "react-bootstrap/ToastContainer";


export const MyProfile = ({ user, handleProfileUpdate, categories }) => {
    const [firstName, setFirstName] = useState(user ? user.firstName : '');
    const [lastName, setLastName] = useState(user ? user.lastName : '');
    const [email, setEmail] = useState(user ? user.email : '');
    const [description, setDesc] = useState(user ? user.description : '');
    const [interests, setInterests] = useState(user ? user.interests : []);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(user ? user.interests.map(i => i.categoryId) : []);
    const [showErrAlert, setShowErrAlert] = useState(false);
    const [showInfoAlert, setShowInfoAlert] = useState(false);
    const [errMsg, setErrMsg] = useState(null);


    const onSuccessfulEdit = (user) => {
        handleProfileUpdate(user);
        setShowInfoAlert(true);
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    // const handlePasswordChange = (event) => {
    //     setPassword(event.target.value);
    // }

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    }

    const handleCategorySelectionChange = (event) => {
        const categoryIds = Array.from(event.target.selectedOptions, (option) => (option.value));
        setInterests(categoryIds.map((categoryId) => ({ categoryId: categoryId })));
        setSelectedCategoryIds(categoryIds);
    }

    const handleUpdateSubmit = (event) => {
        event.preventDefault();

        const updateUserObj = {
            firstName,
            lastName,
            email,
            description,
            interests
        };

        updateUser(user.userId, updateUserObj).then(onSuccessfulEdit).catch(err => {
            setShowErrAlert(true);
            setErrMsg(err);
        });
    }

    const categoryOptions = categories ? categories.map((category) => <option key={category.categoryId} value={category.categoryId}>{category.category}</option>) : null;

    return (
        <Container>
            <Row className='row-signup-form m-3'>
                <Card>
                    <Card.Title className='text-center m-3'>Update your Profile</Card.Title>
                    <Form className='signup-form p-3' onSubmit={handleUpdateSubmit}>
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
                        {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
                        </Form.Group> */}

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
                        {showErrAlert && <Alert variant="danger" onClose={() => setShowErrAlert(false)} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>
                                {errMsg}
                            </p>
                        </Alert>}
                        {showInfoAlert && <ToastContainer position="middle-center"><Toast bg="info" onClose={() => setShowInfoAlert(false)} show={showInfoAlert} delay={1500} autohide>
                            <Toast.Body>Woohoo, you're profile has been updated!</Toast.Body>
                        </Toast></ToastContainer>}
                        <Row>
                            <Button className='btn-signup' variant="primary" type="submit">
                                Update Profile
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </Row>
        </Container>
    )
}

export default MyProfile;