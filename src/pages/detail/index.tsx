import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { AssetDetail } from "../../components/assetDetail";
import { Loading } from "../../components/loading";
import { getAsset } from "../../services/brapi";

import type { FormatedAssetProps } from "../../types/assets";

export function Detail() {
  const [asset, setAsset] = useState<FormatedAssetProps>();
  const [loading, setLoading] = useState(true);

  const { assetParam } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCoin() {
      if (!assetParam) {
        navigate("/");
        return;
      }

      try {
        const data = await getAsset(assetParam);
        setAsset(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCoin();
  }, [assetParam, navigate]);

  if (loading || !asset) {
    return <Loading frase={"Carregando detalhes..."} />;
  }

  return <AssetDetail asset={asset} />;
}
