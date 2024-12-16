"use client";

export default function Button({
  onClick,
  text,
  aIcon,
  bIcon,
  className,
  type,
  style,
  title,
}: any) {
  return (
    <>
      <button
        type={type}
        className={`themeButton ${className}`}
        title={title}
        style={style}
        onClick={onClick}
      >
        {bIcon && (
          <span>
            <i className={`${bIcon} m5-right`}></i>
          </span>
        )}
        <span>{text}</span>
        {aIcon && (
          <span>
            <i className={`${aIcon} m5-left`}></i>
          </span>
        )}
      </button>
    </>
  );
}
