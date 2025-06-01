import { dummyData, noticeBoardItemType } from "../dummyData.js";
import { getElement } from "../utility.js";

function notice() {
    getNoticeBoardItems()
}
notice()

function getNoticeBoardItems() {
    const noticeBoardItemCont = getElement("#noticeBoardItemCont");
    noticeBoardItemCont.innerHTML = ""; // clear previous

    //go over each record and add to the item cont
    dummyData.noticeBoard.forEach(eachNoticeBoardItem => {
        const noticeBoardItemClone = makeNoticeBoardItem(eachNoticeBoardItem)
        const noticeBoardItem = getElement(".noticeBoardItem", undefined, noticeBoardItemClone)

        //on click
        noticeBoardItem.addEventListener("click", () => {
            const noticeBoardFocusItemCont = getElement("#noticeBoardFocusItemCont")

            const newNoticeBoardItemClone = makeNoticeBoardItem(eachNoticeBoardItem)
            const newNoticeBoardItem = getElement(".noticeBoardItem", undefined, newNoticeBoardItemClone)

            //ensure full noticeBoardItem displays
            newNoticeBoardItem.classList.add("showMore")

            //add to focus container
            noticeBoardFocusItemCont.innerHTML = ""
            noticeBoardFocusItemCont.appendChild(newNoticeBoardItem);
        })

        noticeBoardItemCont.appendChild(noticeBoardItemClone);
    })
}

function makeNoticeBoardItem(eachNoticeBoardItem: noticeBoardItemType) {
    const noticeBoardItemTemplate = getElement<HTMLTemplateElement>("#noticeBoardItemTemplate")
    const noticeBoardItemClone = noticeBoardItemTemplate.content.cloneNode(true) as HTMLDivElement;

    const noticeBoardItemImage = getElement<HTMLImageElement>(".noticeBoardItemImage", undefined, noticeBoardItemClone)
    const noticeBoardItemTitle = getElement(".noticeBoardItemTitle", undefined, noticeBoardItemClone)
    const noticeBoardItemAuthor = getElement(".noticeBoardItemAuthor", undefined, noticeBoardItemClone)
    const noticeBoardItemDate = getElement(".noticeBoardItemDate", undefined, noticeBoardItemClone)
    const noticeBoardItemViews = getElement(".noticeBoardItemViews", undefined, noticeBoardItemClone)
    const noticeBoardItemP = getElement(".noticeBoardItemP", undefined, noticeBoardItemClone)
    const noticeBoardItemTagCont = getElement(".noticeBoardItemTagCont", undefined, noticeBoardItemClone)

    noticeBoardItemImage.src = eachNoticeBoardItem.img
    noticeBoardItemTitle.innerText = eachNoticeBoardItem.title
    noticeBoardItemAuthor.innerText = `by ${eachNoticeBoardItem.author}`

    noticeBoardItemDate.innerText = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    }).format(new Date(eachNoticeBoardItem.date))

    noticeBoardItemViews.innerText = `${eachNoticeBoardItem.views}`
    noticeBoardItemP.innerText = eachNoticeBoardItem.text

    //populate tags
    eachNoticeBoardItem.tags.forEach(eachTag => {
        const smallColorOptions = ["var(--color1)", "var(--color2)", "var(--color3)"]

        const tagEl = `
<div class="tag2" style="--tagColorStarter: ${smallColorOptions[Math.floor(Math.random() * smallColorOptions.length)]}">
    <p>${eachTag}</p>
</div>
`
        noticeBoardItemTagCont.innerHTML += tagEl
    })

    return noticeBoardItemClone
}