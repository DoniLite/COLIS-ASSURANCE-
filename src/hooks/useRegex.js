
/**
 * 
 * @param {RegExp} regEx 
 * @param {any} input 
 * @returns {boolean}
 */
export function useRegex(regEx,input) {
    return regEx.test(input);
}


export const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/