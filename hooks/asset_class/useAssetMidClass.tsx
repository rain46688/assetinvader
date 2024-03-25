import * as React from "react";
import { sendGet } from "@/utils/fetch";
import { AssetClassData } from "@/redux/asset_class/AssetClass";
import { mid_class_name } from "@/redux/asset_class/AssetMidClass";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export const useAssetMidClass = (row_value: string) => {
  // custom hook 사용
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly mid_class_name[]>([]);
  const loading = open && options.length === 0;
  const [value, setValue] = React.useState<mid_class_name | null>(null);

  React.useEffect(() => {
    setValue({
      name: row_value,
    });
  }, []);

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
        let mid_class_names: any = [];
        if (res.status === "success") {
          const list = res.data;
          // 데이터 변환
          mid_class_names = list.map((item: AssetClassData) => ({
            name: item.asset_mid_class,
          }));

          // 중복된 name 값을 제거하기 위해 Set을 활용
          const uniqueNames = Array.from(
            new Set(mid_class_names.map((item: mid_class_name) => item.name))
          );

          // 중복 제거된 name 값을 기반으로 중복 제거된 객체 배열 생성
          mid_class_names = uniqueNames.map((name) => ({ name }));
          console.log("mid_class_names : ", mid_class_names);
        } else {
          mid_class_names = [{ name: "값 없음" }];
        }
        setOptions([...mid_class_names]);
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
    value,
    setValue,
    open,
    setOpen,
    options,
    loading
  };
};
