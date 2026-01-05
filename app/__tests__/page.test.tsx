import Home from '../page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('Home page', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders input and button', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByText('Check')).toBeInTheDocument();
  });

  it('calls push with trimmed input on submit', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByText('Check');

    await userEvent.type(input, '  Krakow  ');
    await userEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith('/weather/Krakow');
  });

  it('does not call push if input is empty or whitespace', async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByText('Check');

    // empty input
    await userEvent.click(button);
    expect(mockPush).not.toHaveBeenCalled();

    // whitespace input
    await userEvent.type(input, '    ');
    await userEvent.click(button);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
