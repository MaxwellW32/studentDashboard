import { getElement } from "../utility.js"

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