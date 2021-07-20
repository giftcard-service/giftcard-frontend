import { useEffect, useState } from "react";

import { findGiftcardList } from "../../services/GiftcardService";
import useTokens from "../../utils/useTokens";
import GiftcardItem from "./GiftcardItem";

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
          <GiftcardItem giftcard={giftcard} />
        ))}
      </div>
    </div>
  );
}

export default GiftcardList;
