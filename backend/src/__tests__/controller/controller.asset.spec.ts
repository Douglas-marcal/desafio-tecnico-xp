import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

import { generateToken } from '../../service/utils/generateToken';

import assetService from '../../service/service.asset';

import allAssetsMock from './mock/asset/allAssets';
import registerAssetMock from './mock/asset/registerAsset';
import assetMock from './mock/asset/uniqueAsset';

describe('Tests asset routes', () => {
  describe('when asset routes', () => {
    describe('call /ativos', () => {
      jest
        .spyOn(assetService, 'getAllAssets')
        .mockResolvedValue(allAssetsMock);

      const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

      it('should return status 200, when token is valid', (done) => {
        request(app)
          .get('/ativos')
          .set('Authorization', token)
          .expect(StatusCodes.OK)
          .then((response) => {
            expect(response.body).toEqual(allAssetsMock);
            done();
          });
      });

      it('should return status 401, when token isn\'t provided', (done) => {
        request(app)
          .get('/ativos')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body).toHaveProperty('message', 'Token não encontrado.');
            done();
          });
      });

      it('should return status 401, when token is invalid', (done) => {
        request(app)
          .get('/ativos')
          .expect(StatusCodes.UNAUTHORIZED)
          .set('Authorization', 'token')
          .then((response) => {
            expect(response.body).toHaveProperty('message', 'Token inválido.');
            done();
          });
      });
    });

    describe('call /ativos/registrar', () => {
      jest
        .spyOn(assetService, 'registerAsset')
        .mockResolvedValue(registerAssetMock);

      it('should register an asset', (done) => {
        const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

        request(app)
          .post('/ativos/registrar')
          .send({
            QtdeAtivo: 40,
            NomeAtivo: 'TEST',
            Valor: 6.97,
          })
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect(StatusCodes.CREATED)
          .then((response) => {
            expect(response.body).toEqual(registerAssetMock);

            done();
          });
      });
    });

    describe('call /ativos/:codAtivo', () => {
      jest
        .spyOn(assetService, 'getByAssetCode')
        .mockResolvedValue(assetMock);

      const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

      it('should get an asset', (done) => {
        request(app)
          .get('/ativos/4')
          .set('Authorization', token)
          .expect(StatusCodes.OK)
          .then((response) => {
            expect(response.body).toEqual(assetMock);

            done();
          });
      });

      it('should get an asset', (done) => {
        request(app)
          .get('/ativos/string')
          .set('Authorization', token)
          .expect(StatusCodes.NOT_FOUND)
          .then((response) => {
            expect(response.body).toHaveProperty('message', 'Rota não encontrada.');

            done();
          });
      });
    });
  });
});
