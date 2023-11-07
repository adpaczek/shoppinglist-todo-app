import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductItem from './ProductItem.js';

describe('ProductItem Component', () => {
    it('should render the component with default state', () => {
        const { getByText } = render(<ProductItem />);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });
})