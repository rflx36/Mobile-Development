import { DEFAULT_GLOBAL_STATE, IGlobalStoreMutator } from "@/types/global_store_types";
import { create } from "zustand";



export const useGlobalStore = create<IGlobalStoreMutator>((change) => ({
    get: DEFAULT_GLOBAL_STATE,
    set: (x?) => change((x != undefined) ? { get: x } : (state) => ({ get: state.get }))
}))