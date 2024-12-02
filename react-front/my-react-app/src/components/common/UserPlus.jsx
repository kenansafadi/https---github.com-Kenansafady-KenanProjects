

// const UserPlus = () => {
//     const [showForm, setShowForm] = useState(false); // State to control form visibility

//     const handleAddUser = () => {
//         setShowForm(true); // Show the form when the icon is clicked
//     };

//     const closeForm = () => {
//         setShowForm(false); // Close the form
//     };

//     return (
//         <div>
//             <span
//                 className="user-plus-icon"
//                 onClick={handleAddUser}
//                 aria-label="Add User"
//             >
//                 <FontAwesomeIcon icon={faUserPlus} size="2x" />
//             </span>

//             {showForm && (
//                 <div className="form-modal">
//                     <button onClick={closeForm}>Close</button>
//                     <NewBusinessCard /> {/* Render the NewBusinessCard component */}
//                 </div>
//             )}

//         </div>
//     );
// };

// export default UserPlus;


import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import NewBusinessCard from '../../pages/NewBussinesCards';
const UserPlus = () => {
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    const handleAddUser = () => {
        setShowForm(true); // Show the form when the icon is clicked
    };

    const closeForm = () => {
        setShowForm(false); // Close the form
    };

    return (
        <div>
            <span
                className="user-plus-icon"
                onClick={handleAddUser}
                aria-label="Add User"
            >
                <FontAwesomeIcon icon={faUserPlus} size="2x" />
            </span>

            {showForm && (
                <div className="form-modal">
                    <NewBusinessCard closeForm={closeForm} />
                </div>
            )}
        </div>
    );
};

export default UserPlus;
