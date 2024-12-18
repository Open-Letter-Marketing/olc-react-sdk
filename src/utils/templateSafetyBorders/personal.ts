import { createBorder, createSafetyTextElement } from "../helper";
import { Element, Store } from "./types"

export const addSafetyBordersToPersonalLetter = (store: Store): void => {
    const randomizedId = Math.random().toString(36).substring(2, 7);

    const safetyBordersTextFirst = createSafetyTextElement(
        `safety-text-1-${randomizedId}`,
        -15,
        5.81,
        543,
        "Keep important text/images inside the green line. Content beyond this line may be trimmed during production."
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
            createBorder(`top-1-${randomizedId}`, 24, 22, 480, 3, 0),
            createBorder(`bottom-1-${randomizedId}`, 24, 792, 480, 3, 0),
            createBorder(`left-1-${randomizedId}`, 22, 793, 770, 3, -90),
            createBorder(`right-1-${randomizedId}`, 503, 793, 770, 3, -90),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);


    // Clear history
    store.history.clear();
};


