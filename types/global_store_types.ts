import { MainScheduleType, ViewScheduleType } from "./types"

interface IGlobalState {

    widget_use_24_hour: boolean,
    widget_show_weekday: boolean,
    widget_use_collapse: boolean,
    main_schedule: MainScheduleType,
    linked_schedule: any | null,
    view_schedule: ViewScheduleType | null;
}

export const DEFAULT_GLOBAL_STATE: IGlobalState = {
    widget_use_24_hour: false,
    widget_show_weekday: false,
    widget_use_collapse: false,
    main_schedule: null,
    linked_schedule: null,
    view_schedule: {
        selected: "",
        data: { filter: "" },
        highlighted_id: "",
        filter_type: "room",
        view_availability: false,
    }
}

export interface IGlobalStoreMutator {
    get: IGlobalState,
    set: (property?: IGlobalState) => void

}
