/*import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import fetchMock from 'fetch-mock';

describe('App Component', () => {
    beforeAll(() => {
        // Konfiguracja mocka do obsługi żądań HTTP
        fetchMock.get('http://localhost:8000/lists/test@example.com', {
            status: 200,
            body: [{ id: 1, name: 'Shopping list 1', date: '2023-01-01' }],
        });
    });

    afterAll(() => {
        // Przywróć oryginalne zachowanie sieci po zakończeniu testów
        fetchMock.restore();
    });

    it('should render the component with Auth when not authenticated', () => {
        render(<App />);
        expect(screen.getByText('Please log in:')).toBeInTheDocument();
    });

});*/
