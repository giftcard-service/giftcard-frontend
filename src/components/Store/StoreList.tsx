import { useState } from "react";

import { TokensInterface, UserProfileInterface } from "../../utils/useTokens";

function StoreList({ adminUser }: { history: any; adminUser: UserProfileInterface; tokens: TokensInterface }) {
  const [stores, setStores] = useState([]);
  const [inputs, setInputs] = useState({ username: "" });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // async function updateUser() {
  //   return axios
  //     .patch(API_V1_URL + `/users/${adminUser.id}`, JSON.stringify({ storeId: adminUser.username }), {
  //       headers: {
  //         Authorization: "Bearer " + tokens.access_token,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       window.location.reload();
  //     })
  //     .catch((err) => {
  //       console.error(err.response.data);
  //       alert("정보 수정에 실패했습니다.");
  //     });
  // }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // await updateUser();
  };

  return (
    <div>
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
          <div className="p-1 rounded-md border-0 border-gray-500">{adminUser.isManager ? "관리자" : "사용자"}</div>
        </div>

        <div className="flex flex-row flex-shrink-0 items-center whitespace-nowrap mb-3">
          <p className="w-24 font-bold">소속 매장</p>
          <div className="p-1 rounded-md border-0 border-gray-500">
            {adminUser.store ? adminUser.store.name : "없음"}
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <button className="rounded-md bg-gray-600 text-white font-bold p-2 mb-2" type="submit">
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoreList;
