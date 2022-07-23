import { StatusCodes } from 'http-status-codes';
import { ResponseAsset } from '../../interface';
import assetService, { assetModel } from '../../service/service.asset';

import allAssetsMock from './mock/asset/allAssets';
import uniqueAssetMock from './mock/asset/uniqueAsset';
import registerAssetMock from './mock/asset/registerAsset';

describe('Tests asset service', () => {
  describe('when asset service', () => {
    describe('call function getAllAssets', () => {
      it('should return all assets', async () => {
        jest.spyOn(assetModel, 'getAllAssets').mockResolvedValue(allAssetsMock.input);

        const assets: Array<ResponseAsset> = await assetService.getAllAssets();

        expect(assets).toEqual(allAssetsMock.output);
        assets.forEach((asset: ResponseAsset) => {
          expect(typeof asset.Valor).toBe('number');
        });
      });
    });

    describe('call function getByAssetCode', () => {
      it('should return an asset', async () => {
        jest.spyOn(assetModel, 'getByAssetCode').mockResolvedValue(uniqueAssetMock.input);

        const asset: ResponseAsset = await assetService.getByAssetCode(4);

        expect(asset).not.toBeNull();
        expect(asset).toEqual(uniqueAssetMock.output);
      });

      it('should throw exception when no asset is found', async () => {
        jest.spyOn(assetModel, 'getByAssetCode').mockResolvedValue(null);

        try {
          await assetService.getByAssetCode(404);
        } catch (error: any) {
          expect(error.message).toBe('Ativo não encontrado.');
          expect(error.status).toBe(StatusCodes.NOT_FOUND);
        }
      });
    });

    describe('call function registerAsset', () => {
      it('should return an asset', async () => {
        jest
          .spyOn(assetModel, 'getByAssetName')
          .mockResolvedValue(null);

        jest
          .spyOn(assetModel, 'registerAsset')
          .mockResolvedValue(registerAssetMock.responseDatabase);

        const asset: ResponseAsset = await assetService.registerAsset(registerAssetMock.input);

        expect(asset).not.toBeNull();
        expect(asset).toEqual(registerAssetMock.responseAsset);
      });

      it('should throw an error if asset already exists', async () => {
        jest
          .spyOn(assetModel, 'getByAssetName')
          .mockResolvedValue(registerAssetMock.responseDatabase);

        try {
          await assetService.registerAsset(registerAssetMock.input);
        } catch (error: any) {
          expect(error.message)
            .toBe('Não foi possível criar, já existe um ativo com este nome.');

          expect(error.status)
            .toBe(StatusCodes.CONFLICT);
        }
      });
    });
  });
});
