import { SynapsPicsUtils } from './synaps-pics.utils';

describe('SynapsPicsUtils', () => {
  let utils: SynapsPicsUtils;

  beforeEach(() => {
    utils = new SynapsPicsUtils({
      useHttps: true,
      serviceUrl: 'img.synaps.pics'
    });
  });

  it('should return correct image url without any parameter', (done) => {
    const imagePath = '/anon/sample-image-path.jpg';

    expect(utils.getImageUrl({path: imagePath}))
      .toBe('https://img.synaps.pics/anon/sample-image-path.jpg');

    done();
  });
});
