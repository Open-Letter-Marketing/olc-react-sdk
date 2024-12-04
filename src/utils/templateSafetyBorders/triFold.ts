import { createBorder, createSafetyTextElement } from "../helper";
import { Element, Store } from "./types"

export const addSafetyBordersToTriFold = (store: Store): void => {
    const randomizedId = Math.random().toString(36).substring(2, 7);

    const safetyBordersTextFirst = createSafetyTextElement(
        `safety-text-1-${randomizedId}`,
        -8.29,
        5.81,
        543,
        "Keep important text/images inside the green line. Content beyond this line may be trimmed during production."
    );

    const safetyLineTextFirst = createSafetyTextElement(
        `safety-line-1-${randomizedId}`,
        -2,
        366,
        866,
        "Fold Line",
        0
    );

    const safetySecondLineTextFirst = createSafetyTextElement(
        `safety-line-2-${randomizedId}`,
        -2,
        744,
        866,
        "Fold Line",
        0
    );

    const firstPageBorders: Element = {
        id: `safety-border-1-${randomizedId}`,
        type: "group",
        opacity: 1,
        visible: true,
        selectable: false,
        removable: false,
        alwaysOnTop: true,
        showInExport: false,
        children: [
            createBorder(`top-1-${randomizedId}`, 26, 23.5, 811, 4, 0),
            createBorder(`bottom-1-${randomizedId}`, 26, 1123.6, 811, 4, 0),
            createBorder(`left-1-${randomizedId}`, 24.16, 1125, 1100, 4, -90),
            createBorder(`right-1-${randomizedId}`, 835, 1125, 1100, 4, -90),
            createBorder(`fold-line-1-${randomizedId}`, 866, 384, 866, 2, 180, 'rgba(208,2,27,1)'),
            createBorder(`fold-line-2-${randomizedId}`, 866, 763, 866, 2, 180, 'rgba(208,2,27,1)'),
        ],
    };

    const safetyBordersTextSecond = createSafetyTextElement(
        `safety-text-2-${randomizedId}`,
        -8.29,
        5.81,
        543,
        "Keep important text/images inside the green line. Content beyond this line may be trimmed during production."
    );

    const safetyLineTextSecond = createSafetyTextElement(
        `safety-line-2-1-${randomizedId}`,
        -2,
        366,
        866,
        "Fold Line",
        0
    );

    const safetySecondLineTextSecond = createSafetyTextElement(
        `safety-line-2-2-${randomizedId}`,
        -2,
        744,
        866,
        "Fold Line",
        0
    );


    const secondPageBorders: Element = {
        id: `safety-border-2-${randomizedId}`,
        type: "group",
        opacity: 1,
        visible: true,
        selectable: false,
        removable: false,
        alwaysOnTop: true,
        showInExport: false,
        children: [
            createBorder(`top-2-${randomizedId}`, 26, 23.5, 811, 4, 0),
            createBorder(`bottom-2-${randomizedId}`, 26, 1123.6, 811, 4, 0),
            createBorder(`left-2-${randomizedId}`, 24.16, 1125, 1100, 4, -90),
            createBorder(`right-2-${randomizedId}`, 835, 1125, 1100, 4, -90),
            createBorder(`fold-line-2-1-${randomizedId}`, 866, 384, 866, 2, 180, 'rgba(208,2,27,1)'),
            createBorder(`fold-line-2-2-${randomizedId}`, 866, 763, 866, 2, 180, 'rgba(208,2,27,1)'),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);
    store?.pages[0]?.addElement(safetyLineTextFirst);
    store?.pages[0]?.addElement(safetySecondLineTextFirst);

    store.pages[1]?.addElement(secondPageBorders);
    store.pages[1]?.addElement(safetyBordersTextSecond);
    store.pages[1]?.addElement(safetyLineTextSecond);
    store.pages[1]?.addElement(safetySecondLineTextSecond);


    // Clear history
    store.history.clear();
};


