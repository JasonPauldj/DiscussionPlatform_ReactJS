import { BACKEND_URL } from "./backendConfig";

export const fetchUserBasedOnJWT = async (jwt_token) => {
    const response = await fetch(`${BACKEND_URL}/me`, {
      headers: {
        'Authorization': `Bearer ${jwt_token}`,
        "Content-Type": 'application/json'
      }
    });
    const user = await response.json();
    console.log("LOGGED IN USER IS ", user);
    return user;
  };

 export const fetchJWT = () =>{
    return sessionStorage.getItem('JWT_TOKEN');
  }

 export const removeJWT = () => {
    sessionStorage.removeItem('JWT_TOKEN');
 }

 export  const fetchCategories = async () => {
  const response = await fetch(`${BACKEND_URL}/categories`, {
    headers: {
      "Content-Type": 'application/json'
    }
  });
  const categories = await response.json();
  console.log("CATEGORIES ARE ", categories);
  return categories;
}