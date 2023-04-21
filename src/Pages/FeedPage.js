import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const FeedPage = (props) => {
    const navigate = useNavigate();

    useEffect(()=> {
        console.log("INSIDE USE EFFECT OF FEED PAGE");
        if(!props.isUserLoggedIn){
            console.log("USER IS NOT LOGGED IN - NAVIGATE BACK TO LOGIN PAGE")
            navigate("/login");
        }
    },[props])
    

    if(!props.isUserLoggedIn) {
       
        
    }

    return (
        <div>
            THIS IS FEED PAGE
        </div>

    )
};

export default FeedPage;