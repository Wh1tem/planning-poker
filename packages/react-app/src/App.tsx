import React, { ReactElement, useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { w3cwebsocket as W3CWEBSOCKET } from 'websocket';
import Home from './home';
import PokerTable from './table';
import './index.css';

export { ROOT, TABLE_ROUTE } from './routes';

const client = new W3CWEBSOCKET('ws://127.0.0.1:8000');

const App = (): ReactElement => {
  const [cardValue, setCardValue] = useState<number | null>(null);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    client.onopen = (): void => {
      console.log('Websocket client connected');
    };
    client.onmessage = (message): void => {
      const dataFromServer = JSON.parse(message.data as string);
      setValues(prevState => {
        return [...prevState, dataFromServer.value];
      });
    };
  }, []);

  const pickCardHandler = (value: number): void => {
    client.send(
      JSON.stringify({
        type: 'message',
        value,
      }),
    );
    setCardValue(value);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/table" component={PokerTable} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
