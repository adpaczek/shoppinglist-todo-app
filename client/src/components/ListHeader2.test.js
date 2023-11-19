import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ListHeader from './ListHeader';
import { useCookies } from 'react-cookie';

jest.mock('react-cookie', () => ({
    useCookies: jest.fn(),
}));

describe('ListHeader Part 2', () => {
    it('signOut function removes cookies and reloads the page', () => {
        const setCookie = jest.fn();
        const removeCookie = jest.fn();
        useCookies.mockReturnValue([null, setCookie, removeCookie]);

        const { getByText } = render(<ListHeader listName="Test List" />);
        const signOutButton = getByText('SIGN OUT');

        fireEvent.click(signOutButton);

        expect(removeCookie).toHaveBeenCalledWith('Email');
        expect(removeCookie).toHaveBeenCalledWith('AuthToken');
    });
});