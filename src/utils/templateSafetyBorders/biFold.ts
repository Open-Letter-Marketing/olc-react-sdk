import { createBorder } from "../helper";
import { Element, Store } from "./types"

export const addSafetyBordersToBiFold = (store: Store): void => {
    const randomizedId = Math.random().toString(36).substring(2, 7);

    const safetyBordersTextFirst: Element = {
        id: `safety-text-1-${randomizedId}`,
        type: "text",
        name: "",
        opacity: 1,
        visible: true,
        selectable: false,
        removable: false,
        alwaysOnTop: true,
        showInExport: false,
        x: -8.290471190609708,
        y: 5.805010334515337,
        width: 543,
        height: 12,
        rotation: 0,
        animations: [],
        blurEnabled: false,
        blurRadius: 10,
        brightnessEnabled: false,
        brightness: 0,
        sepiaEnabled: false,
        grayscaleEnabled: false,
        shadowEnabled: false,
        shadowBlur: 5,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "black",
        shadowOpacity: 1,
        draggable: false,
        resizable: false,
        contentEditable: false,
        styleEditable: false,
        text: "Keep important text/images inside the green line. Content beyond this line may be trimmed during production.",
        fontSize: 9,
        fontFamily: "Noto Sans JP",
        fontStyle: "italic",
        fontWeight: "normal",
        fill: "rgba(74,74,74,1)",
        align: "center",
        verticalAlign: "top",
        strokeWidth: 0,
        stroke: "black",
        lineHeight: 1.2,
        letterSpacing: 0,
        backgroundEnabled: false,
        backgroundColor: "#7ED321",
        backgroundOpacity: 1,
        backgroundCornerRadius: 0.5,
        backgroundPadding: 0.5,
    };
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
            createBorder(`top-1-${randomizedId}`, 28.19, 22.65, 1670, 2.94, 0),
            createBorder(`bottom-1-${randomizedId}`, 28.19, 550.39, 1670, 2.94, 0),
            createBorder(`left-1-${randomizedId}`, 26.73, 551.87, 527.74, 2.94, -90),
            createBorder(`right-1-${randomizedId}`, 1697.5, 551.87, 527.74, 2.94, -90),
        ],
    };

    const safetyBordersTextSecond: Element = {
        id: `safety-text-2-${randomizedId}`,
        type: "text",
        name: "",
        opacity: 1,
        visible: true,
        selectable: false,
        removable: false,
        alwaysOnTop: true,
        showInExport: false,
        x: -8.616000010000022,
        y: 5.098866817777,
        width: 543,
        height: 12,
        rotation: 0,
        animations: [],
        blurEnabled: false,
        blurRadius: 10,
        brightnessEnabled: false,
        brightness: 0,
        sepiaEnabled: false,
        grayscaleEnabled: false,
        shadowEnabled: false,
        shadowBlur: 5,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: "black",
        shadowOpacity: 1,
        draggable: false,
        resizable: false,
        contentEditable: false,
        styleEditable: false,
        text: "Keep important text/images inside the green line. Content beyond this line may be trimmed during production.",
        fontSize: 9,
        fontFamily: "Noto Sans JP",
        fontStyle: "italic",
        fontWeight: "normal",
        fill: "rgba(74,74,74,1)",
        align: "center",
        verticalAlign: "top",
        strokeWidth: 0,
        stroke: "black",
        lineHeight: 1.2,
        letterSpacing: 0,
        backgroundEnabled: false,
        backgroundColor: "#7ED321",
        backgroundOpacity: 1,
        backgroundCornerRadius: 0.5,
        backgroundPadding: 0.5,
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
            createBorder(`top-2-${randomizedId}`, 28.19, 22.65, 1670, 2.94, 0),
            createBorder(`bottom-2-${randomizedId}`, 28.19, 550.39, 1670, 2.94, 0),
            createBorder(`left-2-${randomizedId}`, 26.73, 551.87, 527.74, 2.94, -90),
            createBorder(`right-2-${randomizedId}`, 1697.5, 551.87, 527.74, 2.94, -90),
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


