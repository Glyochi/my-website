import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import './NavBar.css';
import { Link } from 'react-router-dom';
function NavBarLeft() {
    const projectsBtn = {
        btnText: 'Project',
        hasDropDown: true,
        link: '',
        dropDownMenu: [
            {
                optionText: 'Improved Facial Detection',
                download: false, staticHTML: false, reactPage: true, link: '/ImprovedFacialDetection'
            },
            {
                optionText: 'Tetris',
                download: false, staticHTML: true, reactPage: false, link: './otherHTMLs/Tetris/Tetris.html'
            },
            {
                optionText: 'Graph',
                download: false, staticHTML: true, reactPage: false, link: './otherHTMLs/Graph/Graph.html'
            },

        ]
    };
    const homeBtn = {
        btnText: 'Home',
        hasDropDown: false,
        link: '/Home',
        dropDownMenu: [
        ]
    };
    const resumeBtn = {
        btnText: 'Resume',
        hasDropDown: true,
        link: '',
        dropDownMenu: [
            {
                optionText: 'View Online',
                download: false, staticHTML: false, reactPage: true, link: '/Resume'
            },
            {
                optionText: 'Download',
                download: true, staticHTML: false, reactPage: false, link: '/PublicAssets/Resume.pdf'
            },
        ]
    };

    return (
        <div className="top-0 left-0 h-auto w-3/5 flex flex-row
         justify-center
                        " >
            <div className="flex w-2/3 h-auto ">
                <NavBarLeftBtn btnConfig={homeBtn} />
                <NavBarLeftBtn btnConfig={resumeBtn} />
                <NavBarLeftBtn btnConfig={projectsBtn} />

            </div>

        </div>
    )
}

function NavBarLeftBtn(props) {
    const [clicked, setClicked] = useState(false)
    const transitionDuration = 200
    const btnRef = useRef()
    const numberOfOptions = props.btnConfig.dropDownMenu.length



    //checking if clicking outside the component, if user did then set clicked to false
    useEffect(() => {
        function handleClickOutside(event) {
            if (clicked && btnRef.current && !btnRef.current.contains(event.target)) {
                console.log("Reeee")
                setClicked(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [clicked])



    return (
        <div className='NavBarLeftBtnContainer'>



            {props.btnConfig.hasDropDown ?

                <>
                    <button className="NavBarLeftBtn "
                        onClick={() => { setClicked(!clicked) }}
                        ref={btnRef}
                        style={
                            clicked ?
                                {
                                    transitionDuration: '50ms',
                                    boxShadow: '0.2vw 0.3vw 0px ',
                                    borderRadius: '2vw',
                                    padding: '0.6vw 0.8vw',
                                    // fontSize: '1.5rem'/* 30px */,
                                    color: 'rgb(52 211 153)',
                                    backgroundColor: 'rgb(75 85 99)',
                                    transform: 'translate(-0.3vw, -0.3vw)',
                                }
                                :
                                {}
                        }
                    >
                        {props.btnConfig.btnText}
                    </button>
                    <div className='DropDownOptionContainer'
                        style={{
                            listStyleType: 'none',
                        }}
                    >

                        {props.btnConfig.dropDownMenu.map((dropDownOption, index) => (
                            <CSSTransition
                                in={clicked}
                                timeout={{
                                    enter: (numberOfOptions - index) * transitionDuration,
                                    exit: (numberOfOptions + 1) * transitionDuration,

                                }}
                                classNames={"drop-down-animation-" + index}
                                unmountOnExit
                            >
                                <>
                                    {
                                        dropDownOption.download ?
                                            <li key={index} className='DropDownOption'
                                            >
                                                <a href={dropDownOption.link} download className='DropDownContent'>
                                                    {dropDownOption.optionText}
                                                </a>
                                            </li>
                                            :
                                            <></>
                                    }

                                    {
                                        dropDownOption.staticHTML ?
                                            <li key={index} className='DropDownOption'
                                            >
                                                <a href={dropDownOption.link} className='DropDownContent' >
                                                    {dropDownOption.optionText}
                                                </a>
                                            </li>
                                            :
                                            <></>
                                    }

                                    {
                                        dropDownOption.reactPage ?
                                            <Link to={dropDownOption.link}>
                                                <li key={index} className='DropDownOption'
                                                >
                                                    <a className='DropDownContent'>
                                                    {dropDownOption.optionText}
                                                    </a>
                                                </li>
                                            </Link>
                                            :
                                            <></>
                                    }
                                </>

                            </CSSTransition>
                        ))}


                    </div>
                </>
                :
                <Link to={props.btnConfig.link}>
                    <button className="NavBarLeftBtn"
                        onClick={() => {
                            setClicked(true); 
                            setTimeout(() => {
                                setClicked(false)
                            }, 800)
                        }}
                        ref={btnRef}
                        style={
                            clicked ?
                                {
                                    transitionDuration: '50ms',
                                    boxShadow: '0.2vw 0.3vw 1px ',
                                    borderRadius: '2vw',
                                    padding: '0.6vw 0.8vw',
                                    color: 'rgb(52 211 153)',
                                    backgroundColor: 'rgb(75 85 99)',
                                    transform: 'translate(-0.3vw, -0.3vw)',
                                }
                                :
                                {}
                        }

                    >
                        {props.btnConfig.btnText}
                    </button>
                </Link>
            }



        </div >
    )

}


export default NavBarLeft



