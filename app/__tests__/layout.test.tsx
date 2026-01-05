import RootLayout from '../layout';
import { render, screen } from '@testing-library/react';

describe('RootLayout', () => {
  it('renders children inside the layout', () => {
    render(<RootLayout children={<div>InnerChild</div>} /> as any);
    expect(screen.getByText('InnerChild')).toBeInTheDocument();
  });
});