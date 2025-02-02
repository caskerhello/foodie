import React, { useState } from "react";

import { PiStarFill } from "react-icons/pi";

import '../../style/ratingstars.css';

const RatingStar = (props) => {
    const [score, setScore] = useState(-1);
    let tempisHover = [false, false, false, false, false];

    const handleMouseOver = index => {
        for(let i=0 ; i<index+1 ; i++){
            tempisHover[i] = true
        }        
        props.setIsHover(tempisHover);
        props.setStars(index+1)
    }

    return(
    <>
        <div className="rating-stars">
            {[0,1,2,3,4].map((element, index) => (

                <PiStarFill 
                className={props.isHover[element] ? "rating-star-over" : "rating-star-out"}
                    key={index}
                    size={50}
                    onMouseOver={() => handleMouseOver(index)}
                />

            ))}
        </div>
    </>
    )

}

export default RatingStar;