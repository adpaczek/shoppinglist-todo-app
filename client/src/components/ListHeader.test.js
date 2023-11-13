import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
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

    /*it('clicking "SIGN OUT" button calls signOut function', async() => {
        const removeCookieMock = jest.fn();
        jest.spyOn(ListHeader, 'signOut', 'get').mockReturnValue(removeCookieMock);
        const { getByText } = render(<ListHeader listName="Shopping List" />);
        const signOutButton = getByText('SIGN OUT');
        ListHeader.signOut = signOutMock;
        fireEvent.click(signOutButton);
        expect(signOutMock).toHaveBeenCalled();
    });*/

    /*it('should log "signout" when signOut is called', () => {
        const { getByText } = render(<ListHeader listName="Shopping List" />);
        const signOutButton = getByText('SIGN OUT');

        fireEvent.click(signOutButton);

        // Sprawdza, czy console.log zostało wywołane z oczekiwanym tekstem
        expect(logMock).toHaveBeenCalledWith('signout');

        // Czyszczenie mocka po zakończeniu testu
        logMock.mockRestore();
    });*/
})