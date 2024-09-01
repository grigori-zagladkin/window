'use client';

import {FC} from "react";
import {createPortal} from "react-dom";

const Alert: FC = () => {
  return (
      <div></div>
  );
};

const AlertComponent: FC = () => {

    const container = document.body;

    return container ? createPortal(<Alert />, container) : null;
}

interface IShowAlertConfig {

}

export const showAlert = (args: IShowAlertConfig) => {
    const {} = args;


};