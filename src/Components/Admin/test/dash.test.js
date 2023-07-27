import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Dash from '../dash';

test('should render dash component without errors', () => {
    render(<Dash />);
  });