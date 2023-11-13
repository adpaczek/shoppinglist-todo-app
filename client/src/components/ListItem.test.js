import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ListItem from './ListItem';

describe('ListItem Component', () => {

    it('should render ListItem with item information', () => {
        const list = { id: 1, title: 'Sample List', date: '2023-12-01' };
        render(<ListItem list={list} item={null} getData={() => {}} />);

        // Sprawdź, czy komponent zawiera informacje o liście (tytuł i datę)
        expect(screen.getByText('Sample List')).toBeInTheDocument();
        expect(screen.getByText('2023-12-01')).toBeInTheDocument();
    });


})