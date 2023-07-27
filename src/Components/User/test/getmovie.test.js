import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to add jest-dom matchers

import Getmovie from '../Getmovie';

test('should render Getmovie component without errors', () => {
  render(<Getmovie />);
});
