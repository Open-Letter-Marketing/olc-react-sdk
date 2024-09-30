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