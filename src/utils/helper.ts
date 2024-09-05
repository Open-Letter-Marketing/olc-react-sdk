export let basicAuthUsername: string = '';
export let basicAuthPassword: string = '';
export let isSandbox: boolean = false;

export const copyToClipboard = (text: string): void => {
  navigator.clipboard
    .writeText(text)
    .then(() => { })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
};

export const getAuthUserName = () => {
  return basicAuthUsername;
};

export const getAuthUserPassword = () => {
  return basicAuthPassword;
};

export const getIsSandbox = () => {
  return isSandbox;
};

export const setAuthUserName = (name: string) => {
  basicAuthUsername = name;
};

export const setAuthUserPassword = (password: string) => {
  basicAuthPassword = password;
};

export const setIsSandbox = (sandbox: boolean) => {
  isSandbox = sandbox;
};

export const removeSThroughZeroOne = (input: string) => {
  // Check if the string contains exactly one '0' or one '1'
  const hasSingleZero = (input.match(/0/g) || []).length === 1;
  const hasSingleOne = (input.match(/1/g) || []).length === 1;

  if (hasSingleZero || hasSingleOne) {
    return input.endsWith('s') ? input.slice(0, -1) : input;
  }
  
  return input;
}