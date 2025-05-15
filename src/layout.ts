import { loadComponent } from "./utility.js";

async function layout() {
    //get navbar
    loadComponent({ componentLocation: "components/navbar/navbar.html", elSelector: "#nav" })

    //get sidebar
    loadComponent({ componentLocation: "components/sidebar/sidebar.html", elSelector: "#sidebar" })

    //get footer
    loadComponent({ componentLocation: "components/footer/footer.html", elSelector: "#footer" })
}
layout();
