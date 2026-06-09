import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio homepage', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /vitaliy sviridyuk/i })).toBeInTheDocument();
  expect(screen.getByText(/open to software engineering roles/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /selected work across ai/i })).toBeInTheDocument();
});
