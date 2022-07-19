import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Icon from './Components/Icon'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Card, CardBody, Container, Button, Col, Row } from 'reactstrap';
import { useEffect, useState } from 'react';

const itemArray = new Array(9).fill('empty');

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState('');
  const [count, setCount] = useState(0);
  //after winning reload the game
  const reloadGame = () => {
    setIsCross(false);
    setWinMessage('');
    setCount(0);
    itemArray.fill('empty', 0, 9);
  }

  //check every possible condition that game is completed or not, if completed then show the win message
  const checkIsWinner = () => {
    if (itemArray[0] === itemArray[1]
      && itemArray[0] === itemArray[2]
      && itemArray[0] !== "empty") {
      setWinMessage(`${itemArray[0]} wins`)
    } else if (itemArray[3] === itemArray[4]
      && itemArray[4] === itemArray[5]
      && itemArray[3] !== "empty") {
      setWinMessage(`${itemArray[3]} wins`)
    } else if (itemArray[6] === itemArray[7]
      && itemArray[7] === itemArray[8]
      && itemArray[6] !== "empty") {
      setWinMessage(`${itemArray[6]} wins`)
    } else if (itemArray[0] === itemArray[3]
      && itemArray[3] === itemArray[6]
      && itemArray[0] !== "empty") {
      setWinMessage(`${itemArray[0]} wins`)
    } else if (itemArray[1] === itemArray[4]
      && itemArray[4] === itemArray[7]
      && itemArray[1] !== "empty") {
      setWinMessage(`${itemArray[1]} wins`)
    } else if (itemArray[2] === itemArray[5]
      && itemArray[5] === itemArray[8]
      && itemArray[2] !== "empty") {
      setWinMessage(`${itemArray[2]} wins`)
    } else if (itemArray[0] === itemArray[4]
      && itemArray[4] === itemArray[8]
      && itemArray[0] !== "empty") {
      setWinMessage(`${itemArray[0]} wins`)
    } else if (itemArray[2] === itemArray[4]
      && itemArray[4] === itemArray[6]
      && itemArray[2] !== "empty") {
      setWinMessage(`${itemArray[2]} wins`)
    }else if(count>=8){
      setWinMessage(`Nobody Wins`)
    }
  }

  //when player clicks
  const changeItem = (index) => {
    if (winMessage) return toast(reloadGame, { type: 'success' });

    if (itemArray[index] == 'empty') {
      itemArray[index] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
      setCount(count+1);
    }else{
      return toast('Already Filled', { type: 'error' });
    }
    checkIsWinner(); //everytime checks game completed or notF
  }

  // the interface
  return (
    <Container className='p-5'>
      <h1 className='text-center text-primary'>Tic Tac Toe</h1>
      <ToastContainer position='bottom-center' />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className='mb-2 mt-2'>
              <h3 className='text-success text-uppercase text-center'>{winMessage}</h3>
              <Button color='success' block onClick={reloadGame}>Reload Game</Button>
            </div>
          ) : (
            <h4 className='text-center text-warning'>
              {isCross ? "Cross" : "Circle"} turns
            </h4>
          )}
          <div className='grid'>
            {itemArray.map((item, index) => (
              <Card key={index} color='warning' onClick={() => changeItem(index)}>
                <CardBody className='box'>
                  <Icon name={item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;