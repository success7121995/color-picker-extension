import type { RGB, HEX } from "../types/color";

/**
 * Convert RGBA color to CSS rgba string
 * @param color - The RGB color to convert
 * @param alpha - The alpha value to add to the color
 * @returns The CSS rgba string
 */
export const rgbaToString = (color: RGB, alpha: number = 1): string => {
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha})`;
};

/**
 * Convert HEX color to CSS string
 * @param color - The HEX color to convert
 * @returns The CSS hex string
 */
export const hexToString = (color: HEX): string => {
    return `#${color}`;
};

/**
 * Convert any color type to CSS string
 * @param color - The color to convert
 * @returns The CSS string
 */
export const colorToString = (color: RGB | HEX): string => {
    if (typeof color === 'string') {
        return hexToString(color);
    }
    return rgbaToString(color);
};

/**
 * Convert RGB to HEX color
 * @param color - The RGB color to convert
 * @returns The HEX color
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
 * @param hex - The HEX color to convert
 * @returns The RGB color
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
 * @param color - The color to normalize
 * @returns The normalized color
 */
export const normalizeToRgb = (color: RGB | HEX): RGB => {
    if (typeof color === 'string') {
        return hexToRgb(color);
    }
    return color;
};

/**
 * Generate a random RGBA color
 * @returns The random RGBA color
 */
export const randomizeRGB = (): RGB => {
    return {
        r: Math.floor(Math.random() * 256),
        g: Math.floor(Math.random() * 256),
        b: Math.floor(Math.random() * 256),
    };
};

/**
 * Generate a random HEX color
 * @returns The random HEX color
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
 * @returns The random color
 */
export const randomizeColor = (): RGB | HEX => {
    return Math.random() > 0.5 ? randomizeRGB() : randomizeHEX();
};

/**
 * Get the luminance of a color
 * @param color - The color to get the luminance of
 * @returns The luminance of the color
 */
export const getLuminance = (color: RGB): number => {
    return (0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b) / 255;
};