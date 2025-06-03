import { dummyUsers, student, user } from "../dummyData.js";
import { getElement } from "../utility.js"

function students() {
    function runOnLoad() {
        //make table on load
        generateTable()
    }
    runOnLoad()
}
students()

function generateTable() {
    const table = getElement<HTMLTableElement>("#studentTable");
    table.innerHTML = ""; // clear previous student table

    //make a new row
    const tableHeadingRowTemplate = getElement<HTMLTemplateElement>("#studentTableHeadingRowTemplate")
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

    type studentObjType = { [key: string]: student }

    //ensure only studens are taken from dummy users
    const studentObj = Object.fromEntries(Object.entries(dummyUsers).filter(eachEntry => {
        const eachUser: user = eachEntry[1]

        return eachUser.type === "student"
    })) as studentObjType

    //go over each record and make the row
    Object.entries(studentObj).forEach(eachStudentEntry => {
        const eachStudentId = eachStudentEntry[0]
        const eachStudent = eachStudentEntry[1]

        const tableRowTemplate = getElement<HTMLTemplateElement>("#studentTableRowTemplate")
        const tableRowClone = tableRowTemplate.content.cloneNode(true) as HTMLTableRowElement;
        const tableRow = getElement<HTMLTableRowElement>("tr", undefined, tableRowClone);

        let selected = false

        const seenCheckbox = getElement<HTMLInputElement>(".studentCheckbox", undefined, tableRowClone)
        const studentRecordProfileEl = getElement<HTMLImageElement>(".studentRecordProfile", undefined, tableRowClone)
        const studentRecordNameEl = getElement(".studentRecordName", undefined, tableRowClone)
        const studentRecordEmailEl = getElement(".studentRecordEmail", undefined, tableRowClone)
        const studentRecordIdEl = getElement(".studentRecordId", undefined, tableRowClone)
        const studentRecordClassEl = getElement(".studentRecordClass", undefined, tableRowClone)
        const studentRecordDobEl = getElement(".studentRecordDob", undefined, tableRowClone)
        const studentRecordPhoneNumberEl = getElement(".studentRecordPhoneNumber", undefined, tableRowClone)
        const studentRecordAddressEl = getElement(".studentRecordAddress", undefined, tableRowClone)

        seenCheckbox.addEventListener("click", () => {
            selected = !selected
            tableRow.classList.toggle("selected")

            if (selected) {
                console.log(`$selected`)
            } else {

            }
        })

        studentRecordProfileEl.src = eachStudent.img
        studentRecordNameEl.innerText = eachStudent.name
        studentRecordEmailEl.innerText = eachStudent.email
        studentRecordIdEl.innerText = eachStudentId
        studentRecordClassEl.innerText = eachStudent.class
        studentRecordDobEl.innerText = eachStudent.dob
        studentRecordPhoneNumberEl.innerText = eachStudent.phone
        studentRecordAddressEl.innerText = eachStudent.address

        //add row to table
        table.appendChild(tableRowClone);
    })
}