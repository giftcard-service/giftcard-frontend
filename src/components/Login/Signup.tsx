import { useState } from "react";
import { withRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import useTokens from "../../utils/useTokens";
import { API_V1_URL } from "../../utils/constants";

interface CredentialsInterface {
  username: string;
  password: string;
}

function Signup({ history }: { history: any }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  async function registerUser(credentials: CredentialsInterface) {
    return axios
      .post(
        API_V1_URL + "/users",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        alert("회원가입에 성공했습니다!");
        history.push("/");
        window.location.reload();
        return res.data;
      })
      .catch((err) => {
        alert("회원가입에 실패했습니다.");
        return null;
      });
  }

  const onSubmit = (data: { username: string; password1: string; password2: string }) => {
    const { username, password1, password2 } = data;

    if (password1 !== password2) {
      alert("비밀번호와 비밀번호 확인 내용이 일치하지 않습니다.");
    } else {
      registerUser({ username, password: password1 });
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto w-full flex flex-col items-center">
      <div className="flex flex-col items-center w-auto md:w-96 p-3 md:p-5 m-5 rounded-md border-2 border-gray-500">
        <h1 className="pb-5 text-xl font-bold">회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="flex flex-col flex-shrink-0 mb-3">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">아이디</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="text"
                placeholder="아이디"
                {...register("username", { required: true })}
              />
            </div>
            {errors.username && <div className="text-right text-red-600">*필수 필드입니다!</div>}
          </label>

          <label className="flex flex-col flex-shrink-0 mb-3">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">비밀번호</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="password"
                placeholder="비밀번호"
                {...register("password", { required: true })}
              />
            </div>
            {errors.password && <div className="text-right text-red-600">*필수 필드입니다!</div>}
          </label>

          <label className="flex flex-col flex-shrink-0 mb-4">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-24 font-bold">비밀번호 확인</p>
              <input
                className="p-1 rounded-md border-2 border-gray-500"
                type="password"
                placeholder="비밀번호 확인"
                {...register("password2", { required: true })}
              />
            </div>
            {errors.password2 && <div className="text-right text-red-600">*필수 필드입니다!</div>}
          </label>

          <div className="flex justify-center items-center">
            <button className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2" type="submit">
              회원가입
            </button>

            <button
              className="rounded-md bg-gray-600 text-white font-bold p-2"
              onClick={(e) => {
                e.preventDefault();
                history.push("/login");
              }}
            >
              로그인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signup);
