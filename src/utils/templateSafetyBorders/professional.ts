import { createBorder, createSafetyTextElement } from "../helper";
import { Element, Store } from "./types"

export const addSafetyBordersToNonWindowProfessioanl = (store: Store): void => {
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
            createBorder(`top-1-${randomizedId}`, 24, 22, 768, 3.85, 0),
            createBorder(`bottom-1-${randomizedId}`, 24, 1028, 768, 3.85, 0),
            createBorder(`left-1-${randomizedId}`, 22, 1030, 1006, 3.85, -90),
            createBorder(`right-1-${randomizedId}`, 790, 1030, 1006, 3.85, -90),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);


    // Clear history
    store.history.clear();
};


export const addSafetyBordersToWindowProfessioanl = (store: Store): void => {
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
            createBorder(`top-1-${randomizedId}`, 24, 23, 768, 3.85, 0),
            createBorder(`bottom-1-${randomizedId}`, 24, 1030, 768, 3.85, 0),
            createBorder(`left-1-${randomizedId}`, 22, 1030, 1006, 3.85, -90),
            createBorder(`right-1-${randomizedId}`, 790, 1030, 1006, 3.85, -90),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);


    // Clear history
    store.history.clear();
};
