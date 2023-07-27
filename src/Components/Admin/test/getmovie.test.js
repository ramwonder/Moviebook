import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Getmovie from '../Getmovie';

test('should render  Getmovie component without errors', () => {
    render(< Getmovie />);
  });