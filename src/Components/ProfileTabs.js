import React, { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MyQuestions from './MyQuestions';
import MyAnswers from './MyAnswers';
import MyProfile from './MyProfile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

export const ProfileTabs = () => {

  const [key, setKey] = useState('questions');

  return (
    <Container>
      <Row className='mt-5'>
        <Tabs
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3 profile-tabs"
        >
          <Tab eventKey="questions" title="My Questions">
            <MyQuestions />
          </Tab>
          <Tab eventKey="answers" title="My Answers">
            <MyAnswers />
          </Tab>
          <Tab eventKey="updateprofile" title="Update Profile">
            <MyProfile />
          </Tab>
        </Tabs>
      </Row>
    </Container>
  );
}

export default ProfileTabs;