import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { findGiftcardPurchaseList } from "../../services/GiftcardPurchaseService";
import { getUser } from "../../services/UserService";
import useTokens from "../../utils/useTokens";
import GiftcardPurchaseItem from "./GiftcardPurchaseItem";

function GiftcardPurchaseList() {
  const { tokens } = useTokens();
  const [user, setUser] = useState<{ id: string }>({ id: "" });
  const [giftcardPurchaseList, setGiftcardPurchaseList] = useState({
    items: [] as any[],
    links: {},
    meta: { totalItems: 0, totalPages: 0 },
  });

  /** 페이지당 몇 개의 항목이 존재하는지 */
  const PER_PAGE = 10;

  const handlePageClick = async (data: { selected: number }) => {
    const page = data.selected + 1;

    await findGiftcardPurchaseList({ tokens, query: { page, limit: PER_PAGE, userId: user.id } }).then((res) => {
      setGiftcardPurchaseList(res);
    });
  };

  useEffect(() => {
    (async () => {
      await getUser({ tokens })
        .then((res) => setUser(res))
        .then(async () => {
          if (user) {
            await findGiftcardPurchaseList({ tokens, query: {} }).then((res) => {
              setGiftcardPurchaseList(res);
            });
          }
        });
    })();
  }, [tokens]);

  return (
    <div className="flex flex-col w-full items-center mx-auto p-4">
      <h1 className="pb-1 text-xl font-bold mb-2">{`내 상품권 이용 내역: 총 ${giftcardPurchaseList.meta.totalItems}개`}</h1>
      <div className="flex flex-col w-full md:w-1/3">
        {giftcardPurchaseList.items.map((giftcardPurchase) => (
          <GiftcardPurchaseItem giftcardPurchase={giftcardPurchase} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={giftcardPurchaseList.meta.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName="flex flex-row space-x-4"
        activeClassName="text-green-500"
        disabledClassName="text-gray-300 cursor-not-allowed"
      />
    </div>
  );
}

export default GiftcardPurchaseList;
