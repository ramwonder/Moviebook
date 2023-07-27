import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from '../register';

test('should render register component without errors', () => {
    render(<Register />);
  });