import { createBorder, createSafetyTextElement } from "../helper";
import { Element, Store } from "./types";

export const addSafetyBordersToSnapPackMailer = (store: Store): void => {
    const randomizedId = Math.random().toString(36).substring(2, 7);

    const safetyBordersTextFirst = createSafetyTextElement(
        `safety-text-1-${randomizedId}`,
        -15,
        5.81,
        543,
        "Keep important text/images inside the green line. Content beyond this line may be trimmed during production."
    );

    const safetyBordersInsidePanel = createSafetyTextElement(
        `inside-panel-${randomizedId}`,
        -0.5,
        388.78,
        410,
        "Inside Panel",
        -90,
        18
    );

    const safetyBordersOutsideFrontPanel = createSafetyTextElement(
        `outside-front-panel-${randomizedId}`,
        -0.5,
        731.5,
        410,
        "Outside Front Panel",
        -90,
        18
    );

    const safetyBordersOutsideBackPanel = createSafetyTextElement(
        `outside-back-panel-${randomizedId}`,
        -0.5,
        1073,
        410,
        "Outside Back Panel",
        -90,
        18
    );

    const safetyLineTextFirst = createSafetyTextElement(
        `safety-line-1-${randomizedId}`,
        -25,
        269,
        866,
        "Perforated Fold Line (Detachable Section)",
        0,
        14
    );

    const safetyLineTextSecond = createSafetyTextElement(
        `safety-line-2-${randomizedId}`,
        -25,
        330,
        866,
        "Fold Line",
        0,
        14
    );

    const safetyLineTextThird = createSafetyTextElement(
        `safety-line-3-${randomizedId}`,
        -25,
        687,
        866,
        "Fold Line",
        0,
        14
    );

    const safetyLineTextFourth = createSafetyTextElement(
        `safety-line-4-${randomizedId}`,
        -25.2,
        334.9,
        866,
        "Fold Line",
        0,
        14
    );

    const safetyLineTextFifth = createSafetyTextElement(
        `safety-line-5-${randomizedId}`,
        -25.2,
        690,
        866,
        "Fold Line",
        0,
        14
    );

    const safetyLineTextSixth = createSafetyTextElement(
        `safety-line-6-${randomizedId}`,
        -25.2,
        728,
        866,
        "Perforated Fold Line (Detachable Section)",
        0,
        14
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
            createBorder(`fold-line-1-${randomizedId}`, 840.8, 287.4, 866, 2, 180, 'rgba(208,2,27,1)'),
            createBorder(`fold-line-2-${randomizedId}`, 840.8, 348, 866, 2, 180, 'rgba(208,2,27,1)'),
            createBorder(`fold-line-3-${randomizedId}`, 840.8, 705, 866, 2, 180, 'rgba(208,2,27,1)'),
        ],
    };


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
            createBorder(`top-1-${randomizedId}`, 24, 22, 768, 3.85, 0),
            createBorder(`bottom-1-${randomizedId}`, 24, 1028, 768, 3.85, 0),
            createBorder(`left-1-${randomizedId}`, 22, 1030, 1006, 3.85, -90),
            createBorder(`right-1-${randomizedId}`, 790, 1030, 1006, 3.85, -90),
            createBorder(`fold-line-1-${randomizedId}`, 840.8, 353.92, 866, 2, 180, 'rgba(208,2,27,1)'),
            createBorder(`fold-line-2-${randomizedId}`, 840.8, 710, 866, 2, 180, 'rgba(208,2,27,1)'),
            createBorder(`fold-line-3-${randomizedId}`, 840.8, 746, 866, 2, 180, 'rgba(208,2,27,1)'),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);
    store?.pages[0]?.addElement(safetyBordersInsidePanel);
    store?.pages[0]?.addElement(safetyBordersOutsideFrontPanel);
    store?.pages[0]?.addElement(safetyBordersOutsideBackPanel);
    store?.pages[0]?.addElement(safetyLineTextFirst);
    store?.pages[0]?.addElement(safetyLineTextSecond);
    store?.pages[0]?.addElement(safetyLineTextThird);


    store.pages[1]?.addElement(secondPageBorders);
    store?.pages[1]?.addElement(safetyBordersTextFirst);
    store?.pages[1]?.addElement(safetyLineTextFourth);
    store?.pages[1]?.addElement(safetyLineTextFifth);
    store?.pages[1]?.addElement(safetyLineTextSixth);

    // Clear history
    store.history.clear();
};