export type RGB = {
    r: number;
    g: number;
    b: number;
}

export type HEX = string;

export type rgbaFormFields = {
    name: keyof RGB;
    label: string;
    min: number;
    max: number;
}