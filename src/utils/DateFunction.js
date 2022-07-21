const DateFunction = () => {
  const now = new Date();
  const year = now.getFullYear();
  const day = now.getDate() < 10 ? `0${now.getDate()}` : now.getDate();
  const month =
    now.getMonth() < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1;
  const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
  const min = now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  const currentDate = `${hour}:${min}, ${day}-${month}-${year}`;
  return currentDate;
};

export default DateFunction;
