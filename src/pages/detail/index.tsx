import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

import { AssetDetail } from "../../components/assetDetail";
import { Loading } from "../../components/loading";
import { getAsset } from "../../services/brapi";

import type { FormatedAssetProps, StockTypes } from "../../types/assets";

export function Detail() {
  const [asset, setAsset] = useState<FormatedAssetProps>();
  const [loading, setLoading] = useState(true);

  const { assetParam } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") as StockTypes;
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCoin() {
      if (!assetParam) {
        navigate("/");
        return;
      }

      try {
        const data = await getAsset(assetParam, type);
        setAsset(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCoin();
  }, [assetParam, type, navigate]);

  if (loading || !asset) {
    return <Loading />;
  }

  return <AssetDetail asset={asset} />;
}
