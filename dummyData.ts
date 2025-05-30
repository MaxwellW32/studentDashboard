export type calenderListItemsType = {
    [key: string]: {
        title: string;
        description: string;
        time: string;
        bg: string;
    }[];
}

export type agendaType = {
    text: string;
    bg: string;
}
export type studentAttendanceType = {
    [key: string]: {
        attended: boolean | null;
    }
}

export type studentListType = {
    name: string;
    attendance: studentAttendanceType;
}

type dummyDataType = {
    calenderListItems: calenderListItemsType,
    agenda: agendaType[],
    studentsList: studentListType[]
}

export const dummyData: dummyDataType = {
    calenderListItems: {
        "1": [
            {
                title: "science fair setup",
                description: "science club",
                time: "8:00 am",
                bg: "var(--color1)",
            },
            {
                title: "teachers meeting",
                description: "all teacher",
                time: "11:00 am",
                bg: "var(--color2)",
            },
            {
                title: "varsity track meet",
                description: "track team",
                time: "1:00 pm",
                bg: "var(--color3)",
            },
            {
                title: "parents meeting",
                description: "all teachers and parents team",
                time: "4:00 pm",
                bg: "var(--color4)",
            },
        ],
        "2": [
            {
                title: "library inventory",
                description: "admin team",
                time: "9:00 am",
                bg: "var(--color2)",
            },
            {
                title: "art exhibition setup",
                description: "art club",
                time: "3:00 pm",
                bg: "var(--color5)",
            },
        ],
        "4": [
            {
                title: "midterm planning",
                description: "staff only",
                time: "10:00 am",
                bg: "var(--color1)",
            },
        ],
        "6": [
            {
                title: "school cleanup",
                description: "grade 9-11 students",
                time: "8:30 am",
                bg: "var(--color4)",
            },
        ],
        "10": [
            {
                title: "student council meeting",
                description: "council team",
                time: "12:00 pm",
                bg: "var(--color2)",
            },
            {
                title: "soccer match",
                description: "senior boys vs alumni",
                time: "2:30 pm",
                bg: "var(--color3)",
            },
        ],
        "12": [
            {
                title: "lab maintenance",
                description: "lab staff",
                time: "7:45 am",
                bg: "var(--color1)",
            },
        ],
        "15": [
            {
                title: "field trip",
                description: "grade 8 students",
                time: "9:00 am",
                bg: "var(--color5)",
            },
            {
                title: "evening choir rehearsal",
                description: "music club",
                time: "5:30 pm",
                bg: "var(--color3)",
            },
        ],
        "20": [
            {
                title: "exam briefing",
                description: "all students",
                time: "8:00 am",
                bg: "var(--color2)",
            },
        ],
        "22": [
            {
                title: "career day setup",
                description: "staff & external guests",
                time: "1:00 pm",
                bg: "var(--color1)",
            },
        ],
        "25": [
            {
                title: "open day",
                description: "parents and community",
                time: "10:00 am",
                bg: "var(--color4)",
            },
            {
                title: "bake sale",
                description: "home ec club",
                time: "12:00 pm",
                bg: "var(--color5)",
            },
        ],
        "28": [
            {
                title: "final exams begin",
                description: "school-wide",
                time: "8:00 am",
                bg: "var(--color2)",
            },
        ],
        "30": [
            {
                title: "end of month assembly",
                description: "all students and staff",
                time: "2:00 pm",
                bg: "var(--color3)",
            },
        ],
    },
    agenda: [
        { text: "Prep science fair booth", bg: "var(--color1)" },
        { text: "Confirm staff meeting venue", bg: "var(--color2)" },
        { text: "Order snacks for open day", bg: "var(--color4)" },
        { text: "Send reminder for exam schedule", bg: "var(--color2)" },
        { text: "Setup audio for choir performance", bg: "var(--color3)" },
    ],
    studentsList: [
        {
            name: "lucas johnson",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: true },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Emily Peterson",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: true },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Michael Brown",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: true },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Hannah White",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: false },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Oliver Martinez",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: true },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Isabelle Garcia",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: false },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Ethan Lee",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: true },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Sophia Wilson",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: true },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Aiden taylor",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: true },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
        {
            name: "Ava Smith",
            attendance: {
                "Fri May 02 2025": { attended: true },
                "Sat May 03 2025": { attended: null },
                "Sun May 04 2025": { attended: null },
                "Mon May 05 2025": { attended: true },
                "Tue May 06 2025": { attended: true },
                "Wed May 07 2025": { attended: true },
                "Thu May 08 2025": { attended: true },
                "Fri May 09 2025": { attended: true },
                "Sat May 10 2025": { attended: null },
                "Sun May 11 2025": { attended: null },
                "Mon May 12 2025": { attended: true },
                "Tue May 13 2025": { attended: true },
                "Wed May 14 2025": { attended: true },
                "Thu May 15 2025": { attended: true },
                "Fri May 16 2025": { attended: true },
                "Sat May 17 2025": { attended: null },
                "Sun May 18 2025": { attended: null }
            },
        },
    ]
};