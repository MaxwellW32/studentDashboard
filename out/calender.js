import { formatDateCustom, getElement, validateTypeOption } from "./utility.js";
function calender() {
    //generate calender
    // displayCalendar(2025, 4);
    const seenDateSelectedTypeArr = ["true", "false"];
    const seenDateOptionTypeArr = ["month", "week", "day"];
    const seenDateMoveOptionTypeArr = ["prev", "next"];
    let viewMode = "month";
    const todaysDate = new Date();
    let selectedDate = todaysDate;
    //get date buttons
    const seenDateButtons = getElement(".dateSelectorOption", "all");
    seenDateButtons.forEach(eachButtonLi => {
        if (eachButtonLi.dataset.selected === undefined || eachButtonLi.dataset.dateOption === undefined)
            throw new Error("not seeing dataset values");
        //add event listeners
        eachButtonLi.addEventListener("click", () => {
            if (eachButtonLi.dataset.selected === undefined || eachButtonLi.dataset.dateOption === undefined)
                throw new Error("not seeing dataset values");
            //set all buttons to false
            seenDateButtons.forEach(eachButtonLiSmall => {
                eachButtonLiSmall.dataset.selected = "false";
            });
            //update just this button
            eachButtonLi.dataset.selected = "true";
            //check if any selected once and set its value - e.g month
            setViewMode(eachButtonLi.dataset.selected, eachButtonLi.dataset.dateOption);
        });
        //check if any selected once and set its value - e.g month
        setViewMode(eachButtonLi.dataset.selected, eachButtonLi.dataset.dateOption);
    });
    //get date marker 
    const calenderTodayDateMarker = getElement("#calenderTodayDateMarker");
    calenderTodayDateMarker.innerText = `${todaysDate.toLocaleString('default', { month: 'long' })} ${todaysDate.getFullYear()}`;
    //get date comparison marker 
    const selectedDateComparisonMarker = getElement("#selectedDateComparisonMarker");
    compareSelectedDate();
    //get selected date marker 
    const selectedDateMarker = getElement("#selectedDateMarker");
    setSelectedDateMarker();
    //get prev next buttons
    const dateMoveButtons = getElement(".dateMoveButton", "all");
    dateMoveButtons.forEach(eachMoveButton => {
        if (eachMoveButton.dataset.moveOption === undefined)
            throw new Error("not seeing dataset moveOption");
        //add event listeners
        eachMoveButton.addEventListener("click", () => {
            if (eachMoveButton.dataset.moveOption === undefined)
                throw new Error("not seeing dataset moveOption");
            const seenMoveOption = validateTypeOption(seenDateMoveOptionTypeArr, eachMoveButton.dataset.moveOption);
            changeSelectedDate(seenMoveOption === "next" ? 1 : -1);
        });
    });
    //make calender
    displayCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
    //logical functions
    function changeSelectedDate(numberOfDays) {
        selectedDate = new Date(selectedDate.getTime());
        selectedDate.setDate(selectedDate.getDate() + numberOfDays);
        //keep date text in sync
        setSelectedDateMarker();
        compareSelectedDate();
    }
    function setViewMode(selectedOption, seenDateOption) {
        //data validation - ensure string is of expected type
        const validatedSelectedDate = validateTypeOption(seenDateSelectedTypeArr, selectedOption);
        const validatedDateOption = validateTypeOption(seenDateOptionTypeArr, seenDateOption);
        if (validatedSelectedDate !== "true")
            return;
        viewMode = validatedDateOption;
    }
    //update the text at the top of the calender - today/tomorrow...etc
    function compareSelectedDate() {
        const oneDay = 1000 * 60 * 60 * 24;
        // Normalize both dates (set time to midnight)
        const today = new Date(todaysDate);
        const selected = new Date(selectedDate);
        today.setHours(0, 0, 0, 0);
        selected.setHours(0, 0, 0, 0);
        const diffTime = selected.getTime() - today.getTime();
        const diffDays = Math.round(diffTime / oneDay);
        let label = "";
        switch (diffDays) {
            case 0:
                label = "today";
                break;
            case 1:
                label = "tomorrow";
                break;
            case -1:
                label = "yesterday";
                break;
            default:
                if (diffDays > 1) {
                    label = `in ${diffDays} days`;
                }
                else {
                    label = `${Math.abs(diffDays)} days ago`;
                }
                break;
        }
        selectedDateComparisonMarker.innerText = label;
    }
    //html updater functions
    function setSelectedDateMarker() {
        //update the marker
        selectedDateMarker.innerText = formatDateCustom(selectedDate);
    }
}
calender();
function generateCalendar(year, month) {
    const firstDay = new Date(year, month, 1); // month is 0-indexed
    const lastDay = new Date(year, month + 1, 0); // day 0 of next month gives last day of this month
    const firstWeekDay = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = lastDay.getDate(); // 28-31
    const calendar = [];
    let week = [];
    // Fill in the blanks for days before the 1st
    for (let i = 0; i < firstWeekDay; i++) {
        week.push(null); // null means empty cell
    }
    // Fill in the actual days
    for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
            calendar.push(week);
            week = [];
        }
    }
    // Fill the last week with nulls if needed
    if (week.length > 0) {
        while (week.length < 7)
            week.push(null);
        calendar.push(week);
    }
    console.log(`$calendar`, calendar);
    return calendar; // array of weeks, each week is an array of 7 elements
}
function displayCalendar(year, month) {
    const calendar = generateCalendar(year, month);
    const table = getElement(".calenderTable");
    table.innerHTML = ""; // clear previous calender table
    // Weekday headers
    const headers = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //make a new row
    const headerRow = document.createElement("tr");
    //go over each day and make table headings
    for (const day of headers) {
        const seenTemplate = getElement("#calenderTableHead");
        const clone = seenTemplate.content.cloneNode(true);
        let seenTh = clone.querySelector("th");
        if (seenTh === null)
            throw new Error("not seeing th");
        //fill the day values
        seenTh.innerText = day;
        headerRow.appendChild(clone);
    }
    //add row to table
    table.appendChild(headerRow);
    // Weeks
    for (const week of calendar) {
        const tr = document.createElement("tr");
        for (const day of week) {
            const seenTemplate = getElement("#calenderTableData");
            const clone = seenTemplate.content.cloneNode(true);
            let seenP = clone.querySelector("p");
            if (seenP === null)
                throw new Error("not seeing p");
            let calenderTableDataList = clone.querySelector(".calenderTableDataList");
            if (calenderTableDataList === null)
                throw new Error("not seeing calenderTableDataList");
            //fill the values
            seenP.innerText = day === null ? "" : `${day}`;
            tr.appendChild(clone);
        }
        table.appendChild(tr);
    }
}
