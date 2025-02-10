import { atom } from "recoil";

export const userAtom = atom({
    key: 'userAtom',
    default: [],
});
export const personAtom = atom({
    key: 'personAtom',
    default: [],
});

export const editUserAtom=atom({
    key:'editUserAtom',
    default: {
        userName: '',
        email: '',
        userProfile: {
          address: '',
          phone: '',
        }
      },
})