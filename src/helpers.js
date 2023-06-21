import {
  FieldPath,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

export function renderMultiple(amount, element) {
  const array = Array(amount)
    .fill()
    .map(() => element);
  return array;
}

export function validEmail(email) {
  let regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );
  return regex.test(email);
}

export async function isAlreadyFriend(userid, friendid) {
  //check if already in friend list
  const querySnapshot = await getDocs(
    query(
      collection(db, "users"),
      where("__name__", "==", userid),
      where("friends", "array-contains", friendid)
    )
  );

  if (!querySnapshot.empty) {
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}

//check if already in friend list
