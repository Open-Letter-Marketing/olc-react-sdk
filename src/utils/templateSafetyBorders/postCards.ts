import { createBorder, createSafetyTextElement } from "../helper";
import { Element, Store } from "./types"

export const addSafetyBordersTo4x6PostCard = (store: Store): void => {
    const randomizedId = Math.random().toString(36).substring(2, 7);

    const safetyBordersTextFirst = createSafetyTextElement(
        `safety-text-1-${randomizedId}`,
        -21,
        3.6,
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
            createBorder(`top-1-${randomizedId}`, 18.19, 14.7, 539.61, 1.97, 0),
            createBorder(`bottom-1-${randomizedId}`, 18.19, 367.32, 539.61, 1.97, 0),
            createBorder(`left-1-${randomizedId}`, 17.21, 368.31, 352.62, 1.97, -90),
            createBorder(`right-1-${randomizedId}`, 556.82, 368.31, 352.62, 1.97, -90),
        ],
    };


    const safetyBordersTextSecond = createSafetyTextElement(
        `safety-text-2-${randomizedId}`,
        -21,
        3.6,
        543,
        "Keep important text/images inside the green line. Content beyond this line may be trimmed during production."
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
            createBorder(`top-2-${randomizedId}`, 18.19, 14.7, 539.61, 1.97, 0),
            createBorder(`bottom-2-${randomizedId}`, 18.19, 367.32, 539.61, 1.97, 0),
            createBorder(`left-2-${randomizedId}`, 17.21, 368.31, 352.62, 1.97, -90),
            createBorder(`right-2-${randomizedId}`, 556.82, 368.31, 352.62, 1.97, -90),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);

    store.pages[1]?.addElement(secondPageBorders);
    store.pages[1]?.addElement(safetyBordersTextSecond);

    // Clear history
    store.history.clear();
};

export const addSafetyBordersTo6x9PostCard = (store: Store): void => {
    const randomizedId = Math.random().toString(36).substring(2, 7);

    const safetyBordersTextFirst = createSafetyTextElement(
        `safety-text-1-${randomizedId}`,
        -8.29,
        5.8,
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
            createBorder(`top-1-${randomizedId}`, 28, 22.5, 808, 2.94, 0),
            createBorder(`bottom-1-${randomizedId}`, 28, 550, 808, 2.94, 0),
            createBorder(`left-1-${randomizedId}`, 26.5, 552, 528, 2.94, -90),
            createBorder(`right-1-${randomizedId}`, 834.5, 552, 528, 2.94, -90),
        ],
    };

    const safetyBordersTextSecond = createSafetyTextElement(
        `safety-text-2-${randomizedId}`,
        -8.6,
        5.09,
        543,
        "Keep important text/images inside the green line. Content beyond this line may be trimmed during production."
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
            createBorder(`top-2-${randomizedId}`, 28, 22.5, 808, 2.94, 0),
            createBorder(`bottom-2-${randomizedId}`, 28, 550, 808, 2.94, 0),
            createBorder(`left-2-${randomizedId}`, 26.5, 552, 528, 2.94, -90),
            createBorder(`right-2-${randomizedId}`, 834.5, 552, 528, 2.94, -90),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);

    store.pages[1]?.addElement(secondPageBorders);
    store.pages[1]?.addElement(safetyBordersTextSecond);

    // Clear history
    store.history.clear();
};

export const addSafetyBordersTo6x11PostCard = (store: Store): void => {
    const randomizedId = Math.random().toString(36).substring(2, 7);

    const safetyBordersTextFirst = createSafetyTextElement(
        `safety-text-1-${randomizedId}`,
        -8.29,
        5.8,
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
            createBorder(`top-1-${randomizedId}`, 25.5, 23.8, 1005, 2.94, 0),
            createBorder(`bottom-1-${randomizedId}`, 25.5, 549, 1005, 2.94, 0),
            createBorder(`left-1-${randomizedId}`, 24, 550, 525, 2.94, -90),
            createBorder(`right-1-${randomizedId}`, 1028, 550, 525, 2.94, -90),
        ],
    };

    const safetyBordersTextSecond = createSafetyTextElement(
        `safety-text-2-${randomizedId}`,
        -8.6,
        5.09,
        543,
        "Keep important text/images inside the green line. Content beyond this line may be trimmed during production."
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
            createBorder(`top-2-${randomizedId}`, 25.5, 23.8, 1005, 2.94, 0),
            createBorder(`bottom-2-${randomizedId}`, 25.5, 549, 1005, 2.94, 0),
            createBorder(`left-2-${randomizedId}`, 24, 550, 525, 2.94, -90),
            createBorder(`right-2-${randomizedId}`, 1028, 550, 525, 2.94, -90),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);

    store.pages[1]?.addElement(secondPageBorders);
    store.pages[1]?.addElement(safetyBordersTextSecond);

    // Clear history
    store.history.clear();
};


