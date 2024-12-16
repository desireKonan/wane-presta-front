import Image from "next/image";
import { useEffect, useState } from "react";
import $ from "jquery";

const Input = (props: any) => {
  const [imagePath, setImagePath] = useState("");
  const handleImage = (e: any) => {
    if (e.target.files.length > 0) {
      setImagePath(URL?.createObjectURL(e.target.files[0]));
    } else {
      setImagePath("");
    }
  };

  const {
    id,
    className,
    type,
    name,
    label,
    placeholder,
    value,
    disabled,
    readOnly,
    min,
    max,
    activeIcon,
    activClick,
    labelClass,
    errorMessage,
    autoComplete,
    defaultValue,
    validation,
    validationError,
    ignore,
  } = props;


  const [types, setTypes] = useState(type);

  const hideShow = () => {
    types === "password" ? setTypes("text") : setTypes("password");
  };
  const [error, setError] = useState("d-none");

  const checkForm = (e: any) => {
    if (types === "file" || types === "files") {
      handleImage(e);
    }

    if (e.target.value.trim() == "") {
      setError("d-block");
    } else {
      setError("d-none");
    }
  };

  return (
    <div
      className={`inputData ${types}  flex-row justify-content-start text-start`}
    >
      {label && (
        <label
          htmlFor={id}
          className={`${
            (types === "radio" || types === "checkbox") && "ms-2 order-1"
          } ${labelClass}`}
        >
          {label}
        </label>
      )}

      <input
        type={types}
        name={name}
        className={`${className} rounded-2`}
        id={id}
        // onChange={(e) => checkForm(e)}
        onChange={(e) => {
          checkForm(e);
        }}
        placeholder={placeholder}
        value={value}
        // onWheel={(e) => type === "number" && e.target.blur()}
        disabled={disabled}
        readOnly={readOnly}
        minLength={min}
        maxLength={max}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        data-validation={validation}
        data-ignore={ignore}
        title={validationError}
      />
      {/* Show Image */}
      <Image
        src={imagePath}
        alt="hostImage"
        draggable="false"
        className={`${(!imagePath || imagePath === "") && "d-none"}`}
        // width={"100px"}
        // height={"100px"}
        data-image={name}
        data-className={`showImage`}
        id={`file-${name}`}
      />
      {/* error */}
      {type !== "search" && (
        <p className={`errorMessage text-start ${error}`} id={`error-${name}`}>
          {errorMessage}
        </p>
      )}
      {/* Password hide show */}
      {type === "password" && (
        <div className="passHideShow" onClick={hideShow}>
          {types === "password" ? (
            <i className="ri-eye-line"></i>
          ) : (
            <i className="ri-eye-close-line"></i>
          )}
        </div>
      )}
      {/* Search Icon */}
      {type === "search" && !value && (
        <div className="searching">
          <i className="ri-search-line"></i>
        </div>
      )}
      {activeIcon && (
        <div className="activeIcon" onClick={activClick}>
          <i className={activeIcon}></i>
        </div>
      )}
    </div>
  );
};

export default Input;

