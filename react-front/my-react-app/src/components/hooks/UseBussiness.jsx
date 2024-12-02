import { useContext } from 'react';
import { BusinessContext } from '../context/BusinessContext'; // Ensure this path is correct

const useBusiness = () => {
    return useContext(BusinessContext);
};

export default useBusiness;
