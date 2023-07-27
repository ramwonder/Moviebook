import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from '../login';

test('should render login component without errors', () => {
    render(<Login />);
  });