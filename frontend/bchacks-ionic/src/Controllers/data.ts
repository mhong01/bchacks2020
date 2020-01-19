import { API_GET_NOTIFIER } from "../config/endpoint";
import axios from "axios";

export const getNotifier = async (userId: string) => {
  let users = await axios.get(API_GET_NOTIFIER + "?userId=" + userId, {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    maxRedirects: 0
  });
};
