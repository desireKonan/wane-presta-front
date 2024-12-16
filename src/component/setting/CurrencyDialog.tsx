import Button from "@/extra/Button";
import { ExInput } from "@/extra/Input";
import { closeDialog } from "@/store/dialogSlice";
import { createCurrency, updateCurrency } from "@/store/settingSlice";
import { RootStore, useAppDispatch } from "@/store/store";

import { Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "13px",
  border: "1px solid #C9C9C9",
  boxShadow: 24,
  p: "19px",
};

interface ErrorState {
  name: string;
  symbol: string;
  currencyCode: string;
  countryCode: string;
}
const CurrencyDialog = () => {
  const { dialogue, dialogueData } = useSelector(
    (state: RootStore) => state.dialogue
  );

  const dispatch = useAppDispatch();
  const [addCategory, setAddCategory] = useState(false);
  const [name, setName] = useState();
  const [symbol, setSymbol] = useState();
  const [currencyCode, setCurrencyCode] = useState();
  const [countryCode, setCountryCode] = useState();

  const [error, setError] = useState({
    name: "",
    symbol: "",
    currencyCode: "",
    countryCode: "",
  });

  useEffect(() => {
    if (dialogue) {
      setAddCategory(dialogue);
    }
  }, [dialogue]);

  useEffect(() => {
    if (dialogueData) {
      setName(dialogueData?.name);
      setSymbol(dialogueData?.symbol);
      setCurrencyCode(dialogueData?.currencyCode);
      setCountryCode(dialogueData?.countryCode);
    }
  }, [dialogue, dialogueData]);

  const handleCloseAddCategory = () => {
    setAddCategory(false);
    dispatch(closeDialog());
  };

  const handleSubmit = () => {

    if (!name || !symbol || !currencyCode || !countryCode) {
      let error = {} as ErrorState;
      if (!name) error.name = "Currency Name Is Required !";
      if (!symbol) error.symbol = "Currency Symbol Is Required !";
      if (!currencyCode) error.currencyCode = "Currency Code Is Required !";
      if (!countryCode) error.countryCode = "Country Code Is Required !";
      return setError({ ...error });
    } else {
      let data = {
        name: name,
        symbol: symbol,
        currencyCode: currencyCode,
        countryCode: countryCode,
      };
      if (dialogueData) {
        let payload: any = {
          currencyId: dialogueData?._id,
          data: data,
        };
        dispatch(updateCurrency(payload));
      } else {
        dispatch(createCurrency(data));
      }
      handleCloseAddCategory();
    }
  };

  return (
    <>
      <Modal
        open={addCategory}
        onClose={handleCloseAddCategory}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="create-channel-model">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {dialogueData ? "Update currency dialog" : "Create currency dialog"}
          </Typography>
          <form>
            <ExInput
              label={"Curency Name"}
              name={"name"}
              placeholder={"Enter Curency Name..."}
              value={name}
              errorMessage={error.name && error.name}
              onChange={(e: any) => {
                setName(e.target.value);
                if (!e.target.value) {
                  return setError({
                    ...error,
                    name: ` Curency Name Is Required`,
                  });
                } else {
                  return setError({
                    ...error,
                    name: "",
                  });
                }
              }}
            />
            <div className="mt-2 add-details">
              <ExInput
                label={"symbol"}
                name={"symbol"}
                placeholder={"Enter symbols..."}
                value={symbol}
                errorMessage={error.symbol && error.symbol}
                onChange={(e: any) => {
                  setSymbol(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      symbol: `Currency symbol is required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      symbol: "",
                    });
                  }
                }}
              />
            </div>
            <div className="mt-2 add-details">
              <ExInput
                label={"Currency Code"}
                name={"currencyCode"}
                placeholder={"Enter CurrencyCode"}
                value={currencyCode}
                newClass={`mt-3`}
                errorMessage={error.currencyCode && error.currencyCode}
                onChange={(e) => {
                  setCurrencyCode(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      currencyCode: `CurrencyCode is required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      currencyCode: "",
                    });
                  }
                }}
              />
            </div>
            <div className="mt-2 add-details">
              <ExInput
                label={"Country Code"}
                name={"countryCode"}
                placeholder={"Enter countryCode"}
                value={countryCode}
                newClass={`mt-3`}
                errorMessage={error.countryCode && error.countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  if (!e.target.value) {
                    return setError({
                      ...error,
                      countryCode: `CountryCode is required`,
                    });
                  } else {
                    return setError({
                      ...error,
                      countryCode: "",
                    });
                  }
                }}
              />
            </div>

            <div className="mt-3 d-flex justify-content-end">
              <Button
                className={`bg-gray text-light`}
                text={`Cancel`}
                type={`button`}
                onClick={() => dispatch(closeDialog())}
              />
              <Button
                type={`submit`}
                className={` text-white m10-left`}
                style={{ backgroundColor: "#1ebc1e" }}
                text={`Submit`}
                onClick={(e: any) => handleSubmit()}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default CurrencyDialog;
