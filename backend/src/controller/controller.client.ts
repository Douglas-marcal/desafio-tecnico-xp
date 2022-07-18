import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import clientService from '../service/service.client';

async function createClient(request: Request, response: Response): Promise<void> {
  const { body } = request;

  await clientService.createClient(body);

  const message = {
    message: 'Cliente registrado',
  };

  response.status(StatusCodes.CREATED).json(message);
}

async function loginClient(request: Request, response: Response): Promise<void> {
  const { body } = request;

  const token = await clientService.loginClient(body);

  response.status(StatusCodes.OK).json({ token });
}

export default {
  createClient,
  loginClient,
};
