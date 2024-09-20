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