import { useForm } from "react-hook-form";

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
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: { username: string; storeName: string }) => {
    // const { username, storeName } = data;
    // TODO: request updating user with store
  };

  const validators = {
    usernameValidator: {
      required: "권한을 부여할 사용자 아이디를 입력하세요.",
    },
    storeNameValidator: {
      required: "매장 이름을 입력하세요.",
    },
    selectUpdateOrRemoveStoreValidator: {
      required: "하나를 선택하세요.",
    },
  };

  return (
    <div className="flex flex-col items-center p-5 rounded-md border-2 border-gray-500">
      <h1 className="pb-1 text-lg font-bold">매장 권한 부여</h1>
      <div className="pb-3">사용자에게 매장 권한을 부여합니다.</div>

      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
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

        <label className="flex flex-col flex-shrink-0 mb-3">
          <div className="flex flex-row items-center whitespace-nowrap">
            <p className="w-full font-bold">매장 추가 여부</p>

            <div className="flex w-full justify-between items-center">
              <div className="mr-2">
                <input
                  id="updateStore"
                  className="mr-1"
                  type="radio"
                  value="UPDATE"
                  // name="updateOrRemoveStore"
                  defaultChecked
                  {...register("selectAddOrRemove", validators.selectUpdateOrRemoveStoreValidator)}
                />
                등록하기
              </div>
              <div>
                <input
                  id="removeStore"
                  className="mr-1"
                  type="radio"
                  value="REMOVE"
                  // name="updateOrRemoveStore"
                  {...register("selectAddOrRemove", validators.selectUpdateOrRemoveStoreValidator)}
                />
                삭제하기
              </div>
            </div>
          </div>
          {errors.storeName && <div className="text-right text-red-600 truncate">{errors.storeName.message}</div>}
        </label>
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
