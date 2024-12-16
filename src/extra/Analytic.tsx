import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";

export default function Analytics(props: any) {
  const {
    analyticsStartDate,
    analyticsStartEnd,
    analyticsStartDateSet,
    direction,
    analyticsStartEndSet,
    allAllow,
  } = props;

  const handleApply = (event: any, picker: any) => {
    let start = dayjs(picker.startDate).format("YYYY-MM-DD");
    let end = dayjs(picker.endDate).format("YYYY-MM-DD");
    analyticsStartDateSet(start);
    analyticsStartEndSet(end);
    if (picker.chosenLabel === "All") {
      start = "All";
      end = "All";
    }

    analyticsStartDateSet(start);
    analyticsStartEndSet(end);
  };
  const [isDateRangePickerVisible, setDateRangePickerVisible] = useState(false);
  const [state, setState] = useState({
    start: moment().subtract(29, "days"),
    end: moment(),
  });
  const { start, end } = state;

  const handleCancel = (event: any, picker: any) => {
    picker?.element.val("");
    analyticsStartDateSet("");
    analyticsStartEndSet("");
  };

  const handleCallback = (start: any, end: any) => {
    setState({ start, end });
  };
  const label = start.format("DD/MM/YYYY") + " - " + end.format("DD/MM/YYYY");

  const { color, bgColor } = props;

  const startAllDate = "1970-01-01";
  const endAllDate = moment().format("YYYY-MM-DD");

  const handleInputClick = () => {
    setDateRangePickerVisible(!isDateRangePickerVisible);
  };

  return (
    <div
      className="d-flex my-2"
      style={{ width: "300px", justifyContent: direction }}
    >
      <DateRangePicker
        initialSettings={{
          ranges: {
            ...(allAllow !== false && {
              All: "All",
            }),
            Today: [moment().toDate(), moment().toDate()],
            Yesterday: [
              moment().subtract(1, "days").toDate(),
              moment().subtract(1, "days").toDate(),
            ],

            "Last 7 Days": [
              moment().subtract(6, "days").toDate(),
              moment().toDate(),
            ],
            "Last 30 Days": [
              moment().subtract(29, "days").toDate(),
              moment().toDate(),
            ],
            "This Month": [
              moment().startOf("month").toDate(),
              moment().endOf("month").toDate(),
            ],
            "Last Month": [
              moment().subtract(1, "month").startOf("month").toDate(),
              moment().subtract(1, "month").endOf("month").toDate(),
            ],
          },
        }}
        onCallback={handleCallback}
        onApply={handleApply}
      >
        <input
          type="text"
          color={color}
          readOnly
          onClick={handleInputClick}
          className={`daterange float-right  mr-4  text-center ${bgColor} ${color}`}
          value={
            (analyticsStartDate === startAllDate &&
              analyticsStartEnd === endAllDate) ||
            (analyticsStartDate === "All" && analyticsStartEnd === "All")
              ? "Select Date Range"
              : moment(analyticsStartDate).format("YYYY-MM-DD") &&
                moment(analyticsStartEnd).format("YYYY-MM-DD")
              ? `${moment(analyticsStartDate).format("YYYY-MM-DD")} To ${moment(
                  analyticsStartEnd
                ).format("YYYY-MM-DD")}`
              : "Select Date Range"
          }
          style={{
            width: "85%",
            fontWeight: 600,
            cursor: "pointer",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
            padding: "9px",
            borderRadius: "6px",
            color: "#000",
            marginTop: "-3px",
          }}
        />
      </DateRangePicker>
    </div>
  );
}
