
export const formattedDate = (dataString) => {
  const option = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dataString);
  const formattedDate = date.toLocaleDateString("en-US", option);

  const hour = date.getHours();
  const minutes = date.getMinutes();
  const period = hour >= 12 ? "PM" : "AM";

  const formattedTime = `${hour % 12}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;
  return `${formattedDate} | ${formattedTime}`;
};
