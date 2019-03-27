import styled from 'styled-components';
import del from '../../images/delete.svg';
import close from '../../images/close.svg';

export const RemoveButton = styled.button`
  float: right;
  border: none;
  background: url(${del}) no-repeat center;
  width: 14px;
  height: 18px;
`;

export const AddTodoButton = styled.button`
  background-color: #000;
  color: #fff;
  text-align: center;
  width: 100%;
  font-size: 20px;
  line-height: 46px;
  border: none;
  position: absolute;
  bottom: 0;
`;

export const CloseButton = styled.button`
  float: right;
  border: none;
  background: url(${close}) no-repeat center;
  width: 14px;
  height: 18px;
`;
