export async function getComponentHTML(componentLocation) {
    const response = await fetch(componentLocation);
    const seenHtml = await response.text();
    return seenHtml;
}
export async function loadComponent({ componentLocation, elSelector }) {
    const seenHtml = await getComponentHTML(componentLocation);
    const elToReplace = document.querySelector(elSelector);
    if (elToReplace === null) {
        throw new Error(`Element not found for selector: ${elSelector}`);
    }
    // Create a container to parse HTML
    const wrapper = document.createElement("div");
    wrapper.innerHTML = seenHtml;
    const newEl = wrapper.firstElementChild;
    if (newEl === null) {
        throw new Error(`No valid HTML returned from: ${componentLocation}`);
    }
    elToReplace.replaceWith(newEl);
}
export function getElement(elSelector, option, searchElement) {
    const base = searchElement !== undefined ? searchElement : document;
    if (option === "all") {
        const result = base.querySelectorAll(elSelector);
        return result;
    }
    else {
        const result = base.querySelector(elSelector);
        if (result === null) {
            throw new Error(`Element not found for selector: ${elSelector}`);
        }
        return result;
    }
}
export function validateTypeOption(arrayOptions, option) {
    if (!arrayOptions.includes(option))
        throw new Error(`invalid option ${option}`);
    return option;
}
export function formatDateCustom(date) {
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).replace(",", ""); // Remove default comma between day and year
}
export function incrementDate(seenDate, incrementer) {
    const usedDate = new Date(seenDate);
    usedDate.setDate(usedDate.getDate() + incrementer);
    return usedDate;
}
export function generateCalendarData(year, month) {
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
    return calendar; // array of weeks, each week is an array of 7 elements
}
export function areDatesEqual(date1, date2) {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}
