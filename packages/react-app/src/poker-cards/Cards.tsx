/* eslint-disable react/prop-types */
import React, { FC } from 'react';
import { Box } from '@planningpoker/components';
import styled from 'styled-components';

interface StyledProps {
  active: boolean;
}

interface Props {
  value: number | null;
  onCardClick: (value: number) => void;
}

const Cards = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
`;

const Card = styled.li`
  margin: 0 0.8rem;
`;

const StyledButton = styled.button<StyledProps>`
  cursor: pointer;
  font-weight: bold;
  font-size: 1.25rem;
  outline: 0;
  border: 2px solid #24d3ed;
  border-radius: 0.25rem;
  height: 5rem;
  width: 3rem;
  padding: 0rem;
  color: ${({ active }): string => (active ? '#FFF' : '#24d3ed')};
  background: ${({ active }): string => (active ? '#24d3ed' : '#111927')};
  :hover {
    background: ${({ active }): string => (active ? '#24d3ed' : '#1f2a37;')};
  }
`;

const PokerCards: FC<Props> = ({ onCardClick, value }) => {
  return (
    <Box direction="row" justify="center">
      <Cards>
        {[...Array(8)].map((test, i) => (
          <Card key={test}>
            <StyledButton
              onClick={(): void => {
                onCardClick(i);
              }}
              active={value === i}
            >
              {i}
            </StyledButton>
          </Card>
        ))}
      </Cards>
    </Box>
  );
};

export default PokerCards;
