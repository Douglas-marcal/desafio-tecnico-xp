import { StatusCodes } from 'http-status-codes';
import clientService, { clientModel } from '../../service/service.client';

import createClientMock from './mock/client/createClient';

describe('Tests client service', () => {
  describe('when client service', () => {
    describe('call function getAllAssets', () => {
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
  });
});
