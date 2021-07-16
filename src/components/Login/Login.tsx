import { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

import useTokens from "../../utils/useTokens";

interface CredentialsInterface {
  username: string;
  password: string;
}

function Login({ history }: { history: any }) {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const { setTokens } = useTokens();

  async function loginUser(credentials: CredentialsInterface) {
    return axios
      .post("http://localhost:8000/api/login", JSON.stringify(credentials), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("로그인에 성공했습니다!");
        history.push("/");
        window.location.reload();
        return res.data;
      })
      .catch((err) => {
        alert("로그인 정보가 틀립니다!");
      });
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const tokens = await loginUser({
      username: inputs.username,
      password: inputs.password,
    });
    if (setTokens) {
      setTokens(tokens);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      <div className="flex flex-col items-center p-5 m-5 rounded-md border-2 border-gray-500 w-96">
        <h1 className="pb-5 text-xl font-bold">로그인</h1>
        <form onSubmit={handleSubmit}>
          <label className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3 font-bold">
            <p className="w-24">아이디</p>
            <input
              className="p-1 rounded-md border-2 border-gray-500"
              name="username"
              type="text"
              onChange={onChange}
            />
          </label>

          <label className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-4 font-bold">
            <p className="w-24">비밀번호</p>
            <input
              className="p-1 rounded-md border-2 border-gray-500"
              name="password"
              type="password"
              onChange={onChange}
            />
          </label>

          <div className="flex justify-center items-center">
            <button className="w-20 rounded-md bg-gray-600 text-white font-bold p-2 mr-2" type="submit">
              회원가입
            </button>
            <button className="w-20 rounded-md bg-gray-600 text-white font-bold p-2" type="submit">
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Login);
