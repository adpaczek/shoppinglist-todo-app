import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';


describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);

    expect(getByText('Please log in:')).toBeInTheDocument();
  });
});
