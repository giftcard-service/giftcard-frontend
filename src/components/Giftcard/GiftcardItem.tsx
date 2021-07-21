import { useHistory } from "react-router-dom";

interface GiftcardItemPropsInterface {
  giftcard: { id: string; store: { id: string; name: string } };
}

function GiftcardItem({ giftcard }: GiftcardItemPropsInterface) {
  const history = useHistory();

  return (
    <div
      className="flex flex-col items-center p-2 mb-5 rounded-md border-2 border-gray-500 w-full cursor-pointer"
      onClick={() => history.push(`/giftcards/${giftcard.id}`)}
    >
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
  );
}

export default GiftcardItem;
