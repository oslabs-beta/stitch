// icon (clickable) representing json resopnse from endpointComponent
import { useState } from 'react';

function EndpointIcon(props) {
    // will pass in image link via props to generate a diff image for each component
    // create a state 'icon' and a setter function 'setIcon'
    const [icon, setIcon] = useState('https://cdn-icons-png.flaticon.com/512/136/136443.png');

    // test function to see if we can properly interact with the button (endptIcon)
    function changeIcon() {
        if (icon === 'https://cdn-icons-png.flaticon.com/512/136/136443.png') {
            setIcon('https://cdn-icons-png.flaticon.com/512/10274/10274485.png')
        } else {
            setIcon('https://cdn-icons-png.flaticon.com/512/136/136443.png')
        }
    }

    /* NEXT STEP AFTER LUNCH IS TO HAVE SOMETHING RENDER ONTO THE JSONFIELDCONTAINER WHEN CLICKING ON BUTTON */

    return ( 
        <div>
             <button onClick={changeIcon}><img src={icon} width='50' height='50'/></button>
             {/* <p>{props.textData}</p> */}
        </div>
    )
}

export default EndpointIcon;