export const ExInput = (props: any) => {
  const {
    label,
    name,
    id,
    type,
    onChange,
    newClass,
    value,
    errorMessage,
    placeholder,
    disabled,
    readOnly,
    checked,
    onKeyPress,
    accept,
    maxLength,
    minLength,
    defaultValue,
  } = props;

  const [types, setTypes] = useState(type);

  const hideShow = () => {
    types === "password" ? setTypes("text") : setTypes("password");
  };

  return (
    <>
      <div
        className={`inputData ${types}  flex-row justify-content-start text-start`}
      >
        {label && (
          <label
            htmlFor={id}
            className={`${
              (types === "radio" || types === "checkbox") &&
              "ms-2 text-capitalize order-1"
            } `}
          >
            {label}
          </label>
        )}
        <input
          type={types}
          className={`${newClass !== undefined ? newClass : ""}`}
          id={id}
          onChange={onChange}
          value={value}
          name={name}
          defaultValue={defaultValue}
          // onWheel={(e) => type === "number" && e.target.blur()}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          onKeyPress={onKeyPress}
          checked={checked}
          accept={accept}
          minLength={minLength} // Add minLength
          maxLength={maxLength} // Add maxLength
        />

        {type !== "search" && (
          <p className="errorMessage text-capitalize">
            {errorMessage && errorMessage}
          </p>
        )}

        {type === "password" && (
          <div className="passHideShow" onClick={hideShow}>
            {types === "password" ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </div>
        )}
        {type === "search" && !value && (
          <div className="searching">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        )}
      </div>
    </>
  );
};

export const FormInput = (props: any) => {
  const {
    label,
    name,
    type,
    value,
    newClass,
    errorMessage,
    placeholder,
    onKeyPress,
    checked,
    accept,
    register,
    onChange,
    defaultValue,
  } = props;

  const [types, setTypes] = useState(type);

  const hideShow = () => {
    setTypes((prevType: any) =>
      prevType === "password" ? "text" : "password"
    );
  };

  return (
    <div
      className={`inputData ${types} flex-row justify-content-start text-start`}
    >
      {label && (
        <label
          htmlFor={name}
          className={`${
            (types === "radio" || types === "checkbox") && "ms-2 order-1"
          }`}
        >
          {label}
        </label>
      )}
      <input
        type={types}
        className={`${newClass !== undefined ? newClass : ""}`}
        checked={checked}
        // onWheel={(e) => type === "number" && e.target.blur()}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
        accept={accept}
        // register={register}
        defaultValue={defaultValue}
      />

      {type === "password" && (
        <div className="passHideShow" onClick={hideShow}>
          {types === "password" ? (
            <i className="fa-solid fa-eye"></i>
          ) : (
            <i className="fa-solid fa-eye-slash"></i>
          )}
        </div>
      )}
    </div>
  );
};

export const Images = (props: any) => {
  const { value, name, className, id, label, errorMessage, multiple } = props;
  const [imagePath, setImagePath] = useState<any>("");
  const [error, setError] = useState<any>("d-none");
  const [changeValue, setChangeValue] = useState<any>(false);
  const [multiImagePath, setMultiImagePath] = useState<any>([]);

  const handleImage = (e: any, multi: any) => {
    if (e.target.files.length > 0) {
      if (multi == "multi") {
        // New Path
        const newImagePaths: any = [];
        for (let i = 0; i < e.target.files.length; i++) {
          newImagePaths.push(URL.createObjectURL(e.target.files[i]));
        }
        // Old Path
        const addImage = document.getElementById(`${name}-multiImage`);
        for (let i = 0; i < newImagePaths.length; i++) {
     

          const imageTag = document.createElement("img");
          const divTag = document.createElement("div");
          const removeDiv = document.createElement("div");
          imageTag.src = newImagePaths[i];
          imageTag.setAttribute("data-className", "showImage");
          imageTag.setAttribute("data-new", e.target.files[i].name);
          divTag.appendChild(imageTag);
          divTag.appendChild(removeDiv);
          removeDiv.setAttribute("data-remove", "remove");
          removeDiv.classList.add("ri-close-line");
          divTag.setAttribute("data-index", "index");
          // addImage.appendChild(divTag);
        }
        const newImageFileValue = e.target.files;
        const input = document.getElementById(id);

        const dataTransfer = new DataTransfer();
        for (let i = 0; i < multiImagePath.length; i++) {
          dataTransfer.items.add(multiImagePath[i]);
        }
        for (let i = 0; i < newImageFileValue.length; i++) {
          dataTransfer.items.add(newImageFileValue[i]);
        }
        // input.files = dataTransfer.files;
        // setMultiImagePath(dataTransfer.files);
      } else {
        setImagePath(URL?.createObjectURL(e.target.files[0]));
      }
    } else {
      if (multi === "multi") {
        // Clear the multiImage section when no files selected
        const addImage = document.getElementById(`${name}-multiImage`);
        // addImage.innerHTML = "";
      } else {
        setImagePath("");
      }
    }
  };

  const checkForm = (e: any, multi: any) => {
    handleImage(e, multi);
    setChangeValue(changeValue == true ? false : true);
    if (e.target.value == "") {
      setError("d-block");
    } else {
      setError("d-none");
    }
  };

  return (
    <div className="inputData text-start">
      <ImageScript value={changeValue} setMultiImagePath={setMultiImagePath} />
      {label && <label htmlFor={id}>{label}</label>}

      {multiple ? (
        <>
          <div className="imageBoxMain">
            <div className="boxImage ri-add-line">
              <input
                type="file"
                value={value}
                name={name}
                className={className}
                id={id}
                multiple={true}
                onChange={(e) => checkForm(e, "multi")}
              />
            </div>
            <div
              id={`${name}-multiImage`}
              className="d-flex flex-wrap multiImage"
            ></div>
          </div>
        </>
      ) : (
        <>
          <input
            type="file"
            value={value}
            name={name}
            className={className}
            id={id}
            onChange={(e) => checkForm(e , "multi")}
          />
          <img
            src={imagePath}
            alt="hostImage"
            draggable="false"
            className={` ${(!imagePath || imagePath == "") && "d-none"}`}
            width={"100px"}
            height={"100px"}
            data-image={name}
            data-className={`showImage`}
            id={`file-${name}`}
          />
        </>
      )}

      <p
        className={`errorMessage text-start text-danger ${error}`}
        id={`error-${name}`}
      >
        {errorMessage}
      </p>
    </div>
  );
};

const ImageScript = (value: any, setMultiImagePath: any) => {
  useEffect(() => {
    const removeImage = (e: any) => {
      const current = e.target;

      const mainImageTag: any = $(current)
        .parent()
        .parent()
        .siblings(".boxImage")
        .children();
      const pathImage = $(current).siblings();

      if (mainImageTag[0]?.tagName === "INPUT") {
        const datas = pathImage.attr("data-new");
        if (datas) {
          const imageFileValue = mainImageTag[0].files;
          const newImageFileValue = Array.from(imageFileValue).filter(
            (image: any) => image.name !== datas
          );

          const dataTransfer = new DataTransfer();
          newImageFileValue.forEach((file: any) =>
            dataTransfer.items.add(file)
          );

          mainImageTag[0].files = dataTransfer.files;
          setMultiImagePath(dataTransfer.files);
        }
      }

      $(current).parent().remove();
    };

    $(`[data-remove]`).on("click", removeImage);
    return () => {
      $(`[data-remove]`).off("click", removeImage);
    };
  }, [value]);

  return null;
};

export const Textarea = (props: any) => {
  const {
    id,
    label,
    row,
    placeholder,
    name,
    errorMessage,
    onChange,
    readOnly,
    value,
  } = props;
  const [error, setError] = useState("d-none");
  return (
    <div className="inputData text-start">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        rows={row}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        readOnly={readOnly}
      ></textarea>
      <p
        className={`errorMessage text-start text-danger ${error}`}
        id={`error-${name}`}
      >
        {errorMessage}
      </p>
    </div>
  );
};

export const Select = (props: any) => {
  const {
    id,
    label,
    option,
    onChange,
    className,
    btnClass,
    defaultValue,
    placeholder,
    name,
    errorMessage,
    angle,
  } = props;
  const [error, setError] = useState("d-none");
  const [value, setValue] = useState(defaultValue);
  const [key, setKey] = useState(defaultValue);

  $(document).ready(function () {
    const editId: any = ($(`#${id}`)[0] as HTMLInputElement)?.value;
    if (editId && option) {

      if (typeof option[0] == "object") {
        const matchingItem = option.find((item: any) => item.value === editId);
        if (matchingItem) {
          setKey(matchingItem?.name);
        }
      } else {
        setKey(editId);
      }
    }
  });

 

  return (
    <div className={`inputData text-start ${className}`}>
      <SelectScript value={value} id={`toggle-${id}`} angle={angle} />
      <label htmlFor={id}>{label}</label>
      <div className={`selectMain`}>
        <button
          className={`selectBox betBox m-auto-left ${btnClass}`}
          type="button"
          value={key}
          id={`toggle-${id}`}
        >
          <p className={`m0 m10-right showSelectValue`}>
            <p
              className={`${
                !key ? "text-gray" : "text-dark"
              } d-flex align-items-center `}
            >
              {label == "Color" && (
                <span
                  className={`colorBall ${!key && "d-none"}`}
                  style={{
                    backgroundColor: key,
                  }}
                ></span>
              )}
              <span>{key ? key : placeholder}</span>
            </p>
            <input
              type="text"
              placeholder={placeholder}
              readOnly
              name={name}
              id={id}
              className={`p0 m0 h-auto cursor-pointer d-none  ${
                value == placeholder ? "text-gray" : "text-dark"
              }`}
              value={value}
            />
          </p>
          <i
            className={`ri-arrow-down-s-line ${
              value == placeholder ? "text-gray" : "text-dark"
            }`}
          ></i>
        </button>
        <p className={`errorMessage text-start  ${error}`} id={`error-${name}`}>
          {errorMessage}
        </p>
        <ul className="dropMenu">
          <li
            className="text-gray text-center"
            onClick={() => {
              setValue("");
              setKey("");
              setError("d-block");
            }}
          >
            -- {placeholder} --
          </li>
          {option?.map((res, i) => {
            const isObject = typeof res;
         
            return isObject == "object" ? (
              <li
                onClick={() => {
                  setValue(res.value);
                  setError("d-none");
                  setKey(res.name);
                  $(".dropMenu").hide();
                  {
                    onChange && onChange(res.value);
                  }
                }}
                key={`li`}
              >
                <span className="d-flex align-items-center">
                  {label == "Color" && (
                    <span
                      className="colorBall"
                      style={{
                        backgroundColor: res.name,
                      }}
                    ></span>
                  )}
                  <span>{res.name}</span>
                </span>
              </li>
            ) : (
              <li
                onClick={() => {
                  setValue(res);
                  setKey(res);
                  setError("d-none");
                  $(".dropMenu").hide();
                  {
                    onChange && onChange(res);
                  }
                }}
                key={`li`}
              >
                <span className="d-flex align-items-center">
                  {label == "Color" && (
                    <span
                      className="colorBall"
                      style={{
                        backgroundColor: res,
                      }}
                    ></span>
                  )}
                  <span>{res}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export const MultiSelect = (props: any) => {
  const {
    id,
    label,
    options,
    onChange,
    className,
    btnClass,
    defaultValue,
    placeholder,
    name,
    errorMessage,
    angle,
    onChangeValue,
  } = props;

  const [selectedValues, setSelectedValues] = useState<any>([]);
  const [showValue, setShowValue] = useState<any>();
  const [error, setError] = useState<any>("d-none");

  const handleOptionClick = (option: any) => {
    const valueToToggle = option.value || option;
    const isSelected = selectedValues.includes(valueToToggle);
    if (!isSelected) {
      setSelectedValues([...selectedValues, valueToToggle]);
      if (showValue) {
        setShowValue([...showValue, valueToToggle]);
      } else {
        setShowValue([valueToToggle]);
      }
    } else {
      const newSelectedValues = selectedValues.filter(
        (value: any) => value !== valueToToggle
      );

      setSelectedValues(newSelectedValues);
      setShowValue(newSelectedValues);
    }
    $(".dropMenu").hide();
  };
  useEffect(() => {
    setError(selectedValues?.length === 0 ? "d-block" : "d-none");
  }, [selectedValues]);
  useEffect(() => {
    setError("d-none");
  }, []);

  $(document).ready(function () {
       const editId: any = ($(`#${id}`)[0] as HTMLInputElement)?.value;
    if (editId && options) {
      const action = editId.split(",");
      setSelectedValues(action);
      setShowValue(action);
    }
  });

  return (
    <div className={`inputData text-start ${className}`}>
      <SelectScript value={showValue} id={`toggle-${id}`} angle={angle} />
      <label htmlFor={id}>{label}</label>
      <div className={`selectMain`}>
        <button
          className={`selectBox betBox m-auto-left ${btnClass}`}
          type="button"
          value={selectedValues}
          id={`toggle-${id}`}
        >
          <input
            type="text"
            placeholder={placeholder}
            readOnly
            name={name}
            className={`p0 m0 h-auto cursor-pointer d-none ${
              !selectedValues ? "text-gray" : "text-dark"
            }`}
            value={showValue}
            onChange={onChangeValue}
            id={id}
          />
          <p className={`m0 m10-right showSelectValue`}>
            {selectedValues?.length === 0 ? (
              <span className="text-gray">{placeholder}</span>
            ) : (
              selectedValues.map((selectedValue, index) => {
                const optionObject =
                  typeof selectedValue === "object" &&
                  selectedValue.hasOwnProperty("name") &&
                  selectedValue.hasOwnProperty("value");

                return (
                  <span key={index} className="text-dark multiSelectionDisplay">
                    {label == "Color" && (
                      <span
                        className="colorBall"
                        style={{
                          backgroundColor: optionObject
                            ? selectedValue?.name
                            : (
                                options.find(
                                  (opt: any) => opt.value === selectedValue
                                ) || {}
                              ).name || selectedValue,
                        }}
                      ></span>
                    )}
                    <span>
                      {optionObject
                        ? selectedValue.name
                        : (
                            options.find(
                              (opt: any) => opt.value === selectedValue
                            ) || {}
                          ).name || selectedValue}
                    </span>
                  </span>
                );
              })
            )}
          </p>
          <i
            className={`ri-arrow-down-s-line ${
              selectedValues?.length === 0 ? "text-gray" : "text-dark"
            }`}
          ></i>
        </button>
        <p className={`errorMessage text-start ${error}`} id={`error-${name}`}>
          {errorMessage}
        </p>
        <ul className="dropMenu">
          {options?.map((option: any, index: any) => (
            <li
              key={index}
              className={
                selectedValues.includes(option.value || option)
                  ? "selected"
                  : ""
              }
              onClick={() => {
                handleOptionClick(option);
                setError("d-none");
                onChange &&
                  onChange(
                    selectedValues.map((selectedValue) => {
                      const optionObject =
                        typeof selectedValue === "object" &&
                        selectedValue.hasOwnProperty("name") &&
                        selectedValue.hasOwnProperty("value");
                      return optionObject
                        ? selectedValue
                        : {
                            name:
                              (
                                options.find(
                                  (opt: any) => opt.value === selectedValue
                                ) || {}
                              ).name || selectedValue,
                            value: selectedValue,
                          };
                    })
                  );
              }}
            >
              {label == "Color" && (
                <span
                  className="colorBall"
                  style={{
                    backgroundColor:
                      typeof option === "object" ? option.name : option,
                  }}
                ></span>
              )}
              <span>{typeof option === "object" ? option.name : option}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SelectScript = ({ value, id, angle }) => {
  useEffect(() => {
    $(".dropMenu").hide();
    const handleDrop = () => {
     

      if (angle) {
        let height: any = $(document).height();
        let adminStart: any = $(".adminStart").height();
        let dropMenuStyleHeight: any = $(`#${id} ~ .dropMenu`).css("maxHeight");
        let dropMenuHeight: any = $(`#${id} ~ .dropMenu`).height();

        const totalHeight =
          typeof dropMenuStyleHeight === "string" &&
          dropMenuStyleHeight !== "none"
            ? parseInt(dropMenuStyleHeight) + adminStart
            : dropMenuHeight + adminStart;

        if (totalHeight >= height) {
          $(`#${id} ~ .dropMenu`).removeClass("topSide");
          $(`#${id} ~ .dropMenu`).addClass("topSide");
        } else {
          $(`#${id} ~ .dropMenu`).removeClass("topSide");
          $(`#${id} ~ .dropMenu`).addClass("topSide");
        }
      }

      $(`#${id} ~ .dropMenu`).slideToggle();
    };

    $(`#${id}`).on("click", handleDrop);
    return () => {
      $(`#${id}`).off("click", handleDrop);
    };
  }, []);

  return null; // or return any JSX if needed
};
