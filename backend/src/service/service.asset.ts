import assetModel from '../model/model.asset';

function getByAssetCode(assetCode: number) {
  return assetModel.getByAssetCode(assetCode);
}

export default {
  getByAssetCode,
};
