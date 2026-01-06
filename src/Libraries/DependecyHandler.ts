/**
 * Evaluates whether an element should be rendered based on its dependency conditions.
 * @param element - The element to check.
 * @param values - The current values of all fields.
 * @returns True if the element should be rendered, false otherwise.
 */
export const checkRenderCondition = (
    element: { hideWhenDepNotMet?: boolean; dependsOn?: any[] },
    values: Record<string, any>
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
const checkConditions = (dependsOn: any[], values: Record<string, any>): boolean => {
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
const checkDependency = (dep: any, values: Record<string, any>): boolean => {
    let val = '';
    if (dep.operator === 'or') {
        return checkOrConditions(dep.dependsOn, values);
    } else {
        if (dep.elementId in values) {
            val = values[dep.elementId];
        }
        if (dep.equals && val !== dep.equals) {
            return false;
        } else if (dep.in && !dep.in.includes(val)) {
            return false;
        } else if (dep.exists && !val) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if at least one dependency in an array is valid (OR logic).
 * @param dependsOn - Array of dependency objects.
 * @param values - The current values of all fields.
 * @returns True if any dependency is valid, false otherwise.
 */
const checkOrConditions = (dependsOn: any[], values: Record<string, any>): boolean => {
    for (const dep of dependsOn) {
        const valid = checkDependency(dep, values);
        if (valid) {
            return true;
        }
    }
    return false;
};
