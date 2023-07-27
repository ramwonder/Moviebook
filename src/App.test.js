import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';import '@testing-library/jest-dom/extend-expect';


test('should render MovieSeatPicker component without errors', () => {
    render(<App />);
  });