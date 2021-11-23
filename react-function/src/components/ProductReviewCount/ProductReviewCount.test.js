import { render, screen } from '@testing-library/react';
import ProductReviewCount from './ProductReviewCount';

describe('<ProductReviewCount />', () => {
  it('has review count', () => {
    const review = '73654';

    render(<ProductReviewCount review={review} />);

    const productReview = screen.getByTitle('review-count');

    expect(productReview.textContent).toBe(`👨‍👩‍👦‍👦${review}`);
  });

  it('has no review count', () => {
    const review = null;

    render(<ProductReviewCount review={review} />);

    const productReview = screen.getByTitle('review-count');

    expect(productReview.textContent).toBe(`👨‍👩‍👦‍👦${0}`);
  });
});
