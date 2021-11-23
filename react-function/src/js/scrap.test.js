import {
  getPage,
  getLastPageNum,
  getProductURLs,
  getProductTitle,
  getProductImageURLs,
  getProductStarAndReview,
  getProductStockState,
  getProductOriginalPrice,
  getProductSpeciallPrice,
  getProductSuggestedUse,
  getProductSupTable,
  getProductInfo,
  getPageResult,
  getCanvas,
  getIMG,
  downloadFile,
  addElementToBody,
  removeElementFromBody,
  getProductOverview,
  hasProhibitedIngredients,
  hasResult,
  translate,
  downloadIMGs,
  downloadSupplement,
  getObjectURL,
  downloadExcel,
} from './scrap';

describe('scrap', () => {
  describe('search keyword', () => {
    let page;

    it('gets page', async () => {
      const URL = 'https://kr.iherb.com/search?kw=vitamin';
      page = await getPage(URL);

      expect(global.fetch).toHaveBeenCalledWith(URL);
      expect(page).toBeTruthy();
    });

    it('has result', () => {
      const result = hasResult(page);

      expect(result).toBe(true);
    });

    describe('last page number', () => {
      it('has last page number', () => {
        const lastPageNum = getLastPageNum(page);

        expect(lastPageNum).toBe(417);
      });

      it('has same current and last page number like 1', async () => {
        const URL =
          'https://kr.iherb.com/search?kw=Advanced%20Clinicals%2C%20Collagen%2C%20Instant%20Plumping%20Serum%2C%201.75%20f';
        const page = await getPage(URL);
        const lastPageNum = getLastPageNum(page);

        expect(lastPageNum).toBe(1);
      });
    });

    it('gets product URLs', () => {
      const URLs = getProductURLs(page);

      expect(URLs[0]).toBe(
        'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569'
      );
      expect(URLs.length).toBe(1);
    });

    it('gets last page number and product URLs', async () => {
      const URL = 'https://kr.iherb.com/search?kw=vitamin';
      const [lastPageNum, productURLs] = await getPageResult(URL);

      expect(lastPageNum).toBe(417);
      expect(productURLs[0]).toBe(
        'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569'
      );
      expect(productURLs.length).toBe(1);
    });
  });

  describe('get product info', () => {
    let page;

    it('gets product title', async () => {
      const URL =
        'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';
      page = await getPage(URL);
      const title = getProductTitle(page);

      expect(title).toBe(
        'California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies'
      );
    });

    it('gets product image URLs', () => {
      const URLs = getProductImageURLs(page);

      expect(URLs.length).not.toBe(0);
      expect(URLs[0]).toBe('https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg');
    });

    describe('star rate and review count', () => {
      it('has star rate and review count', () => {
        const [star, review] = getProductStarAndReview(page);

        expect(star).toBe('4.8');
        expect(review).toBe('27417');
      });

      it('has no star rate and review count', async () => {
        const URL =
          'https://www.iherb.com/pr/aurora-nutrascience-mega-liposomal-b-complex-organic-fruit-16-fl-oz-480-ml/109325';
        const page = await getPage(URL);
        const [star, review] = getProductStarAndReview(page);

        expect(star).toBeNull();
        expect(review).toBeNull();
      });
    });

    it('gets product stock state', () => {
      const state = getProductStockState(page);

      expect(state).toBe('In Stock');
    });

    describe('original price', () => {
      it('has original price', () => {
        const price = getProductOriginalPrice(page);

        expect(price).toBe('$9.00');
      });

      it('has no original price', async () => {
        const URL = 'https://kr.iherb.com/pr/nature-s-way-alive-men-s-energy-complete-multivitamin-50-tablets/24292';
        const page = await getPage(URL);
        const price = getProductOriginalPrice(page);

        expect(price).toBe('제품의 새 버전이 있습니다.');
      });
    });

    describe('special price', () => {
      it('has special price', () => {
        const price = getProductSpeciallPrice(page);

        expect(price).toBe('$4.50');
      });

      it('has no special price', async () => {
        const URL = 'https://www.iherb.com/pr/artnaturals-vitamin-c-serum-1-fl-oz-30-ml/81776';
        let noSpecialPricePage = await getPage(URL);
        const price = getProductSpeciallPrice(noSpecialPricePage);

        expect(price).toBeNull();
      });
    });

    it('gets suggested use', () => {
      const price = getProductSuggestedUse(page);
      const str =
        'Adults and children 4 years of age or older, take 3 gummies daily, with or without food, or as directed by your qualified healthcare professional.Please ensure child chews gummies thoroughly.';

      expect(price).toBe(str);
    });

    it('gets product overview', () => {
      const overview = getProductOverview(page);

      expect(overview.includes('product overview')).toBeTruthy();
    });

    describe('supplemennt facts table', () => {
      it('has supplement facts table', () => {
        const table = getProductSupTable(page);

        expect(table.textContent.includes('Supplement Facts')).toBeTruthy();
      });

      it('has no supplement facts table', async () => {
        const URL =
          'https://kr.iherb.com/pr/azelique-serumdipity-anti-aging-retinol-vitamin-a-facial-serum-1-fl-oz-30-ml/82842?rec=iherbtest-pdp-related';
        const page = await getPage(URL);
        const table = getProductSupTable(page);

        expect(table).toBeNull();
      });
    });

    it('gets product all info', async () => {
      const URL =
        'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';
      const product = await getProductInfo(URL);

      expect(product.title).toBe(
        'California Gold Nutrition, Vitamin C Gummies, Natural Orange Flavor, Gelatin Free, 90 Gummies'
      );
      expect(product.imgURLs.length).not.toBe(0);
      expect(product.imgURLs[0]).toBe('https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg');
      expect(product.URL).toBe(
        'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569'
      );
      expect(product.star).toBe('4.8');
      expect(product.review).toBe('27417');
      expect(product.state).toBe('In Stock');
      expect(product.originalPrice).toBe('$9.00');
      expect(product.specialPrice).toBe('$4.50');
      expect(product.overview.includes('product overview')).toBeTruthy();
      expect(product.id).toBe(product.URL);

      const str =
        'Adults and children 4 years of age or older, take 3 gummies daily, with or without food, or as directed by your qualified healthcare professional.Please ensure child chews gummies thoroughly.';

      expect(product.suggestedUse).toBe(str);
      expect(product.supplementTable.textContent.includes('Supplement Facts')).toBeTruthy();
    });

    it('has prohibited ingredients', () => {
      const content = getProductTitle(page) + getProductOverview(page);
      const result = hasProhibitedIngredients(['pea'], content);

      expect(result).toBe(false);
    });
  });

  describe('download', () => {
    describe('download product images', () => {
      it('creates canvas', () => {
        const size = 1000;
        const canvas = getCanvas(size);

        expect(canvas).toBeTruthy();
        expect(canvas.width).toBe(1000);
        expect(canvas.height).toBe(1000);
      });

      it('get IMG', async () => {
        const URL = 'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg';
        Image.prototype.decode = jest.fn();
        const IMG = await getIMG(URL);

        expect(IMG.src).toBe(URL);
      });

      it('downloads by a element', () => {
        const URL = 'https://s3.images-iherb.com/cgn/cgn01092/y/165.jpg';
        const title = 'California Gold Nutrition, Bioperine 함유 CoQ10 USP, 100mg, 베지 캡슐 150정';
        const anchor = {
          href: null,
          download: null,
          click: jest.fn(),
        };

        jest.spyOn(document, 'createElement').mockReturnValue(anchor);
        jest.spyOn(anchor, 'click');

        const extension = 'jpg';
        const a = downloadFile(URL, title, extension);

        expect(a.href).toBe(URL);
        expect(a.download).toBe(`${title}.${extension}`);
        expect(anchor.click).toHaveBeenCalled();

        document.createElement.mockRestore();
      });

      it('downloads products imgages', async () => {
        const URL =
          'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';
        const product = await getProductInfo(URL);
        const spy = jest.spyOn(global.window, 'alert');

        await downloadIMGs(product.title, product.imgURLs, 1000);
        expect(spy).toHaveBeenCalledWith(`${product.title} '${product.imgURLs.length}장' 다운 완료`);
      });
    });
    describe('downlaod supplement facts imgages', () => {
      let product;

      it('appends and remove element', async () => {
        const URL =
          'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';
        product = await getProductInfo(URL);

        addElementToBody(product.supplementTable);
        expect(document.querySelector('.supplement-facts-container')).toBeTruthy();
        removeElementFromBody(product.supplementTable);
        expect(document.querySelector('.supplement-facts-container')).toBeNull();
      });

      it('downloads supplement table', async () => {
        await downloadSupplement(product.title, product.supplementTable);

        const spy = jest.spyOn(global.window, 'alert');

        expect(spy).toHaveBeenCalledWith('영양 성분 정보 다운 완료');
      });
    });
    describe('download excel file', () => {
      it('translates english to korean', async () => {
        const content = 'Nice to meet you.';
        const result = await translate(content);

        expect(result).toBe('만나서 반갑습니다.');
      });

      it('gets object URL', () => {
        const mime = {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        };
        const blob = 'blob:http://localhost:3000/f1c80972-91b1-49b2-bced-017560cc5afc';
        const buffer = [80, 75, 3, 4, 10];

        global.window.URL.createObjectURL = () => {};

        const spy = jest.spyOn(global.window.URL, 'createObjectURL').mockReturnValue(blob);
        const URL = getObjectURL(buffer, mime);

        expect(spy).toHaveBeenCalled();
        expect(URL).toBe(blob);
      });

      it('downloads excel file', async () => {
        const URL =
          'https://kr.iherb.com/pr/california-gold-nutrition-vitamin-c-gummies-natural-orange-flavor-gelatin-free-90-gummies/69569';
        const product = await getProductInfo(URL);
        const spy = jest.spyOn(global.window, 'alert');

        global.window.URL.revokeObjectURL = jest.fn();

        await downloadExcel([product]);
        expect(spy).toHaveBeenCalledWith('엑셀 출력 완료');
      });
    });
  });
});
