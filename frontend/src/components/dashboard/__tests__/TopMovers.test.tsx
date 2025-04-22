import { render, screen } from '@testing-library/react';
import { TopMovers } from '../TopMovers';

describe('TopMovers', () => {
  it('renders all token cards', () => {
    render(<TopMovers />);
    
    // Check if all token symbols are rendered
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('ARB')).toBeInTheDocument();
    expect(screen.getByText('SOL')).toBeInTheDocument();
    expect(screen.getByText('LINK')).toBeInTheDocument();
    expect(screen.getByText('MATIC')).toBeInTheDocument();
  });

  it('displays correct price changes with colors', () => {
    render(<TopMovers />);
    
    // Check positive change (green)
    const ethChange = screen.getByText('+5.67%');
    expect(ethChange).toHaveClass('text-green-600');
    
    // Check negative change (red)
    const arbChange = screen.getByText('-3.21%');
    expect(arbChange).toHaveClass('text-red-600');
  });

  it('formats volumes correctly', () => {
    render(<TopMovers />);
    
    // Check billion format
    expect(screen.getByText('Vol: $15.23B')).toBeInTheDocument();
    
    // Check million format
    expect(screen.getByText('Vol: $987.65M')).toBeInTheDocument();
  });

  it('displays prices with correct formatting', () => {
    render(<TopMovers />);
    
    // Check price formatting
    expect(screen.getByText('$3,521.45')).toBeInTheDocument();
    expect(screen.getByText('$1.85')).toBeInTheDocument();
    expect(screen.getByText('$125.78')).toBeInTheDocument();
  });
}); 