import Card from 'react-bootstrap/Card';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import OverlayTrigger from "react-bootstrap/Overlay";
import Tooltip from 'react-bootstrap/Tooltip';
import { useNavigate } from 'react-router-dom';
import '../Background.scss';


export const FeedCard = ({ question, answers }) => {

    const navigate = useNavigate();

    const handleCardSelection = (event) => {
        navigate(`question/${question.questionId}`)
    }

    return (
        <Container className='mb-2 mt-2 '>
            <Row>
                    <Card className='shadow card-bg card-txt-color' onClick={handleCardSelection}>
                        <Card.Header >
                            {/*  */}
                            <div>{question.body}</div>
                            <div>{`~ ${question.user.firstName} ${question.user.lastName}`}</div>
                        </Card.Header>
                        <Card.Body>
                            {answers.length > 0 && <Card.Subtitle>{`${answers[0].user.firstName} ${answers[0].user.lastName}`}</Card.Subtitle>}

                            <Card.Text>
                                {answers.length > 0 ? answers[0].body : <div className="fst-italic">No one has answered this question.</div>}
                            </Card.Text>
                        </Card.Body>
                    </Card>
            </Row>
        </Container>
    );

}

export default FeedCard;