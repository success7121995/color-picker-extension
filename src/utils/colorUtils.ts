import type { RGB, HEX } from "../types/color";

/**
 * Convert RGBA color to CSS rgba string
 */
export const rgbaToString = (color: RGB): string => {
    return `rgba(${color.r}, ${color.g}, ${color.b})`;
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
export const colorToString = (color: RGB | HEX): string => {
    if (typeof color === 'string') {
        return hexToString(color);
    }
    return rgbaToString(color);
};

/**
 * Convert RGB to HEX color
 */
export const rgbToHex = (color: RGB): HEX => {
    const toHex = (n: number): string => {
        const hex = n.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
};

/**
 * Convert HEX to RGB color
 */
export const hexToRgb = (hex: HEX): RGB => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) {
        return { r: 0, g: 0, b: 0 };
    }
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
};

/**
 * Normalize color to always be in RGB format for consistent state management
 */
export const normalizeToRgb = (color: RGB | HEX): RGB => {
    if (typeof color === 'string') {
        return hexToRgb(color);
    }
    return color;
};

/**
 * Generate a random RGBA color
 */
export const randomizeRGBA = (): RGB => {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
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
export const randomizeColor = (): RGB | HEX => {
    return Math.random() > 0.5 ? randomizeRGBA() : randomizeHEX();
};
