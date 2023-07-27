import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Search from '../search';

test('should render  search component without errors', () => {
    render(<Search />);
  });