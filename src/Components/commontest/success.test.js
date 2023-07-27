import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Success from '../sucess';

test('should render success component without errors', () => {
    render(<Success />);
  });