import React, { useState } from "react";

export default function TalkInterface() {
    const [name, setName] = useState("");
    const [spaceId, setSpaceId] = useState("");
    const [error, setError] = useState("");

    function startConv() {
        if (!name || !spaceId) {
            setError("Please fill in both Name and Space ID fields.");
            return;
        }
        fetch(`http://localhost:8000/initiate?id=${spaceId}&actor=4&name=${name}`)
            .then(response => {
                if (!response.ok) {
                    console.log("Connection Failed");
                    return;
                }
                console.log(response.status);
            })
            .catch(error => {
                console.error(`Error making request: ${error}`);
            });
    }

    function endConv() {
        if (!spaceId) {
            setError("Please fill in the Space ID field.");
            return;
        }
        fetch(`http://localhost:8000/end?id=${spaceId}`)
            .then(response => {
                if (!response.ok) {
                    console.log("Connection Failed");
                    return;
                }
                console.log(response.status);
            })
            .catch(error => {
                console.error(`Error making request: ${error}`);
            });
    }

    return (
        <div className="bg-black w-1/2 h-screen absolute right-0 text-white border-green-400 flex flex-col items-center justify-center">
            <div className="w-full flex justify-center items-center font-bold text-4xl mt-8 font-ele">Talk With Case</div>
            <div className="flex flex-col w-full justify-center items-center my-20">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-[50%] h-10 rounded-lg bg-gray-100 text-black m-3 p-2"
                />
                <input
                    type="text"
                    value={spaceId}
                    onChange={(e) => setSpaceId(e.target.value)}
                    placeholder="Space ID"
                    className="w-[50%] h-10 rounded-lg bg-gray-100 text-black m-3 p-2"
                />
                <div className="flex flex-row w-full justify-center mt-10">
                    <div className="w-[25%] h-10 rounded-lg bg-white text-black hover:text-white hover:bg-black transition duration-300 flex justify-center items-center hover:border m-10 hover:border-white" onClick={startConv}>Initiate Conversation</div>
                    <div className="w-[25%] h-10 rounded-lg bg-white text-black hover:text-white hover:bg-black transition duration-300 flex justify-center items-center hover:border m-10 hover:border-white" onClick={endConv}>End Conversation</div>
                </div>
                {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
        </div>
    );
}
