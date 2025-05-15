export async function getComponentHTML(componentLocation) {
    const response = await fetch(componentLocation);
    const seenHtml = await response.text();
    return seenHtml;
}
export async function loadComponent({ componentLocation, elSelector }) {
    const seenHtml = await getComponentHTML(componentLocation);
    //element to replace
    const elToReplace = document.querySelector(elSelector);
    if (elToReplace === null) {
        throw new Error(`not seeing element for ${componentLocation}`);
    }
    elToReplace.innerHTML = seenHtml;
}
