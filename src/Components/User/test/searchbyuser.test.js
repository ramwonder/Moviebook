import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Searchbyuser from '../searchbyuser';

test('should render MovieSeatPicker component without errors', () => {
    render(< Searchbyuser/>);
  });