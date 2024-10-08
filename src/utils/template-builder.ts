/* eslint-disable no-useless-catch */

// Utils
import { multiPageLetters, BARCODE_IMAGE_URL, DEMO_S3_URL, PROD_S3_URL, emojiRegex } from './constants';
import { getIsSandbox } from './helper';

// Restricted Area Files
import { addRestrictedAreaToBiFold } from './templateRestrictedArea/biFold';
import { addRestrictedAreaToPostCard } from './templateRestrictedArea/postCard';
import { addAreaToProfessionalLetters } from './templateRestrictedArea/professional';
import { addRestrictedAreaToTriFold } from './templateRestrictedArea/triFold';


export const addressPrinting: { [key: string]: boolean } = {
  'Postcards-': true,
  'Tri-Fold Self-Mailers-': true,
  'Bi-Fold Self-Mailers-': true,
  'Professional Letters-#10 Double-Window': true,
};

export const multiPageTemplates: string[] = [
  'Postcards',
  'Tri-Fold Self-Mailers',
  'Bi-Fold Self-Mailers',
];

export interface EnvelopeType {
  id: number,
  label: string,
  type: string
}

export const envelopeTypes: EnvelopeType[] = [
  { id: 1, label: 'Windowed Envelope', type: '#10 Double-Window' },
  { id: 2, label: 'Non-Windowed Envelope', type: '#10 Grey' },
];

export const getFileAsBlob = async (url: string, returnType: string = 'json'): Promise<any> => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return returnType === 'json'
      ? blobToJSON(blob)
      : blobToString(blob);
  } catch (error) {
    throw error; // Optionally rethrow the error for further handling
  }
};

const blobToJSON = (jsonBlob: Blob): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      try {
        // Parse the result as JSON
        const parsedData = JSON.parse(reader.result as string);

        // Resolve the promise with the parsed JSON data
        resolve(parsedData);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(jsonBlob);
  });
};

export const blobToString = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = function () {
      // The result property contains the data as a string
      const blobString = reader.result as string;

      // Resolve the Promise with the blobString
      resolve(blobString);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(blob);
  });
};

export const downloadPDF = (title: string, url: string): void => {
  const link = document.createElement('a');
  link.href = url;
  link.download = title + '.pdf';

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger a click on the link
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);
};

export interface Product {
  productType: string;
}

export const drawRestrictedAreaOnPage = (store: any, product: Product, envelopeType: string) => {
  const barcodeSrc = (getIsSandbox() ? DEMO_S3_URL : PROD_S3_URL) + BARCODE_IMAGE_URL;
  if (addressPrinting[`${product.productType}-${envelopeType}`]) {
    if (product.productType === 'Professional Letters') {
      addAreaToProfessionalLetters(store, barcodeSrc);
    } else if (product.productType === multiPageLetters[0]) {
      addRestrictedAreaToPostCard(
        store,
        [3.2835, 2.375],
        barcodeSrc
      );
    } else if (product.productType === multiPageLetters[1]) {
      addRestrictedAreaToTriFold(store, [3.2835, 2.375], barcodeSrc);
    } else if (product.productType === multiPageLetters[2]) {
      addRestrictedAreaToBiFold(store, [3.2835, 2.375], barcodeSrc);
    }
  }
};

export const extractFontFamilies = (jsonData: any[]): string[] => {
  const fontFamilies: string[] = [];

  // Iterate through each object in the JSON data
  jsonData.forEach((obj) => {
    if (obj.children) {
      obj.children.forEach((child: any) => {
        if (child.type === 'text' && child.fontFamily) {
          // Extract font family from text objects
          fontFamilies.push(child.fontFamily);
        }
      });
    }
  });
  return fontFamilies;
};

export const validateGSV = (pages: any) => {
  const hasMultipleGSV = (children: any) =>
    children.filter(
      ({ custom }: any) => custom?.elementType === "GOOGLE_STREET_VIEW"
    ).length > 1;

  for (const page of pages) {
    if (hasMultipleGSV(page.children)) {
      return false;
    }
  }
  return true;
};


export const validateEmoji = (pages: any) => {
  const textElements = (children: any) =>
    children.filter(
      ({ type, text }: any) => type === "text" && emojiRegex.test(text)
    );


  for (const page of pages) {
    if (textElements(page.children).length) {
      return true;
    }
  }
  return false;
}