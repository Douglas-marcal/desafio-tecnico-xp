import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import app from '../../app';

import { generateToken } from '../../service/utils/generateToken';

import clientService from '../../service/service.client';

import registerClientMock from './mock/client/registerClient';
import loginClientMock from './mock/client/loginClient';
import accountBalanceMock from './mock/client/availableBalance';
import depositMock from './mock/client/deposit';
import draftMock from './mock/client/draft';
import clientAssetsMock from './mock/client/clientAssets';
import { ClientAssetsFormatted } from '../../interface';

describe('Tests asset routes', () => {
  describe('when asset routes', () => {
    describe('call /conta/registrar', () => {
      it('should return status 201, when create client', (done) => {
        jest
          .spyOn(clientService, 'createClient')
          .mockResolvedValue(registerClientMock);

        request(app)
          .post('/conta/registrar')
          .send({
            nome: 'Test',
            email: 'test@test.com',
            senha: 'test123',
          })
          .expect(StatusCodes.CREATED)
          .then((response) => {
            expect(response.body).toHaveProperty('message', 'Cliente registrado.');
            expect(response.body).toEqual(registerClientMock);

            done();
          });
      });

      it('should return status 400, when request is sent without body', (done) => {
        request(app)
          .post('/conta/registrar')
          .expect(StatusCodes.BAD_REQUEST)
          .then((response) => {
            expect(response.body.message).toMatch(/é obrigatório/i);

            done();
          });
      });
    });

    describe('call /conta/entrar', () => {
      it('should return status 200, when client login', (done) => {
        jest
          .spyOn(clientService, 'clientLogin')
          .mockResolvedValue(loginClientMock);

        request(app)
          .post('/conta/entrar')
          .send({
            email: 'test@test.com',
            senha: 'test123',
          })
          .expect(StatusCodes.OK)
          .then((response) => {
            expect(response.body).toHaveProperty('CodCliente');
            expect(response.body).toHaveProperty('token');

            done();
          });
      });

      it('should return status 400, when request is sent without body', (done) => {
        request(app)
          .post('/conta/entrar')
          .expect(StatusCodes.BAD_REQUEST)
          .then((response) => {
            expect(response.body.message).toMatch(/é obrigatório/i);

            done();
          });
      });
    });

    describe('call /conta/saldo', () => {
      it('should return status 200, when get account balance', (done) => {
        jest
          .spyOn(clientService, 'availableBalance')
          .mockResolvedValue(accountBalanceMock);

        const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

        request(app)
          .get('/conta/saldo')
          .expect(StatusCodes.OK)
          .set('Authorization', token)
          .then((response) => {
            expect(response.body).toHaveProperty('CodCliente');
            expect(response.body).toHaveProperty('Saldo');

            done();
          });
      });

      it('should return status 401, when request is sent without token', (done) => {
        request(app)
          .get('/conta/saldo')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body.message).toMatch(/token não encontrado./i);

            done();
          });
      });

      it('should return status 401, when token is invalid', (done) => {
        request(app)
          .get('/conta/saldo')
          .set('Authorization', 'invalid_token')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body.message).toMatch(/token inválido./i);

            done();
          });
      });
    });

    describe('call /conta/deposito', () => {
      it('should return status 200, when deposit', (done) => {
        jest
          .spyOn(clientService, 'depositOrDraft')
          .mockResolvedValue(depositMock);

        const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

        request(app)
          .post('/conta/deposito')
          .send({
            Valor: 450,
          })
          .expect(StatusCodes.OK)
          .set('Authorization', token)
          .then((response) => {
            expect(response.body).toHaveProperty('CodCliente');
            expect(response.body).toHaveProperty('SaldoAnterior');
            expect(response.body).toHaveProperty('SaldoAtual');
            expect(response.body).toHaveProperty('Valor');

            done();
          });
      });

      it('should return status 400, when body isn\'t sent', (done) => {
        const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

        request(app)
          .post('/conta/deposito')
          .expect(StatusCodes.BAD_REQUEST)
          .set('Authorization', token)
          .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/é obrigatório./i);

            done();
          });
      });

      it('should return status 401, when token isn\'t sent', (done) => {
        request(app)
          .post('/conta/deposito')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/token não encontrado./i);

            done();
          });
      });

      it('should return status 401, when token is invalid', (done) => {
        request(app)
          .post('/conta/deposito')
          .set('Authorization', 'invalid_token')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/token inválido./i);

            done();
          });
      });
    });

    describe('call /conta/saque', () => {
      it('should return status 200, when draft', (done) => {
        jest
          .spyOn(clientService, 'depositOrDraft')
          .mockResolvedValue(draftMock);

        const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

        request(app)
          .post('/conta/saque')
          .send({
            Valor: 450,
          })
          .expect(StatusCodes.OK)
          .set('Authorization', token)
          .then((response) => {
            expect(response.body).toHaveProperty('CodCliente');
            expect(response.body).toHaveProperty('SaldoAnterior');
            expect(response.body).toHaveProperty('SaldoAtual');
            expect(response.body).toHaveProperty('Valor');

            done();
          });
      });

      it('should return status 400, when body isn\'t sent', (done) => {
        const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

        request(app)
          .post('/conta/saque')
          .expect(StatusCodes.BAD_REQUEST)
          .set('Authorization', token)
          .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/é obrigatório./i);

            done();
          });
      });

      it('should return status 401, when token isn\'t sent', (done) => {
        request(app)
          .post('/conta/saque')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/token não encontrado./i);

            done();
          });
      });

      it('should return status 401, when token is invalid', (done) => {
        request(app)
          .post('/conta/saque')
          .set('Authorization', 'invalid_token')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/token inválido./i);

            done();
          });
      });
    });

    describe('call /conta/ativos', () => {
      it('should return status 200 and all client assets', (done) => {
        jest
          .spyOn(clientService, 'findAllClientAssets')
          .mockResolvedValue(clientAssetsMock);

        const token = generateToken({ CodCliente: 1, email: 'test@test.com' });

        request(app)
          .get('/conta/ativos')
          .expect(StatusCodes.OK)
          .set('Authorization', token)
          .then((response) => {
            response.body.forEach((asset: ClientAssetsFormatted) => {
              expect(asset).toHaveProperty('CodCliente');
              expect(asset).toHaveProperty('CodAtivo');
              expect(asset).toHaveProperty('NomeAtivo');
              expect(asset).toHaveProperty('QtdeAtivo');
              expect(asset).toHaveProperty('Valor');
            });

            done();
          });
      });

      it('should return status 401, when token isn\'t sent', (done) => {
        request(app)
          .get('/conta/ativos')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/token não encontrado./i);

            done();
          });
      });

      it('should return status 401, when token is invalid', (done) => {
        request(app)
          .get('/conta/ativos')
          .set('Authorization', 'invalid_token')
          .expect(StatusCodes.UNAUTHORIZED)
          .then((response) => {
            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toMatch(/token inválido./i);

            done();
          });
      });
    });
  });
});
