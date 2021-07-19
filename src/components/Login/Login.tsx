import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import useTokens from "../../utils/useTokens";
import { API_V1_URL } from "../../utils/constants";
import { gcs } from "../../utils/types";
import { jsonHeader } from "../../services/headers";

function Login({ history }: { history: any }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setTokens } = useTokens();

  async function loginUser(credentials: gcs.CredentialsInterface) {
    return axios
      .post(API_V1_URL + "/login", JSON.stringify(credentials), {
        headers: jsonHeader,
      })
      .then((res) => {
        alert("로그인에 성공했습니다!");
        history.push("/");
        window.location.reload();
        return res.data;
      })
      .catch((err) => {
        alert("로그인 정보가 틀립니다!");
        return null;
      });
  }

  const onSubmit = async (data: { username: string; password: string }) => {
    const { username, password } = data;
    const tokens = await loginUser({
      username: username,
      password: password,
    });

    if (setTokens) {
      setTokens(tokens);
    }
  };

  const usernameValidation = {
    required: "아이디를 입력하세요.",
  };
  const passwordValidation = {
    required: "비밀번호를 입력하세요.",
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center p-4">
      <div className="flex flex-col items-center w-full md:w-96 p-5 my-5 rounded-md border-2 border-gray-500">
        <h1 className="pb-5 text-xl font-bold">로그인</h1>
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

          <label className="flex flex-col flex-shrink-0 mb-3">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">비밀번호</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="password"
                placeholder="비밀번호"
                {...register("password", passwordValidation)}
              />
            </div>
            {errors.password && <div className="text-right text-red-600">{errors.password.message}</div>}
          </label>

          <div className="flex justify-center items-center">
            <button className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2" type="submit">
              로그인
            </button>
            <button
              className="rounded-md bg-gray-600 text-white font-bold p-2"
              onClick={(e) => {
                e.preventDefault();
                history.push("/signup");
              }}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
