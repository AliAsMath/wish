export const changeDateFormat = (date) => {
  const newDate = new Date(date);
  return (
    newDate.getFullYear() + "/" + newDate.getMonth() + "/" + newDate.getDay()
  );
};
