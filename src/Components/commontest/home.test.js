import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../Home';

test('should render home component without errors', () => {
    render(<Home />);
  });