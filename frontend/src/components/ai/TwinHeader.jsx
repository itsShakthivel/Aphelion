import { FaRobot } from "react-icons/fa";

const TwinHeader = () => {

    return (

        <div className="flex items-center justify-between">

            <div>

                <h1 className="text-3xl font-bold flex items-center gap-3">

                    <FaRobot />

                    AI Financial Twin

                </h1>

                <p className="text-gray-400 mt-2">

                    Your intelligent financial profile and behaviour analysis.

                </p>

            </div>

        </div>

    );

};

export default TwinHeader;