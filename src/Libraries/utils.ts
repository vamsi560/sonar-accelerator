/**
 * Replaces route parameter placeholders in a URL template with actual values from params.
 * @param urlTemplate - The URL template containing placeholders (e.g., /user/:id).
 * @param params - An object mapping parameter names to values.
 * @returns The URL with parameters replaced.
 */
export const replaceRouteParams = (urlTemplate: string, params: Record<string, string>): string => {
    return urlTemplate.replaceAll(/:([a-zA-Z]+)/g, (_, key) => {
        return params[key] || `:${key}`;
    });
};

/**
 * Converts an array of field objects to a key-value object.
 * @param fields - Array of objects with 'name' and 'value' properties.
 * @returns Object mapping field names to their values.
 */
export const getKeyValuePairs = (fields: Array<{ name: string; value: unknown }>): Record<string, unknown> => {
    const obj: Record<string, unknown> = {};
    fields.forEach(field => {
        Object.assign(obj, { [field.name]: field.value });
    });
    return obj;
};

/**
 * Filters fields based on their dependency conditions and form data.
 * @param fields - Array of field objects, possibly with dependencies.
 * @param formData - Object containing current form values.
 * @returns Array of visible field objects.
 */
export const getVisibleFields = (
    fields: Array<unknown>,
    formData: Record<string, unknown>
): Array<unknown> => {
    return fields.filter((field) => {
        if (typeof field === 'object' && field !== null && 'dependencies' in field) {
            const fieldObj = field as { dependencies: { dependentOn: string; dependent: unknown } };
            const dependentValue = formData[fieldObj.dependencies.dependentOn];
            if (fieldObj.dependencies.dependent && dependentValue !== fieldObj.dependencies.dependent) {
                return false;
            }
        }
        return true;
    });
};

/**
 * Maps an array of field objects to a key-value object.
 * @param fieldsArray - Array of objects with 'name' and 'value' properties.
 * @returns Object mapping field names to their values.
 */
export const mapFormData = (fieldsArray: Array<{ name: string; value: unknown }>): Record<string, unknown> => {
    const dataObj: Record<string, unknown> = {};
    fieldsArray.forEach(field => {
        dataObj[field.name] = field.value;
    });
    return dataObj;
};

/**
 * Transforms a camelCase or PascalCase key to a human-readable string.
 * @param key - The key to transform.
 * @returns The transformed, human-readable string.
 */
export const transformKey = (key: string): string => {
    return key.replaceAll(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
};
