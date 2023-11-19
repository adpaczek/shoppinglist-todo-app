import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ListItem from './ListItem';
import ListHeader from "./ListHeader";
import ProductItem from './ProductItem'; // Upewnij się, że ścieżka jest poprawna


describe('ListItem Component', () => {
    const list = { id: 1, title: 'Test List', date: '2023-11-15' };
    const item = { id: 1, name: 'Test Item', quantity: 3, unit: "Szt" };
    const getData = jest.fn();

    it('should render ListItem component', () => {
        const { getByText, getByRole } = render(
            <ListItem list={list} item={item} getData={getData} />
        );

        expect(getByText('Test List')).toBeInTheDocument();
        expect(getByText('2023-11-15')).toBeInTheDocument();
        expect(getByRole('button', { name: /ADD ITEM/i })).toBeInTheDocument();
        expect(getByRole('button', { name: /EDIT/i })).toBeInTheDocument();
        expect(getByRole('button', { name: /DELETE/i })).toBeInTheDocument();
    });

    it('clicking "ADD ITEM" button sets showModal2 to true', () => {
        const { getByText } = render(<ListItem list={list} item={item} getData={getData} />);
        const addButton = getByText('ADD ITEM');
        fireEvent.click(addButton);
        const modal = document.querySelector('.modal');
        expect(modal).toBeInTheDocument();
    });

    it('clicking "EDIT" button sets showModal to true', () => {
        const { getByText } = render(<ListItem list={list} item={item} getData={getData} />);
        const addButton = getByText('EDIT');
        fireEvent.click(addButton);
        const modal = document.querySelector('.modal');
        expect(modal).toBeInTheDocument();
    });


    it('should call deleteItem and getData when "DELETE" button is clicked', async () => {
        const deleteItemMock = jest.fn();
        global.fetch = jest.fn().mockResolvedValueOnce({ status: 200 });
        render(<ListItem list={list} item={item} getData={getData} />);
        const deleteButton = screen.getByRole('button', { name: /DELETE/i });

        fireEvent.click(deleteButton);

        //expect(deleteItemMock).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8000/lists/1`, {
            method: 'DELETE',
        });
        await waitFor(() => {
            expect(getData).toHaveBeenCalledTimes(1);
        });
    });

    it('should handle errors by logging to console', async() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        global.fetch = jest.fn().mockRejectedValueOnce(new Error('Network error'));
        render(<ListItem list={list} item={item} getData={getData} />);
        const deleteButton = screen.getByRole('button', { name: /DELETE/i });

        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(new Error('Network error'));
        });

    });


});
