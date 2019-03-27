import React from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from './styled';

export const AddBtn = ({ onToggleSidebarClick }) => (
  <Container>
    <Button onClick={onToggleSidebarClick} />
  </Container>
);

AddBtn.propTypes = {
  onToggleSidebarClick: PropTypes.func.isRequired,
};
