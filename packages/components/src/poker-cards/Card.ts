import styled from 'styled-components';

const PokerCard = styled.li`
  width: 18rem;
  height: 14rem;
  margin: 1.25rem 1.25rem 0 0;
  padding: 1.5rem;
  list-style: none;
  box-sizing: border-box;
  border-radius: 0.25rem;
  cursor: pointer;
  text-align: left;
  box-shadow: rgba(0, 0, 0, 0.05) 0px -0.0625rem 0.0625rem 0px, rgba(0, 0, 0, 0.2) 0px 0.0625rem 0.125rem 0px;
  transition: transform 0.2s ease 0s, box-shadow 0.2s ease 0s;
  transform: translateY(0);
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 0.25rem 0.875rem 0px, rgba(0, 0, 0, 0.2) 0px 0px 0.0625rem 0px;
    transform: translateY(-0.25rem);
  }
  &:focus {
    outline: none;
  }
`;

export default PokerCard;
