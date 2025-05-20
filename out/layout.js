import { loadComponent } from "./utility.js";
async function layout() {
    //get navbar
    loadComponent({ componentLocation: "components/navbar/navbar.html", elSelector: "#navTemplate" });
    //get sidebar
    loadComponent({ componentLocation: "components/sidebar/sidebar.html", elSelector: "#sidebarTemplate" });
    //get footer
    loadComponent({ componentLocation: "components/footer/footer.html", elSelector: "#footerTemplate" });
}
layout();
