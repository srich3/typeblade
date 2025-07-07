import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders App', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  // Check for the main heading specifically
  expect(screen.getByText('Welcome to TypeBlade')).toBeInTheDocument();
  // Check for the navbar logo
  expect(screen.getByText('TypeBlade')).toBeInTheDocument();
});
