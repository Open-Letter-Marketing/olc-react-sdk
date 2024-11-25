import { createBorder } from "../helper";
interface Element {
    id: string;
    type: string;
    name?: string;
    opacity: number;
    visible: boolean;
    selectable: boolean;
    removable: boolean;
    alwaysOnTop: boolean;
    showInExport: boolean;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    rotation?: number;
    text?: string;
    fontWeight?: string;
    fill?: string;
    align?: string;
    verticalAlign?: string;
    strokeWidth?: number;
    stroke?: string;
    lineHeight?: number;
    letterSpacing?: number;
    backgroundEnabled?: boolean;
    backgroundColor?: string;
    backgroundOpacity?: number;
    backgroundCornerRadius?: number;
    backgroundPadding?: number;
    fontSize?: number;
    fontFamily?: string;
    fontStyle?: string;
    animations?: any[];
    blurEnabled?: boolean;
    blurRadius?: number;
    brightnessEnabled?: boolean;
    brightness?: number;
    sepiaEnabled?: boolean;
    grayscaleEnabled?: boolean;
    shadowEnabled?: boolean;
    shadowBlur?: number;
    shadowOffsetX?: number;
    shadowOffsetY?: number;
    shadowColor?: string;
    shadowOpacity?: number;
    draggable?: boolean;
    resizable?: boolean;
    contentEditable?: boolean;
    styleEditable?: boolean;
    color?: string;
    dash?: number[];
    startHead?: string;
    endHead?: string;
    children?: Element[];
}

interface Page {
    addElement: (element: Element) => void;
}

interface Store {
    width: number;
    height: number;
    pages: Page[];
    history: {
        clear: () => void;
    };
}

export const addSafetyBordersTo4x6PostCard = (store: Store): void => {
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
        x: -21.71264327947958,
        y: 3.686579784300327,
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
            createBorder(`top-1-${randomizedId}`, 18.19, 14.7, 539.61, 1.97, 0),
            createBorder(`bottom-1-${randomizedId}`, 18.19, 367.32, 539.61, 1.97, 0),
            createBorder(`left-1-${randomizedId}`, 17.21, 368.31, 352.62, 1.97, -90),
            createBorder(`right-1-${randomizedId}`, 556.82, 368.31, 352.62, 1.97, -90),
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
        x: -21.71264327947958,
        y: 3.686579784300327,
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
            createBorder(`top-1-${randomizedId}`, 28.19, 22.65, 807.59, 2.94, 0),
            createBorder(`bottom-1-${randomizedId}`, 28.19, 550.39, 807.59, 2.94, 0),
            createBorder(`left-1-${randomizedId}`, 26.73, 551.87, 527.74, 2.94, -90),
            createBorder(`right-1-${randomizedId}`, 834.73, 551.87, 527.74, 2.94, -90),
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
            createBorder(`top-2-${randomizedId}`, 28.19, 22.65, 807.59, 2.94, 0),
            createBorder(`bottom-2-${randomizedId}`, 28.19, 550.39, 807.59, 2.94, 0),
            createBorder(`left-2-${randomizedId}`, 26.73, 551.87, 527.74, 2.94, -90),
            createBorder(`right-2-${randomizedId}`, 834.73, 551.87, 527.74, 2.94, -90),
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
            createBorder(`top-1-${randomizedId}`, 28.19, 22.65, 999, 2.94, 0),
            createBorder(`bottom-1-${randomizedId}`, 28.19, 550.39, 999, 2.94, 0),
            createBorder(`left-1-${randomizedId}`, 26.73, 551.87, 527.74, 2.94, -90),
            createBorder(`right-1-${randomizedId}`, 1024, 551.87, 527.74, 2.94, -90),
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
            createBorder(`top-2-${randomizedId}`, 28.19, 22.65, 999, 2.94, 0),
            createBorder(`bottom-2-${randomizedId}`, 28.19, 550.39, 999, 2.94, 0),
            createBorder(`left-2-${randomizedId}`, 26.73, 551.87, 527.74, 2.94, -90),
            createBorder(`right-2-${randomizedId}`, 1024, 551.87, 527.74, 2.94, -90),
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


