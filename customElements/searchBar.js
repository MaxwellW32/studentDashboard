import { getElement } from "../utility.js";
export class SearchBar extends HTMLElement {
    // private shadow: ShadowRoot;
    constructor() {
        super();
        this.innerHTML += `
 <div
    style="border: 1px solid var(--shade1); display: flex; gap: var(--gapS); padding: .8rem 1rem; border-radius: var(--borderRadiusL); font-size: var(--fontSizeS);">
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
                d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
        </svg>
    </div>

    <input type="text" style="width: min(200px, 30vw);" />
</div>
        `;
    }
    connectedCallback() {
        let placeholderAttr = this.getAttribute('placeholder');
        if (placeholderAttr === null)
            throw new Error("not seeing placeholder passed to searchBar");
        if (placeholderAttr === "") {
            placeholderAttr = "Search";
        }
        const idAttr = this.getAttribute('id');
        if (idAttr === null)
            throw new Error("not seeing id passed to searchBar");
        //add on placeholder
        const seenEl = getElement("input", undefined, this);
        seenEl.placeholder = placeholderAttr;
        seenEl.id = idAttr;
    }
}
