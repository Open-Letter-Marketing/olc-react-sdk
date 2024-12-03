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


export const addIdentifierAreaToBiFold = (store: Store): void => {
    const page = store.pages[0];

    const elements: Element[] = [
        createTextElement("cont-id-placeholder", "C:", 726.6250400017847, 541.5, 11),
        createTextElement("contId", "0000001", 729.5999999700006 , 541.5, 30),
        createTextElement("sequence-id-placeholder", "| S:", 753.5999999750006, 541.5, 12),
        createTextElement("sequence", "0000001", 759.5999999800002, 541.5, 29),
        createTextElement("template-id-placeholder", "| T:", 783.2556439883459, 541.5, 14),
        createTextElement("templateId", "0001034", 790.2556439933462, 541.5, 29),
        createTextElement("order-id-placeholder", "| O:", 815.0999999850002, 541.5, 11),
        createTextElement("orderId", "0000127", 820.59999999, 541.5, 29),
    ];

    elements.forEach(element => page.addElement(element));
    store.history.clear();
};
