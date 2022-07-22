import { MockContext, Context, createMockContext } from '../../model/context';
import InvestmentModel from '../../model/model.investment';

import buyNewAssetMock from './mock/investment/buyNewAsset';
import verifyAssetAlreadyPurchasedMock from './mock/investment/verifyAssetAlreadyExists';
import updatePurchaseMock from './mock/investment/updatePurchase';

let mockContext: MockContext;
let context: Context;
let investmentModel: InvestmentModel;

describe('Tests client model', () => {
  describe('when client model', () => {
    beforeEach(() => {
      mockContext = createMockContext();
      context = mockContext as unknown as Context;
      investmentModel = new InvestmentModel(context);
    });

    describe('call function buyNewAsset', () => {
      it('should return asset purchased', async () => {
        mockContext
          .prisma
          .ativo_Cliente
          .create
          .mockResolvedValue(buyNewAssetMock);

        const assetPurchased = await investmentModel.buyNewAsset(buyNewAssetMock);

        expect(mockContext.prisma.ativo_Cliente.create).toHaveBeenCalledWith({
          data: buyNewAssetMock,
        });
        expect(assetPurchased).toEqual(buyNewAssetMock);
      });
    });

    describe('call function verifyAssetAlreadyPurchased', () => {
      it('should return an asset that has already been purchased', async () => {
        mockContext
          .prisma
          .ativo_Cliente
          .findUnique
          .mockResolvedValue(verifyAssetAlreadyPurchasedMock);

        const assetPurchased = await investmentModel.verifyAssetAlreadyPurchased(5, 2);

        expect(mockContext.prisma.ativo_Cliente.findUnique).toHaveBeenCalledWith({
          where: {
            CodCliente_CodAtivo: {
              CodCliente: 5,
              CodAtivo: 2,
            },
          },
        });
        expect(assetPurchased).toEqual(verifyAssetAlreadyPurchasedMock);
      });

      it('should return null if asset is not found', async () => {
        mockContext
          .prisma
          .ativo_Cliente
          .findUnique
          .mockResolvedValue(null);

        const assetPurchased = await investmentModel.verifyAssetAlreadyPurchased(5, 404);

        expect(assetPurchased).toBeNull();
      });
    });

    describe('call function updatePurchase', () => {
      it('should return an asset updated', async () => {
        mockContext
          .prisma
          .ativo_Cliente
          .update
          .mockResolvedValue(updatePurchaseMock);

        const assetPurchased = await investmentModel.updatePurchase(updatePurchaseMock);

        expect(mockContext.prisma.ativo_Cliente.update).toHaveBeenCalledWith({
          where: {
            CodCliente_CodAtivo: {
              CodCliente: 7,
              CodAtivo: 5,
            },
          },
          data: {
            QtdeAtivo: 697,
          },
        });

        expect(assetPurchased).toEqual(updatePurchaseMock);
      });
    });
  });
});
