import axios from "axios";

import { API_V1_URL } from "../utils/constants";
import { gcs } from "../utils/types";
import { jsonAuthHeaders } from "./headers";

const findUserByUsername = async ({
  tokens,
  query,
}: {
  tokens: gcs.TokensInterface;
  query: { username: string };
}): Promise<gcs.PaginationResponseInterface> =>
  await axios
    .get(API_V1_URL + `/users?username=${query.username}`, { headers: jsonAuthHeaders(tokens.access_token) })
    .then((res) => res.data);

const updateUserStore = async ({
  tokens,
  userId,
  data,
}: {
  tokens: gcs.TokensInterface;
  userId: string;
  data: { storeId?: string | null };
}) =>
  await axios
    .patch(
      API_V1_URL + `/users/${userId}`,
      { storeId: data.storeId },
      { headers: jsonAuthHeaders(tokens.access_token) }
    )
    .then((res) => res.data);

export { findUserByUsername, updateUserStore };
