
/**
 * Fonction permettant un meilleur affichage des soldes.
 * @param {number} balance 
 * @returns {string}
 */
export function reduceBalance(balance) {
  if (balance >= 1000000) {
      return (balance / 1000000).toFixed(0) + " M 🤑";
  } else if (balance >= 1000) {
      return (balance / 1000).toFixed(0) + " K 💸";
  } else {
    return balance.toString()+' FCFA 💰';
  }
}
