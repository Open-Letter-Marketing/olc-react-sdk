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

export const addElementsforRealPennedLetters = (store: Store): void => {
  const page = store.pages[0];

  const elements: Element[] = [
    {
      id: 'content',
      type: 'text',
      name: '',
      opacity: 1,
      visible: true,
      selectable: true,
      removable: false,
      alwaysOnTop: false,
      showInExport: true,
      x: 26.500000000000114,
      y: 130,
      width: 477,
      height: 456,
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
      draggable: true,
      resizable: true,
      contentEditable: true,
      styleEditable: true,
      text: 'Hi ((C.FIRST_NAME)), \n\n We are interested in purchasing your property at ((C.PROPERTY_ADDRESS)). \n  \n     I am a serious buyer with CASH. \n\n Please call me at  ((SPF.PHONE_NUMBER)) to discuss my offer.\n                  \n\n                  Thanks! \n                    ((SPF.FIRST_NAME))',
      fontSize: 20,
      fontFamily: 'lexi Regular',
      fontStyle: 'normal',
      fontWeight: 'normal',
      textDecoration: '',
      fill: 'blue',
      align: 'start',
      verticalAlign: 'top',
      strokeWidth: 0,
      stroke: 'black',
      lineHeight: 1.75,
      letterSpacing: 0,
      backgroundEnabled: false,
      backgroundColor: '#7ED321',
      backgroundOpacity: 1,
      backgroundCornerRadius: 0.5,
      backgroundPadding: 0.5,
    },
    {
      id: 'safety-box',
      type: 'figure',
      name: '',
      opacity: 1,
      visible: true,
      selectable: false,
      removable: false,
      alwaysOnTop: true,
      showInExport: true,
      x: -1.1429403222173616e-11,
      y: 595.3928042183522,
      width: 527.9999999999511,
      height: 220.60719578157597,
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
      draggable: true,
      resizable: true,
      contentEditable: true,
      styleEditable: true,
      subType: 'rect',
      fill: '#FFFFFF',
      dash: [],
      strokeWidth: 0,
      stroke: '#0c0c0c',
      cornerRadius: 0,
    },
    {
      id: 'safety-note',
      type: 'text',
      name: '',
      opacity: 1,
      visible: true,
      selectable: false,
      removable: false,
      alwaysOnTop: true,
      showInExport: false,
      x: 4.999999999999986,
      y: 610.8462884505318,
      width: 518,
      height: 22,
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
      draggable: true,
      resizable: true,
      contentEditable: true,
      styleEditable: true,
      text: '**Pen-written area ends here. Keep your message above this line.',
      placeholder: '',
      fontSize: 17,
      fontFamily: 'Roboto',
      fontStyle: 'italic',
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
  ];

  elements.forEach((element) => page.addElement(element));
  store.history.clear();
};
