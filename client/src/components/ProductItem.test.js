import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ProductItem from './ProductItem';
import ListItem from "./ListItem";

describe('ProductItem Component', () => {

    const list = { id: 1, title: 'Test List', date: '2023-11-15' };
    const item = { id: 1, name: 'Example Product', quantity: 2, unit: 'pcs', completed: false };
    const getData = jest.fn();

    it('should render the ProductItem component', () => {
        const { getByText } = render(<ProductItem list={list} item={item} getData={getData} />);
        const productNameElement = getByText('Example Product');
        const quantityElement = getByText('2');
        const unitElement = getByText('pcs');

        expect(productNameElement).toBeInTheDocument();
        expect(quantityElement).toBeInTheDocument();
        expect(unitElement).toBeInTheDocument();
    });


    it('should call deleteItem and getData when "DELETE ITEM" button is clicked', async () => {
        const deleteItemMock = jest.fn();
        global.fetch = jest.fn().mockResolvedValueOnce({ status: 200 });
        render(<ProductItem list={list} item={item} getData={getData} />);
        const deleteButton = screen.getByRole('button', { name: /DELETE ITEM/i });

        fireEvent.click(deleteButton);

        //expect(deleteItemMock).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8000/lists/1/items/1`, {
            method: 'DELETE',
        });
        await waitFor(() => {
            expect(getData).toHaveBeenCalledTimes(1);
        });
    });

    it('should handle errors by logging to console', async() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));
        render(<ProductItem list={list} item={item} getData={getData} />);
        const deleteButton = screen.getByRole('button', { name: /DELETE ITEM/i });

        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(new Error('Network error'));
        });

    });

    it('should toggle completion when "CHECK" button is clicked', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({ status: 200 });
        render(<ProductItem list={list} item={item} getData={getData} />);
        const checkButton = screen.getByRole('button', { name: /CHECK/i });

        fireEvent.click(checkButton);

        expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8000/lists/1/items/1`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true }),
        });

        await waitFor(() => {
            expect(getData).toHaveBeenCalledTimes(1);
        });
    });



})