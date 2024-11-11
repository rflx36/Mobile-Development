import { LinkedScheduleType, MainScheduleType, ViewRoomType, ViewScheduleType } from "./types"

interface IGlobalState {

    main_schedule: MainScheduleType,
    linked_schedule: LinkedScheduleType | null,
    view_schedule: ViewScheduleType | null,
    view_room : ViewRoomType | null
}

export const DEFAULT_GLOBAL_STATE: IGlobalState = {

    main_schedule: null,
    linked_schedule: null,
    view_schedule: {
        selected: "",
        data: { filter: "", filter_type: 0 },
        highlighted_id: "",
        highlighted_info: null,
        filter_type: "room",
        view_availability: false,
        time_start: "00:00",
        time_end: "00:00",
    },
    view_room: null,
}

export interface IGlobalStoreMutator {
    get: IGlobalState,
    set: (property?: IGlobalState) => void

}
