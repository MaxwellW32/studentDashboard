import { calenderListItemsType, dummyData } from "./dummyData.js";
import { formatDateCustom, getElement, incrementDate, validateTypeOption } from "./utility.js";

//dummy data for calender items
const calenderDummyListItems: calenderListItemsType = Object.fromEntries(Object.entries(dummyData.calenderListItems).map((eachEntry, eachEntryIndex) => {
    let eachCalenderKey = eachEntry[0]
    const eachCalenderValue = eachEntry[1]

    const currentDate = incrementDate(new Date(), eachEntryIndex)

    //change dummy data key to date format - 5/25/2025
    eachCalenderKey = currentDate.toLocaleDateString()

    return [eachCalenderKey, eachCalenderValue]
}))

function calender() {
    type seenDateSelectedType = "true" | "false"
    const seenDateSelectedTypeArr: seenDateSelectedType[] = ["true", "false"]

    type seenDateOptionType = "month" | "week" | "day"
    const seenDateOptionTypeArr: seenDateOptionType[] = ["month", "week", "day"]

    type seenDateMoveOptionType = "prev" | "next"
    const seenDateMoveOptionTypeArr: seenDateMoveOptionType[] = ["prev", "next"]

    let viewMode: seenDateOptionType = "month"

    const todaysDate = new Date()
    let selectedDate = todaysDate

    //get date buttons
    const seenDateButtons = getElement<HTMLLIElement>(".dateSelectorOption", "all")

    seenDateButtons.forEach(eachButtonLi => {
        if (eachButtonLi.dataset.selected === undefined || eachButtonLi.dataset.dateOption === undefined) throw new Error("not seeing dataset values")

        //add event listeners
        eachButtonLi.addEventListener("click", () => {
            if (eachButtonLi.dataset.selected === undefined || eachButtonLi.dataset.dateOption === undefined) throw new Error("not seeing dataset values")

            //set all buttons to false
            seenDateButtons.forEach(eachButtonLiSmall => {
                eachButtonLiSmall.dataset.selected = "false";
            })

            //update just this button
            eachButtonLi.dataset.selected = "true";

            //check if any selected once and set its value - e.g month
            setViewMode(eachButtonLi.dataset.selected, eachButtonLi.dataset.dateOption)
        })

        //check if any selected once and set its value - e.g month
        setViewMode(eachButtonLi.dataset.selected, eachButtonLi.dataset.dateOption)
    })

    //get date marker 
    const calenderTodayDateMarker = getElement<HTMLDivElement>("#calenderTodayDateMarker")
    setTodayDateMarker()

    //get date comparison marker 
    const selectedDateComparisonMarker = getElement<HTMLDivElement>("#selectedDateComparisonMarker")
    setDateComparisonMarker()

    //get selected date marker 
    const selectedDateMarker = getElement<HTMLDivElement>("#selectedDateMarker")
    const selectedDateListCont = getElement("#selectedDateListCont")
    const agendaListCont = getElement("#agendaListCont")
    setSelectedDateMarker()

    //get prev next buttons
    const dateMoveButtons = getElement<HTMLButtonElement>(".dateMoveButton", "all")
    dateMoveButtons.forEach(eachMoveButton => {
        if (eachMoveButton.dataset.moveOption === undefined) throw new Error("not seeing dataset moveOption")

        //add event listeners
        eachMoveButton.addEventListener("click", () => {
            if (eachMoveButton.dataset.moveOption === undefined) throw new Error("not seeing dataset moveOption")

            const seenMoveOption = validateTypeOption(seenDateMoveOptionTypeArr, eachMoveButton.dataset.moveOption)
            changeSelectedDate(seenMoveOption === "next" ? 1 : -1)
        })
    })

    //make calender
    generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth())

    //set lists on sidePanel 
    setAgendaCont()
    setSelectedDateListCont()




    //logical functions
    function changeSelectedDate(numberOfDays: number) {
        selectedDate = new Date(selectedDate.getTime());
        selectedDate.setDate(selectedDate.getDate() + numberOfDays);

        //make calender
        generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth())
        setTodayDateMarker()

        //keep date text in sync
        setDateComparisonMarker()
        setSelectedDateMarker()
        setSelectedDateListCont()
    }

    function setViewMode(selectedOption: string, seenDateOption: string) {
        //data validation - ensure string is of expected type
        const validatedSelectedDate = validateTypeOption(seenDateSelectedTypeArr, selectedOption)
        const validatedDateOption = validateTypeOption(seenDateOptionTypeArr, seenDateOption)

        if (validatedSelectedDate !== "true") return

        viewMode = validatedDateOption
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
                } else {
                    label = `${Math.abs(diffDays)} days ago`;
                }
                break;
        }

        selectedDateComparisonMarker.innerText = label;
    }




    //html updater functions
    function setTodayDateMarker() {
        calenderTodayDateMarker.innerText = `${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}`
    }
    function setSelectedDateMarker() {
        //update the marker
        selectedDateMarker.innerText = formatDateCustom(selectedDate)
    }

    function setAgendaCont() {
        //set html on table data
        const fragment = new DocumentFragment();

        const listItems = dummyData.agenda

        listItems.forEach(eachListItem => {
            //get the list item templates
            const seenListItemTemplate = getElement<HTMLTemplateElement>("#calenderListItem")
            const seenListItemClone = seenListItemTemplate.content.cloneNode(true) as HTMLElement;

            //set 
            const listItem = getElement("li", undefined, seenListItemClone)
            const listItemTitle = getElement(".listItemTitle", undefined, seenListItemClone)

            //set full size
            if (listItem.dataset.fullSize === undefined) throw new Error("not seeing dataset fullSize")
            listItem.dataset.fullSize = "false"

            //set html values for list item template
            listItem.style.background = `${eachListItem.bg}`
            listItemTitle.innerText = `${eachListItem.text}`

            //add to calender list cont
            fragment.appendChild(seenListItemClone)
        })

        //add to agenda cont
        agendaListCont.appendChild(fragment)
    }

    function setSelectedDateListCont() {
        //generate side panel dates
        const seenListItemsForDate = getListItemsForDate(selectedDate, true)
        selectedDateListCont.innerHTML = ""

        if (seenListItemsForDate !== undefined) {
            selectedDateListCont.appendChild(seenListItemsForDate)
        }
    }
}
calender()

