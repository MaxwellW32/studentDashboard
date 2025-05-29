import { CustomSelect } from "../customElements/selectElement.js";
import { generateCalendarData, getElement } from "../utility.js";
customElements.define("custom-select", CustomSelect);
function attendance() {
    const dateSelection = getElement("custom-select#dateSelection");
    const weekSelection = getElement("custom-select#weekSelection");
    const classSelection = getElement("custom-select#classSelection");
    let activeDate = new Date();
    let activeWeekIndex = parseInt(weekSelection.value.trim().slice(5, 6)) - 1;
    dateSelection.addEventListener('change', (event) => {
        //get month and year, set the date from this string - January 2025
        console.log('New value:', event.detail.value);
        //apply active date from selection menu
        activeDate = new Date(event.detail.value);
        //make table on load
        generateTable();
    });
    weekSelection.addEventListener('change', (event) => {
        console.log('New value:', event.detail.value);
        activeWeekIndex = parseInt(event.detail.value.trim().slice(5, 6)) - 1;
        //make table on load
        generateTable();
    });
    classSelection.addEventListener('change', (event) => {
        console.log('New value:', event.detail.value);
    });
    function runAll() {
        //make table on load
        generateTable();
    }
    runAll();
    function generateTable() {
        //get the calender for the current month
        let calenderData = generateCalendarData(activeDate.getFullYear(), activeDate.getMonth());
        //keep only wanted weeks
        calenderData = calenderData.filter((eachCalenderWeek, eachCalenderWeekIndex) => {
            if (eachCalenderWeekIndex === activeWeekIndex || eachCalenderWeekIndex === activeWeekIndex + 1) {
                return true;
            }
            return false;
        });
        console.log(`$calenderData`, calenderData);
    }
}
attendance();
