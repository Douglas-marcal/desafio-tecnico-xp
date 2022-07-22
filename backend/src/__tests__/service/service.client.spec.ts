import { StatusCodes } from 'http-status-codes';

import clientService, { clientModel } from '../../service/service.client';

import createClientMock from './mock/client/createClient';
import loginMock from './mock/client/login';

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
  });
});
