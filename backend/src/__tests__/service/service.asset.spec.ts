import assetService, { assetModel } from '../../service/service.asset';

import allAssetsMock from './mock/allAssets';

describe('Tests asset service', () => {
  describe('when asset model', () => {
    describe('call function getAllAssets', () => {
      it('should return all assets', async () => {
        jest.spyOn(assetModel, 'getAllAssets').mockResolvedValue(allAssetsMock.input);

        const assets = await assetService.getAllAssets();

        expect(assets).toEqual(allAssetsMock.output);
      });
    });
  });
});
