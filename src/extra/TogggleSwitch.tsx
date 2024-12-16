const ToggleSwitch = (props: any) => {
  return (
    <>
      <label className="switch">
        <input type="checkbox" checked={props.value} onClick={props.onClick} />
        <div className="slider"></div>
        <div className="slider-card">
          <div className="slider-card-face slider-card-front"></div>
          <div className="slider-card-face slider-card-back"></div>
        </div>
      </label>
    </>
  );
};

export default ToggleSwitch;
