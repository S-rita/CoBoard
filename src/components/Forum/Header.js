import React from 'react';

const Header = () => {
    return (
        <div className="w-full h-56 bg-basegreen shadow-2xl sticky top-0 left-0">
            <a href="/discussion" target="_self">
                <div className="flex items-center">
                    <div className="h-10 w-10 mt-6 ml-6 flex justify-center items-center">
                        <img src="/asset/CoBoard logo.svg" alt="CoBoard Logo" className="w-full h-full" />
                    </div>
                    <p className="text-white mt-6 ml-2 text-sm font-bold">
                        Co<br />Board
                    </p>
                </div>
            </a>
            <div className="flex flex-row justify-between mt-4">
                <div className="flex flex-row h-fit w-fit ml-12 mt-4">
                    <div className="flex flex-col h-20 w-20 rounded-full bg-white"></div>
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center ml-6 -mt-3">
                            <h6 className="flex flex-col text-white text-lg font-bold">Username</h6>
                            <h6 className="flex flex-col text-white text-lg font-bold ml-2">+11</h6>
                            <div className="flex flex-col h-2 w-2 ml-4 bg-black rounded-full"></div>
                            <h6 className="flex flex-col text-white text-lg font-bold ml-4">10 mo</h6>
                        </div>
                        <h1 className="text-3xl font-bold text-white ml-6">Cafeteria</h1>
                        <h4 className="text-xl font-bold text-graygreen ml-6">
                            Information of this forum blah blah blah bananan banananbana
                        </h4>
                    </div>
                </div>
                <div className="flex flex-col h-11 w-24 bg-white rounded-xl mr-28 -mt-4 shadow-2xl relative">
                    <p className="text-xl px-2 py-2">&#x1F50D;</p>
                    <div className="overlay-content absolute opacity-100 h-11 w-24 rounded-xl hover:bg-black hover:bg-opacity-70"></div>
                </div>
            </div>
        </div>
    );
};

export default Header;