// Define a union type for the allowed add-on values
export type AddOnValue = 'gsv' | 'property_offer';

export type AddOnTypes = {
    [key in AddOnValue]?: string;
};