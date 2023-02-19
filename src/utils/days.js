// handle days
const days = (day) => {
  let newDay = new Date();

  while (true) {
    // console.log(newDay.getDay(), day);
    if (newDay.getDay() === day) {
      return newDay;
    } else {
      newDay.setDate(newDay.getDate() + 1);
    }
  }
};

export default days;
