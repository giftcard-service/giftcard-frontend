import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import { API_V1_URL } from "../../utils/constants";
import useTokens from "../../utils/useTokens";
import GiftcardAdmin from "../Giftcard/GiftcardAdmin";
import StoreAdmin from "../Store/StoreAdmin";

function Admin({ history }: { history: any }) {
  const { tokens } = useTokens();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({ id: "", username: "", isManager: true, store: { id: "", name: "" } });

  useEffect(() => {
    async function getUser() {
      return axios
        .get(API_V1_URL + "/me", {
          headers: {
            Authorization: "Bearer " + tokens.access_token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => res.data);
    }

    (async () => {
      const user = await getUser();
      setUser(user);
    })();

    if (tokens && user) {
      setIsLoading(false);

      if (!user.isManager) {
        history.push("/unauthorized");
      }
    }
  }, [tokens, user, history]);

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      {isLoading ? (
        <div>LOADING...</div>
      ) : (
        <div className="flex flex-col items-center p-5 m-5 rounded-md border-2 border-gray-500 mx-12 md:mx-0 md:w-1/2">
          <h1 className="pb-5 text-xl font-bold">관리자 페이지</h1>
          <div className="flex flex-col w-full">
            <div className="mb-3">
              <StoreAdmin history={history} adminUser={user} tokens={tokens} />
            </div>
            <div>
              <GiftcardAdmin history={history} adminUser={user} tokens={tokens} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default withRouter(Admin);
