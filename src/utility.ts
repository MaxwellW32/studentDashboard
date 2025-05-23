export async function getComponentHTML(componentLocation: string) {
    const response = await fetch(componentLocation)
    const seenHtml = await response.text()

    return seenHtml
}

export async function loadComponent({ componentLocation, elSelector }: { componentLocation: string, elSelector: string }) {
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

export function getElement<T extends Element>(
    elSelector: string,
): T;
export function getElement<T extends Element>(
    elSelector: string,
    option: "all"
): NodeListOf<T>;
export function getElement<T extends Element>(
    elSelector: string,
    option?: "all" | undefined
): T | NodeListOf<T> {
    const seenEl =
        option === undefined
            ? document.querySelector(elSelector)
            : document.querySelectorAll(elSelector);

    if (seenEl === null) {
        throw new Error(`Element not found for selector: ${elSelector}`);
    }

    return option === undefined
        ? (seenEl as T)
        : (seenEl as NodeListOf<T>);
}

export function validateTypeOption<T>(arrayOptions: T[], option: string): T {
    if (!arrayOptions.includes(option as T)) throw new Error(`invalid option ${option}`)

    return option as T
}

export function formatDateCustom(date: Date): string {
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    }).replace(",", ""); // Remove default comma between day and year
}