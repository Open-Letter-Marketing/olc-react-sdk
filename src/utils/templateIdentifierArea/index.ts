import { StoreType } from "polotno/model/store";

// Safety Border Files
import { addIdentifierAreaTo4x6PostCard, addIdentifierAreaTo6x9PostCard, addIdentifierAreaTo6x11PostCard } from './postCards'
import { addIdentifierAreaToProfessionalWindow, addIdentifierAreaToProfessionalNonWindow } from './professional'
import { addIdentifierAreaToPersonalLetter } from './personal'
import { addIdentifierAreaToBiFold } from './biFold'
import { addIdentifierAreaToTriFold } from './triFold'


export const addIdentifiersForTemplates = (productId: string, store: StoreType) => {
    if (!productId) return;
    if (+productId === 13) {
        addIdentifierAreaTo4x6PostCard(store);
    } else if (+productId === 14) {
        addIdentifierAreaTo6x9PostCard(store);
    } else if (+productId === 15) {
        addIdentifierAreaTo6x11PostCard(store);
    } else if (+productId === 2) {
        addIdentifierAreaToProfessionalWindow(store);
    } else if (+productId === 4) {
        addIdentifierAreaToProfessionalNonWindow(store);
    } else if (+productId === 5) {
        addIdentifierAreaToPersonalLetter(store);
    } else if (+productId === 9) {
        addIdentifierAreaToBiFold(store);
    } else if (+productId === 11) {
        addIdentifierAreaToTriFold(store);
    }
};
