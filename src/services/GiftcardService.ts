import axios from "axios";

import { API_V1_URL } from "../utils/constants";
import { gcs } from "../utils/types";
import { jsonAuthHeaders } from "./headers";

const createGiftcard = async ({ tokens, data }: { tokens: gcs.TokensInterface; data: gcs.GiftcardInterface }) =>
  await axios
    .post(API_V1_URL + `/giftcards`, data, { headers: jsonAuthHeaders(tokens.access_token) })
    .then((res) => res.data);

const findGiftcardList = async ({
  tokens,
  query,
}: {
  tokens: gcs.TokensInterface;
  query?: { userId?: string; storeId?: string };
}): Promise<gcs.PaginationResponseInterface> => {
  return await axios
    .get(API_V1_URL + "/giftcards", {
      params: { "user-id": query?.userId, "store-id": query?.storeId },
      headers: jsonAuthHeaders(tokens.access_token),
    })
    .then((res) => res.data);
};

export { createGiftcard, findGiftcardList };
