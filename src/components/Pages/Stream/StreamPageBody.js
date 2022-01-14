
import TimeStepHead from "./Demos/TimeStep/TimeStepHead"
import TimeStepBody from "./Demos/TimeStep/TimeStepBody"


function StreamPageBody() {
    return (
        <div className="flex justify-center " >
            <div className=" flex flex-col justify-center items-center w-3/4 ">
                <div>Toggles + Explaination</div>
                    <div className="w-full h-full mt-[6vh]">
                    <TimeStepHead ></TimeStepHead>
                    <TimeStepBody></TimeStepBody>
                    </div>
                

            </div>

        </div>
    )
}

export default StreamPageBody
