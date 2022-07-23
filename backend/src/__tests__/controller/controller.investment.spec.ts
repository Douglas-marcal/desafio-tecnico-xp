import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

import { generateToken } from '../../service/utils/generateToken';

import investmentService from '../../service/service.investment';

import assetPurchasedMock from './mock/investment/assetPurchased';
import assetSoldMock from './mock/investment/assetSold';

describe('Tests investment routes', () => {
  describe('when investment routes', () => {
    let token: string;

    beforeEach(() => {
      token = generateToken({ CodCliente: 1, email: 'test@test.com' });
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('call /investimentos/comprar', () => {
      it('should return status 200, when buy an asset', (done) => {
        jest
          .spyOn(investmentService, 'buyOrSellAsset')
          .mockResolvedValue(assetPurchasedMock);

        request(app)
          .post('/investimentos/comprar')
          .send({
            CodAtivo: 5,
            QtdeAtivo: 14,
          })
          .set('Authorization', token)
          .expect(StatusCodes.OK)
          .then((response) => {
            expect(response.body).toHaveProperty('message', 'Compra realizada com sucesso.');
            expect(response.body).toEqual(assetPurchasedMock);

            done();
          });
      });
    });

    describe('call /investimentos/vender', () => {
      it('should return status 200, when sell an asset', (done) => {
        jest
          .spyOn(investmentService, 'buyOrSellAsset')
          .mockResolvedValue(assetSoldMock);

        request(app)
          .post('/investimentos/vender')
          .send({
            CodAtivo: 5,
            QtdeAtivo: 14,
          })
          .set('Authorization', token)
          .expect(StatusCodes.OK)
          .then((response) => {
            expect(response.body).toHaveProperty('message', 'Venda realizada com sucesso.');
            expect(response.body).toEqual(assetSoldMock);

            done();
          });
      });
    });
  });
});
