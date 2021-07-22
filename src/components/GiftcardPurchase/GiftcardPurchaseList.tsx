import { useEffect, useState } from "react";

import { findGiftcardPurchaseList } from "../../services/GiftcardPurchaseService";
import useTokens from "../../utils/useTokens";
import GiftcardPurchaseItem from "./GiftcardPurchaseItem";

function GiftcardPurchaseList() {
  const { tokens } = useTokens();
  const [giftcardPurchaseList, setGiftcardPurchaseList] = useState({ items: [] as any[], links: {}, meta: {} });

  useEffect(() => {
    (async () => {
      await findGiftcardPurchaseList({ tokens, query: {} }).then((res) => {
        setGiftcardPurchaseList(res);
      });
    })();
  }, [tokens]);

  return (
    <div className="flex flex-col w-full items-center mx-auto p-4">
      <h1 className="pb-1 text-xl font-bold mb-2">내 상품권 이용 내역</h1>
      <div className="flex flex-col w-full md:w-1/3">
        {giftcardPurchaseList.items.map((giftcardPurchase) => (
          <GiftcardPurchaseItem giftcardPurchase={giftcardPurchase} />
        ))}
      </div>
    </div>
  );
}

export default GiftcardPurchaseList;
