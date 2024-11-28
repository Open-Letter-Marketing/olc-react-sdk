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

export const addSafetyBordersToPersonalLetter = (store: Store): void => {
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
        x: -15,
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
            createBorder(`top-1-${randomizedId}`, 16, 22, 495, 2.94, 0),
            createBorder(`bottom-1-${randomizedId}`, 16, 797, 495, 2.94, 0),
            createBorder(`left-1-${randomizedId}`, 16, 797, 775, 2.94, -90),
            createBorder(`right-1-${randomizedId}`, 508, 797, 775, 2.94, -90),
        ],
    };

    // Add elements to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store?.pages[0]?.addElement(safetyBordersTextFirst);


    // Clear history
    store.history.clear();
};


