import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

export const AnswerCard = ({ answer }) => {

    const navigate = useNavigate();

    const handleCardSelection = (event) => {
        navigate(`/answer/${answer.answerId}`)
    }

    return (
        <Card className="my-2 shadow light-bg" onClick={handleCardSelection}>
            <Card.Body>
                {answer && <Card.Subtitle>{`${answer.user.firstName} ${answer.user.lastName}`}</Card.Subtitle>}
                {answer && <Card.Text>{answer.body}</Card.Text>}
            </Card.Body>
        </Card>
    )
}

export default AnswerCard;