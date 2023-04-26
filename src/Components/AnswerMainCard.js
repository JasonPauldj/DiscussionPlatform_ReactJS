import  Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const AnswerMainCard = ({ answer, toggleCommentModalOn }) => {

    const handleNewCommentClick = () =>{
        toggleCommentModalOn();
    }
    return (
        <Card className="my-5 shadow light-bg" >
            <Card.Body>
                {answer && <Card.Subtitle>{`${answer.user.firstName} ${answer.user.lastName}`}</Card.Subtitle>}
                {answer && <Card.Text>{answer.body}</Card.Text>}
            </Card.Body>
            <Card.Footer className="text-center"><Button className="dark-bg light-txt-color btn-hover-dark" onClick={handleNewCommentClick}>Add Comment</Button></Card.Footer>
        </Card>
    )
}

export default AnswerMainCard;