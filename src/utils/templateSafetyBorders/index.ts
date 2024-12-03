import { StoreType } from "polotno/model/store";

// Safety Border Files
import { addSafetyBordersTo4x6PostCard, addSafetyBordersTo6x9PostCard, addSafetyBordersTo6x11PostCard } from './postCards'
import { addSafetyBordersToPersonalLetter } from './personal'
import { addSafetyBordersToNonWindowProfessioanl } from './professional'



export const addSafetyBordersForTemplates = (productId: string, store: StoreType) => {
    if (!productId) return;
    if (+productId === 13) {
        addSafetyBordersTo4x6PostCard(store);
    } else if (+productId === 14) {
        addSafetyBordersTo6x9PostCard(store);
    } else if (+productId === 15) {
        addSafetyBordersTo6x11PostCard(store);
    } else if (+productId === 5) {
        addSafetyBordersToPersonalLetter(store);
    } else if (+productId === 4) {
        addSafetyBordersToNonWindowProfessioanl(store);
    }
};
