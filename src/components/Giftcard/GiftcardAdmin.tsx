import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { gcs } from "../../utils/types";
import { findUserList } from "../../services/UserService";
import { findStoreList } from "../../services/StoreService";
import { createGiftcard } from "../../services/GiftcardService";

interface GiftcardAdminPropsInterface {
  history: any;
  adminUser: gcs.UserProfileInterface;
  tokens: gcs.TokensInterface;
}

function GiftcardAdmin({ history, adminUser, tokens }: GiftcardAdminPropsInterface) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: {
    username: string;
    storeName: string;
    creationTime: Date;
    expirationTime: Date;
    amount: number;
  }) => {
    const { username, storeName, creationTime, expirationTime, amount } = data;

    if (!creationTime || !expirationTime) {
      alert("유효기간을 올바르게 설정해주세요.");
      return;
    }

    const userRet = await findUserList({ tokens, query: { username } });
    const storeRet = await findStoreList({ tokens, query: { name: storeName } });

    let existsCondition = { username: false, storeName: false };

    existsCondition.username = userRet.items.length > 0;
    existsCondition.storeName = storeRet.items.length > 0;

    if (!existsCondition.username) {
      setError("username", { type: "invalidUsername", message: `아이디 "${username}"은(는) 존재하지 않습니다.` });
    }
    if (!existsCondition.storeName) {
      setError("storeName", { type: "invalidStoreName", message: `매장 "${storeName}"은(는) 존재하지 않습니다.` });
    }

    if (existsCondition.username && existsCondition.storeName) {
      const user = userRet.items[0];
      const store = storeRet.items[0];

      await createGiftcard({
        tokens,
        data: {
          ownerId: user.id,
          storeId: store.id,
          amount: Number(amount),
          creationTime: creationTime.toISOString(),
          expirationTime: expirationTime.toISOString(),
        },
      })
        .then(() => alert("상품권을 성공적으로 발급했습니다."))
        .catch(() => alert("상품권 발급에 실패했습니다."));
    }
  };

  /** `react-hook-form` validators */
  const validators = {
    usernameValidator: {
      required: "권한을 부여할 사용자 아이디를 입력하세요.",
    },
    storeNameValidator: {
      required: "매장 이름을 입력하세요.",
    },
    creationTimeValidator: {
      required: "발급일을 입력하세요.",
    },
    expirationTimeValidator: {
      required: "만료일을 입력하세요.",
    },
    amountValidator: {
      required: "금액을 입력하세요.",
    },
  };

  return (
    <div className="flex flex-col items-center p-5 rounded-md border-2 border-gray-500">
      <h1 className="pb-1 text-lg font-bold">상품권 발급</h1>
      <div className="pb-3">특정 매장에서 사용할 수 있는 상품권을 발급합니다.</div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col flex-shrink-0 mb-3">
          <div className="flex flex-row items-center whitespace-nowrap">
            <p className="w-full font-bold">사용자 아이디</p>
            <input
              className="p-1 w-full rounded-md border-2 border-gray-500"
              type="text"
              placeholder="발급할 사용자 아이디"
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
              placeholder="발급할 매장 이름"
              {...register("storeName", validators.storeNameValidator)}
            />
          </div>
          {errors.storeName && <div className="text-right text-red-600">{errors.storeName.message}</div>}
        </label>

        <label className="flex flex-col flex-shrink-0 mb-3">
          <div className="flex flex-row whitespace-nowrap">
            <p className="w-full font-bold pt-1">유효 기간</p>
            <div className="flex flex-col w-full">
              <DatePicker
                className="w-full p-1 items-center rounded-md border-2 border-gray-500"
                // selected={getValues("creationTime")}
                selectsRange={true}
                selected={getValues("creationTime")}
                startDate={getValues("creationTime")}
                endDate={getValues("expirationTime")}
                onChange={(dates: [Date, Date]) => {
                  const [start, end] = dates;
                  setValue("creationTime", start);
                  setValue("expirationTime", end);
                }}
                placeholderText="유효 기간"
                dateFormat="MM/dd/yyyy h:mm aa"
                dropdownMode="select"
                showYearDropdown
                showMonthDropdown
                peekNextMonth
                showWeekNumbers
                isClearable={true}
                withPortal
              />
            </div>
          </div>
        </label>

        <label className="flex flex-col flex-shrink-0 mb-3">
          <div className="flex flex-row items-center whitespace-nowrap">
            <p className="w-full font-bold">금액 (KRW)</p>
            <input
              className="p-1 w-full rounded-md border-2 border-gray-500"
              type="number"
              placeholder="금액 (KRW)"
              defaultValue="10000"
              {...register("amount", validators.amountValidator)}
            />
          </div>
        </label>

        <div className="flex justify-center items-center">
          <button className="rounded-md bg-gray-600 text-white font-bold p-2 mr-2" type="submit">
            상품권 발급
          </button>
        </div>
      </form>
    </div>
  );
}

export default GiftcardAdmin;
