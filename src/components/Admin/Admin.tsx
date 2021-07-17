import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router-dom";

import useTokens from "../../utils/useTokens";
import StoreList from "./StoreList";

function Admin({ history }: { history: any }) {
  const { tokens } = useTokens();
  const [user, setUser] = useState({ id: "", username: "", isManager: false, store: "" });

  useEffect(() => {
    async function getUser() {
      return axios
        .get("http://localhost:8000/v1/me", {
          headers: {
            Authorization: "Bearer " + tokens.access_token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          return res.data;
        });
    }

    (async () => {
      const user = await getUser();
      setUser(user);
    })();
  }, [tokens]);

  return tokens && user && user.isManager ? (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      <div className="flex flex-col items-center p-5 m-5 rounded-md border-2 border-gray-500 mx-12 md:mx-0 md:w-96">
        <h1 className="pb-5 text-xl font-bold">관리자 페이지</h1>
        <StoreList history={history} adminUser={user} tokens={tokens} />
      </div>
    </div>
  ) : (
    <Redirect to="/unauthorized" />
  );
}

export default withRouter(Admin);
