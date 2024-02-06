
/**
 * fonction permettant de réduire la longueur de l'identifiant unique de chaque coli
 * @param {string} index 
 * @param {number} sliceLenght 
 * @returns {string} shortIndex
 */
export function sliceColi(index, sliceLenght = -6) {
    if(typeof index !== 'string'){
        return undefined
    }
    return index.slice(sliceLenght)
}