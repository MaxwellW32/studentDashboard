import { CustomSelect, CustomSelectElement } from "../customElements/selectElement.js";
import { dummyData, dummyUsers, studentAttendanceType, user } from "../dummyData.js";
import { generateCalendarData, getElement } from "../utility.js";

customElements.define("custom-select", CustomSelect);

function attendance() {
    const dateSelection = getElement<CustomSelectElement>("custom-select#dateSelection");
    const weekSelection = getElement<CustomSelectElement>("custom-select#weekSelection");
    const classSelection = getElement<CustomSelectElement>("custom-select#classSelection");

    let activeDate = new Date();
    let activeWeekIndex: number = parseInt(weekSelection.value.trim().slice(5, 6)) - 1

    dateSelection.addEventListener('change', (event: any) => {
        //get month and year, set the date from this string - January 2025
        console.log('New value:', event.detail.value);

        //apply active date from selection menu
        activeDate = new Date(event.detail.value);

        generateTable()
    });
    weekSelection.addEventListener('change', (event: any) => {
        console.log('New value:', event.detail.value);

        activeWeekIndex = parseInt(event.detail.value.trim().slice(5, 6)) - 1

        generateTable()
    });
    classSelection.addEventListener('change', (event: any) => {
        console.log('New value:', event.detail.value);
    });

    function runAll() {
        generateTable()
    }
    runAll()

    function generateTable() {
        //get the calender for the current month
        let calenderData = generateCalendarData(activeDate.getFullYear(), activeDate.getMonth())
        //keep only wanted weeks
        calenderData = calenderData.filter((eachCalenderWeek, eachCalenderWeekIndex) => {
            if (eachCalenderWeekIndex === activeWeekIndex || eachCalenderWeekIndex === activeWeekIndex + 1) {
                return true
            }

            return false
        })
        console.log(`$calenderData`, calenderData);

        const table = getElement<HTMLTableElement>("#attendanceTable");
        table.innerHTML = ""; // clear previous attendance table

        //make a new row
        const headerRow = document.createElement("tr");

        //make headers
        const studentNameTitleTd = document.createElement("td")
        studentNameTitleTd.classList.add("larger")
        studentNameTitleTd.innerHTML = "student name"

        headerRow.appendChild(studentNameTitleTd)

        //add each day to the header row 01, 02, 03...etc
        calenderData.forEach(eachCalenderWeek => {
            eachCalenderWeek.forEach(eachDay => {
                //each day heading
                if (eachDay === null) return

                const dayTd = document.createElement("td")
                dayTd.innerText = `${eachDay}`

                headerRow.appendChild(dayTd);
            })
        })
        //add header to table
        table.appendChild(headerRow)

        //loop over students
        dummyData.attendanceList.forEach(eachAttendanceRec => {
            const seenUser: user | undefined = dummyUsers[eachAttendanceRec.userId]
            if (seenUser === undefined) throw new Error(`not seeing user Id ${eachAttendanceRec.userId}`)

            //make a new row
            const studentRow = document.createElement("tr");
            const studentNameTd = document.createElement("td");

            studentNameTd.classList.add("larger")
            studentNameTd.innerText = seenUser.name

            studentRow.appendChild(studentNameTd)

            //loop over the calender days
            calenderData.forEach(eachCalenderWeek => {
                eachCalenderWeek.forEach(eachDay => {
                    if (eachDay === null) return

                    //check if dates seen for student
                    const seenCalenderDate = new Date(activeDate.getFullYear(), activeDate.getMonth(), eachDay)
                    let seenStudentAttendance: studentAttendanceType["key"] | undefined = eachAttendanceRec.attendance[seenCalenderDate.toDateString()]
                    if (seenStudentAttendance === undefined) {
                        seenStudentAttendance = {
                            attended: null
                        }
                    }

                    const studentTd = makeSpeciicTd(seenStudentAttendance !== undefined ? seenStudentAttendance.attended : null)

                    let myTimeout: number | undefined = undefined;

                    studentTd.addEventListener("click", () => {
                        if (myTimeout !== undefined) {
                            // Detected second click within the timeout window → double-click
                            clearTimeout(myTimeout);
                            myTimeout = undefined;

                            seenStudentAttendance.attended = null
                            handleChangeFromClick(seenStudentAttendance.attended)

                        } else {
                            //single click
                            myTimeout = setTimeout(() => {
                                myTimeout = undefined;

                                seenStudentAttendance.attended = seenStudentAttendance.attended === true ? false : true
                                handleChangeFromClick(seenStudentAttendance.attended)
                            }, 300);
                        }

                        function handleChangeFromClick(option: boolean | null) {
                            const newStudentTd = makeSpeciicTd(option)

                            studentTd.innerHTML = newStudentTd.innerHTML
                        }
                    });


                    //add on student date to the student row
                    studentRow.appendChild(studentTd)
                })
            })

            //add student row to table
            table.appendChild(studentRow)
        })




        function makeSpeciicTd(option: boolean | null) {
            const studentTd = document.createElement("td");

            if (option) {
                studentTd.innerHTML =
                    `
<div style="width: .5rem; aspect-ratio: 1/1; padding: .5rem; background-color: var(--color6); border-radius: var(--borderRadiusL); position: relative;">
    <p
        style="position: absolute; top: 50%; left:50%; translate: -50% -50%; color: var(--shade3);">
        ✓</p>
</div
`

            } else if (option === false) {
                studentTd.innerHTML =
                    `
<div style="width: .5rem; aspect-ratio: 1/1; padding: .5rem; background-color: var(--color5); border-radius: var(--borderRadiusL); position: relative;">
    <p
        style="position: absolute; top: 50%; left:50%; translate: -50% -50%; color: var(--shade3);">
        x</p>
</div>
`

            } else {
                studentTd.classList.add("fill")
                //handle null
                studentTd.innerHTML =
                    `
<div style="width:100%;height: 100%; background-color: var(--bg1); position: absolute; top: 0, left: 0">
    <p
        style="position: absolute; top: 50%; left:50%; translate: -50% -50%; color: var(--shade1);">
        -</p>
</div>
`
            }

            return studentTd
        }
    }
}
attendance()