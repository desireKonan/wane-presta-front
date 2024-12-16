import Button from "@/extra/Button";
import { ExInput, Textarea } from "@/extra/Input";
import ToggleSwitch from "@/extra/TogggleSwitch";
import { getSetting, handleSetting, updateSetting } from "@/store/settingSlice";
import { RootStore, useAppDispatch } from "@/store/store";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface ErrorState {
  privacyPolicyLinkText: string;
  tncText: any;
  taxText: any;
  commissionPercentText: any;
  firebaseKeyText: string;
  minWithdrawText: string;
  zegoAppId: string;
  zegoAppSignIn: string;
}

const AdminSetting = () => {
  const { setting }: any = useSelector((state: RootStore) => state?.setting);


  const [privacyPolicyLinkText, setPrivacyPolicyLinkText] = useState<any>();
  const [tncText, setTncText] = useState<any>();
  const [taxText, setTaxText] = useState<any>();
  const [commissionPercentText, setCommissionPercentText] = useState<any>();
  const [firebaseKeyText, setFirebaseKeyText] = useState<any>();
  const [minWithdrawText, setmMinWithdrawText] = useState<any>();
  const [zegoAppId, setZegoAppId] = useState<any>();
  const [zegoAppSignIn, setZegoAppSignIn] = useState<any>();
  const [isUnderMaintenance, setIsUnderMaintenance] = useState<boolean>(false);

  const [data, setData] = useState<any>();

  const [error, setError] = useState<any>({
    privacyPolicyLinkText: "",
    tncText: "",
    taxText: "",
    commissionPercentText: "",
    firebaseKey: "",
    minWithdrawText: "",
    geminiKey: "",
    zegoAppId: "",
    zegoAppSignIn: "",
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSetting());
  }, [dispatch]);

  useEffect(() => {
    setData(setting);
  }, [setting]);

  useEffect(() => {
    setPrivacyPolicyLinkText(setting?.privacyPolicyLink);
    setTncText(setting?.termsOfUsePolicyLink);
    setTaxText(setting?.taxRate);
    setCommissionPercentText(setting?.adminCommissionRate);
    setFirebaseKeyText(JSON.stringify(setting?.privateKey));
    setmMinWithdrawText(setting?.minWithdrawalRequestedAmount);
    setZegoAppId(setting?.zegoAppId);
    setZegoAppSignIn(setting?.zegoAppSignIn);
    setIsUnderMaintenance(setting?.isUnderMaintenance);
  }, [setting]);

  const handleSettingSwitch: any = (id: any, type: any) => {

    const payload = {
      settingId: id,
      type: type,
    };
    dispatch(handleSetting(payload));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      !privacyPolicyLinkText ||
      !tncText ||
      !taxText ||
      taxText > 100 ||
      !commissionPercentText ||
      !firebaseKeyText ||
      !minWithdrawText ||
      !zegoAppId ||
      !zegoAppSignIn
    ) {
      {
        let error = {} as ErrorState;
        if (!privacyPolicyLinkText)
          error.privacyPolicyLinkText = "privacyPolicyLink Is Required !";
        if (!tncText) error.tncText = "Terms and Condition Is Required !";
        if (!taxText) error.taxText = "Tax Is Required !";
        if (taxText > 100) error.taxText = "Invalid Tax !";
        if (!commissionPercentText)
          error.commissionPercentText = "CommisionPenrcent Is Required !";
        if (!firebaseKeyText)
          error.firebaseKeyText = "FirbaseKey Is Required !";
        if (!(minWithdrawText >= 0))
          error.minWithdrawText = "Minimum Withdraw Is Required !";
        if (!zegoAppId) error.zegoAppId = "Zegoappid is Required";
        if (!zegoAppSignIn) error.zegoAppSignIn = "Zegoappsignin is Required";

        return setError({ ...error });
      }
    } else {
      let settingDataSubmit = {
        settingId: data?._id,
        privacyPolicyLink: privacyPolicyLinkText,
        taxRate: parseInt(taxText),
        termsOfUsePolicyLink: tncText,
        adminCommissionRate: parseInt(commissionPercentText),
        privateKey: firebaseKeyText,
        minWithdrawalRequestedAmount: parseInt(minWithdrawText),
        zegoAppId: zegoAppId,
        zegoAppSignIn: zegoAppSignIn,
      };
      dispatch(updateSetting(settingDataSubmit));
    }
  };

  return (
    <div className="mainSetting">
      <form onSubmit={handleSubmit} id="expertForm">
        <div className=" d-flex justify-content-end">
          <div className="  formFooter">
            <Button
              type={`submit`}
              className={`text-light m10-left fw-bold`}
              text={`Submit`}
              style={{ backgroundColor: "#1ebc1e" }}
            />
          </div>
        </div>
        <div className="settingBox row">
          <div className="col-12 col-md-6 mt-3 ">
            <div className="settingBoxOuter">
              <div className="settingBoxHeader">
                <h4>APP SETTING</h4>
              </div>
              <div>
                <div className="row d-flex justify-content-center d-flex align-items-baseline">
                  <div className="col-8">
                    <ExInput
                      type={`text`}
                      id={`privacyPolicyLink`}
                      name={`privacyPolicyLink`}
                      label={`Privacy policy link`}
                      value={privacyPolicyLinkText}
                      errorMessage={
                        error.privacyPolicyLinkText &&
                        error.privacyPolicyLinkText
                      }
                      placeholder={`Privacy policy link`}
                      onChange={(e: any) => {
                        setPrivacyPolicyLinkText(e.target.value);
                        if (!e.target.value) {
                          return setError({
                            ...error,
                            privacyPolicyLinkText: `PrivacyPolicyLink Is Required`,
                          });
                        } else {
                          return setError({
                            ...error,
                            privacyPolicyLinkText: "",
                          });
                        }
                      }}
                    />
                  </div>

                  <div className="col-4 inputData">
                    <div>
                      <label className="my-3">Maintenance mode</label>
                    </div>
                    <ToggleSwitch
                      onClick={() =>
                        handleSettingSwitch(setting?._id, "isUnderMaintenance")
                      }
                      value={isUnderMaintenance}
                    />
                  </div>
                </div>
              </div>
              <div className="col-12 mt-3">
                <ExInput
                  type={`text`}
                  id={`tnc`}
                  name={`tnc`}
                  label={`Terms and condition`}
                  placeholder={`Terms and condition`}
                  errorMessage={error.tncText && error.tncText}
                  value={tncText}
                  onChange={(e: any) => {
                    setTncText(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        tncText: `Terms and Condition is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        tncText: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 mt-4">
                <ExInput
                  type={`number`}
                  id={`tax`}
                  name={`tax`}
                  label={`Tax (%)`}
                  placeholder={`Tax`}
                  errorMessage={error.taxText && error.taxText}
                  value={taxText}
                  onChange={(e: any) => {
                    setTaxText(parseInt(e.target.value));
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        taxText: `Tax Is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        taxText: "",
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <div className="settingBoxOuter">
              <div className="settingBoxHeader">
                <h4>FIREBASE NOTIFICATION SETTING</h4>
              </div>
              <div className="col-12 ">
                <Textarea
                  row={9}
                  type={`text`}
                  id={`firebaseKey`}
                  name={`firebaseKey`}
                  label={`Private key JSON`}
                  placeholder={`Enter firebaseKey`}
                  errorMessage={error.firebaseKeyText && error.firebaseKeyText}
                  value={firebaseKeyText}
                  onChange={(e: any) => {
                    setFirebaseKeyText(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        firebaseKeyText: `Private Key Is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        firebaseKeyText: "",
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 mt-3">
            <div className="settingBoxOuter">
              <div className="settingBoxHeader">
                <h4>FINANCIAL SETTING</h4>
              </div>
              <div className="col-12 ">
                <ExInput
                  type={`number`}
                  id={`commissionPercent`}
                  name={`commissionPercent`}
                  label={`Commission percent`}
                  placeholder={`commission Percent`}
                  errorMessage={
                    error.commissionPercentText && error.commissionPercentText
                  }
                  value={commissionPercentText}
                  onChange={(e: any) => {
                    setCommissionPercentText(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        commissionPercentText: `Commision Is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        commissionPercentText: "",
                      });
                    }
                  }}
                />

                <ExInput
                  type={`number`}
                  id={`minWithdraw`}
                  name={`minWithdraw`}
                  label={`Minwithdraw`}
                  placeholder={`minWithdraw`}
                  errorMessage={error.minWithdrawText && error.minWithdrawText}
                  value={minWithdrawText}
                  onChange={(e: any) => {
                    setmMinWithdrawText(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        minWithdrawText: `Withdraw Is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        minWithdrawText: "",
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mt-3 ">
            <div className="settingBoxOuter">
              <div className="settingBoxHeader">
                <h4>ZEGO SETTING</h4>
              </div>
              <div className="col-12 ">
                <ExInput
                  type={`text`}
                  id={`zegoAppId`}
                  name={`zegoAppId`}
                  label={`Zegoapp id`}
                  placeholder={`Zego AppId`}
                  errorMessage={error.zegoAppId && error.zegoAppId}
                  value={zegoAppId}
                  onChange={(e: any) => {
                    setZegoAppId(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        zegoAppId: `Gemini Key Is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        zegoAppId: "",
                      });
                    }
                  }}
                />
              </div>


              <div className="col-12 ">
                <ExInput
                  type={`text`}
                  id={`zegoAppSignIn`}
                  name={`zegoAppSignIn`}
                  label={`Zegoapp sign in`}
                  placeholder={`ZegoApp SignIn`}
                  errorMessage={error.zegoAppSignIn && error.zegoAppSignIn}
                  value={zegoAppSignIn}
                  onChange={(e: any) => {
                    setZegoAppSignIn(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        zegoAppSignIn: `Gemini Key Is Required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        zegoAppSignIn: "",
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminSetting;
