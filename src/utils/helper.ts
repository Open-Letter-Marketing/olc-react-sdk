export let publicApiKey: string = '';
export let isSandbox: boolean = false;

export const copyToClipboard = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => { })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
};

export const getPublicApiKey = () => {
  return publicApiKey;
};

export const setPublicApiKey = (key: string) => {
  publicApiKey = key;
};

export const getIsSandbox = () => {
  return isSandbox;
};

export const setIsSandbox = (sandbox: boolean) => {
  isSandbox = sandbox;
};

export const removeSThroughOne = (input: string) => {
  // Check if the string contains exactly one '0' or one '1'
  const containsExactlyOneOne = /^.*\b1\b(?!\d).*$/g.test(input) && !input.match(/1\d/);

  if (containsExactlyOneOne) {
    return input.endsWith('s') ? input.slice(0, -1) : input;
  }

  return input;
}

export const validURL = (str: string) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}


export const hexToRgba = (hex: any, opacity: any) => {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA string
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const getType = (file: any) => {
  const { type } = file;
  if (type.indexOf('svg') >= 0) {
    return 'svg';
  }
  if (type.indexOf('image') >= 0) {
    return 'image';
  }
  if (type.indexOf('video') >= 0) {
    return 'video';
  }
  return 'image';
}

export const cleanString = (input: string): string => {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    if (input.charCodeAt(i) <= 127) {
      output += input.charAt(i);
    }
  }
  return output;
}

export const createBorder = (
  id: string,
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number,
  color: string = "rgba(48,155,95,1)",
) => ({
  id,
  type: "line",
  opacity: 1,
  visible: true,
  selectable: false,
  removable: false,
  alwaysOnTop: true,
  showInExport: false,
  x,
  y,
  width,
  height,
  rotation,
  color,
  dash: [4, 1],
  draggable: false,
  resizable: false,
});


export const createSafetyTextElement = (
  id: string,
  x: number,
  y: number,
  width: number,
  text: string,
  rotation: number = 0
) => {
  return {
    id,
    type: "text",
    name: "",
    opacity: 1,
    visible: true,
    selectable: false,
    removable: false,
    alwaysOnTop: true,
    showInExport: false,
    x,
    y,
    width,
    height: 12,
    rotation,
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
    text,
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
}

export const dataURLtoBlob = (dataURL: string, type: string): Blob => {
  // Extract the Base64 data by removing the prefix
  const base64Index = dataURL.indexOf(";base64,") + 8;
  const base64String = dataURL.substring(base64Index);

  try {
    const byteString = atob(base64String);
    const arrayBuffer = new Uint8Array(byteString.length);

    for (let i = 0; i < byteString.length; i++) {
      arrayBuffer[i] = byteString.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type });
  } catch (error) {
    console.error("Failed to decode Base64 string:", error);
    throw new Error("Invalid Base64 string");
  }
};