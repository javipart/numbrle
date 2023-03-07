import logo from './logo.svg';
import './App.css';
import { Button, Icon } from '@mui/material';
import BackspaceIcon from '@mui/icons-material/Backspace';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useLayoutEffect, useState } from 'react';

function App() {
  const [numRow, setNumRow] = useState(1);
  const [numColumn, setNumColumn] = useState(0);
  const [isBtnOff, setIsBtnOff] = useState(false);
  const [number, setNumber] = useState([]);
  const [viewResult, setViewResult] = useState(false);
  const [paintNumbers, setPaintNumbers] = useState([]);
  const [values, setValues] = useState({
    2: { 0: { color: '', value: '' }, 1: { color: '', value: '' }, 2: { color: '', value: '' }, 3: { color: '', value: '' }, 4: { color: '', value: '' } },
    3: { 0: { color: '', value: '' }, 1: { color: '', value: '' }, 2: { color: '', value: '' }, 3: { color: '', value: '' }, 4: { color: '', value: '' } },
    4: { 0: { color: '', value: '' }, 1: { color: '', value: '' }, 2: { color: '', value: '' }, 3: { color: '', value: '' }, 4: { color: '', value: '' } },
    5: { 0: { color: '', value: '' }, 1: { color: '', value: '' }, 2: { color: '', value: '' }, 3: { color: '', value: '' }, 4: { color: '', value: '' } },
    6: { 0: { color: '', value: '' }, 1: { color: '', value: '' }, 2: { color: '', value: '' }, 3: { color: '', value: '' }, 4: { color: '', value: '' } },
    1: { 0: { color: '', value: '' }, 1: { color: '', value: '' }, 2: { color: '', value: '' }, 3: { color: '', value: '' }, 4: { color: '', value: '' } },
  });

  useEffect(() => {
    let randoms = [];
    for (let i = 0; i <= 4; i++) {
      randoms.push(Math.floor(Math.random() * 10));
    }
    setNumber(randoms);
    console.log(randoms)
  }, []);

  useLayoutEffect(() => {
    setIsBtnOff(false);
    if (numColumn === 5) {
      setIsBtnOff(true);
    }
  }, [values])

  const handleButtons = (val) => {
    let newValues = { ...values };
    if (val === 'delete') {
      setNumColumn(numColumn - 1);
      newValues[numRow][numColumn - 1].value = '';
      setValues(newValues);
    } else if (val === 'enter') {
      getBackgroundColor();
      setNumRow(numRow + 1);
      setNumColumn(0);
    } else {
      newValues[numRow][numColumn].value = val;
      setValues(newValues);
      setNumColumn(numColumn + 1);
    }
  };

  const getBackgroundColor = () => {
    let newValues = { ...values };
    let paints = {}
    Object.keys(values[numRow]).forEach(item => {
      let pos;
      const num = values[numRow][item].value;
      const numOfNum = number[item];
      if (!paints[num]) {
        if (num === numOfNum) {
          newValues[numRow][item].color = 'rgb(83, 141, 78)';
          paints[num] = { position: item, color: 'rgb(83, 141, 78)' };
        } else if (number.includes(num)) {
          newValues[numRow][item].color = 'rgb(181, 159, 59)';
          paints[num] = { position: item, color: 'rgb(181, 159, 59)' };
        }
      } else if (paints[num].color === 'rgb(181, 159, 59)' || paints[num].color === 'rgb(83, 141, 78)') {
        newValues[numRow][item].color = 'rgb(33, 33, 33)';
        if (paints[num].color === 'rgb(83, 141, 78)') {
          newValues[numRow][paints[num].position].color = 'rgb(33, 33, 33)';
        }
        if (num === numOfNum) {
          newValues[numRow][item].color = 'rgb(83, 141, 78)';
          paints[num] = { position: item, color: 'rgb(83, 141, 78)' };
        }
      }
    });
    setPaintNumbers(paints);
    setValues(newValues);
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <body>
        <h1>Numbrle</h1>
        <div style={{
          height: '10px',
          fontSize: '1px',
        }}>&nbsp;</div>
        <div
          className='gridPanel'
        >
          {[1, 2, 3, 4, 5, 6].map((row) => (
            <div>
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  id={`${row}-${item - 1}`}
                  style={{
                    width: '6.7vh',
                    height: '6.7vh',
                    maxHeight: '21%',
                    maxWidth: '14%',
                    lineHeight: '7vh',
                    border: '2px solid #444',
                    display: 'inline-block',
                    margin: '3px',
                    fontSize: '3.5vh',
                    fontWeight: 'bold',
                    backgroundColor: values[row][item - 1].color
                      ? values[row][item - 1].color
                      : 'rgb(17, 17, 17)',
                  }}>
                  {values[row][item - 1].value}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div clasName='keyboard' style={{
          paddingBottom: '5px',
          width: '100%',
          paddingTop: '5px',
          paddingRight: 0,
          paddingLeft: 0,
          bottom: 0,
          left: 0,
          position: 'fixed',
          display: 'block',
          backgroundColor: '#1a1a1a'
        }}>
          <div style={{
            textAlign: 'center',
            display: 'block',
            color: '#fff'
          }}>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[1]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(1)} disabled={isBtnOff}>1</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[2]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(2)} disabled={isBtnOff}>2</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[3]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(3)} disabled={isBtnOff}>3</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,.2)' }} onClick={() => handleButtons('delete')} disabled={numColumn === 0}>
              <Icon style={{ color: '#fff' }}>
                <BackspaceIcon />
              </Icon>
            </Button>
            <br />
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[4]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(4)} disabled={isBtnOff}>4</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[5]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(5)} disabled={isBtnOff}>5</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[6]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(6)} disabled={isBtnOff}>6</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[0]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(0)} disabled={isBtnOff}>0</Button>
            <br />
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[7]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(7)} disabled={isBtnOff}>7</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[8]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(8)} disabled={isBtnOff}>8</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', color: '#fff', backgroundColor: paintNumbers[9]?.color || 'rgba(255,255,255,.2)' }} onClick={() => handleButtons(9)} disabled={isBtnOff}>9</Button>
            <Button className='btn-Key' style={{ maxWidth: '5pc', height: '0.46875in', width: '100%', position: 'relative', margin: '2.25pt 2.25pt 2.25pt 2.25pt', fontSize: '1.05rem', backgroundColor: 'rgba(255,255,255,.2)' }} onClick={() => handleButtons('enter')} disabled={numColumn !== 5}>
              <Icon style={{ color: '#fff' }}>
                <CheckIcon />
              </Icon>
            </Button>
          </div>
        </div>
      </body >
    </div >
  );
}

export default App;
