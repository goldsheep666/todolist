import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Edit from './component/Edit';
import List from './component/List';
import './index.css';

function ToDoList() {
  const [information, setInformation] = useState([]);
  useEffect(() => {
    const list = JSON.parse(localStorage.getItem('list')) || [];
    setInformation(list);
  }, []);

  return (
    <Container>
      <Edit information={information} setInformation={setInformation} />
      <List information={information} setInformation={setInformation} />
    </Container>
  );
}

export default ToDoList;
