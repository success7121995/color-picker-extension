import type { RGB, rgbaFormFields } from "../../types/color";
import { useForm } from "react-hook-form";
import { useColor } from "../../constants/ColorProvider";
import { useEffect } from "react";
import { CopySVG } from "../index";

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
    const { color, setColor } = useColor();

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

    // ===============================================
    // Render
    // ===============================================
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 relative">
            <div className="flex flex-row gap-2 justify-center items-center">

                {rgbaFormFields.map((field) => (
                    <div key={field.name} className="flex flex-col items-center gap-1">

                        {/* Label */}
                        <label htmlFor={field.name} className="text-xs font-medium text-gray-700">
                            {field.label}
                        </label>

                        {/* Input */}
                        <input
                            type="number"
                            id={field.name}
                            min={field.min}
                            max={field.max}
                            className="text-xs w-14 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <button type="button" className="absolute -right-7 top-4 cursor-pointer hover:bg-gray-100 rounded-md p-0.5">
                    <CopySVG height="20px" width="20px" />
                </button>
            </div>
        </form>
    );
};

export default RGBASelector;