import { create } from "zustand";


export type NavbarType = "home" | "search" | "schedules" | "widget";
interface IGlobalState {

    widget_use_24_hour: boolean,
    widget_show_weekday: boolean,
    widget_use_collapse: boolean,
    linked_schedule: any | null,
}

const DEFAULT_GLOBAL_STATE: IGlobalState = {
    widget_use_24_hour: false,
    widget_show_weekday: false,
    widget_use_collapse: false,
    linked_schedule: null
}

interface IGlobalStoreMutator {
    get: IGlobalState,
    set: (property?: IGlobalState) => void

}

export const useGlobalStore = create<IGlobalStoreMutator>((change) => ({
    get: DEFAULT_GLOBAL_STATE,
    set: (x?) => change((x != undefined) ? { get: x } : (state) => ({ get: state.get }))
}))