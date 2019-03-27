import styled from 'styled-components';
import add from '../../images/add.svg';

export const Container = styled.div`
  padding-right: 60px;
  text-align: right;
`;

export const Button = styled.button`
  background: url(${add}) no-repeat center;
  border: none;
  width: 60px;
  height: 60px;
  position: fixed;
  bottom: 0;
  z-index: 1;
  
  &:focus {
    outline: none;
  }
`;
