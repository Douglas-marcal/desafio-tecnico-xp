import { StatusCodes } from 'http-status-codes';

import clientService, { clientModel } from '../../service/service.client';

import createClientMock from './mock/client/createClient';
import loginMock from './mock/client/login';
import balanceMock from './mock/client/availableBalance';
import depositOrDraftMock from './mock/client/depositOrDraft';

import { ResponseAccountBalance } from '../../interface';

describe('Tests client service', () => {
  describe('when client service', () => {
    describe('call function createClient', () => {
      it('should create a client', async () => {
        jest
          .spyOn(clientModel, 'findClientByEmail')
          .mockResolvedValue(null);

        jest
          .spyOn(clientModel, 'createClient')
          .mockResolvedValue(createClientMock.client);

        const clientCreated = await clientService.createClient(createClientMock.input);

        expect(clientCreated).toHaveProperty('message', 'Cliente registrado.');
        expect(clientCreated).toEqual(createClientMock.output);
      });

      it('should throw an error if client already exists', async () => {
        jest
          .spyOn(clientModel, 'findClientByEmail')
          .mockResolvedValue(createClientMock.client);

        try {
          await clientService.createClient(createClientMock.input);
        } catch (error: any) {
          expect(error.message).toBe('Cliente já registrado.');

          expect(error.status).toBe(StatusCodes.CONFLICT);
        }
      });
    });

    describe('call function clientLogin', () => {
      it('should authenticate a client', async () => {
        jest
          .spyOn(clientModel, 'findClientByEmail')
          .mockResolvedValue(loginMock.client);

        jest
          .spyOn(clientModel, 'createClient')
          .mockResolvedValue(createClientMock.client);

        const clientAuthenticated = await clientService.clientLogin(loginMock.credentials);

        expect(clientAuthenticated).toHaveProperty('token');
      });

      it('should throw an exception if client doesn\'t exists', async () => {
        jest
          .spyOn(clientModel, 'findClientByEmail')
          .mockResolvedValue(null);

        try {
          await clientService.clientLogin(loginMock.credentials);
        } catch (error: any) {
          expect(error.message).toBe('Cliente não existe.');

          expect(error.status).toBe(StatusCodes.NOT_FOUND);
        }
      });

      it('should throw an exception if credential are incorrect', async () => {
        jest
          .spyOn(clientModel, 'findClientByEmail')
          .mockResolvedValue(loginMock.client);

        try {
          await clientService.clientLogin(loginMock.wrongCredential);
        } catch (error: any) {
          expect(error.message).toBe('Email ou senha inválidos.');

          expect(error.status).toBe(StatusCodes.FORBIDDEN);
        }
      });
    });

    describe('call function availableBalance', () => {
      it('should return client account balance', async () => {
        jest
          .spyOn(clientModel, 'availableBalance')
          .mockResolvedValue(balanceMock.accountBalance);

        const availableBalance: ResponseAccountBalance = await clientService.availableBalance(9);

        expect(availableBalance).toEqual(balanceMock.responseAccountBalance);
      });

      it('should throw an exception if internal server error', async () => {
        jest
          .spyOn(clientModel, 'availableBalance')
          .mockResolvedValue(null);

        try {
          await clientService.availableBalance(6);
        } catch (error: any) {
          expect(error.message).toBe('Saldo indisponível.');

          expect(error.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
        }
      });
    });

    describe('call function depositOrDraft', () => {
      it('should return report about deposit', async () => {
        jest
          .spyOn(clientModel, 'availableBalance')
          .mockResolvedValue(depositOrDraftMock.responseAccountBalance);

        jest
          .spyOn(clientModel, 'depositOrDraft')
          .mockResolvedValue(depositOrDraftMock.orderUpdated);

        const orderResponse = await clientService.depositOrDraft(depositOrDraftMock.deposit, 'deposit');

        expect(orderResponse).toEqual(depositOrDraftMock.orderResponse);
      });

      it('should throw an exception "Saldo insuficiente."', async () => {
        jest
          .spyOn(clientModel, 'availableBalance')
          .mockResolvedValue(depositOrDraftMock.responseAccountBalance);

        try {
          await clientService.depositOrDraft(depositOrDraftMock.draft, 'draft');
        } catch (error: any) {
          expect(error.message).toBe('Saldo insuficiente.');

          expect(error.status).toBe(StatusCodes.FORBIDDEN);
        }
      });
    });
  });
});
