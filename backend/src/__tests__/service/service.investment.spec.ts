import { StatusCodes } from 'http-status-codes';
import investmentService, { assetModel, clientModel, investmentModel } from '../../service/service.investment';

import buyAssetMock from './mock/investment/buyAssetMock';

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
    });
  });
});
