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


export const addAreaToNonWindowProfessionalLetters = (store: Store): void => {
    const page = store.pages[0];

    const elements: Element[] = [
        {
            id: "sequence",
            type: "text",
            name: "",
            opacity: 1,
            visible: true,
            selectable: false,
            removable: false,
            alwaysOnTop: true,
            showInExport: true,
            x: -1.4210854715202004e-14,
            y: 1014.9446441628568,
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
            shadowColor: "black",
            shadowOpacity: 1,
            draggable: false,
            resizable: false,
            contentEditable: false,
            styleEditable: false,
            text: `Sequence`,
            placeholder: "",
            fontSize: 8,
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "normal",
            textDecoration: "",
            fill: "#CCCCCC",
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
          }
    ];

    elements.forEach(element => page.addElement(element));
    store.history.clear();
};