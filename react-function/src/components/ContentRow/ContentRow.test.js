import { render, screen } from '@testing-library/react';
import ProductCheckButton from '../ProductCheckButton/ProductCheckButton';
import ProductIMGButton from '../ProductIMGButton/ProductIMGButton';
import ProductLinkButton from '../ProductLinkButton/ProductLinkButton';
import ProductPrice from '../ProductPrice/ProductPrice';
import ProductReviewCount from '../ProductReviewCount/ProductReviewCount';
import ProductSpecialPrice from '../ProductSpecialPrice/ProductSpecialPrice';
import ProductStar from '../ProductStar/ProductStar';
import ProductState from '../ProductState/ProductState';
import ProductSUPButton from '../ProductSUPButton/ProductSUPButton';
import ContentRow from './ContentRow';

describe('<ContentRow />', () => {
  it('has star, review count, state components', () => {
    render(
      <ContentRow>
        <ProductStar />
        <ProductReviewCount />
        <ProductState />
      </ContentRow>
    );

    const row = screen.getByTestId('content-row');

    expect(row.children.length).toBe(3);
  });

  it('has price, special price', () => {
    render(
      <ContentRow>
        <ProductPrice />
        <ProductSpecialPrice specialPrice={'$9.36'} />
      </ContentRow>
    );

    const row = screen.getByTestId('content-row');

    expect(row.children.length).toBe(2);
  });

  it('has link button, img down button, supplement down button, check button', () => {
    render(
      <ContentRow>
        <ProductLinkButton />
        <ProductIMGButton />
        <ProductSUPButton supplementTable={{}} />
        <ProductCheckButton />
      </ContentRow>
    );

    const row = screen.getByTestId('content-row');

    expect(row.children.length).toBe(4);
  });

  it('has margin style', () => {
    const margin = '0 0 1rem 0';

    render(<ContentRow margin={margin} />);

    const row = screen.getByTestId('content-row');

    expect(row).toHaveStyle(`margin: ${margin}`);
  });
});
