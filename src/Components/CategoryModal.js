import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { addCategory } from "../Utils";


export const CategoryModal = ({ show, onHide }) => {
    const [inputCategory, setInputCategory] = useState('');
    const [errMsg, setErrMsg] = useState(null);
    const [showErrAlert, setShowErrAlert] = useState(false);

    const handleCategoryChange = (event) => {
        setInputCategory(event.target.value);
    }

    const handleCategorySubmit = () => {
        addCategory(inputCategory).then((category) => onHide()).catch(err => {
            setShowErrAlert(true);
            setErrMsg(err.message);
        })
    }

    return (
        <Modal show={show} size="lg" centered onHide={onHide} >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="questionInput">
                        <Form.Label>Enter Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter your category" onChange={handleCategoryChange} value={inputCategory} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            {showErrAlert && <Alert variant="danger" onClose={()=>setShowErrAlert(false)} dismissible>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>
                    {errMsg}
                </p>
            </Alert>}
            <Modal.Footer>
                <Button variant="success" onClick={handleCategorySubmit}>Submit</Button>
                <Button variant="danger" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CategoryModal;