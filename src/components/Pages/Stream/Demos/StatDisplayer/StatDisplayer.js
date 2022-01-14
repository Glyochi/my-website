import { useRef, useImperativeHandle, forwardRef } from "react";

import './StatDisplayer.css'

function StatDisplayer(props, ref) {


    const onePercentLow = useRef(null);
    const average = useRef(null);
    const onePercentHigh = useRef(null);
    const frameTimeVariation = useRef(null);

    const isLeftDisplayer = props.isLeftDisplayer;

    useImperativeHandle(ref, () => ({
        get onePercentLowRef() {
            return onePercentLow.current;
        },
        get onePercentHighRef() {
            return onePercentHigh.current;
        },
        get averageRef() {
            return average.current;
        },
        get frameTimeVariationRef() {
            return frameTimeVariation.current;
        }




    })
    )




    // transform: 'translate(10px, -12px)',
    // boxShadow: '-10px 14px 30px rgba(1, 0, 0, 0.8)',
    return (
        <div className="group">
            <div className="statDisplayerContainer
        
        duration-[60ms]
        ease-linear
        
        group-hover:shadow-[10px_14px_30px_-5px_rgba(0,0,0,1)]
        group-hover:translate-x-[-10px]
        group-hover:translate-y-[-12px]
        group-hover:duration-[60ms]
        group-hover:ease-linear
        "
            >
                <div className="statDisplayerTopRow grid grid-cols-7">

                    {(props.isLeftDisplayer ?
                        <div className="leftIdentityComponent col-start-1 col-span-1">Left</div>
                        :
                        <div className="col-start-1 col-span-1"></div>
                    )}

                    <div className="variationContainer">
                        <div className="variationHeader">Variation: </div>
                        <div ref={frameTimeVariation} className="variationValue">?ms</div>
                    </div>

                     {(props.isLeftDisplayer ?
                        <div className="col-start-7 col-span-1 "></div>
                        :
                        <div className="rightIdentityComponent col-start-7 col-span-7 ">Right</div>
                    )}

                </div>

                <div className="statDisplayerBottomRow">

                    <div className="one_percent_low_container">
                        <div className="one_percent_low_header">1% Low</div>
                        <div ref={onePercentLow} className="one_percent_low_value">?ms</div>
                    </div>

                    <div className="delayContainer">
                        <div className="delayHeader">Delay</div>
                        <div ref={average} className="delayValue">?ms</div>
                    </div>

                    <div className="one_percent_high_container">
                        <div className="one_percent_high_header">1% High</div>
                        <div ref={onePercentHigh} className="one_percent_high_value">?ms</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default forwardRef(StatDisplayer);
