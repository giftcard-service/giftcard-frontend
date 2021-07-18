import { useState } from "react";

function GiftcardList() {
  const [giftcards] = useState({
    count: 0,
    result: [
      { id: 1, store: { id: 1, name: "현대백화점" } },
      { id: 2, store: { id: 4, name: "신세계백화점" } },
      { id: 3, store: { id: 2, name: "롯데시네마" } },
      { id: 4, store: { id: 3, name: "롯데백화점" } },
      { id: 5, store: { id: 4, name: "신세계백화점" } },
    ],
  });

  return (
    <div className="flex flex-col w-full items-center mx-auto">
      <h1 className="pb-1 text-xl font-bold mb-3">내 상품권</h1>
      <div className="flex flex-col">
        {giftcards.result.map((giftcard) => (
          <div className="flex flex-col items-center p-2 mb-3 rounded-md border-2 border-gray-500 w-full cursor-pointer">
            <div className="text-xl font-bold">상품권 ID: {giftcard.id}</div>
            <div className="flex flex-col w-full p-2 rounded-md border-2 border-gray-500">
              <div className="text-center font-bold">매장 정보</div>
              <div className="flex flex-row text-sm">
                <div className="font-bold">매장 ID:</div>
                <div>{giftcard.store.id}</div>
              </div>
              <div className="flex flex-row text-sm">
                <div className="font-bold">매장 이름:</div>
                <div>{giftcard.store.name}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GiftcardList;
