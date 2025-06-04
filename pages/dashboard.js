import { SpeedometerRating } from "../customElements/arcRating.js";
import { CustomSelect } from "../customElements/selectElement.js";
import { dummyData } from "../dummyData.js";
import { generateCalendarData, getElement, validateTypeOption } from "../utility.js";
customElements.define("custom-select", CustomSelect);
customElements.define('speedometer-rating', SpeedometerRating);
function dashboard() {
    let showingRightSidebar = isOnDesktop();
    const dashboardRightSidebarEl = getElement(".dashboardRightSidebar");
    const dashboardRightSidebarToggleBttn = getElement("#dashboardRightSidebarToggleBttn");
    const dashboardRightSidebarCloseBttn = getElement("#dashboardRightSidebarCloseBttn");
    const seenDateMoveOptionTypeArr = ["prev", "next"];
    let selectedDate = new Date();
    //handle window change
    window.addEventListener("resize", () => {
        showingRightSidebar = isOnDesktop();
        setStyleForRightSidebar();
    });
    //ensure toggle button can be clicked
    dashboardRightSidebarToggleBttn.addEventListener("click", () => {
        showingRightSidebar = !showingRightSidebar;
        setStyleForRightSidebar();
    });
    //ensure close button can be clicked
    dashboardRightSidebarCloseBttn.addEventListener("click", () => {
        showingRightSidebar = false;
        setStyleForRightSidebar();
        console.log(`$hi`);
    });
    //get custom selections
    const scoreDateSelection = getElement("custom-select#scoreDateSelection");
    const subjectDateSelection = getElement("custom-select#subjectDateSelection");
    const subjectGradeSelection = getElement("custom-select#subjectGradeSelection");
    //respond to selection changes
    scoreDateSelection.addEventListener('change', (event) => {
        console.log('New value:', event.detail.value);
    });
    subjectDateSelection.addEventListener('change', (event) => {
        console.log('New value:', event.detail.value);
    });
    subjectGradeSelection.addEventListener('change', (event) => {
        console.log('New value:', event.detail.value);
    });
    //get date marker 
    const calenderTodayDateMarker = getElement("#calenderTodayDateMarker");
    setTodayDateMarker();
    //get prev next buttons
    const dateMoveButtons = getElement(".dateMoveButton", "all");
    dateMoveButtons.forEach(eachMoveButton => {
        if (eachMoveButton.dataset.moveOption === undefined)
            throw new Error("not seeing dataset moveOption");
        //add event listeners
        eachMoveButton.addEventListener("click", () => {
            if (eachMoveButton.dataset.moveOption === undefined)
                throw new Error("not seeing dataset moveOption");
            console.log(`$click`);
            const seenMoveOption = validateTypeOption(seenDateMoveOptionTypeArr, eachMoveButton.dataset.moveOption);
            changeSelectedDate(seenMoveOption === "next" ? 1 : -1);
        });
    });
    function runOnLoad() {
        //initial run to set styles
        setStyleForRightSidebar();
        //make table on load
        generateTable();
        //generate table with subject grades
        generateGradeTable();
        //make calender
        generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
        //agenda items
        setAgendaCont();
    }
    runOnLoad();
    //html styling
    function setStyleForRightSidebar() {
        console.log(`$showingRightSidebar`, showingRightSidebar);
        if (!showingRightSidebar) {
            dashboardRightSidebarEl.style.display = "none";
            dashboardRightSidebarToggleBttn.style.display = "block";
            dashboardRightSidebarCloseBttn.style.display = "none";
        }
        else {
            dashboardRightSidebarEl.style.display = "grid";
            dashboardRightSidebarToggleBttn.style.display = "none";
            if (!isOnDesktop()) { //only show close button on mobile
                dashboardRightSidebarCloseBttn.style.display = "block";
            }
        }
    }
    //logic
    function isOnDesktop() {
        return window.innerWidth >= 800;
    }
    function changeSelectedDate(numberOfMonths) {
        selectedDate = new Date(selectedDate.getTime());
        selectedDate.setMonth(selectedDate.getMonth() + numberOfMonths);
        //make calender
        generateCalendar(selectedDate.getFullYear(), selectedDate.getMonth());
        setTodayDateMarker();
    }
    //html updater functions
    function setTodayDateMarker() {
        calenderTodayDateMarker.innerText = `${selectedDate.toLocaleString('default', { month: 'long' })} ${selectedDate.getFullYear()}`;
    }
}
dashboard();
function generateTable() {
    const table = getElement("#dashboardAssignmentsTable");
    table.innerHTML = ""; // clear previous fee collection table
    //make a new row
    const tableHeadingRowTemplate = getElement("#dashboardAssignmentsTableHeadingRowTemplate");
    const tableHeadingRowClone = tableHeadingRowTemplate.content.cloneNode(true);
    //add header row
    table.appendChild(tableHeadingRowClone);
    //go over each record and make the row
    dummyData.assignments.forEach((eachAssignment, eachAssignmentIndex) => {
        const tableRowTemplate = getElement("#dashboardAssignmentsTableRowTemplate");
        const tableRowClone = tableRowTemplate.content.cloneNode(true);
        const dashboardAssignmentRecordNoEl = getElement(".dashboardAssignmentRecordNo", undefined, tableRowClone);
        const dashboardAssignmentRecordTaskEl = getElement(".dashboardAssignmentRecordTask", undefined, tableRowClone);
        const dashboardAssignmentRecordSubjectEl = getElement(".dashboardAssignmentRecordSubject", undefined, tableRowClone);
        const dashboardAssignmentRecordDueDateEl = getElement(".dashboardAssignmentRecordDueDate", undefined, tableRowClone);
        const dashboardAssignmentRecordTimeEl = getElement(".dashboardAssignmentRecordTime", undefined, tableRowClone);
        const dashboardAssignmentRecordStatusEl = getElement(".dashboardAssignmentRecordStatus", undefined, tableRowClone);
        const dashboardAssignmentRecordStatusPEl = getElement(".dashboardAssignmentRecordStatusP", undefined, tableRowClone);
        dashboardAssignmentRecordNoEl.innerText = `${eachAssignmentIndex + 1}`;
        dashboardAssignmentRecordTaskEl.innerText = eachAssignment.task;
        dashboardAssignmentRecordSubjectEl.innerText = eachAssignment.subject;
        const seenDate = new Date(eachAssignment.dueDate);
        dashboardAssignmentRecordDueDateEl.innerText = seenDate.toLocaleDateString();
        dashboardAssignmentRecordTimeEl.innerText = seenDate.toLocaleTimeString();
        dashboardAssignmentRecordStatusPEl.innerText = eachAssignment.status;
        let tagColor = eachAssignment.status === "in progress" ? "var(--color5)" : "var(--color6)";
        dashboardAssignmentRecordStatusEl.style.setProperty('--tagColorStarter', tagColor);
        table.appendChild(tableRowClone);
    });
}
function generateGradeTable() {
    const gradeSubjectCont = getElement("#gradeSubjectCont");
    const exampleSubjectGrades = [
        {
            name: "biology",
            mark: 55
        },
        {
            name: "mathematics",
            mark: 65
        },
        {
            name: "english literature",
            mark: 72
        },
        {
            name: "history",
            mark: 88
        },
        {
            name: "chemistry",
            mark: 95
        },
        {
            name: "physics",
            mark: 83
        },
        {
            name: "geography",
            mark: 80
        }
    ];
    //go over each record and make the row
    exampleSubjectGrades.forEach(eachSubjectGrade => {
        const gradeSubjectTemplateEl = getElement("#gradeSubjectTemplate");
        const gradeSubjectTemplateClone = gradeSubjectTemplateEl.content.cloneNode(true);
        const gradeSubjectTitle = getElement(".gradeSubjectTitle", undefined, gradeSubjectTemplateClone);
        const gradeSubjectMarker = getElement(".gradeSubjectMarker", undefined, gradeSubjectTemplateClone);
        gradeSubjectTitle.innerText = eachSubjectGrade.name;
        gradeSubjectMarker.style.width = `${eachSubjectGrade.mark}%`;
        gradeSubjectCont.appendChild(gradeSubjectTemplateClone);
    });
}
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
            //set html on table data
            if (day !== null) {
                //fill the values
                seenP.innerText = `${day}`;
            }
            tr.appendChild(tableDataClone);
        }
        table.appendChild(tr);
    }
}
function setAgendaCont() {
    //set html on table data
    const agendaListCont = getElement("#agendaListCont");
    dummyData.agenda.forEach(eachAgendaItem => {
        //get the list item templates
        const agendaListItemTemplate = getElement("#agendaListItemTemplate");
        const agendaListItemClone = agendaListItemTemplate.content.cloneNode(true);
        //set 
        const listItemLineEl = getElement(".listItemLine", undefined, agendaListItemClone);
        const listItemTextEl = getElement(".listItemText", undefined, agendaListItemClone);
        const listItemDateEl = getElement(".listItemDate", undefined, agendaListItemClone);
        const listItemTag = getElement(".listItemTag", undefined, agendaListItemClone);
        listItemTextEl.innerText = eachAgendaItem.text;
        listItemDateEl.innerText = new Date(eachAgendaItem.date).toLocaleDateString();
        listItemTag.innerText = eachAgendaItem.tag;
        //set styles
        listItemLineEl.style.backgroundColor = `hsl(from ${eachAgendaItem.bg} h 100 50`;
        //add to calender list cont
        agendaListCont.appendChild(agendaListItemClone);
    });
}
