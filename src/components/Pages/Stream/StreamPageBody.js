
import DemoTimeStep from "./DemoTimeStep"


function StreamPageBody() {
    return (
        <div className="flex justify-center bg-green-500" >
            <div className=" flex flex-col justify-center items-center w-3/4 bg-purple-600">
                <div>Toggles + Explaination</div>
                {/* <div className="videoContainer  w-3/4  bg-blue-600"> */}
                    <DemoTimeStep></DemoTimeStep>

                {/* </div> */}
                <div>Stats + other stuffs</div>

            </div>

        </div>
    )
}

export default StreamPageBody
