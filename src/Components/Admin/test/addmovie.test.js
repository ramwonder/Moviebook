import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddMovie from '../AddMovie';

test('should render MovieSeatPicker component without errors', () => {
    render(<AddMovie />);
  });