import { AssetPurchaseOrder } from '../interface';
import { Context, prismaContext } from './context';

class InvestmentModel {
  static context: Context;

  constructor(context: Context = prismaContext) {
    InvestmentModel.context = context;
  }

  public buyNewAsset(asset: AssetPurchaseOrder) {
    return InvestmentModel.context.prisma.ativo_Cliente.create({
      data: asset,
    });
  }

  public verifyAssetAlreadyPurchased(CodCliente: number, CodAtivo: number) {
    return InvestmentModel.context.prisma.ativo_Cliente.findUnique({
      where: {
        CodCliente_CodAtivo: {
          CodCliente,
          CodAtivo,
        },
      },
    });
  }

  public updatePurchase(order: AssetPurchaseOrder) {
    const { CodAtivo, CodCliente, QtdeAtivo } = order;

    return InvestmentModel.context.prisma.ativo_Cliente.update({
      where: {
        CodCliente_CodAtivo: {
          CodCliente,
          CodAtivo,
        },
      },
      data: {
        QtdeAtivo,
      },
    });
  }
}

export default InvestmentModel;
