// Component renders the button element for 1D, 1W,1M,1Y along with the calendar component

// Library Imports
import React from "react";
import { useDispatch } from "react-redux";

import { setIsCustomRange } from "../../common/cryptoSlice/cryptoSlice";
// components imports
import Calendar from "./Calendar";

const ButtonGroup = ({
  chartDays,
  setDays,
  setSelectedValue,
  selectedValue,
}) => {
  return (
    <div className="flex md:gap-1 gap-2 flex-wrap">
    </div>
  );
};

export default ButtonGroup;
