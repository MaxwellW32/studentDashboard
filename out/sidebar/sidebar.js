import { getElement } from "../utility.js";
export function sidebarMain() {
    let sidebarShowing = window.innerWidth > 800;
    const sidebarCloseBttn = getElement("#sidebarCloseBttn");
    const sidebarOpenBttn = getElement("#sidebarOpenBttn");
    const sidebar = getElement("#sidebar");
    //determine if showing
    if (!sidebarShowing) {
        sidebar.style.display = "none";
    }
    sidebarCloseBttn.addEventListener("click", handleSidebarCloseBttnClick);
    sidebarOpenBttn.addEventListener("click", handleSidebarCloseBttnClick);
    function handleSidebarCloseBttnClick() {
        //ensure only works on mobile
        sidebarShowing = !sidebarShowing;
        if (sidebarShowing) {
            sidebar.style.display = "grid";
        }
        else {
            sidebar.style.display = "none";
        }
    }
}