function generateCalendar(year: number, month: number) {
    const calendar = generateCalendarData(year, month);

    const table = getElement<HTMLTableElement>(".calenderTable");
    table.innerHTML = ""; // clear previous calender table

    // Weekday headers
    const headers = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    //make a new row
    const headerRow = document.createElement("tr");

    //go over each day and make table headings
    for (const day of headers) {
        const seenHeadingTemplate = getElement<HTMLTemplateElement>("#calenderTableHead")
        const clone = seenHeadingTemplate.content.cloneNode(true) as HTMLElement;

        let seenTh = clone.querySelector("th")
        if (seenTh === null) throw new Error("not seeing th")

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
            const seenTableDataTemplate = getElement<HTMLTemplateElement>("#calenderTableData")
            const tableDataClone = seenTableDataTemplate.content.cloneNode(true) as HTMLElement;

            //set html on table data
            const seenP = getElement("p", undefined, tableDataClone)
            const calenderListCont = getElement(".calenderListCont", undefined, tableDataClone)

            //make function that creates list items when calender loads for a specific date
            //use function in side panel - pull the template - add it to a container - diaply it
            //find smart functions

            //set html on table data
            if (day !== null) {
                const cellDate = new Date(year, month, day)

                const seenListItemsForDate = getListItemsForDate(cellDate)

                if (seenListItemsForDate !== undefined) {
                    calenderListCont.appendChild(seenListItemsForDate)
                }

                //fill the values
                seenP.innerText = `${day}`;
            }

            tr.appendChild(tableDataClone);
        }

        table.appendChild(tr);
    }

    function generateCalendarData(year: number, month: number) {
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
            while (week.length < 7) week.push(null);
            calendar.push(week);
        }

        return calendar; // array of weeks, each week is an array of 7 elements
    }
}

function getListItemsForDate(date: Date, fullSize: boolean = false): DocumentFragment | undefined {//return the html for all list items
    //set html on table data
    const fragment = new DocumentFragment();

    //set html on table data
    const cellDate = new Date(date)

    //check the dummy data if a match is seen
    const listItemsForCell = calenderDummyListItems[cellDate.toLocaleDateString()]

    if (listItemsForCell === undefined) return
    listItemsForCell.forEach(eachListItemForCell => {
        //get the list item templates
        const seenListItemTemplate = getElement<HTMLTemplateElement>("#calenderListItem")
        const seenListItemClone = seenListItemTemplate.content.cloneNode(true) as HTMLElement;

        //set 
        const listItem = getElement("li", undefined, seenListItemClone)
        const listItemTime = getElement(".listItemTime", undefined, seenListItemClone)
        const listItemTitle = getElement(".listItemTitle", undefined, seenListItemClone)
        const listItemDescription = getElement(".listItemDescription", undefined, seenListItemClone)

        //set full size
        if (listItem.dataset.fullSize === undefined) throw new Error("not seeing dataset fullSize")
        listItem.dataset.fullSize = fullSize ? "true" : "false"

        //set html values for list item template
        listItem.style.background = `${eachListItemForCell.bg}`
        listItemTime.innerText = `${eachListItemForCell.time}`
        listItemTitle.innerText = `${eachListItemForCell.title}`
        listItemDescription.innerText = `${eachListItemForCell.description}`

        //add to calender list cont
        fragment.appendChild(seenListItemClone)
    })

    return fragment
}
