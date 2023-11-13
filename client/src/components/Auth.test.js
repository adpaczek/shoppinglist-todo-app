import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Auth from './Auth';


describe('Auth Component', () => {

    it('should render the component with default state', () => {
        const { getByText, getByPlaceholderText } = render(<Auth/>);

        expect(getByText('Please log in:')).toBeInTheDocument();
        expect(getByPlaceholderText('email')).toBeInTheDocument();
        expect(getByPlaceholderText('password')).toBeInTheDocument();
    });

    it('can switch between login to signup view', () => {
        const { getByText, getByPlaceholderText } = render(<Auth />);
        const signupButton = getByText('Sign Up');

        fireEvent.click(signupButton);

        expect(getByText('Please sign up:')).toBeInTheDocument();
        expect(getByPlaceholderText('email')).toBeInTheDocument();
        expect(getByPlaceholderText('password')).toBeInTheDocument();
        expect(getByPlaceholderText('confirm password')).toBeInTheDocument();
    });

    it('can switch between signup to login view', () => {
        const { getByText } = render(<Auth />);
        const loginButton = getByText('Login');

        fireEvent.click(loginButton);

        expect(getByText('Please log in:')).toBeInTheDocument();
    });

    it('should update component state when input fields are filled', () => {
        const { getByPlaceholderText } = render(<Auth />);
        const emailInput = getByPlaceholderText('email');
        const passwordInput = getByPlaceholderText('password');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, {target: {value: 'password123'}});

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    })

    it('should display an error message if passwords do not match during registration', () => {
        const { getByPlaceholderText, getByText } = render(<Auth />);
        const signupButton = getByText('Sign Up');
        fireEvent.click(signupButton);
        const passwordInput = getByPlaceholderText('password');
        const confirmPasswordInput = getByPlaceholderText('confirm password');
        const createButton = screen.getByRole('button', { name: /submit/i });

        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'differentPassword' } });

        fireEvent.click(createButton);

        const errorMessage = getByText('Make sure password match!');
        expect(errorMessage).toBeInTheDocument();
    });

    it('should handle successful login', () => {
        render(<Auth />);

        const emailInput = screen.getByPlaceholderText('email');
        const passwordInput = screen.getByPlaceholderText('password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        fireEvent.click(loginButton);
    });

    it('should handle failed login', async () => {
        render(<Auth />);
        const emailInput = screen.getByPlaceholderText('email');
        const passwordInput = screen.getByPlaceholderText('password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });

        fireEvent.click(loginButton);

        await waitFor(async () => {
            //co tutaj?
        });


    });


});