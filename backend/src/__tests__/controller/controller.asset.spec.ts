import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

import { generateToken } from '../../service/utils/generateToken';

import assetService from '../../service/service.asset';

import allAssetsMock from './mock/asset/allAssets';

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
            expect(JSON.parse(response.text)).toEqual(allAssetsMock);
            done();
          });
      });

      it('should return status 401, when token isn\'t provided', (done) => {
        request(app)
          .get('/ativos')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(JSON.parse(response.text)).toHaveProperty('message', 'Token não encontrado.');
            done();
          });
      });

      it('should return status 401, when token is invalid', (done) => {
        request(app)
          .get('/ativos')
          .expect(StatusCodes.UNAUTHORIZED)
          .set('Authorization', 'token')
          .then((response) => {
            expect(JSON.parse(response.text)).toHaveProperty('message', 'Token inválido.');
            done();
          });
      });
    });
  });
});
