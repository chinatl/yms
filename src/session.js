import { SET_USER_INFO, SET_EDU_DICT } from "@/store/mutations";
import { getItem } from "@/utils/session";
import store from "./store";
const set_store_state = value => {
  if (getItem(value)) {
    store.commit(value, getItem(value));
  }
};
set_store_state(SET_USER_INFO);
set_store_state(SET_EDU_DICT);
