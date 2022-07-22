import { MockContext, Context, createMockContext } from '../../model/context';
import ClientModel from '../../model/model.client';

import findUniqueClientMock from './mock/client/findUniqueClient';
import createClientMock from './mock/client/createClient';
import clientBalanceMock from './mock/client/availableBalance';
import depositOrDraftMock from './mock/client/depositOrDraft';
import { Order } from '../../interface';

let mockContext: MockContext;
let context: Context;
let clientModel: ClientModel;

describe('Tests client model', () => {
  describe('when client model', () => {
    beforeEach(() => {
      mockContext = createMockContext();
      context = mockContext as unknown as Context;
      clientModel = new ClientModel(context);
    });

    describe('call method findClientByEmail', () => {
      it('should return a client by email', async () => {
        mockContext.prisma.cliente.findUnique.mockResolvedValue(findUniqueClientMock);

        const client = await clientModel.findClientByEmail('test@example.com');

        expect(typeof client).toBe('object');
        expect(client).toEqual(findUniqueClientMock);
      });

      it('should return null if client is not found', async () => {
        mockContext.prisma.cliente.findUnique.mockResolvedValue(null);

        const client = await clientModel.findClientByEmail('email@doesnotexits.com');

        expect(client).toBeNull();
      });
    });

    describe('call method findClientById', () => {
      it('should return a client by Id', async () => {
        mockContext.prisma.cliente.findUnique.mockResolvedValue(findUniqueClientMock);

        const client = await clientModel.findClientById(3);

        expect(typeof client).toBe('object');
        expect(client).toEqual(findUniqueClientMock);
      });

      it('should return null if client is not found', async () => {
        mockContext.prisma.cliente.findUnique.mockResolvedValue(null);

        const client = await clientModel.findClientById(404);

        expect(client).toBeNull();
      });
    });

    describe('call method createClient', () => {
      it('should return an object with property "CodCliente"', async () => {
        mockContext.prisma.cliente.create.mockResolvedValue(createClientMock.output);

        const client = await clientModel.createClient(createClientMock.input);

        expect(typeof client).toBe('object');
        expect(client).toHaveProperty('CodCliente', 4);
        expect(client).toEqual(createClientMock.output);
      });
    });

    describe('call method availableBalance', () => {
      it('should return available balance', async () => {
        mockContext.prisma.cliente.findUnique.mockResolvedValue(clientBalanceMock);

        await clientModel.availableBalance(7);

        expect(mockContext.prisma.cliente.findUnique).toHaveBeenCalledWith({
          where: {
            CodCliente: 7,
          },
          select: {
            CodCliente: true,
            Saldo: true,
          },
        });
      });

      it('should return null if client is not found', async () => {
        mockContext.prisma.cliente.findUnique.mockResolvedValue(null);

        const client = await clientModel.availableBalance(404);

        expect(client).toBeNull();
      });
    });

    describe('call method depositOrDraft', () => {
      it('should return available balance', async () => {
        mockContext.prisma.cliente.update.mockResolvedValue(depositOrDraftMock);

        const order: Order = {
          CodCliente: 7,
          Valor: 65.98,
        };

        await clientModel.depositOrDraft(order);

        expect(mockContext.prisma.cliente.update).toHaveBeenCalledWith({
          where: {
            CodCliente: order.CodCliente,
          },
          data: {
            Saldo: order.Valor,
          },
          select: {
            CodCliente: true,
            Saldo: true,
          },
        });
      });
    });
  });
});
