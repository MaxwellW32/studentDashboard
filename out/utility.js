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
export function getElement(elSelector) {
    const seenEl = document.querySelector(elSelector);
    if (seenEl === null) {
        throw new Error(`Element not found for selector: ${elSelector}`);
    }
    return seenEl;
}
// export async function loadComponent({ componentLocation, elSelector }: { componentLocation: string, elSelector: string }) {
//     const seenHtml = await getComponentHTML(componentLocation)
//     //element to replace
//     const elToReplace = document.querySelector(elSelector)
//     if (elToReplace === null) {
//         throw new Error(`not seeing element for ${componentLocation}`)
//     }
//     elToReplace.innerHTML = seenHtml;
// }
