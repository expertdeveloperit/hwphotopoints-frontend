import { HWPhotosPointPage } from './app.po';

describe('hwphotos-point App', () => {
  let page: HWPhotosPointPage;

  beforeEach(() => {
    page = new HWPhotosPointPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
