/**
 * Evaluates whether an element should be rendered based on its dependency conditions.
 * @param element - The element to check.
 * @param values - The current values of all fields.
 * @returns True if the element should be rendered, false otherwise.
 */
export const checkRenderCondition = (
    element: { hideWhenDepNotMet?: boolean; dependsOn?: unknown[] },
    values: Record<string, unknown>
): boolean => {
    const { hideWhenDepNotMet, dependsOn } = element;
    if (hideWhenDepNotMet && dependsOn) {
        return checkConditions(dependsOn, values);
    }
    return true;
};

/**
 * Checks all dependency conditions for an element.
 * @param dependsOn - Array of dependency objects.
 * @param values - The current values of all fields.
 * @returns True if all dependencies are valid, false otherwise.
 */
const checkConditions = (dependsOn: unknown[], values: Record<string, unknown>): boolean => {
    for (const dep of dependsOn) {
        const isValid = checkDependency(dep, values);
        if (!isValid) {
            return false;
        }
    }
    return true;
};

/**
 * Checks a single dependency condition.
 * @param dep - The dependency object.
 * @param values - The current values of all fields.
 * @returns True if the dependency is met, false otherwise.
 */
const checkDependency = (dep: unknown, values: Record<string, unknown>): boolean => {
    const depObj = dep as { operator?: string; dependsOn?: unknown[]; elementId?: string; equals?: unknown; in?: unknown[]; exists?: boolean };
    let val = '';
    if (depObj.operator === 'or') {
        return checkOrConditions(depObj.dependsOn, values);
    }
    
    if (depObj.elementId && depObj.elementId in values) {
        val = String(values[depObj.elementId]);
    }
    
    if (depObj.equals && val !== depObj.equals) {
        return false;
    }
    if (depObj.in && !depObj.in.includes(val)) {
        return false;
    }
    if (depObj.exists && !val) {
        return false;
    }
    
    return true;
};

/**
 * Checks if at least one dependency in an array is valid (OR logic).
 * @param dependsOn - Array of dependency objects.
 * @param values - The current values of all fields.
 * @returns True if any dependency is valid, false otherwise.
 */
const checkOrConditions = (dependsOn: unknown[] | undefined, values: Record<string, unknown>): boolean => {
    if (!dependsOn) return false;
    for (const dep of dependsOn) {
        const valid = checkDependency(dep, values);
        if (valid) {
            return true;
        }
    }
    return false;
};
