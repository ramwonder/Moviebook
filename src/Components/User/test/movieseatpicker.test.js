import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import this to add jest-dom matchers

import MovieSeatPicker from '../Movieseatbook';

test('should render MovieSeatPicker component without errors', () => {
  render(<MovieSeatPicker />);
});
