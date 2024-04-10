    export const hasValue = (element: any): boolean => {

    if (element === "" || element === null || element === undefined || /^\s*$/.test(element)) {
        return false;
    } else {
        return true;
    }
}