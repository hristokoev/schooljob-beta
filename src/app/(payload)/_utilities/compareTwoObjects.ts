function compareTwoObjects(obj1: any, obj2: any): string[] {
    const changedKeys: string[] = []

    // Iterate over the properties of the first object
    for (const key in obj1) {
        if (Object.prototype.hasOwnProperty.call(obj1, key)) {
            // If the second object doesn't have this key or the values are different
            if (!Object.prototype.hasOwnProperty.call(obj2, key) || JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
                changedKeys.push(key)
            }
        }
    }

    // Now, check if there are any keys in the second object that are not in the first one
    for (const key in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, key)) {
            if (!Object.prototype.hasOwnProperty.call(obj1, key)) {
                changedKeys.push(key)
            }
        }
    }

    return changedKeys
}

export { compareTwoObjects }
