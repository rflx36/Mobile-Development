
type h = "00" | '01' | '02' | '03' | '04' | '05'
    | '06' | '07' | '08' | '09' | '10' | '11' | '12'
    | '13' | '14' | '15' | '16' | '17' | '18' | '19'
    | '20' | '21' | '22' | '23' | '24';

type m = h | '25' | '26' | '27' | '28' | '29' | '30'
    | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40'
    | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50'
    | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59' | '60';

export type TimeType = `${h}:${m}`;
export type YearType = 1 | 2 | 3 | 4;
export type WeekType = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
export type SemesterType = "1st" | "2nd";
export type ScheduleFilterType = "instructor" | "room" | "section";


export interface TimeAvailabilityType {
    time_start: TimeType,
    time_end: TimeType,
}
export interface CourseType {
    name: string,
    code: string,
}
export interface RoomType {
    room_name: string,
    is_realtime: boolean,
    realtime_id?: string
}
export interface Subject {
    title: string,
    code: string,
    total_hours: number,
    is_dividable: boolean,

}
export interface SubjectHasLabLec {
    title: string,
    code: string,
    lab_total_hours: number,
    lab_is_dividable: boolean,
    lec_total_hours: number,
    lec_is_dividable: boolean,
}

export interface CurrentSemester {
    year: YearType,
    subjects: Array<Subject | SubjectHasLabLec>,
    course: string,
    sections: number
}
export interface InstructorType {
    first_name: string,
    last_name: string,
    fulltime: boolean,
    preffered_subjects: Array<Subject | SubjectHasLabLec>,
    monday?: TimeAvailabilityType,
    tuesday?: TimeAvailabilityType,
    wednesday?: TimeAvailabilityType,
    thursday?: TimeAvailabilityType,
    friday?: TimeAvailabilityType,
    saturday?: TimeAvailabilityType,
    load?: number
    assigned_subjects?: Array<Subject | SubjectHasLabLec>
}


export interface IScheduleBufferType {
    course: CourseType,
    room: number,

    section: string,
    subject: Subject,
    time_start: TimeType,
    time_end: TimeType,
    day: WeekType,
    instructor: InstructorType
}



export type MainScheduleType = {
    semester: SemesterType,
    rooms: Array<RoomType>,
    courses: Array<CourseType>
    data: Array<IScheduleBufferType>,
    instructors: Array<InstructorType>,
    inputs: Array<CurrentSemester>
    time_start: TimeType,
    time_end: TimeType,
    break_time_start: TimeType,
    break_time_end: TimeType,
} | null;



export interface RoomSessionSchedule {
    time_start: TimeType,
    time_end: TimeType
    duration: number,
    section: string,
    year: YearType,
    course: {
        code: string,
        title: string
    }
    instructor: {
        first_name: string,
        last_name: string
    }
    subject: {
        code: string,
        title: string
    }
}
export interface InstructorSessionSchedule {
    time_start: TimeType,
    time_end: TimeType,
    duration: number,
    section: string,
    year: YearType,
    course: {
        code: string,
        title: string
    }
    room: string,
    subject: {
        code: string,
        title: string
    }
}

export interface YearSessionSchedule {
    time_start: TimeType,
    time_end: TimeType,
    duration: number,
    section: string,
    course: {
        code: string,
        title: string
    },
    room: string,
    instructor: {
        first_name: string,
        last_name: string
    },
    subject: {
        code: string,
        title: string
    }
}




interface AvailabilityFiltered {
    monday_schedule?: TimeAvailabilityType,
    tuesday_schedule?: TimeAvailabilityType,
    wednesday_schedule?: TimeAvailabilityType,
    thursday_schedule?: TimeAvailabilityType,
    friday_schedule?: TimeAvailabilityType,
    saturday_schedule?: TimeAvailabilityType,
}

export interface DataFiltered {
    filter: string,
    monday_schedule?: Array<InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule>,
    tuesday_schedule?: Array<InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule>,
    wednesday_schedule?: Array<InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule>,
    thursday_schedule?: Array<InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule>,
    friday_schedule?: Array<InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule>,
    saturday_schedule?: Array<InstructorSessionSchedule | RoomSessionSchedule | YearSessionSchedule>,
    availibility?: AvailabilityFiltered,
    filter_type: number
}

export interface ViewScheduleType {
    selected: string,
    data: DataFiltered,
    highlighted_id: string,
    highlighted_info: {
        section: string,
        subject: string,
        instructor: string,
        time: string,
        room: string
    } | null,
    filter_type: ScheduleFilterType,
    view_availability: boolean,
    time_start: TimeType,
    time_end: TimeType
}


export interface LinkedScheduleType {
    selected: string,
    data: DataFiltered
}


export interface AllocatedListType {
    time: string,
    section: string,
    subject: string,
    instructor: string
}


export interface ViewRoomType {
    room_name: string,
    is_available: boolean,
    allocated_list: Array<AllocatedListType>,
    time_display: string
}


export interface FloorType {
    is_available: boolean,
    name: string,
    text: string,
    allocation: Array<AllocatedListType>,
    time_display: string

}


export type SimDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | null;
export type SimTime = TimeType | null;