import React from "react";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Success(msg: any) {
  toast.success(<p className="text-dark tx-16 mb-0">Success: {msg}</p>, {
    position: "top-right",
    hideProgressBar: false,
    autoClose: 2000,
    theme: "light",
  });
}

export function Secondary(msg: any) {
    toast.error(<p className=" tx-16 mb-0">Oops! {msg}</p>, {
      position: "top-center",
      hideProgressBar: false,
      autoClose: 2000,
      theme: "light",
    });
}

export function LeftNotifier(msg: any) {
    toast.warn(<p className=" tx-16 mb-0">Warning: {msg}</p>, {
      position: "top-left",
      hideProgressBar: false,
      autoClose: 2000,
      theme: "light",
    });
}

export function CenterInfo(msg: any) {
    toast.info(<p className=" tx-16 mb-0">Info: {msg}</p>, {
      position: "top-center",
      hideProgressBar: false,
      autoClose: 2000,
      theme: "light",
    });
}

export const CenterDanger = (msg: any) => {
  toast.error(<p className=" tx-16 mb-0">Error: {msg}</p>, {
    position: "top-center",
    hideProgressBar: false,
    autoClose: 2000,
    theme: "light",
  });
};

export function Centerwarning(msg: any) {
    toast.warn(<p className=" tx-16 mb-0">{msg}</p>, {
      position: "top-center",
      hideProgressBar: false,
      autoClose: 2000,
      theme: "light",
    });
}

// Side Alerts Notifications

export function SuccessLeft(msg: any) {
    toast.success(
      <p className=" tx-16 mb-0">
        <h3>Notice!</h3>
        {msg}
      </p>,
      {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 2000,
        theme: "light",
      }
    );
}

export function WarningLeft(msg: any) {
    toast.warn(
      <p className=" tx-16 mb-0">
        <h3>Warning!</h3>
        {msg}
      </p>,
      {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 2000,
        theme: "light",
      }
    );
}

export function DangerRight(msg: any) {
  toast.error(<p className=" tx-16 mb-0">{msg}</p>, {
    position: "top-right",
    hideProgressBar: false,
    autoClose: 2000,
    theme: "light",
  });
}

// Gradient Side Alerts Notifications

export function GradientSuccess( msg: any) {
  toast.success(
    <p className=" tx-16 mb-0">
      <h3>Error!</h3>please check Your details ...file is missing
    </p>,
    {
      position: "top-right",
      hideProgressBar: false,
      autoClose: 2000,
      theme: "light",
    }
  );
}

export function GradientWarning( msg: any) {
  toast.warn(
    <>
      <p className="tx-16 mb-0">{msg}</p>
    </>,
    {
      position: "top-right",
      hideProgressBar: false,
      autoClose: 2000,
      theme: "light",
    }
  );
}


export function GradientDanger() {
    toast.error(
      <p className=" tx-16 mb-0">
        <h3>Error!</h3>please check Your details ...file is missing
      </p>,

      {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 2000,
        theme: "light",
      }
    );
}



import { DetailedHTMLProps, HTMLAttributes } from "react";

// Define JSX element types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      p: DetailedHTMLProps<
        HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >;
      h3: DetailedHTMLProps<
        HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
      >;
    }
  }
}