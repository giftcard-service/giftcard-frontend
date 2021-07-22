import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { getGiftcard } from "../../services/GiftcardService";
import { createAndGetQrCode } from "../../services/QrCodeService";
import { getUser } from "../../services/UserService";
import { gcs } from "../../utils/types";
import useTokens from "../../utils/useTokens";
import QrCode from "../QrScan/QrCode";

interface ParamTypes {
  giftcardId: string;
}

function GiftcardDetail() {
  const { tokens } = useTokens();
  const history = useHistory();
  const { giftcardId } = useParams<ParamTypes>();
  const [user, setUser] = useState<gcs.UserProfileInterface | null>(null);
  const [giftcard, setGiftcard] = useState<gcs.GiftcardResponseInterface | null>(null);
  const [qrCode, setQrCode] = useState<gcs.QrCodeResponseInterface | null>(null);
  const [updateQrInterval, setUpdateQrInterval] = useState<any>(null);

  useEffect(() => {
    const setNewQrCode = async (giftcardId: string) => {
      await createAndGetQrCode({ tokens, data: { giftcardId: giftcardId } }).then((res) => {
        setQrCode(res);
      });
    };

    (async () => {
      await getGiftcard({ tokens, giftcardId }).then(async (res) => {
        setGiftcard(res);
        await createAndGetQrCode({ tokens, data: { giftcardId: res.id } }).then(async (res) => {
          setQrCode(res);
        });
      });

      (async () => {
        const user = await getUser({ tokens });
        setUser(user);
      })();
    })();

    setUpdateQrInterval(setInterval(async () => await setNewQrCode(giftcardId), 30000));

    return () => {
      clearInterval(updateQrInterval);
    };
  }, [tokens, giftcardId]);

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      <h1 className="pb-5 text-xl font-bold">상품권 정보</h1>
      {giftcard && user && (
        <div className="flex flex-col w-full md:w-1/2 items-center p-2 mb-5 rounded-md border-2 border-gray-500">
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">상품권 ID:</div>
            <div className="w-full text-right truncate">{giftcard?.id}</div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">만료일:</div>
            <div className="w-full text-right truncate">
              {moment(giftcard?.expirationTime).format("YYYY/MM/DD, HH:mm:ss")}
            </div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2 text-gray-500">
            <div className="w-full font-bold mr-1">발급 금액:</div>
            <div className="w-full text-right truncate">{giftcard?.amount}</div>
          </div>
          <div className="flex flex-row w-full items-center mb-2 text-red-500">
            <div className="w-full font-bold mr-1">사용 금액:</div>
            <div className="w-full text-right truncate">{giftcard?.amount - giftcard?.amountLeft}</div>
          </div>
          <div className="flex flex-row w-full items-center mb-2 text-green-500">
            <div className="w-full font-bold mr-1">잔여 금액:</div>
            <div className="w-full text-right truncate">{giftcard?.amountLeft}</div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">매장 ID:</div>
            <div className="w-full text-right truncate">{giftcard?.store?.id}</div>
          </div>
          <div className="flex flex-row w-full items-center mb-2">
            <div className="w-full font-bold mr-1">매장 이름:</div>
            <div className="w-full text-right">{giftcard?.store?.name}</div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <div className="flex flex-col w-full p-2 items-center border-2 border-gray-500 mb-2">
            <div className="w-full text-center mb-4 font-bold text-2xl">QR 코드</div>
            <div className="w-2/3 md:w-1/2 border-4 border-gray-500">
              <QrCode
                value={`${JSON.stringify({
                  qrCodeId: qrCode?.id,
                  user: { id: user.id, username: user.username },
                  storeId: giftcard.store.id,
                  giftcardId: giftcard.id,
                })}`}
              />
            </div>
          </div>
          <div className="w-full h-px bg-gray-500 mb-2" />
          <button
            className="rounded-md bg-gray-600 text-white font-bold p-2"
            onClick={(e) => {
              e.preventDefault();
              history.push({ pathname: "/giftcard-purchases", search: `?giftcard-id=${giftcard.id}` });
            }}
          >
            사용 내역 조회
          </button>
        </div>
      )}
    </div>
  );
}

export default GiftcardDetail;
