import { LibraryBisPage } from './app.po';

describe('library-bis App', () => {
  let page: LibraryBisPage;

  beforeEach(() => {
    page = new LibraryBisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
