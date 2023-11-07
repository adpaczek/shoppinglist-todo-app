import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Auth from './Auth';

describe('Auth Component', () => {
    it('should render the component with default state', () => {
        const { getByText } = render(<Auth />);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });

    it('should render necessary elements', () => {
        const { getByPlaceholderText } = render(<Auth />);

        expect(getByPlaceholderText('email')).toBeInTheDocument();
        expect(getByPlaceholderText('password')).toBeInTheDocument();
    });



});