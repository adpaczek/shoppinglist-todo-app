import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ModalProduct from './ModalProduct.js';

describe('ModalProduct Component', () => {
    it('should render the component with default state', () => {
        const { getByText } = render(<ModalProduct />);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });
})
