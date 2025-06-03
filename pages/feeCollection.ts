import { CustomSelect, CustomSelectElement } from "../customElements/selectElement.js";
import { dummyData, dummyUsers, user } from "../dummyData.js";
import { formatCurrency, getElement } from "../utility.js"

customElements.define("custom-select", CustomSelect);

function feeCollection() {
    const feeCollectionTileCont = getElement("#feeCollectionTileCont")
    const feeCollectionTileTemplate = getElement<HTMLTemplateElement>("#feeCollectionTileTemplate")

    //make 4 tiles
    for (let index = 0; index < 4; index++) {
        const feeCollectionTile = feeCollectionTileTemplate.content.cloneNode(true) as HTMLElement;

        feeCollectionTileCont.append(feeCollectionTile)
    }

    const dateSelection = getElement<CustomSelectElement>("custom-select#dateSelection");
    const classSelection = getElement<CustomSelectElement>("custom-select#classSelection");
    const statusSelection = getElement<CustomSelectElement>("custom-select#statusSelection");

    let activeDate = new Date();
    let activeClass = ""
    let activeStatus = ""

    dateSelection.addEventListener('change', (event: any) => {
        //get month and year, set the date from this string - January 2025
        console.log('New value:', event.detail.value);

        //apply active date from selection menu
        activeDate = new Date(event.detail.value);

        generateTable()
    });
    classSelection.addEventListener('change', (event: any) => {
        console.log('New value:', event.detail.value);

        activeClass = event.detail.value.trim()

        generateTable()
    });
    statusSelection.addEventListener('change', (event: any) => {
        console.log('New value:', event.detail.value);

        activeStatus = event.detail.value.trim()

        generateTable()
    });

    function runOnLoad() {
        //make table on load
        generateTable()
    }
    runOnLoad()
}
feeCollection()

function generateTable() {
    const table = getElement<HTMLTableElement>("#feeCollectionTable");
    table.innerHTML = ""; // clear previous fee collection table

    //make a new row
    const tableHeadingRowTemplate = getElement<HTMLTemplateElement>("#feeCollectionTableHeadingRowTemplate")
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

    //go over each record and make the row
    dummyData.feeCollectionList.forEach(eachFeeCollection => {
        const tableRowTemplate = getElement<HTMLTemplateElement>("#feeCollectionTableRowTemplate")
        const tableRowClone = tableRowTemplate.content.cloneNode(true) as HTMLTableRowElement;
        const tableRow = getElement<HTMLTableRowElement>("tr", undefined, tableRowClone);

        let selected = false

        const seenCheckbox = getElement<HTMLInputElement>(".feeCheckbox", undefined, tableRowClone)
        const feeRecordProfile = getElement<HTMLImageElement>(".feeRecordProfile", undefined, tableRowClone)
        const feeRecordName = getElement(".feeRecordName", undefined, tableRowClone)
        const feeRecordDate = getElement(".feeRecordDate", undefined, tableRowClone)
        const feeRecordClass = getElement(".feeRecordClass", undefined, tableRowClone)
        const feeRecordTuitionFee = getElement(".feeRecordTuitionFee", undefined, tableRowClone)
        const feeRecordActivitiesFee = getElement(".feeRecordActivitiesFee", undefined, tableRowClone)
        const feeRecordMiscellaneous = getElement(".feeRecordMiscellaneous", undefined, tableRowClone)
        const feeRecordAmount = getElement(".feeRecordAmount", undefined, tableRowClone)
        const feeRecordStatus = getElement(".feeRecordStatus", undefined, tableRowClone)
        const feeRecordStatusP = getElement(".feeRecordStatusP", undefined, tableRowClone)

        seenCheckbox.addEventListener("click", () => {
            selected = !selected
            tableRow.classList.toggle("selected")

            if (selected) {
                console.log(`$selected`)
            } else {

            }
        })

        const seenUser: user | undefined = dummyUsers[eachFeeCollection.userId]
        if (seenUser === undefined) throw new Error(`not seeing user Id ${eachFeeCollection.userId}`)
        if (seenUser.type !== "student") throw new Error("user not a student")

        feeRecordProfile.src = seenUser.img
        feeRecordName.innerText = seenUser.name
        feeRecordDate.innerText = eachFeeCollection.date
        feeRecordClass.innerText = seenUser.type === "student" ? seenUser.class : "teacher"
        feeRecordTuitionFee.innerText = formatCurrency(eachFeeCollection.tuition)
        feeRecordActivitiesFee.innerText = formatCurrency(eachFeeCollection.activitiesFee)
        feeRecordMiscellaneous.innerText = formatCurrency(eachFeeCollection.miscellaneous)

        const seenAmount = eachFeeCollection.tuition + eachFeeCollection.activitiesFee + eachFeeCollection.miscellaneous
        feeRecordAmount.innerText = formatCurrency(seenAmount)

        feeRecordStatusP.innerText = eachFeeCollection.status

        let tagColor = eachFeeCollection.status === "paid" ? "var(--color1)" : eachFeeCollection.status === "overdue" ? "var(--color5)" : "var(--color4)"
        feeRecordStatus.style.setProperty('--tagColorStarter', tagColor);

        table.appendChild(tableRowClone);
    })
}