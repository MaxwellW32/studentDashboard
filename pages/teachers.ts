import { dummyUsers, teacher, user } from "../dummyData.js";
import { getElement } from "../utility.js"

function teachers() {
    function runOnLoad() {
        //make table on load
        generateTable()
    }
    runOnLoad()
}
teachers()

function generateTable() {
    const table = getElement<HTMLTableElement>("#teacherTable");
    table.innerHTML = ""; // clear previous teacher table

    //make a new row
    const tableHeadingRowTemplate = getElement<HTMLTemplateElement>("#teacherTableHeadingRowTemplate")
    const tableHeadingRowClone = tableHeadingRowTemplate.content.cloneNode(true) as HTMLTableRowElement;

    const tableHeadingCheckbox = getElement<HTMLInputElement>('input[type="checkbox"]', undefined, tableHeadingRowClone)

    let tableHeadingCheckboxSelected = false

    tableHeadingCheckbox.addEventListener("click", () => {
        tableHeadingCheckboxSelected = !tableHeadingCheckboxSelected

        if (tableHeadingCheckboxSelected) {
            console.log(`$selected`)
            alert("complete select all logic")
        } else {

        }
    })

    //add header row
    table.appendChild(tableHeadingRowClone)

    type teacherObjType = { [key: string]: teacher }

    //ensure only teachers are taken from dummy users
    const teacherObj = Object.fromEntries(Object.entries(dummyUsers).filter(eachEntry => {
        const eachUser: user = eachEntry[1]

        return eachUser.type === "teacher"
    })) as teacherObjType

    //go over each record and make the row
    Object.entries(teacherObj).forEach(eachTeacherEntry => {
        const eachTeacher = eachTeacherEntry[1]

        const tableRowTemplate = getElement<HTMLTemplateElement>("#teacherTableRowTemplate")
        const tableRowClone = tableRowTemplate.content.cloneNode(true) as HTMLTableRowElement;
        const tableRow = getElement<HTMLTableRowElement>("tr", undefined, tableRowClone);

        let selected = false

        const seenCheckbox = getElement<HTMLInputElement>(".teacherCheckbox", undefined, tableRowClone)
        const teacherRecordProfileEl = getElement<HTMLImageElement>(".teacherRecordProfile", undefined, tableRowClone)
        const teacherRecordNameEl = getElement(".teacherRecordName", undefined, tableRowClone)
        const teacherRecordEmailEl = getElement(".teacherRecordEmail", undefined, tableRowClone)
        const teacherSchoolIdEl = getElement(".teacherSchoolId", undefined, tableRowClone)
        const teacherRecordSubjectEl = getElement(".teacherRecordSubject", undefined, tableRowClone)
        const teacherRecordClassesEl = getElement(".teacherRecordClasses", undefined, tableRowClone)
        const teacherRecordPhoneNumberEl = getElement(".teacherRecordPhoneNumber", undefined, tableRowClone)
        const teacherRecordAddressEl = getElement(".teacherRecordAddress", undefined, tableRowClone)

        seenCheckbox.addEventListener("click", () => {
            selected = !selected
            tableRow.classList.toggle("selected")

            if (selected) {
                console.log(`$selected`)
            } else {

            }
        })

        teacherRecordProfileEl.src = eachTeacher.img
        teacherRecordNameEl.innerText = eachTeacher.name
        teacherRecordEmailEl.innerText = eachTeacher.email
        teacherSchoolIdEl.innerText = eachTeacher.schoolId
        teacherRecordSubjectEl.innerText = eachTeacher.subject
        teacherRecordClassesEl.innerText = eachTeacher.classes.join(", ")
        teacherRecordPhoneNumberEl.innerText = eachTeacher.phone
        teacherRecordAddressEl.innerText = eachTeacher.address

        //add row to table
        table.appendChild(tableRowClone);
    })
}