import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ProductItem from './ProductItem';

describe('ProductItem Component', () => {

    const list = { id: 1 };
    const item = { id: 1, name: 'Example Product', quantity: 2, unit: 'pcs', completed: false };
    const getData = jest.fn();

    test('should render the ProductItem component', () => {
        const { getByText } = render(<ProductItem list={list} item={item} getData={getData} />);
        const productNameElement = getByText('Example Product');
        const quantityElement = getByText('2');
        const unitElement = getByText('pcs');

        expect(productNameElement).toBeInTheDocument();
        expect(quantityElement).toBeInTheDocument();
        expect(unitElement).toBeInTheDocument();
    });

    test('should handle toggleCompletion when "CHECK" button is clicked', async () => {
        const { getByText } = render(<ProductItem list={list} item={item} getData={getData} />);
        const checkButton = getByText('CHECK');

        fireEvent.click(checkButton);

        // Dodaj oczekiwane asercje po wywołaniu toggleCompletion
    });

    test('should handle deleteProduct when "DELETE" button is clicked', async () => {
        const { getByText } = render(<ProductItem list={list} item={item} getData={getData} />);
        const deleteButton = getByText('DELETE');

        fireEvent.click(deleteButton);

        // Dodaj oczekiwane asercje po wywołaniu deleteProduct
    });
})