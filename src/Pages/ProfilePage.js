import ProfileTabs from "../Components/ProfileTabs";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const ProfilePage = ({user, categories, handleProfileUpdate, isUserLoggedIn, setRedirectUrl}) => {
    
    const navigate = useNavigate();
    const location = useLocation();
    
      useEffect(() => {
        if (!isUserLoggedIn) {
            setRedirectUrl(location.pathname);
            navigate("/login");
        }
    }, [isUserLoggedIn])

    return (
        <ProfileTabs user={user} categories={categories} handleProfileUpdate={handleProfileUpdate} />
    )
}

export default ProfilePage;