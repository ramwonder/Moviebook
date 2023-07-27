import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BookTicket from '../Bookticket';

test('should render BookTicket  component without errors', () => {
    render(<BookTicket />);
  });