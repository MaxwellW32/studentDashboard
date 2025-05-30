import { getElement } from "../utility.js";
function feeCollection() {
    const feeCollectionTileCont = getElement("#feeCollectionTileCont");
    const feeCollectionTileTemplate = getElement("#feeCollectionTileTemplate");
    for (let index = 0; index < 4; index++) {
        //make 4 tiles
        const feeCollectionTile = feeCollectionTileTemplate.content.cloneNode(true);
        feeCollectionTileCont.append(feeCollectionTile);
    }
}
feeCollection();
