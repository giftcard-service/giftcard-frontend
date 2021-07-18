import axios from "axios";
import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";

import { API_V1_URL } from "../../utils/constants";
import useTokens from "../../utils/useTokens";

function Profile({ history }: { history: any }) {
  const { tokens } = useTokens();
  const [user, setUser] = useState({ id: "", username: "", isManager: false, store: { id: "", name: "" } });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  async function updateUser({ username }: { username: string }) {
    return axios
      .patch(API_V1_URL + `/users/${user.id}`, JSON.stringify({ username }), {
        headers: {
          Authorization: "Bearer " + tokens.access_token,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        alert("정보 수정에 성공했습니다! 반영을 위해 다시 로그인해주세요.");
        localStorage.clear();
        history.push("/");
        window.location.reload();
      })
      .catch((err) => {
        console.error(err.response.data);
        alert("정보 수정에 실패했습니다.");
      });
  }

  const onSubmit = async (data: { username: string }) => {
    const { username } = data;

    await updateUser({ username });
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
      setValue("username", user.username, { shouldValidate: true });
    })();
  }, [tokens, setValue]);

  const usernameValidation = {
    required: "필수 필드입니다.",
    minLength: { value: 5, message: "아이디는 5자 이상 20자 이하여야 합니다." },
    maxLength: { value: 20, message: "아이디는 5자 이상 20자 이하여야 합니다." },
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      {user ? (
        <div className="flex flex-col items-center p-5 m-5 rounded-md border-2 border-gray-500 mx-12 md:mx-0 md:w-96">
          <h1 className="pb-5 text-xl font-bold">회원정보 수정</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="flex flex-col flex-shrink-0 mb-3">
              <div className="flex flex-row items-center whitespace-nowrap">
                <p className="w-24 font-bold">아이디</p>
                <input
                  className="p-1 rounded-md border-2 border-gray-500"
                  type="text"
                  placeholder="아이디"
                  {...register("username", usernameValidation)}
                />
              </div>
              {errors.username && <div className="text-right text-red-600">{errors.username.message}</div>}
            </label>

            <div className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3">
              <p className="w-24 font-bold">상태</p>
              <div className="p-1 rounded-md border-0 border-gray-500">{user.isManager ? "관리자" : "사용자"}</div>
            </div>

            <div className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3">
              <p className="w-24 font-bold">소속 매장</p>
              <div className="p-1 rounded-md border-0 border-gray-500">{user.store ? user.store.name : "없음"}</div>
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
        {user.isManager && (
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
