import { dummyData } from "../dummyData.js";
import { formatDateCustom, generateCalendarData, getElement, incrementDate, validateTypeOption } from "../utility.js";
//dummy data for calender items
const calenderDummyListItems = Object.fromEntries(Object.entries(dummyData.calenderListItems).map((eachEntry, eachEntryIndex) => {
    let eachCalenderKey = eachEntry[0];
    const eachCalenderValue = eachEntry[1];
    const currentDate = incrementDate(new Date(), eachEntryIndex);
    //change dummy data key to date format - 5/25/2025
    eachCalenderKey = currentDate.toLocaleDateString();
    return [eachCalenderKey, eachCalenderValue];
}));
function calender() {
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
    setTodayDateMarker();
    //get date comparison marker 
    const selectedDateComparisonMarker = getElement("#selectedDateComparisonMarker");
    setDateComparisonMarker();
    //get selected date marker 
    const selectedDateMarker = getElement("#selectedDateMarker");
    const selectedDateListCont = getElement("#selectedDateListCont");
    const agendaListCont = getElement("#agendaListCont");
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
    generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
    //set lists on sidePanel 
    setAgendaCont();
    setSelectedDateListCont();
    //logical functions
    function changeSelectedDate(numberOfDays) {
        selectedDate = new Date(selectedDate.getTime());
        selectedDate.setDate(selectedDate.getDate() + numberOfDays);
        //make calender
        generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
        setTodayDateMarker();
        //keep date text in sync
        setDateComparisonMarker();
        setSelectedDateMarker();
        setSelectedDateListCont();
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
    function setDateComparisonMarker() {
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
    function setTodayDateMarker() {
        calenderTodayDateMarker.innerText = `${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}`;
    }
    function setSelectedDateMarker() {
        //update the marker
        selectedDateMarker.innerText = formatDateCustom(selectedDate);
    }
    function setAgendaCont() {
        //set html on table data
        const fragment = new DocumentFragment();
        const listItems = dummyData.agenda;
        listItems.forEach(eachListItem => {
            //get the list item templates
            const seenListItemTemplate = getElement("#calenderListItem");
            const seenListItemClone = seenListItemTemplate.content.cloneNode(true);
            //set 
            const listItemEl = getElement("li", undefined, seenListItemClone);
            const listItemTitleEl = getElement(".listItemTitle", undefined, seenListItemClone);
            const calenderListItemLineEl = getElement(".calenderListItemLine", undefined, seenListItemClone);
            //set full size
            if (listItemEl.dataset.fullSize === undefined)
                throw new Error("not seeing dataset fullSize");
            listItemEl.dataset.fullSize = "false";
            //set html values for list item template
            listItemEl.style.background = `${eachListItem.bg}`;
            listItemTitleEl.innerText = `${eachListItem.text}`;
            //set styles
            listItemTitleEl.style.whiteSpace = "initial"; //this ensures the lists in agenda show the full title without showing other fields that are not used e.g description
            calenderListItemLineEl.style.backgroundColor = `hsl(from ${eachListItem.bg} h 100 50`;
            //add to calender list cont
            fragment.appendChild(seenListItemClone);
        });
        //add to agenda cont
        agendaListCont.appendChild(fragment);
    }
    function setSelectedDateListCont() {
        //generate side panel dates
        const seenListItemsForDate = getListItemsForDate(selectedDate, true);
        selectedDateListCont.innerHTML = "";
        if (seenListItemsForDate !== undefined) {
            selectedDateListCont.appendChild(seenListItemsForDate);
        }
    }
}
calender();
function generateCalendar(year, month) {
    const calendar = generateCalendarData(year, month);
    const table = getElement(".calenderTable");
    table.innerHTML = ""; // clear previous calender table
    // Weekday headers
    const headers = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    //make a new row
    const headerRow = document.createElement("tr");
    //go over each day and make table headings
    for (const day of headers) {
        const seenHeadingTemplate = getElement("#calenderTableHead");
        const clone = seenHeadingTemplate.content.cloneNode(true);
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
            //get the table data templates
            const seenTableDataTemplate = getElement("#calenderTableData");
            const tableDataClone = seenTableDataTemplate.content.cloneNode(true);
            //set html on table data
            const seenP = getElement("p", undefined, tableDataClone);
            const calenderListCont = getElement(".calenderListCont", undefined, tableDataClone);
            //make function that creates list items when calender loads for a specific date
            //use function in side panel - pull the template - add it to a container - diaply it
            //find smart functions
            //set html on table data
            if (day !== null) {
                const cellDate = new Date(year, month, day);
                const seenListItemsForDate = getListItemsForDate(cellDate);
                if (seenListItemsForDate !== undefined) {
                    calenderListCont.appendChild(seenListItemsForDate);
                }
                //fill the values
                seenP.innerText = `${day}`;
            }
            tr.appendChild(tableDataClone);
        }
        table.appendChild(tr);
    }
}
function getListItemsForDate(date, fullSize = false) {
    //set html on table data
    const fragment = new DocumentFragment();
    //set html on table data
    const cellDate = new Date(date);
    //check the dummy data if a match is seen
    const listItemsForCell = calenderDummyListItems[cellDate.toLocaleDateString()];
    if (listItemsForCell === undefined)
        return;
    listItemsForCell.forEach(eachListItemForCell => {
        //get the list item templates
        const seenListItemTemplate = getElement("#calenderListItem");
        const seenListItemClone = seenListItemTemplate.content.cloneNode(true);
        //set 
        const listItem = getElement("li", undefined, seenListItemClone);
        const listItemTime = getElement(".listItemTime", undefined, seenListItemClone);
        const listItemTitle = getElement(".listItemTitle", undefined, seenListItemClone);
        const listItemDescription = getElement(".listItemDescription", undefined, seenListItemClone);
        //set full size
        if (listItem.dataset.fullSize === undefined)
            throw new Error("not seeing dataset fullSize");
        listItem.dataset.fullSize = fullSize ? "true" : "false";
        //set html values for list item template
        listItem.style.background = `${eachListItemForCell.bg}`;
        listItemTime.innerText = `${eachListItemForCell.time}`;
        listItemTitle.innerText = `${eachListItemForCell.title}`;
        listItemDescription.innerText = `${eachListItemForCell.description}`;
        //add to calender list cont
        fragment.appendChild(seenListItemClone);
    });
    return fragment;
}
