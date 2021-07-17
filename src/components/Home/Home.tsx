import { withRouter } from "react-router-dom";

import useTokens from "../../utils/useTokens";
import GiftcardList from "../Giftcards/GiftcardList";

function Home({ history }: { history: any }) {
  const { isLoggedIn } = useTokens();

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      <div className="p-5 text-3xl font-bold">상품권 관리 서비스</div>

      {isLoggedIn && (
        <div>
          <GiftcardList />
        </div>
      )}
    </div>
  );
}

export default withRouter(Home);
