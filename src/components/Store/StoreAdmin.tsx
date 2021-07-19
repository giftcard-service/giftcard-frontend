import axios from "axios";
import { useForm } from "react-hook-form";

import { jsonAuthHeaders } from "../../services/headers";
import { API_V1_URL } from "../../utils/constants";
import { gcs } from "../../utils/types";

interface StoreAdminPropsInterface {
  history: any;
  adminUser: gcs.UserProfileInterface;
  tokens: gcs.TokensInterface;
}

function StoreAdmin({ history, adminUser, tokens }: StoreAdminPropsInterface) {
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { username: string; storeName: string; selectUpdateOrRemoveStore: any }) => {
    const findUserByUsername = async ({
      query,
    }: {
      query: { username: string };
    }): Promise<{ items: any; links: any; meta: any }> =>
      await axios
        .get(API_V1_URL + `/users?username=${query.username}`, { headers: jsonAuthHeaders(tokens.access_token) })
        .then((res) => res.data);

    const findStoreByName = async ({
      query,
    }: {
      query: { name: string };
    }): Promise<{ items: any; links: any; meta: any }> =>
      await axios
        .get(API_V1_URL + `/stores?name=${query.name}`, { headers: jsonAuthHeaders(tokens.access_token) })
        .then((res) => res.data);

    const updateUserStore = async ({ userId, data }: { userId: string; data: { storeId?: string | null } }) =>
      await axios
        .patch(
          API_V1_URL + `/users/${userId}`,
          { storeId: data.storeId },
          { headers: jsonAuthHeaders(tokens.access_token) }
        )
        .then(() => {
          alert("성공적으로 해당 사용자의 매장 권한을 업데이트했습니다.");
        });

    const { username, storeName, selectUpdateOrRemoveStore } = data;

    let existsCondition = { username: false, storeName: false };

    if (selectUpdateOrRemoveStore === "UPDATE") {
      const userRet = await findUserByUsername({ query: { username } });
      const storeRet = await findStoreByName({ query: { name: storeName } });

      existsCondition.username = userRet.items.length > 0;
      existsCondition.storeName = storeRet.items.length > 0;

      if (existsCondition.username && existsCondition.storeName) {
        const user = userRet.items[0];
        const store = storeRet.items[0];
        await updateUserStore({ userId: user.id, data: { storeId: store.id } });
      }
    }
    if (selectUpdateOrRemoveStore === "REMOVE") {
      const userRet = await findUserByUsername({ query: { username } });

      existsCondition.username = userRet.items.length > 0;

      if (existsCondition.username) {
        const user = userRet.items[0];
        await updateUserStore({ userId: user.id, data: { storeId: null } });
      }
    }

    if (!existsCondition.username) {
      setError("username", { type: "invalidUsername", message: `아이디 "${username}"은(는) 존재하지 않습니다.` });
    }
    if (!existsCondition.storeName) {
      setError("storeName", { type: "invalidStoreName", message: `매장 "${storeName}"은(는) 존재하지 않습니다.` });
    }
  };

  const validators = {
    usernameValidator: {
      required: "권한을 부여할 사용자 아이디를 입력하세요.",
    },
    storeNameValidator: {
      required: "매장 이름을 입력하세요.",
    },
  };

  return (
    <div className="flex flex-col items-center p-5 rounded-md border-2 border-gray-500">
      <h1 className="pb-1 text-lg font-bold">매장 권한 부여</h1>
      <div className="pb-3">사용자에게 매장 권한을 부여합니다.</div>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col flex-shrink-0 mb-3">
          <div className="flex flex-row items-center whitespace-nowrap">
            <p className="w-full font-bold">매장 권한</p>

            <div className="flex w-full justify-between items-center">
              <div className="mr-2">
                <input
                  className="mr-1"
                  type="radio"
                  value="UPDATE"
                  defaultChecked
                  {...register("selectUpdateOrRemoveStore", { required: true })}
                />
                부여하기
              </div>
              <div>
                {" "}
                <input
                  className="mr-1"
                  type="radio"
                  value="REMOVE"
                  {...register("selectUpdateOrRemoveStore", { required: true })}
                />
                삭제하기
              </div>
            </div>
          </div>
        </label>

        <label className="flex flex-col flex-shrink-0 mb-3">
          <div className="flex flex-row items-center whitespace-nowrap">
            <p className="w-full font-bold">사용자 아이디</p>
            <input
              className="p-1 w-full rounded-md border-2 border-gray-500"
              type="text"
              placeholder="사용자 아이디"
              {...register("username", validators.usernameValidator)}
            />
          </div>
          {errors.username && <div className="text-right text-red-600">{errors.username.message}</div>}
        </label>

        {getValues("selectUpdateOrRemoveStore") === "UPDATE" && (
          <label className="flex flex-col flex-shrink-0 mb-3">
            <div className="flex flex-row items-center whitespace-nowrap">
              <p className="w-full font-bold">매장 이름</p>
              <input
                className="p-1 w-full rounded-md border-2 border-gray-500"
                type="text"
                placeholder="매장 이름"
                {...register("storeName", validators.storeNameValidator)}
              />
            </div>
            {errors.storeName && <div className="text-right text-red-600 truncate">{errors.storeName.message}</div>}
          </label>
        )}

        <div className="flex justify-center items-center">
          <button className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2" type="submit">
            권한 부여
          </button>
        </div>
      </form>
    </div>
  );
}

export default StoreAdmin;
