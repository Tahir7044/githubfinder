import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../types";

const AlertState = (props) => {
  const intialState = {
    alert: null,
  };
  const [state, dispatch] = useReducer(AlertReducer, intialState);
  // showAlert msg
  const showAlert = (check, msg = "", type = "") => {
    if (check) {
      dispatch({
        type: SET_ALERT,
        payload: { msg, type },
      });
    } else {
      dispatch({
        type: REMOVE_ALERT,
      });
    }
  };
  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        showAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
