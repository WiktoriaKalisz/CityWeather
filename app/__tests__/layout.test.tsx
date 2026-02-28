import RootLayout from '../layout';
import { render, screen } from '@testing-library/react';

describe('RootLayout', () => {
  it('renders children inside the layout', () => {
    render(
      <RootLayout>
        <div>InnerChild</div>
      </RootLayout>
    );

    expect(screen.getByText('InnerChild')).toBeInTheDocument();
  });
});