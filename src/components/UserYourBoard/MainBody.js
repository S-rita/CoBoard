import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import YourBoardEdit from "./YourBoardEdit"
import YourBoardView from "./YourBoardView"

const MainBody = () => {

  return (
    <div className="mt-6">
      <YourBoardView/>
      
    </div>
  );
};

export default MainBody;
