import { getElement } from "../../utility.js";
export function navbarMain() {
    let navMoreOptionsShowing = false;
    const navbarIconCont = getElement("#navbarIconCont");
    navbarIconCont.addEventListener("click", handleNavBarIconContClick);
    const navMoreOptionsCont = getElement(".navMoreOptionsCont");
    //get search bar
    // const searchEl = getElement<HTMLInputElement>("#navSearchInput")
    function handleNavBarIconContClick() {
        //ensure only works on mobile
        if (window.innerWidth > 800)
            return;
        navMoreOptionsShowing = !navMoreOptionsShowing;
        if (navMoreOptionsShowing) {
            navMoreOptionsCont.style.display = "grid";
        }
        else {
            navMoreOptionsCont.style.display = "none";
        }
    }
}
