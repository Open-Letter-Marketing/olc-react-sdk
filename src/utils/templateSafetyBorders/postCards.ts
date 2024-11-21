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
    const randomizedId = Math.random().toString(36).substring(2,7);

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
            createBorder("top-1", 18.19, 14.7, 539.61, 1.97, 0),
            createBorder("bottom-1", 18.19, 367.32, 539.61, 1.97, 0),
            createBorder("left-1", 17.21, 368.31, 352.62, 1.97, -90),
            createBorder("right-1", 556.82, 368.31, 352.62, 1.97, -90),
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
            createBorder(`top-2-${randomizedId}`, 18.19, 14.7, 539.61, 1.97, 0),
            createBorder(`bottom-2-${randomizedId}`, 18.19, 367.32, 539.61, 1.97, 0),
            createBorder(`left-2-${randomizedId}`, 17.21, 368.31, 352.62, 1.97, -90),
            createBorder(`right-2-${randomizedId}`, 556.82, 368.31, 352.62, 1.97, -90),
        ],
    };

    // Add borders to the pages
    store.pages[0]?.addElement(firstPageBorders);
    store.pages[1]?.addElement(secondPageBorders);

    // Clear history
    store.history.clear();
};
