import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ListHeader from './ListHeader.js';

describe('ListHeader Component', () => {
    it('should render the component with default state', () => {
        const { getByText } = render(<ListHeader />);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });
})