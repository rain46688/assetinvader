import * as React from "react";
import { sendGet } from "@/utils/fetch";
import { asset_name } from "@/redux/dividend/AssetName";
import { AssetClassData } from "@/redux/asset_class/AssetClass";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export const useAssetName = () => {
  // custom hook 사용
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly asset_name[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        // 세션 스토리지에 저장된 id값 가져오기
        const id = sessionStorage.getItem("id");
        const res = await sendGet("/asset/getlist_asset_class/" + id);
        let asset_names: any = [];
        if (res.status === "success") {
          const list = res.data;
          // 데이터 변환
          asset_names = list.map((item: AssetClassData) => ({
            name: item.asset_name,
          }));

          // 중복된 name 값을 제거하기 위해 Set을 활용
          const uniqueNames = Array.from(
            new Set(asset_names.map((item: asset_name) => item.name))
          );

          // 중복 제거된 name 값을 기반으로 중복 제거된 객체 배열 생성
          asset_names = uniqueNames.map((name) => ({ name }));
          console.log("asset_names : ", asset_names);
        } else {
            asset_names = [{ name: "값 없음" }];
        }
        setOptions([...asset_names]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return {
    open,
    setOpen,
    options,
    loading
  };
};
