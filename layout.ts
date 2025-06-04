import { navbarMain } from "./components/navbar/navbar.js";
import { sidebarMain } from "./components/sidebar/sidebar.js";
import { getComponentHTML, loadComponent } from "./utility.js";

//notes
//pages load their own ts, components need to have them run via function from whatever page called from
//use id's only for selections - use inline styles mostly - select classes

//to do
//animate display none

async function layout() {
    //load content first
    await Promise.all([0, 1, 2, 3].map(async each => {
        if (each === 0) {
            //get head
            const seenHeadHtml = await getComponentHTML("../components/head/head.html")
            document.head.innerHTML += seenHeadHtml

            //set can view body
            document.body.style.display = "grid"

        } else if (each === 1) {
            //get navbar
            await loadComponent({ componentLocation: "../components/navbar/navbar.html", elSelector: "#navTemplate" })

        } else if (each === 2) {
            //get sidebar
            await loadComponent({ componentLocation: "../components/sidebar/sidebar.html", elSelector: "#sidebarTemplate" })

        } else if (each === 3) {
            //get footer
            await loadComponent({ componentLocation: "../components/footer/footer.html", elSelector: "#footerTemplate" })
        }
    }))

    //run nav ts
    navbarMain()

    //run sidebar ts
    sidebarMain()
}
layout();