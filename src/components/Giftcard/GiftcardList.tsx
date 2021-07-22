import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { findGiftcardList } from "../../services/GiftcardService";
import { getUser } from "../../services/UserService";
import useTokens from "../../utils/useTokens";
import GiftcardItem from "./GiftcardItem";

function GiftcardList() {
  const { tokens } = useTokens();
  const [user, setUser] = useState<{ id: string }>({ id: "" });
  const [giftcardList, setGiftcardList] = useState({
    items: [] as any[],
    links: {},
    meta: { totalItems: 0, totalPages: 0 },
  });

  /** 페이지당 몇 개의 항목이 존재하는지 */
  const PER_PAGE = 10;

  const handlePageClick = async (data: { selected: number }) => {
    const page = data.selected + 1;

    await findGiftcardList({ tokens, query: { page, limit: PER_PAGE } }).then((res) => {
      setGiftcardList(res);
    });
  };

  useEffect(() => {
    (async () => {
      const tempUser = await getUser({ tokens }).then((res) => {
        setUser(res);
        return res;
      });

      await findGiftcardList({ tokens, query: { page: 1, limit: PER_PAGE, userId: tempUser.id } }).then((res) => {
        setGiftcardList(res);
      });
    })();
  }, [tokens]);

  return (
    <div className="flex flex-col w-full items-center mx-auto p-4">
      <h1 className="pb-1 text-xl font-bold mb-2">{`내 상품권: 총 ${giftcardList.meta.totalItems}개`}</h1>
      {user ? (
        <Fragment>
          <div className="flex flex-col w-full md:w-1/3">
            {giftcardList.items.map((giftcard) => (
              <GiftcardItem key={giftcard.id} giftcard={giftcard} />
            ))}
          </div>
          <ReactPaginate
            previousLabel={"이전"}
            nextLabel={"다음"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={giftcardList.meta.totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="flex flex-row space-x-4"
            activeClassName="text-green-500"
            disabledClassName="text-gray-300 cursor-not-allowed"
          />
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
}

export default GiftcardList;
