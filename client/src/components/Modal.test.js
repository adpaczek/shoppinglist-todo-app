import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from './Modal.js';

describe('Modal Component', () => {
    it('should render the component with default state', () => {
        const { getByText } = render(<Modal />);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });
})