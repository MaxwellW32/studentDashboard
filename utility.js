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
