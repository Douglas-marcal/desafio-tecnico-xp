import { StatusCodes } from 'http-status-codes';
import investmentService, { assetModel, clientModel, investmentModel } from '../../service/service.investment';

import buyAssetMock from './mock/investment/buyAssetMock';
import sellAssetMock from './mock/investment/sellAssetMock';

describe('Tests client service', () => {
  describe('when client service', () => {
    describe('call function buyOrSellAsset', () => {
      describe('to buy an asset', () => {
        it('should throw error when not found client', async () => {
          jest
            .spyOn(clientModel, 'findClientById')
            .mockResolvedValue(null);

          try {
            await investmentService.buyOrSellAsset(buyAssetMock.order, 'buy');
          } catch (error: any) {
            expect(error.message).toBe('Cliente não encontrado.');
            expect(error.status).toBe(StatusCodes.NOT_FOUND);
          }
        });

        it('should throw error when not found asset', async () => {
          jest
            .spyOn(clientModel, 'findClientById')
            .mockResolvedValue(buyAssetMock.client);

          jest
            .spyOn(assetModel, 'getByAssetCode')
            .mockResolvedValue(null);

          try {
            await investmentService.buyOrSellAsset(buyAssetMock.order, 'buy');
          } catch (error: any) {
            expect(error.message).toBe('Ativo não encontrado.');
            expect(error.status).toBe(StatusCodes.NOT_FOUND);
          }
        });

        it('should throw exception when there isn\'t enough asset', async () => {
          jest
            .spyOn(clientModel, 'findClientById')
            .mockResolvedValue(buyAssetMock.client);

          jest
            .spyOn(assetModel, 'getByAssetCode')
            .mockResolvedValue(buyAssetMock.assetFound);

          try {
            await investmentService.buyOrSellAsset(buyAssetMock.order, 'buy');
          } catch (error: any) {
            expect(error.message).toMatch(/Não há ativos suficientes para compra./i);
            expect(error.status).toBe(StatusCodes.FORBIDDEN);
          }
        });

        it('should buy new asset', async () => {
          jest
            .spyOn(clientModel, 'findClientById')
            .mockResolvedValue(buyAssetMock.client);

          jest
            .spyOn(assetModel, 'getByAssetCode')
            .mockResolvedValue(buyAssetMock.assetFound);

          jest
            .spyOn(assetModel, 'updateAsset')
            .mockResolvedValue(buyAssetMock.assetUpdated);

          jest
            .spyOn(investmentModel, 'verifyAssetAlreadyPurchased')
            .mockResolvedValue(null);

          jest
            .spyOn(investmentModel, 'buyNewAsset')
            .mockResolvedValue(buyAssetMock.assetPurchased);

          const response = await investmentService.buyOrSellAsset(buyAssetMock.buyOrder, 'buy');

          expect(response).toHaveProperty('message', 'Compra realizada com sucesso.');
        });
      });

      describe('to sell an asset', () => {
        it('should throw an exception if client doesn\'t have asset', async () => {
          jest
            .spyOn(clientModel, 'findClientById')
            .mockResolvedValue(sellAssetMock.client);

          jest
            .spyOn(assetModel, 'getByAssetCode')
            .mockResolvedValue(sellAssetMock.assetFound);

          jest
            .spyOn(investmentModel, 'verifyAssetAlreadyPurchased')
            .mockResolvedValue(null);

          try {
            await investmentService.buyOrSellAsset(sellAssetMock.order, 'sell');
          } catch (error: any) {
            expect(error.message).toMatch(/Você não possui este ativo/i);
            expect(error.status).toBe(StatusCodes.FORBIDDEN);
          }
        });

        it('should throw an exception if client doesn\'t have asset enough to sell', async () => {
          jest
            .spyOn(clientModel, 'findClientById')
            .mockResolvedValue(sellAssetMock.client);

          jest
            .spyOn(assetModel, 'getByAssetCode')
            .mockResolvedValue(sellAssetMock.assetFound);

          jest
            .spyOn(investmentModel, 'verifyAssetAlreadyPurchased')
            .mockResolvedValue(sellAssetMock.assetPurchased);

          try {
            await investmentService.buyOrSellAsset(sellAssetMock.order, 'sell');
          } catch (error: any) {
            expect(error.message).toMatch(/Não há ativos suficientes para vender/i);
            expect(error.status).toBe(StatusCodes.FORBIDDEN);
          }
        });

        it('should sell an asset', async () => {
          jest
            .spyOn(clientModel, 'findClientById')
            .mockResolvedValue(sellAssetMock.client);

          jest
            .spyOn(assetModel, 'getByAssetCode')
            .mockResolvedValue(sellAssetMock.assetFound);

          jest
            .spyOn(investmentModel, 'verifyAssetAlreadyPurchased')
            .mockResolvedValue(sellAssetMock.assetPurchased);

          jest
            .spyOn(assetModel, 'updateAsset')
            .mockResolvedValue(sellAssetMock.assetUpdated);

          jest
            .spyOn(investmentModel, 'updatePurchase')
            .mockResolvedValue(sellAssetMock.updatedAssetSold);

          const response = await investmentService.buyOrSellAsset(sellAssetMock.sellOrder, 'sell');

          expect(response).toHaveProperty('message', 'Venda realizada com sucesso.');
          expect(response).toHaveProperty('QtdeAtivo', 4);
        });
      });
    });
  });
});
