/**
 * StorageManager provides unified methods for storing, retrieving, and clearing data
 * in sessionStorage, localStorage, and cookies, with configurable options.
 */

/**
 * StorageManagerConfig provides options for which storage types to use.
 */
export interface StorageManagerConfig {
    session?: boolean;
    local?: boolean;
    cookies?: boolean;
}

const defaultConfig: StorageManagerConfig = {
    session: true,
    local: true,
    cookies: true,
};

export function setKeyValue(
    key: string,
    value: any,
    config: StorageManagerConfig = defaultConfig,
    expiration?: number
): void {
    if (config.session) {
        setSessionStorage(key, value);
    }
    if (config.local) {
        setLocalStorage(key, value);
    }
    if (config.cookies) {
        setCookie(key, value, expiration);
    }
}

export function setSessionStorage(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
    console.log(`Data with key "${key}" saved to session storage.`);
}

export function setLocalStorage(key: string, value: any): void {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
    console.log(`Data with key "${key}" saved to local storage.`);
}

export function setCookie(key: string, value: any, expirationMinutes?: number): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + ((expirationMinutes || 0) * 60 * 1000));
    const cookieString = `${key}=${encodeURIComponent(JSON.stringify(value))}; expires=${expirationDate.toUTCString()}; path=/`;
    document.cookie = cookieString;
    console.log(`Data with key "${key}" saved to cookies.`);
}

export function getSessionStorage<T = any>(key: string): T | null {
    const serializedValue = sessionStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
}

export function getLocalStorage<T = any>(key: string): T | null {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
}

export function getCookie<T = any>(key: string): T | null {
    const name = `${key}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) === 0) {
            const value = cookie.substring(name.length, cookie.length);
            return JSON.parse(decodeURIComponent(value));
        }
    }
    return null;
}

export function clearSessionStorage(key?: string): void {
    if (!key) {
        sessionStorage.clear();
    } else {
        sessionStorage.removeItem(key);
        console.log(`Data with key "${key}" cleared from session storage.`);
    }
}

export function clearLocalStorage(key?: string): void {
    if (key) {
        localStorage.removeItem(key);
        console.log(`Data with key "${key}" cleared from local storage.`);
    }
}

export function clearCookie(key?: string): void {
    if (key) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        console.log(`Data with key "${key}" cleared from cookies.`);
    }
}
