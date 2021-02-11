import React, { FC, useEffect, useState } from 'react';
import { Box } from '@planningpoker/components';
import { w3cwebsocket as W3CWEBSOCKET } from 'websocket';
import { PokerCards } from '../poker-cards';

const client = new W3CWEBSOCKET('ws://127.0.0.1:8000');

const PokerTable: FC<{}> = () => {
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
      <Box direction="row" justify="center">
        <PokerCards onCardClick={pickCardHandler} value={cardValue} />
        <ul>
          {values.map(value => (
            <li key={value} style={{ color: 'white' }}>
              {value}
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
};

export default PokerTable;
