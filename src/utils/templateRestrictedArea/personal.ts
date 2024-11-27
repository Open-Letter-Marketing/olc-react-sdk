// Define the type for the element being added
interface Element {
    id: string;
    type: string;
    name: string;
    opacity: number;
    visible: boolean;
    selectable: boolean;
    removable: boolean;
    alwaysOnTop: boolean;
    showInExport: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
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
    contentEditable: boolean;
    styleEditable: boolean;
    subType?: string;
    fill?: string;
    dash?: any[];
    strokeWidth?: number;
    stroke?: string;
    cornerRadius?: number;
    text?: string;
    placeholder?: string;
    fontSize?: number;
    fontFamily?: string;
    fontStyle?: string;
    fontWeight?: string;
    textDecoration?: string;
    align?: string;
    verticalAlign?: string;
    lineHeight?: number;
    letterSpacing?: number;
    backgroundEnabled?: boolean;
    backgroundColor?: string;
    backgroundOpacity?: number;
    backgroundCornerRadius?: number;
    backgroundPadding?: number;
    src?: string;
    cropX?: number;
    cropY?: number;
    cropWidth?: number;
    cropHeight?: number;
    flipX?: boolean;
    flipY?: boolean;
    clipSrc?: string;
    borderSize?: number;
    keepRatio?: boolean;
}

// Define the type for the page
interface Page {
    addElement: (element: Element) => void;
}

// Define the type for the store
interface Store {
    pages: Page[];
    history: {
        clear: () => void;
    };
}


export const addAreaToPersonalLetters = (store: Store): void => {
    const page = store.pages[0];

    const elements: Element[] = [
    ];

    elements.forEach(element => page.addElement(element));
    store.history.clear();
};