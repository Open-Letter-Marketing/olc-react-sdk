export interface Element {
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

export interface Page {
    addElement: (element: Element) => void;
}

export interface Store {
    width: number;
    height: number;
    pages: Page[];
    history: {
        clear: () => void;
    };
}