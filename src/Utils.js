import { BACKEND_URL } from "./backendConfig";

export const fetchUserBasedOnJWT = async (jwt_token) => {
  console.log("GET /me ");
  const response = await fetch(`${BACKEND_URL}/me`, {
    headers: {
      'Authorization': `Bearer ${jwt_token}`,
      "Content-Type": 'application/json'
    }
  });
  if (response.ok) {
    const user = await response.json();
    console.log("USER : ", user);
    return user;
  }
  else {
    throw new Error("An error occured when trying to GET USER")
  }
};

export const fetchJWT = () => {
  return sessionStorage.getItem('JWT_TOKEN');
}

export const removeJWT = () => {
  sessionStorage.removeItem('JWT_TOKEN');
}

export const fetchCategories = async () => {
  console.log("GET /categories ");
  const response = await fetch(`${BACKEND_URL}/categories`, {
    headers: {
      "Content-Type": 'application/json'
    }
  });
  if (response.ok) {
    const categories = await response.json();
    console.log("CATEGORIES : ", categories);
    return categories;
  }
  else {
    throw new Error("An error occured when trying to GET CATEGORIES");
  }
}

export const fetchFeed = async () => {
  console.log("GET /feed ");

  const response = await fetch(`${BACKEND_URL}/feed`, {
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    }
  });
  if (response.ok) {
    const feed = await response.json();
    return feed;
  }
  else {
    throw new Error("An error occured when trying to GET FEED");
  }
}

export const fetchQuestionAnswers = async (questionId) => {
  const response = await fetch(`${BACKEND_URL}/questionAnswers/${questionId}`, {
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    }
  });

  if (response.ok) {
    const questionAnswers = await response.json();
    console.log("Question and Answers is ", questionAnswers);
    return questionAnswers;
  }
  else {
    throw new Error("An error occured when trying to GET question and answers.")
  }
}

export const addQuestion = async (questionBody, user, categoryId) => {
  const reqBody = {
    user: {
      userId: user.userId
    },
    body: questionBody,
    category: {
      categoryId: categoryId
    }
  }
  const response = await fetch(`${BACKEND_URL}/question`, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    },
    body: JSON.stringify(reqBody)
  });

  if (response.ok) {
    const question = await response.json();
    return question;
  }
  else {
    throw new Error("An error occured when trying to POST a question.");
  }

}

export const addAnswer = async (answerBody, user, questionId) => {
  console.log("/POST ANSWER");
  const reqBody = {
    user: {
      userId: user.userId
    },
    body: answerBody,
    question: {
      questionId: questionId
    }
  }
  const response = await fetch(`${BACKEND_URL}/answer`, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    },
    body: JSON.stringify(reqBody)
  });

  if (response.ok) {
    const answer = await response.json();
    return answer;
  }
  else {
    throw new Error("An error occured when trying to POST an answer.");
  }

}

export const fetchAnswerComments = async (answerId) => {
  const response = await fetch(`${BACKEND_URL}/answerComments/${answerId}`, {
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    }
  });

  const answerComments = await response.json();
  console.log("Answer and Comments is ", answerComments);
  return answerComments;
}

export const addComment = async (commentBody, user, answerId) => {
  console.log("/POST COMMENT");
  const reqBody = {
    user: {
      userId: user.userId
    },
    body: commentBody,
    answer: {
      answerId: answerId
    }
  }
  const response = await fetch(`${BACKEND_URL}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    },
    body: JSON.stringify(reqBody)
  });

  if (response.ok) {
    const answer = await response.json();
    return answer;
  }
  else {
    throw new Error("An error occured when trying to POST a Comment.");
  }

}

export const fetchMyQuestions = async (userId) => {
  const response = await fetch(`${BACKEND_URL}/questions/user/${userId}`, {
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    }
  });

  const questions = await response.json();
  console.log("Question are ", questions);
  return questions;
}

export const fetchMyAnswers = async (userId) => {
  const response = await fetch(`${BACKEND_URL}/answers/user/${userId}`, {
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    }
  });

  const answers = await response.json();
  console.log("Answers are ", answers);
  return answers;
}

export const updateQuestion = async (questionId, questionBody, categoryId) => {
  const reqBody = {
    body: questionBody,
    category: {
      categoryId: categoryId
    }
  }
  const response = await fetch(`${BACKEND_URL}/question/${questionId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    },
    body: JSON.stringify(reqBody)
  });

  if (response.ok) {
    const question = await response.json();
    return question;
  }
  else {
    throw new Error("An error occured when trying to PATCH a question.");
  }

}

export const updateAnswer = async (answerId, answerBody) => {
  const reqBody = {
    body: answerBody
  }
  const response = await fetch(`${BACKEND_URL}/answer/${answerId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    },
    body: JSON.stringify(reqBody)
  });

  if (response.ok) {
    const question = await response.json();
    return question;
  }
  else {
    throw new Error("An error occured when trying to PATCH a answer.");
  }

}

export const updateUser = async (userId, userUpdate) => {
  const reqBody = {
    ...userUpdate
  }
  const response = await fetch(`${BACKEND_URL}/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    },
    body: JSON.stringify(reqBody)
  });

  if (response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    throw new Error("An error occured when trying to PUT a user.");
  }

}

export const deleteQuestion = async (questionId) => {
  const response = await fetch(`${BACKEND_URL}/question/${questionId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${fetchJWT()}`,
    }
  });


  if (!response.ok ) {
    throw new Error("An error occured when trying to DELETE a question.");
  }
}

export const deleteAnswer = async (answerId) => {
  const response = await fetch(`${BACKEND_URL}/answer/${answerId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${fetchJWT()}`,
    }
  });

  if (!response.ok ) {
    throw new Error("An error occured when trying to DELETE a question.");
  }
}

export const addCategory = async (category) => {
  const reqBody = {
    category: category
  }
  const response = await fetch(`${BACKEND_URL}/category`, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      'Authorization': `Bearer ${fetchJWT()}`,
    },
    body: JSON.stringify(reqBody)
  });

  if (response.ok) {
    const category = await response.json();
    return category;
  }
  else {
    throw new Error("An error occured when trying to POST a CATEGORY.");
  }
}