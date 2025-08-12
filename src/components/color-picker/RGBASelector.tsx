import type { RGB, rgbaFormFields } from "../../types/color";
import { useForm } from "react-hook-form";
import { useColor } from "../../constants/ColorProvider";
import { useEffect } from "react";
import { CopyButton } from "../index";
import { rgbaToString } from "../../utils/colorUtils";

// Form fields for the RGBA selector
const rgbaFormFields: rgbaFormFields[] = [
    {
        name: 'r',
        label: 'R',
        min: 0,
        max: 255,
    },
    {
        name: 'g',
        label: 'G',
        min: 0,
        max: 255,
    },
    {
        name: 'b',
        label: 'B',
        min: 0,
        max: 255,
    },
];

const RGBASelector = () => {
    // ===============================================
    // State
    // ===============================================
    const { color, setColor, theme } = useColor();

    // ===============================================
    // Hooks
    // ===============================================
    const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm<RGB>({
        defaultValues: {
            r: 0,
            g: 0,
            b: 0,
        },
    });

    // Watch form values for real-time updates
    const watchedValues = watch();

    // ===============================================
    // Effects
    // ===============================================
    // Update form values when color changes from palette
    useEffect(() => {
        setValue('r', color.r);
        setValue('g', color.g);
        setValue('b', color.b);
    }, [color, setValue]);

    // ===============================================
    // Handlers
    // ===============================================
    
    /**
     * Handle form submission
     * @param data - The form data
     */
    const onSubmit = (data: RGB) => {
        setColor(data);
    };

    /**
     * Handle real-time updates as user types
     * @param field - The field to update
     * @param value - The value to update the field to
     */
    const handleInputChange = (field: keyof RGB, value: number) => {
        const clampedValue = Math.max(0, Math.min(255, value));
        setValue(field, clampedValue);
        
        // Update color in real-time with the new value
        const updatedColor = {
            ...watchedValues,
            [field]: clampedValue,
        };
        setColor(updatedColor);
    };

    /**
     * Copy to clipboard
     */
    const copyToClipboard = () => {
        navigator.clipboard.writeText(rgbaToString(color));
    }   

    // ===============================================
    // Render
    // ===============================================
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
            <div className="flex flex-row gap-2 justify-center items-center">

                {rgbaFormFields.map((field) => (
                    <div key={field.name} className="flex flex-col items-center gap-1">

                        {/* Label */}
                        <label 
                            htmlFor={field.name} 
                            className="text-xs font-medium"
                            style={{
                                color: theme === 'light' ? "var(--color-light-text)" : "var(--color-dark-text)",
                            }}
                        >
                            {field.label}
                        </label>

                        {/* Input */}
                        <input
                            type="number"
                            id={field.name}
                            min={field.min}
                            max={field.max}
                            className="text-xs w-14 px-2 py-1 text-center border rounded-md focus:outline-none focus:ring-2 focus:border-transparent focus-ring"
                            style={{
                                backgroundColor: theme === 'light' ? "var(--color-light-background)" : "var(--color-dark-background)",
                                color: theme === 'light' ? "var(--color-light-text)" : "var(--color-dark-text)",
                                borderColor: theme === 'light' ? "var(--color-light-border)" : "var(--color-dark-border)",
                            }}
                            {...register(field.name, {
                                required: `${field.label} is required`,
                                min: { value: field.min, message: `${field.label} must be at least ${field.min}` },
                                max: { value: field.max, message: `${field.label} must be at most ${field.max}` },
                                valueAsNumber: true,
                                onChange: (e) => handleInputChange(field.name, parseInt(e.target.value) || 0),
                            })}
                        />
                        {errors[field.name] && (
                            <span className="text-xs text-red-500">
                                {errors[field.name]?.message}
                            </span>
                        )}
                    </div>
                ))}

                {/* Copy SVG */}
                <CopyButton onCopy={copyToClipboard} />
            </div>
        </form>
    );
};

export default RGBASelector;