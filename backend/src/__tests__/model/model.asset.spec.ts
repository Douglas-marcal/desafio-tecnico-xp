import { MockContext, Context, createMockContext } from '../../model/context';
import AssetModel from '../../model/model.asset';

import allAssetsMock from './mock/asset/allAssets';
import byAssetCodeMock from './mock/asset/byAssetCode';
import registerAssetMock from './mock/asset/registerAsset';
import byAssetNameMock from './mock/asset/byAssetName';
import updateAssetMock from './mock/asset/updateAsset';

let mockContext: MockContext;
let context: Context;
let assetModel: AssetModel;

describe('Tests asset model', () => {
  describe('when asset model', () => {
    beforeEach(() => {
      mockContext = createMockContext();
      context = mockContext as unknown as Context;
      assetModel = new AssetModel(context);
    });

    describe('call function getAllAssets', () => {
      it('should return all assets', async () => {
        mockContext.prisma.ativo.findMany.mockResolvedValue(allAssetsMock);

        const allAssets = await assetModel.getAllAssets();

        expect(allAssets).toEqual(allAssetsMock);
      });
    });

    describe('call function getByAssetCode', () => {
      it('should return an asset', async () => {
        mockContext.prisma.ativo.findUnique.mockResolvedValue(byAssetCodeMock);

        const asset = await assetModel.getByAssetCode(1);

        expect(asset).toEqual(byAssetCodeMock);
      });

      it('should return null when no asset is found', async () => {
        mockContext.prisma.ativo.findUnique.mockResolvedValue(null);

        const asset = await assetModel.getByAssetCode(404);

        expect(asset).toBeNull();
      });
    });

    describe('call function registerAsset', () => {
      it('should return an object with a property "CodAtivo"', async () => {
        mockContext.prisma.ativo.create.mockResolvedValue(registerAssetMock.output);

        const assetCreated = await assetModel.registerAsset(registerAssetMock.input);

        expect(assetCreated).toEqual(registerAssetMock.output);
        expect(assetCreated).toHaveProperty('CodAtivo', 2);
      });
    });

    describe('call function getByAssetName', () => {
      it('should return an object', async () => {
        mockContext.prisma.ativo.findUnique.mockResolvedValue(byAssetNameMock);

        const asset = await assetModel.getByAssetName('BY_NAME');

        expect(typeof asset).toBe('object');
        expect(asset).toEqual(byAssetNameMock);
      });

      it('should return null when no asset is found', async () => {
        mockContext.prisma.ativo.findUnique.mockResolvedValue(null);

        const asset = await assetModel.getByAssetName('NOT_FOUND');

        expect(asset).toBeNull();
      });
    });

    describe('call function updateAsset', () => {
      it('should return an object', async () => {
        mockContext.prisma.ativo.update.mockResolvedValue(updateAssetMock);

        const asset = await assetModel.updateAsset(7, 357);

        expect(typeof asset).toBe('object');
        expect(asset).toEqual(updateAssetMock);
        expect(asset).toHaveProperty('QtdeAtivo', 357);
      });
    });
  });
});
