import { DPI } from "../constants";

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
    width: number;
    height: number;
    pages: Page[];
    history: {
        clear: () => void;
    };
}


export const addRestrictedAreaToTriFold = (store: Store, size: [number, number], barcodeSrc: string): void => {
    const page = store.pages[0];

    const elements: Element[] = [
        {
            id: 'figure-1',
            type: 'figure',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: store.width - size[0] * DPI - 0.15 * DPI,
            y: store.height - size[1] * DPI - 0.125 * DPI - 4 * DPI,
            width: size[0] * DPI,
            height: size[1] * DPI,
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
            shadowColor: 'black',
            shadowOpacity: 1,
            draggable: false,
            resizable: false,
            contentEditable: false,
            styleEditable: false,
            subType: 'rect',
            fill: 'white',
            dash: [],
            strokeWidth: 0,
            stroke: '#0c0c0c',
            cornerRadius: 0,
        },
        {
            id: 'return-address',
            type: 'text',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: store.width - size[0] * DPI - 0.15 * DPI + 10,
            y: store.height - size[1] * DPI - 0.125 * DPI + 20 - 4 * DPI,
            width: 240,
            height: 20,
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
            shadowColor: 'black',
            shadowOpacity: 1,
            draggable: false,
            resizable: false,
            contentEditable: false,
            styleEditable: false,
            text: 'YOUR RETURN ADDRESS \nWILL AUTOMATICALLY \nBE PRINTED IN THIS \nPOSITION',
            placeholder: '',
            fontSize: 8,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: '',
            fill: 'black',
            align: 'start',
            verticalAlign: 'top',
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
            backgroundEnabled: false,
            backgroundColor: '#7ED321',
            backgroundOpacity: 1,
            backgroundCornerRadius: 0.5,
            backgroundPadding: 0.5,
        },
        {
            id: 'indicia',
            type: 'text',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: store.width - 111 - 0.15 * DPI,
            y: store.height - size[1] * DPI + 10 - 4 * DPI,
            width: 111,
            height: 40,
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
            shadowColor: 'black',
            shadowOpacity: 1,
            draggable: false,
            resizable: false,
            contentEditable: false,
            styleEditable: false,
            text: `POSTAGE\nINDICIA`,
            placeholder: '',
            fontSize: 12,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: '',
            fill: 'black',
            align: 'center',
            verticalAlign: 'top',
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
            backgroundEnabled: false,
            backgroundColor: '#7ED321',
            backgroundOpacity: 1,
            backgroundCornerRadius: 0.5,
            backgroundPadding: 0.5,
        },
        {
            id: 'barcode',
            type: 'image',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            y: store.height - 28 - size[1] * DPI + 100 - 4 * DPI,
            x: store.width - size[0] * DPI - 0.15 * DPI + 5,
            width: size[0] * DPI - 23,
            height: 15,
            rotation: 0,
            animations: [],
            blurEnabled: false,
            brightnessEnabled: false,
            brightness: 0,
            sepiaEnabled: false,
            grayscaleEnabled: false,
            shadowEnabled: false,
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowOpacity: 1,
            draggable: false,
            resizable: false,
            contentEditable: false,
            styleEditable: false,
            src: barcodeSrc,
            cropX: 0,
            cropY: 0,
            cropWidth: 1,
            cropHeight: 1,
            cornerRadius: 0,
            flipX: false,
            flipY: false,
            clipSrc: '',
            borderSize: 0,
            keepRatio: false,
        },
        {
            id: 'recipient-address',
            type: 'text',
            name: '',
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: store.width - size[0] * DPI - 0.15 * DPI + 5,
            y: store.height - size[1] * DPI - 0.125 * DPI + 120 - 4 * DPI,
            width: 240,
            height: 20,
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
            shadowColor: 'black',
            shadowOpacity: 1,
            draggable: false,
            resizable: false,
            contentEditable: false,
            styleEditable: false,
            text: 'RECIPIENT ADDRESS \nWILL AUTOMATICALLY \nBE PRINTED IN THIS \nPOSITION',
            placeholder: '',
            fontSize: 13,
            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            textDecoration: '',
            fill: 'black',
            align: 'start',
            verticalAlign: 'top',
            strokeWidth: 0,
            stroke: 'black',
            lineHeight: 1.2,
            letterSpacing: 0,
            backgroundEnabled: false,
            backgroundColor: '#7ED321',
            backgroundOpacity: 1,
            backgroundCornerRadius: 0.5,
            backgroundPadding: 0.5,
        },
    ];

    elements.forEach(element => page.addElement(element));
    store.history.clear();
};