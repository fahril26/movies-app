/* eslint-disable react/prop-types */
const ChangeFormatDate = ({ date }) => {
  if (date) {
    const dataDate = new Date(date);
    const splitDate = date.split("-");

    const monthNameList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = splitDate[2];
    const month = monthNameList[dataDate.getMonth()];
    const year = splitDate[0];

    return <span className="air-date">{`${month}, ${day} ${year}`}</span>;
  }
};

export default ChangeFormatDate;
