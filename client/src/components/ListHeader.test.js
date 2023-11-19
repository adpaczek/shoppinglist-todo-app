import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListHeader from './ListHeader';

describe('ListHeader Component', () => {

    it('renders the list name', () => {
        const { getByText } = render(<ListHeader listName="Shopping List" />);
        const listNameElement = getByText('Shopping List');
        expect(listNameElement).toBeInTheDocument();
    });

    it('displays "ADD NEW LIST" button', () => {
        const { getByText } = render(<ListHeader listName="Shopping List" />);
        const addButton = getByText('ADD NEW LIST');
        expect(addButton).toBeInTheDocument();
    });

    it('displays "SIGN OUT" button', () => {
        const { getByText } = render(<ListHeader listName="Shopping List" />);
        const signOutButton = getByText('SIGN OUT');
        expect(signOutButton).toBeInTheDocument();
    });

    it('clicking "ADD NEW LIST" button sets showModal to true', () => {
        const { getByText } = render(<ListHeader listName="Shopping List" />);
        const addButton = getByText('ADD NEW LIST');
        fireEvent.click(addButton);
        const modal = document.querySelector('.modal');
        expect(modal).toBeInTheDocument();
    });

});
