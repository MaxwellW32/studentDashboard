import { getElement } from "../utility.js";

export function navbarMain() {
    console.log(`$hi navbar`);

    //get search bar
    const searchEl = getElement<HTMLInputElement>("#navSearchInput")
    console.log(`$searchEl`, searchEl);
}