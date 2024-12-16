import Button from "@/extra/Button";
import { ExInput, Textarea } from "@/extra/Input";
import Title from "@/extra/Title";
import { RootStore, useAppDispatch } from "@/store/store";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { closeDialog } from "@/store/dialogSlice";
import { getExpertProfile, updateExpert } from "@/store/expertSlice";
import { baseURL } from "@/utils/config";
import Selector from "@/extra/Selector";
import RootLayout from "@/component/layout/Layout";
import { useRouter } from "next/router";

interface ErrorState {
  name: string;
  email: string;
  country: string;
  password: string;
  mobile: string;
  images: string;
  gender: string;
  age: string;
  serviceSummary: string;
  experienceDetails: string;
  experience: string;
  yourSelf: string;
  image: string;
  upiId: string;
  bankName: string;
  accountNumber: string;
  IFSCCode: string;
  branchName: string;
  latitude: string;
  longitude: string;
}

const AddExpert = () => {


  const { dialogueData } = useSelector((state: any) => state.dialogue);
  const { expertProfile } = useSelector((state: RootStore) => state.expert);
  const { defaultCurrency }: any = useSelector(
    (state: RootStore) => state?.setting
  );
  const router = useRouter();

  const id: any = router?.query?.id;
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [mobile, setMobile] = useState<any>();
  const [gender, setGender] = useState<any>();
  const [age, setAge] = useState<any>();
  const [countryData, setCountryData] = useState([]); // Store all country data
  const [selectedCountry, setSelectedCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [serviceSummary, setServiceSummary] = useState<string>();
  const [experienceDetails, setExperienceDetails] = useState<string>();
  const [experience, setExperience] = useState<any>();
  const [yourSelf, setYourSelf] = useState<string>();
  const [image, setImage] = useState<any>();
  const [imagePath, setImagePath] = useState<any>();


  const [error, setError] = useState({
    name: "",
    email: "",
    country: "",
    mobile: "",
    password: "",
    gender: "",
    age: "",
    serviceSummary: "",
    experience: "",
    experienceDetails: "",
    yourSelf: "",
    image: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    dispatch(getExpertProfile(id));
    // Fetch country data including latitude and longitude
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryInfo = data.map((item: any) => ({
          name: item?.name?.common,
          latlng: item?.latlng, // Latitude and longitude
        }));
        setCountryData(countryInfo); // Set the fetched country data
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, [dialogueData]);

  useEffect(() => {
    const countryDataSelectData = countryData.filter((item: any) => {
      const countrySelect: any = item?.name?.common;
      return countrySelect?.toLowerCase() === selectedCountry;
    });

    if (countryDataSelectData?.length > 0) {
      countryDataSelectData?.map((item: any) => {
        setLatitude(item?.latlng[0]);
        setLongitude(item?.latlng[1]);
      });
    }
  }, []); // Add selectedCountry to the dependency array

  const handleChangeCountry = (value: any) => {
    setSelectedCountry(value);

    const countryDataSelectData = countryData.filter((item: any) => {
      const countrySelect: any = item?.name;
      return countrySelect?.toLowerCase() === selectedCountry;
    });

    if (countryDataSelectData?.length > 0) {
      countryDataSelectData?.map((item: any) => {
        setLatitude(item?.latlng[0]);
        setLongitude(item?.latlng[1]);
      });
    }
  };

  useEffect(() => {
    setName(expertProfile?.name);
    setEmail(expertProfile?.email);
    setPassword(expertProfile?.password);
    setMobile(expertProfile?.mobileNumber);
    setGender(expertProfile?.gender);
    setAge(expertProfile?.age);
    setSelectedCountry(expertProfile?.country);
    setServiceSummary(expertProfile?.serviceSummary);
    setExperienceDetails(expertProfile?.workHistory);
    setExperience(expertProfile?.experience);
    setYourSelf(expertProfile?.yourSelf);
    setImage(expertProfile?.profileImage);
    setImagePath(baseURL + expertProfile?.profileImage);
    setLongitude(expertProfile?.longitude);
    setLatitude(expertProfile?.latitude);
  }, [expertProfile]);

  // Handle country selection and automatically set latitude and longitude

  const handleInputImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      setImage(e?.target?.files[0]);
      setImagePath(URL.createObjectURL(e.target.files[0]));
      setError({ ...error, image: "" });
    }
  };

  const handleSubmit = (e: any) => {

    if (
      !name ||
      !email ||
      !password ||
      !mobile ||
      !selectedCountry ||
      !gender ||
      !age ||
      !serviceSummary ||
      !experience ||
      !experienceDetails ||
      !yourSelf ||
      !image
    ) {
      let error = {} as ErrorState;
      if (!name) error.name = "Name is required";
      if (!email) error.email = "Email is required";
      if (!password) error.password = "Password is required";
      if (!mobile) error.mobile = "Mobile number is required";
      if (!gender) error.gender = "Gender is required";
      if (!selectedCountry) error.country = "Country is required";
      if (!age) error.age = "Age is required";
      if (!serviceSummary) error.serviceSummary = "Education is required";
      if (!experience) error.experience = "Experience is required";
      if (!experienceDetails)
        error.experienceDetails = "Experience details is required";
      if (!yourSelf) error.yourSelf = "Yourself is required";

      if (!image) error.image = "Image is required";

      return setError({ ...error });
    } else {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("country", selectedCountry);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("mobileNumber", mobile);
      formData.append("serviceSummary", serviceSummary);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("workHistory", experienceDetails);
      formData.append("yourSelf", yourSelf);
      formData.append("profileImage", image);
      formData.append("latitude", latitude);
      formData.append("longitude", longitude);

  

      let payload: any = { providerId: id, data: formData };

      dispatch(updateExpert(payload));
      router.push('/Expert')
    }
  };

  return (
    <div className="p-3">
      <Title name={`Update expert`} />
      <div className="card">
        <div className="card-body">
          <div className="">
            <div className="row align-items-start formBody">
              <div className="col-12">
                <h2 className="fw-bolder mb-0" style={{ fontSize: "22px" }}>
                  Expert information
                </h2>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={`text`}
                  id={`name`}
                  name={`name`}
                  value={name}
                  label={`Name`}
                  defaultValue={expertProfile && expertProfile?.name}
                  placeholder={`Name`}
                  errorMessage={error.name && error.name}
                  onChange={(e: any) => {
                    setName(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        name: ` Name is required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        name: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={`text`}
                  id={`email`}
                  name={`email`}
                  value={email}
                  label={`email`}
                  defaultValue={expertProfile && expertProfile?.email}
                  placeholder={`email`}
                  errorMessage={error.email && error.email}
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        email: `Email is required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        email: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={`password`}
                  id={`password`}
                  name={`password`}
                  value={password}
                  label={`Password`}
                  defaultValue={expertProfile && expertProfile?.password}
                  placeholder={`Password`}
                  errorMessage={error.password && error.password}
                  onChange={(e: any) => {
                    setPassword(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        password: `Password is required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        password: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={`number`}
                  value={mobile}
                  id={`mono`}
                  name={`mobile`}
                  label={`Mobile number`}
                  defaultValue={expertProfile && expertProfile?.mobile}
                  minLength={6}
                  maxLength={13}
                  placeholder={`Mobile number`}
                  errorMessage={error.mobile && error.mobile}
                  onChange={(e: any) => {
                    setMobile(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        mobile: `Mobile number is required`,
                      });
                    } else if (
                      e.target.value.length < 6 ||
                      e.target.value.length > 13
                    ) {
                      return setError({
                        ...error,
                        mobile: "Mobile number must be 6 to 13 digits",
                      });
                    } else {
                      return setError({
                        ...error,
                        mobile: "",
                      });
                    }
                  }}
                />
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={`number`}
                  id={`age`}
                  name={`age`}
                  value={age}
                  label={`Age`}
                  defaultValue={expertProfile && expertProfile?.age}
                  placeholder={`age`}
                  errorMessage={error.age && error.age}
                  onChange={(e: any) => {
                    setAge(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        age: `Age is required`,
                      });
                    } else if (e.target.value.length > 2) {
                      return setError({
                        ...error,
                        age: "Age must be 2 digits",
                      });
                    } else if (e.target.value < 0) {
                      return setError({
                        ...error,
                        age: "Age must be negative value",
                      });
                    } else {
                      return setError({
                        ...error,
                        age: "",
                      });
                    }
                  }}
                />
              </div>


              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={"file"}
                  label={"Image"}
                  accept={"image/png, image/jpeg"}
                  errorMessage={error.image && error.image}
                  onChange={handleInputImage}
                />

                {imagePath && (
                  <>
                    <img
                      src={imagePath ? imagePath : expertProfile?.image}
                      className="mt-3 rounded float-left mb-2"
                      alt="image"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </>
                )}
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="d-flex align-items-center pt-2">
                  <ExInput
                    type={`text`}
                    name={`genders`}
                    value={gender}
                    id={`male`}
                    label={`Gender`}
                    defaultValue={expertProfile && expertProfile?.gender}
                    errorMessage={error.gender && error.gender}
                    disabled
                  />
                </div>
              </div>

              <div className="col-12">
                <h2 className="fw-bolder mb-0" style={{ fontSize: "22px" }}>
                  Address Information
                </h2>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <Selector
                  label={"Country"}
                  selectValue={selectedCountry}
                  placeholder={"Select Country"}
                  selectData={countryData.map((country: any) => country.name)} // Pass only the country names
                  errorMessage={error.country && error.country}
                  onChange={(e) => {
                    handleChangeCountry(e.target.value);
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={`text`}
                  id={`latitude`}
                  name={`latitude`}
                  value={latitude}
                  label={`latitude`}
                  placeholder={`latitude`}
                  defaultValue={expertProfile && expertProfile?.latitude}
                  errorMessage={error.latitude && error.latitude}
                  disabled
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={`text`}
                  id={`longitude`}
                  name={`longitude`}
                  value={longitude}
                  label={`longitude`}
                  placeholder={`longitude`}
                  defaultValue={expertProfile && expertProfile?.longitude}
                  errorMessage={error.longitude && error.longitude}
                  disabled
                />
              </div>

              <div className="col-12">
                <h2 className="fw-bolder mb-0" style={{ fontSize: "22px" }}>
                  Other Information
                </h2>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <Textarea
                  row={10}
                  type={`text`}
                  id={`serviceSummary`}
                  name={`serviceSummary`}
                  value={serviceSummary}
                  label={`ServiceSummary`}
                  placeholder={`serviceSummary`}
                  defaultValue={expertProfile && expertProfile?.serviceSummary}
                  errorMessage={error.serviceSummary && error.serviceSummary}
                  onChange={(e: any) => {
                    setServiceSummary(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        serviceSummary: `ServiceSummary is required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        serviceSummary: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <ExInput
                  type={`number`}
                  id={`experience`}
                  name={`experience`}
                  value={experience}
                  defaultValue={expertProfile && expertProfile?.experience}
                  label={`Experience (Year)`}
                  placeholder={`Experience`}
                  errorMessage={error.experience && error.experience}
                  onChange={(e: any) => {
                    setExperience(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        experience: `Experience is required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        experience: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Textarea
                  row={10}
                  type={`text`}
                  id={`experienceDetails`}
                  name={`experienceDetails`}
                  value={experienceDetails}
                  defaultValue={
                    expertProfile && expertProfile?.experienceDetails
                  }
                  label={`Experience details`}
                  placeholder={`Experience Details`}
                  errorMessage={
                    error.experienceDetails && error.experienceDetails
                  }
                  onChange={(e: any) => {
                    setExperienceDetails(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        experienceDetails: `Experience details is required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        experienceDetails: "",
                      });
                    }
                  }}
                />
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <Textarea
                  row={10}
                  type={`text`}
                  id={`yourSelf`}
                  name={`yourSelf`}
                  value={yourSelf}
                  label={`Your self history`}
                  defaultValue={expertProfile && expertProfile?.yourSelf}
                  placeholder={`Your Self`}
                  errorMessage={error.yourSelf && error.yourSelf}
                  onChange={(e: any) => {
                    setYourSelf(e.target.value);
                    if (!e.target.value) {
                      return setError({
                        ...error,
                        yourSelf: `Your Self is required`,
                      });
                    } else {
                      return setError({
                        ...error,
                        yourSelf: "",
                      });
                    }
                  }}
                />
              </div>
            </div>

            <div className="row  formFooter">
              <div className="col-12 text-end m0">
                <Button
                  className={`bg-gray text-light`}
                  text={`Cancel`}
                  type={`button`}
                  onClick={() => router.push('/Expert')}
                />
                <Button
                  type={`submit`}
                  className={` text-white m10-left`}
                  style={{ backgroundColor: "#1ebc1e" }}
                  text={`Submit`}
                  onClick={(e: any) => handleSubmit(e)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddExpert.getLayout = function getLayout(page: React.ReactNode) {
  return <RootLayout>{page}</RootLayout>;
};


export default AddExpert;
