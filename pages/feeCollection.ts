import { SearchBar } from "../customElements/searchBar.js";
import { CustomSelect } from "../customElements/selectElement.js";
import { getElement } from "../utility.js"

// customElements.define("search-bar", SearchBar);
customElements.define("custom-select", CustomSelect);

function feeCollection() {
    const feeCollectionTileCont = getElement("#feeCollectionTileCont")
    const feeCollectionTileTemplate = getElement<HTMLTemplateElement>("#feeCollectionTileTemplate")

    for (let index = 0; index < 4; index++) {
        //make 4 tiles
        const feeCollectionTile = feeCollectionTileTemplate.content.cloneNode(true) as HTMLElement;

        feeCollectionTileCont.append(feeCollectionTile)
    }
}
feeCollection()