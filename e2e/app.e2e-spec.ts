import { RaspberryServerPage } from './app.po';

describe('raspberry-server App', () => {
  let page: RaspberryServerPage;

  beforeEach(() => {
    page = new RaspberryServerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
