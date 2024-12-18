import { createBorder, createSafetyTextElement } from "../helper";
import { Element, Store } from "./types"

export const addSafetyBordersToBiFold = (store: Store): void => {
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
        880,
        -10.5,
        600,
        "Fold Line",
        90
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
            createBorder(`top-1-${randomizedId}`, 25.96, 24.58, 1676, 2.94, 0),
            createBorder(`bottom-1-${randomizedId}`, 25.96, 551.74, 1676, 2.94, 0),
            createBorder(`left-1-${randomizedId}`, 24.5, 553.349, 527.167, 2.94, -90),
            createBorder(`right-1-${randomizedId}`, 1700.5, 555.22, 528, 2.94, -90),
            createBorder(`fold-line-1-${randomizedId}`, 863, 580, 580, 2, -90, 'rgba(208,2,27,1)'),
        ],
    };

    const safetyBordersTextSecond = createSafetyTextElement(
        `safety-text-2-${randomizedId}`,
        -8.616,
        5.09,
        543,
        "Keep important text/images inside the green line. Content beyond this line may be trimmed during production."
    );

    const safetyLineTextSecond = createSafetyTextElement(
        `safety-line-2-${randomizedId}`,
        880,
        -10.5,
        600,
        "Fold Line",
        90
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
            createBorder(`top-2-${randomizedId}`, 25.96, 24.58, 1676, 2.94, 0),
            createBorder(`bottom-2-${randomizedId}`, 25.96, 551.74, 1676, 2.94, 0),
            createBorder(`left-2-${randomizedId}`, 24.5, 553.349, 527.167, 2.94, -90),
            createBorder(`right-2-${randomizedId}`, 1700.5, 555.22, 528, 2.94, -90),
            createBorder(`fold-line-2-${randomizedId}`, 863, 580, 580, 2, -90, 'rgba(208,2,27,1)'),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);
    store?.pages[0]?.addElement(safetyLineTextFirst);

    store.pages[1]?.addElement(secondPageBorders);
    store.pages[1]?.addElement(safetyBordersTextSecond);
    store?.pages[1]?.addElement(safetyLineTextSecond);

    // Clear history
    store.history.clear();
};


