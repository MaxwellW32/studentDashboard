import { CustomSelect } from "../customElements/selectElement.js";
import { dummyData, dummyUsers } from "../dummyData.js";
import { formatCurrency, getElement } from "../utility.js";
customElements.define("custom-select", CustomSelect);
function feeCollection() {
    const feeCollectionTileCont = getElement("#feeCollectionTileCont");
    const feeCollectionTileTemplate = getElement("#feeCollectionTileTemplate");
    //make 4 tiles
    for (let index = 0; index < 4; index++) {
        const feeCollectionTile = feeCollectionTileTemplate.content.cloneNode(true);
        feeCollectionTileCont.append(feeCollectionTile);
    }
    const dateSelection = getElement("custom-select#dateSelection");
    const classSelection = getElement("custom-select#classSelection");
    const statusSelection = getElement("custom-select#statusSelection");
    let activeDate = new Date();
    let activeClass = "";
    let activeStatus = "";
    dateSelection.addEventListener('change', (event) => {
        //get month and year, set the date from this string - January 2025
        console.log('New value:', event.detail.value);
        //apply active date from selection menu
        activeDate = new Date(event.detail.value);
        generateTable();
    });
    classSelection.addEventListener('change', (event) => {
        console.log('New value:', event.detail.value);
        activeClass = event.detail.value.trim();
        generateTable();
    });
    statusSelection.addEventListener('change', (event) => {
        console.log('New value:', event.detail.value);
        activeStatus = event.detail.value.trim();
        generateTable();
    });
    function runOnLoad() {
        //make table on load
        generateTable();
    }
    runOnLoad();
    function generateTable() {
        const table = getElement("#feeCollectionTable");
        table.innerHTML = ""; // clear previous attendance table
        //make a new row
        const tableHeadingRowTemplate = getElement("#feeCollectionTableHeadingRowTemplate");
        const tableHeadingRow = tableHeadingRowTemplate.content.cloneNode(true);
        const tableHeadingCheckbox = getElement('input[type="checkbox"]', undefined, tableHeadingRow);
        let tableHeadingCheckboxSelected = false;
        tableHeadingCheckbox.addEventListener("click", () => {
            tableHeadingCheckboxSelected = !tableHeadingCheckboxSelected;
            if (tableHeadingCheckboxSelected) {
                console.log(`$selected`);
                alert("complete select all logic");
            }
            else {
            }
        });
        //add header row
        table.appendChild(tableHeadingRow);
        //go over each record and make the row
        dummyData.feeCollectionList.forEach(eachFeeCollection => {
            const tableRowTemplate = getElement("#feeCollectionTableRowTemplate");
            const tableRowClone = tableRowTemplate.content.cloneNode(true);
            const tableRow = getElement("tr", undefined, tableRowClone);
            let selected = false;
            const seenCheckbox = getElement(".feeCheckbox", undefined, tableRowClone);
            const feeRecordProfile = getElement(".feeRecordProfile", undefined, tableRowClone);
            const feeRecordName = getElement(".feeRecordName", undefined, tableRowClone);
            const feeRecordDate = getElement(".feeRecordDate", undefined, tableRowClone);
            const feeRecordClass = getElement(".feeRecordClass", undefined, tableRowClone);
            const feeRecordTuitionFee = getElement(".feeRecordTuitionFee", undefined, tableRowClone);
            const feeRecordActivitiesFee = getElement(".feeRecordActivitiesFee", undefined, tableRowClone);
            const feeRecordMiscellaneous = getElement(".feeRecordMiscellaneous", undefined, tableRowClone);
            const feeRecordAmount = getElement(".feeRecordAmount", undefined, tableRowClone);
            const feeRecordStatus = getElement(".feeRecordStatus", undefined, tableRowClone);
            const feeRecordStatusP = getElement(".feeRecordStatusP", undefined, tableRowClone);
            seenCheckbox.addEventListener("click", () => {
                selected = !selected;
                tableRow.classList.toggle("selected");
                if (selected) {
                    console.log(`$selected`);
                }
                else {
                }
            });
            const seenUser = dummyUsers[eachFeeCollection.userId];
            if (seenUser === undefined)
                throw new Error(`not seeing user Id ${eachFeeCollection.userId}`);
            feeRecordProfile.src = seenUser.img;
            feeRecordName.innerText = seenUser.name;
            feeRecordDate.innerText = eachFeeCollection.date;
            feeRecordClass.innerText = eachFeeCollection.class;
            feeRecordTuitionFee.innerText = formatCurrency(eachFeeCollection.tuition);
            feeRecordActivitiesFee.innerText = formatCurrency(eachFeeCollection.activitiesFee);
            feeRecordMiscellaneous.innerText = formatCurrency(eachFeeCollection.miscellaneous);
            const seenAmount = eachFeeCollection.tuition + eachFeeCollection.activitiesFee + eachFeeCollection.miscellaneous;
            feeRecordAmount.innerText = formatCurrency(seenAmount);
            feeRecordStatusP.innerText = eachFeeCollection.status;
            let tagColor = eachFeeCollection.status === "paid" ? "var(--color1)" : eachFeeCollection.status === "overdue" ? "var(--color5)" : "var(--color4)";
            feeRecordStatus.style.setProperty('--tagColorStarter', tagColor);
            table.appendChild(tableRowClone);
        });
    }
}
feeCollection();
