import { StoreType } from "polotno/model/store";

// Safety Border Files
import { addSafetyBordersTo4x6PostCard, addSafetyBordersTo6x9PostCard, addSafetyBordersTo6x11PostCard } from './postCards'

export const addSafetyBordersForTemplates = (productId: string, store: StoreType) => {
    if (!productId) return;
    if (+productId === 13) {
        addSafetyBordersTo4x6PostCard(store);
    } else if (+productId === 14) {
        addSafetyBordersTo6x9PostCard(store);
    }
};
