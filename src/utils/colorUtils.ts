import type { RGBA, HEX } from "../types/color";

/**
 * Convert RGBA color to CSS rgba string
 */
export const rgbaToString = (color: RGBA): string => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
};

/**
 * Convert HEX color to CSS string
 */
export const hexToString = (color: HEX): string => {
    return color;
};

/**
 * Convert any color type to CSS string
 */
export const colorToString = (color: RGBA | HEX): string => {
    if (typeof color === 'string') {
        return hexToString(color);
    }
    return rgbaToString(color);
};

/**
 * Generate a random RGBA color
 */
export const randomizeRGBA = (): RGBA => {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
        a: Math.random(),
    };
};

/**
 * Generate a random HEX color
 */
export const randomizeHEX = (): HEX => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

/**
 * Randomize between RGBA and HEX colors
 */
export const randomizeColor = (): RGBA | HEX => {
    return Math.random() > 0.5 ? randomizeRGBA() : randomizeHEX();
};
