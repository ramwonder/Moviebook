import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Bookticket from '../Bookticket';

test('should render MovieSeatPicker component without errors', () => {
    render(<Bookticket />);
  });