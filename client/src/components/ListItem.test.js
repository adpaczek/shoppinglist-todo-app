import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListItem from './ListItem.js';

describe('ListItem Component', () => {
    it('should render the component with default state', () => {
        const { getByText } = render(<ListItem />);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });
})