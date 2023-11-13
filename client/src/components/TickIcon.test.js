import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import TickIcon from './TickIcon';

describe('TickIcon Component', () => {

    test('should render the TickIcon component', () => {
        const { container } = render(<TickIcon />);
        const svgElement = container.querySelector('svg');

        expect(svgElement).toBeInTheDocument();
    });

    test('should have the correct attributes in the SVG element', () => {
        const { container } = render(<TickIcon />);
        const svgElement = container.querySelector('svg');

        expect(svgElement).toHaveAttribute('xmlns', 'http://www.w3.org/2000/svg');
        expect(svgElement).toHaveAttribute('width', '25');
        expect(svgElement).toHaveAttribute('height', '25');
        expect(svgElement).toHaveAttribute('viewBox', '0 0 512 512');
    });

    test('should render the path element for the tick icon', () => {
        const { container } = render(<TickIcon />);
        const pathElement = container.querySelector('path');

        expect(pathElement).toBeInTheDocument();
    });

    test('should render the polyline element for the tick icon', () => {
        const { container } = render(<TickIcon />);
        const polylineElement = container.querySelector('polyline');

        expect(polylineElement).toBeInTheDocument();
    });


})