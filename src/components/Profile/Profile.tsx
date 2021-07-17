import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { API_V1_URL } from "../../utils/constants";

import useTokens from "../../utils/useTokens";

function Profile({ history }: { history: any }) {
  const { tokens } = useTokens();
  const [inputs, setInputs] = useState({ username: "" });
  const [user, setUser] = useState({ id: "", username: "", isManager: false, store: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  async function updateUser() {
    return axios
      .patch(API_V1_URL + `/users/${user.id}`, JSON.stringify({ username: inputs.username }), {
        headers: {
          Authorization: "Bearer " + tokens.access_token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("정보 반영을 위해 다시 로그인이 필요합니다.");
        localStorage.clear();
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.response.data);
        alert("정보 수정에 실패했습니다.");
      });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await updateUser();
  };

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
      setInputs({ ...inputs, username: user.username });
    })();
  }, [tokens]);

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      {user ? (
        <div className="flex flex-col items-center p-5 m-5 rounded-md border-2 border-gray-500 mx-12 md:mx-0 md:w-96">
          <h1 className="pb-5 text-xl font-bold">회원정보 수정</h1>
          <form onSubmit={handleSubmit}>
            <label className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3 font-bold">
              <p className="w-24">아이디</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                name="username"
                type="text"
                value={inputs.username}
                onChange={onChange}
              />
            </label>

            <div className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3">
              <p className="w-24 font-bold">상태</p>
              <div className="p-1 rounded-md border-0 border-gray-500">{user.isManager ? "관리자" : "사용자"}</div>
            </div>

            <div className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3">
              <p className="w-24 font-bold">소속 매장</p>
              <div className="p-1 rounded-md border-0 border-gray-500">{user.store ? user.store : "없음"}</div>
            </div>

            <div className="flex flex-col justify-center items-center">
              <button className="rounded-md bg-gray-600 text-white font-bold p-2 mb-2" type="submit">
                수정하기
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>로그인 되어있지 않습니다.</div>
      )}

      <div className="flex flex-row m-2">
        {!user.isManager && (
          <button
            className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2"
            onClick={() => {
              history.push("/admin");
            }}
          >
            관리자 페이지
          </button>
        )}

        <button
          className="rounded-md bg-gray-600 text-white font-bold p-2"
          onClick={() => {
            localStorage.clear();
            alert("로그아웃 되었습니다.");
            history.push("/");
            window.location.reload();
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default withRouter(Profile);
