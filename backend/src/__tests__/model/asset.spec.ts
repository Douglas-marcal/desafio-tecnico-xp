import { MockContext, Context, createMockContext } from '../../model/context';
import AssetModel from '../../model/model.asset';

import allAssetsMock from './mock/asset/allAssets';

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

    it('call function getAllAssets', async () => {
      mockContext.prisma.ativo.findMany.mockResolvedValue(allAssetsMock);

      const allAssets = await assetModel.getAllAssets();

      expect(allAssets).toEqual(allAssetsMock);
    });
  });
});
