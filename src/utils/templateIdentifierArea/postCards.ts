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
    draggable?: boolean;
    resizable?: boolean;
    contentEditable: boolean;
    styleEditable: boolean;
    text: string;
    fontSize: number;
    fontFamily: string;
    fontStyle: string;
    fontWeight: string;
    fill: string;
    align: string;
    verticalAlign: string;
    lineHeight: number;
    letterSpacing: number;
    backgroundEnabled?: boolean;
    backgroundColor?: string;
    backgroundOpacity?: number;
    backgroundCornerRadius?: number;
    backgroundPadding?: number;
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

// Reusable function to create text elements
const createTextElement = (
    id: string,
    text: string,
    x: number,
    y: number,
    width: number
): Element => ({
    id,
    type: "text",
    name: "",
    opacity: 1,
    visible: true,
    selectable: false,
    removable: false,
    alwaysOnTop: true,
    showInExport: true,
    x,
    y,
    width,
    height: 11,
    rotation: 0,
    draggable: true,
    resizable: true,
    contentEditable: true,
    styleEditable: false,
    text,
    fontSize: 5,
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fill: "grey",
    align: "center",
    verticalAlign: "top",
    lineHeight: 1.2,
    letterSpacing: 0,
});


export const addIdentifierAreaTo4x6PostCard = (store: Store): void => {
    const page = store.pages[1];

    const elements: Element[] = [
        createTextElement("cont-id-placeholder", "C:", 434.8965200108928, 358.75, 11),
        createTextElement("contId", "0000001", 437.87147997910796   , 358.75, 30),
        createTextElement("sequence-id-placeholder", "| S:", 461.87147998410796, 358.75, 12),
        createTextElement("sequence", "0000001", 467.8714799891078, 358.75, 29),
        createTextElement("template-id-placeholder", "| T:", 491.5271239974538, 358.75, 14),
        createTextElement("templateId", "0001034", 498.5271240024538, 358.75, 29),
        createTextElement("order-id-placeholder", "| O:", 523.3714799941077, 358.75, 11),
        createTextElement("orderId", "0000127", 528.8714799991075, 358.75, 29),
    ];

    elements.forEach(element => page.addElement(element));
    store.history.clear();
};


export const addIdentifierAreaTo6x9PostCard = (store: Store): void => {
    const page = store.pages[1];

    const elements: Element[] = [
        createTextElement("cont-id-placeholder", "C:", 707.8534189829551, 542, 11),
        createTextElement("contId", "0000001", 711.2754448793503, 542, 30),
        createTextElement("sequence-id-placeholder", "| S:", 737.1400149293197, 542, 12),
        createTextElement("sequence", "0000001", 743.1400149343198, 542, 29),
        createTextElement("template-id-placeholder", "| T:", 767.506110379385, 542, 14),
        createTextElement("templateId", "0001034",774.5061103843851, 542, 29),
        createTextElement("order-id-placeholder", "| O:", 801.4538896665712, 542, 11),
        createTextElement("orderId", "0000127", 806.9538896715718, 542, 29),
    ];

    elements.forEach(element => page.addElement(element));
    store.history.clear();
};

export const addIdentifierAreaTo6x11PostCard = (store: Store): void => {
    const page = store.pages[1];

    const elements: Element[] = [
        createTextElement("cont-id-placeholder", "C:", 909.5172787002037, 540, 11),
        createTextElement("contId", "0000001", 912.032892116843, 540, 30),
        createTextElement("sequence-id-placeholder", "| S:", 936.0328921218431, 540, 12),
        createTextElement("sequence", "0000001", 942.032892126843, 540, 29),
        createTextElement("template-id-placeholder", "| T:", 964.0328921318434, 540, 14),
        createTextElement("templateId", "0001034", 971.032892136843, 540, 29),
        createTextElement("order-id-placeholder", "| O:", 996.7496765011042, 540, 11),
        createTextElement("orderId", "0000127", 1002.2496765061048, 540, 29),
    ];

    elements.forEach(element => page.addElement(element));
    store.history.clear();
};
