import { ValidemailPage } from './app.po';

describe('validemail App', () => {
  let page: ValidemailPage;

  beforeEach(() => {
    page = new ValidemailPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
