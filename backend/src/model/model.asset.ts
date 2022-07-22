import { Asset } from '../interface';
import { Context, prismaContext } from './context';

class AssetModel {
  static context: Context;

  constructor(context: Context = prismaContext) {
    AssetModel.context = context;
  }

  public getAllAssets() {
    return AssetModel.context.prisma.ativo.findMany();
  }

  public getByAssetCode(assetCode: number) {
    return AssetModel.context.prisma.ativo.findUnique({
      where: {
        CodAtivo: assetCode,
      },
    });
  }

  public registerAsset(asset: Asset) {
    return AssetModel.context.prisma.ativo.create({
      data: asset,
    });
  }

  public getByAssetName(assetName: string) {
    return AssetModel.context.prisma.ativo.findUnique({
      where: {
        NomeAtivo: assetName,
      },
    });
  }

  public updateAsset(CodAtivo: number, QtdeAtivo: number) {
    return AssetModel.context.prisma.ativo.update({
      where: {
        CodAtivo,
      },
      data: {
        QtdeAtivo,
      },
    });
  }
}

export default AssetModel;
