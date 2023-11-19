import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ModalProduct from './ModalProduct';


describe('ModalProduct Component', () => {
    const mockSetShowModal = jest.fn();
    const mockGetData = jest.fn();
    const list = { id: 1, title: 'Test List', date: '2023-11-15' };
    const item = { id: 1, name: 'Example Product', quantity: 2, unit: 'pcs', completed: false };

    it('should render in add mode', () => {
        const { getByText, getByPlaceholderText } = render(
            <ModalProduct mode="add" setShowModal={mockSetShowModal} getData={mockGetData} item={item} list={list} />
        );

        expect(getByPlaceholderText('Item goes here')).toBeInTheDocument();
        expect(getByPlaceholderText('Quantity goes here')).toBeInTheDocument();
    });


    it('should handle input changes', () => {
        const { getByText, getByPlaceholderText } = render(
            <ModalProduct mode="add" setShowModal={mockSetShowModal} getData={mockGetData} item={item} list={list} />
        );

        const nameInput = getByPlaceholderText('Item goes here');
        const quantityInput = getByPlaceholderText('Quantity goes here');

        fireEvent.change(nameInput, { target: { value: 'Product' } });
        fireEvent.change(quantityInput, { target: { value: 2 } });

        expect(nameInput.value).toBe('Product');
        expect(quantityInput.value).toBe("2");
    });

    it('should call postData', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({ status: 200 });
        render(
            <ModalProduct mode="add" setShowModal={mockSetShowModal} getData={mockGetData} item={item} list={list} />);
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.click(submitButton);

        expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8000/lists/1/items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ list_id: null, name: null, quantity: null, unit: "Szt", completed: false, reference_image: null}),
        });
    });


})