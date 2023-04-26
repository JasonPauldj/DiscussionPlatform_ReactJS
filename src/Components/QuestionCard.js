import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export const QuestionCard = ({ question, toggleAnswerModalOn }) => {

    const handleNewAnswerClick = () =>{
        toggleAnswerModalOn();
    }

    return (
        <Card className="my-5 shadow light-bg">
            <Card.Body>
                <Card.Title>
                    {question.body}
                </Card.Title>
            </Card.Body>
            <Card.Footer className="text-center"><Button className="dark-bg light-txt-color btn-hover-dark" onClick={handleNewAnswerClick}>Add Answer</Button></Card.Footer>
        </Card>
    );
}

export default QuestionCard;
