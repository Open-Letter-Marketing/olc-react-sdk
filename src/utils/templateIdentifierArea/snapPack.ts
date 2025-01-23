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
    draggable: false,
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


export const addIdentifierAreaToSnapPackMailer = (store: Store): void => {
    const pages = [store.pages[0], store.pages[1]];

    const elements: Element[] = [
        createTextElement("cont-id-placeholder", "C:", 3.8581732170865024, 1040, 11),
        createTextElement("contId", "0000001", 6.833133185301714, 1040, 30),
        createTextElement("sequence-id-placeholder", "| S:", 30.83313319030166, 1040, 12),
        createTextElement("sequence", "0000001", 36.833133195301436, 1040, 29),
        createTextElement("template-id-placeholder", "| T:", 60.48877720364756, 1040, 14),
        createTextElement("templateId", "0001034", 67.48877720864735, 1040, 29),
        createTextElement("order-id-placeholder", "| O:", 92.33313320030143, 1040, 11),
        createTextElement("orderId", "0000127", 97.8331332053007, 1040, 29),
    ];

    elements.forEach(element => pages.forEach((page)=> page.addElement(element)));
    store.history.clear();
};