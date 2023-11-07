import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ItemModal from './ItemModal.js';

describe('ItemModal Component', () => {
    it('should render the component with default state', () => {
        const { getByText } = render(<ItemModal />);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });
})
