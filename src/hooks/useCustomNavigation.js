import { useState } from 'react';

 export function useCustomNavigation() {
    const [state, setState] = useState('idle');

    const navigateTo = (newState) => {
        setState(newState);
    };

    return {
        state,
        navigateTo,
    };
}