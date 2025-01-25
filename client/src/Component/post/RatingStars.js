import React, { useState } from "react";
import { FaStar } from 'react-icons/fa'

import { PiStarFill } from "react-icons/pi";

import '../../style/ratingstars.css';


// import './RatingStar.css'


const RatingStar = (props) => {
    // const [isHover, setIsHover] = useState([false, false, false, false, false]);
    const [score, setScore] = useState(-1);
    let tempisHover = [false, false, false, false, false];

    const handleMouseOver = index => {
        // tempisHover = [false, false, false, false, false];
        for(let i=0 ; i<index+1 ; i++){
            tempisHover[i] = true
        }        
        props.setIsHover(tempisHover);
        props.setStars(index+1)
        // console.log("isHoverover"+isHover);
    }

    // const handleMouseOut = () => {
    //     // tempisHover = [false, false, false, false, false];
    //     // for(let i=0 ; i<props.score+1 ; i++){
    //     //     tempisHover[i] = true
    //     // }
    //     props.setIsHover(tempisHover);
    //     // console.log("isHoverout"+isHover);
    // }

    // const handleOnClick = index => {
    //     // props.setScore(index+1);
    //     // setScore(index);
    //     // for(let i=0 ; i<index+1 ; i++){
    //     //     tempisHover[i] = true
    //     // }
    //     props.setStars(index+1)

    //     // console.log("score"+props.score)
    // }

    return(
    <>
        <div className="rating-stars">
            {[0,1,2,3,4].map((element, index) => (
                // <FaStar
                // className={props.isHover[element] ? "rating-star-over" : "rating-star-out"}
                //     key={index}
                //     size={50}
                //     onMouseOver={() => handleMouseOver(index)}
                //     // onMouseOut={handleMouseOut}
                //     // onClick={() => handleOnClick(index)} 
                // />

                <PiStarFill 
                className={props.isHover[element] ? "rating-star-over" : "rating-star-out"}
                    key={index}
                    size={50}
                    onMouseOver={() => handleMouseOver(index)}
                    // onMouseOut={handleMouseOut}
                    // onClick={() => handleOnClick(index)} 
                />

            ))}
        </div>
    </>
    )

}

export default RatingStar;