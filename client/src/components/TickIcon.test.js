import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TickIcon from './TickIcon.js';

describe('TickIcon Component', () => {
    it('should render the component with default state', () => {
        const { getByText } = render(<TickIcon />);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });
})