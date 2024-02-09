import { useState } from 'react';

 export function useCustomNavigation() {
    
    const [state, setState] = useState('idle');

    /**
     * 
     * @param {'idle'|'submitting'|'loading'} newState 
     */
    const navigateTo = (newState) => {
        setState(newState);
    };

    return {
        state,
        navigateTo,
    };
}