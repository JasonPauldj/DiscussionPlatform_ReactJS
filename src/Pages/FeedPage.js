import { useEffect, useState } from "react";
import FeedCard from "../Components/FeedCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { fetchFeed} from '../Utils';
import QuestionModal from '../Components/QuestionModal';
import '../Background.scss';
import { useSelector } from "react-redux";

export const FeedPage = () => {

    const user = useSelector((state) => state.user.user);
    const categories = useSelector((state) => state.categories.categories);

    const [feed, setFeed] = useState(null);
    const [showQuestionModal, setShowQuestionModal] = useState(false);    
    
    useEffect(() => {
       if(user){
            fetchFeed().then((feedItems) => {
                setFeed(feedItems);
            }).catch((err) => {
                console.log("There is an err in Fetching Feed " + err);
                setFeed(null)
            })
        }
    }, [user])

    let feedCards;

    if (feed) {
        feedCards = feed.map((f) => <FeedCard key={f.question.questionId} question={f.question} answers={f.answers} />)
    }

    const handleNewQuestionClick = (event) => {
        setShowQuestionModal(true);
    }

    const handleSuccessfulQAdd = (nF) => {
        setFeed(prevFeed => [nF,...prevFeed])
    }

    return (
        <>
            {showQuestionModal && (<QuestionModal show={showQuestionModal} onHide={() => setShowQuestionModal(false)} categories={categories} user={user} handleSuccessfulQAdd={handleSuccessfulQAdd} />)}
            <Container >
                <Row>
                    <Button className="w-auto mx-auto my-2 card-bg btn-dark-text my-5 light-bg btn-hover-light"  onClick={handleNewQuestionClick}> Add a New Question</Button>
                </Row>
                <Row>
                    {(feed) ? feedCards : <></>}
                </Row>
            </Container>
        </>
    );
};

export default FeedPage;