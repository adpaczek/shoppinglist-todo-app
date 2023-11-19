import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Modal from './Modal';


describe('Modal Component', () => {
    const mockSetShowModal = jest.fn();
    const mockGetData = jest.fn();
    const list = { id: 1, title: 'Test List', date: '2023-11-15' };
    const item = { id: 1, name: 'Example Product', quantity: 2, unit: 'pcs', completed: false };

    it('should render in add mode', () => {
        const { getByText, getByPlaceholderText } = render(
            <Modal mode="add" setShowModal={mockSetShowModal} getData={mockGetData} list={list} />
        );

        expect(getByText("Let's add your list:")).toBeInTheDocument();
        expect(getByPlaceholderText('Your list name goes here')).toBeInTheDocument();
        expect(getByPlaceholderText('Write planning date of purchase')).toBeInTheDocument();
    });

    it('should render in edit mode', () => {
        const { getByText, getByPlaceholderText } = render(
            <Modal mode="edit" setShowModal={mockSetShowModal} getData={mockGetData} list={list} />
        );

        expect(getByText("Let's edit your list:")).toBeInTheDocument();
        expect(getByPlaceholderText('Your list name goes here')).toBeInTheDocument();
        expect(getByPlaceholderText('Write planning date of purchase')).toBeInTheDocument();
    });

    it('should handle input changes', () => {
        const { getByPlaceholderText } = render(
            <Modal mode="add" setShowModal={mockSetShowModal} getData={mockGetData} list={list} />
        );

        const titleInput = getByPlaceholderText('Your list name goes here');
        const dateInput = getByPlaceholderText('Write planning date of purchase');

        fireEvent.change(titleInput, { target: { value: 'New List' } });
        fireEvent.change(dateInput, { target: { value: '2023-11-15' } });

        expect(titleInput.value).toBe('New List');
        expect(dateInput.value).toBe('2023-11-15');
    });

    it('should call postData', async () => {
        global.fetch = jest.fn().mockResolvedValueOnce({ status: 200 });
        render(<Modal list={list} item={item} getData={mockGetData} />);
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        fireEvent.click(submitButton);

        expect(global.fetch).toHaveBeenCalledWith(`http://localhost:8000/lists`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: null, date: null}),
        });
    });


})