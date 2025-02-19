// Define a union type for the allowed add-on values
export type AddOnValue = 'gsv' | 'property_offer';
export type TemplateTypesValue = 'my_templates' | 'team_templates' | 'olc-templates';


export type AddOnTypes = {
    [key in AddOnValue]?: string;
};

export type TemplateTypes = {
    [key in AddOnValue]?: string;
};