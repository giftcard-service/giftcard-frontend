import { useEffect, useState } from "react";

import { findGiftcardList } from "../../services/GiftcardService";
import useTokens from "../../utils/useTokens";

function GiftcardList() {
  const { tokens } = useTokens();
  const [giftcardList, setGiftcardList] = useState({ items: [] as any[], links: {}, meta: {} });

  useEffect(() => {
    (async () => {
      await findGiftcardList({ tokens, query: {} }).then((res) => {
        setGiftcardList(res);
      });
    })();
  }, [tokens]);

  return (
    <div className="flex flex-col w-full items-center mx-auto p-4">
      <h1 className="pb-1 text-xl font-bold mb-2">내 상품권</h1>
      <div className="flex flex-col w-full md:w-1/3">
        {giftcardList.items.map((giftcard) => (
          <div className="flex flex-col items-center p-2 mb-5 rounded-md border-2 border-gray-500 w-full cursor-pointer">
            <div className="flex flex-row w-full items-center">
              <div className="font-bold mr-1">ID:</div>
              <div className="w-full truncate">{giftcard.id}</div>
            </div>
            <div className="flex flex-col w-full p-2 rounded-md border-2 border-gray-500">
              <div className="text-center font-bold">매장 정보</div>
              <div className="flex flex-row w-full text-sm">
                <div className="w-1/3 font-bold mr-1">매장 ID:</div>
                <div className="w-full text-right truncate">{giftcard.store.id}</div>
              </div>
              <div className="flex flex-row w-full text-sm">
                <div className="w-1/3 font-bold mr-1">매장 이름:</div>
                <div className="w-full text-right truncate">{giftcard.store.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiftcardList;
