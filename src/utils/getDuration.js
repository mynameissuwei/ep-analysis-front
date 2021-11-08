const getDuration = my_time => {
  if (my_time === "NaN" || my_time === null || my_time === undefined) {
    return "无";
  }
  let hours = my_time / 1000 / 60 / 60;
  let hoursRound = Math.floor(hours);
  // var days = my_time / 1000 / 60 / 60 / 24;
  // var daysRound = Math.floor(days);
  // var hours = my_time / 1000 / 60 / 60 - 24 * daysRound;
  // var hoursRound = Math.floor(hours);
  // var minutes = my_time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound;
  // var minutesRound = Math.floor(minutes);

  // var seconds =
  //   my_time / 1000 -
  //   24 * 60 * 60 * daysRound -
  //   60 * 60 * hoursRound -
  //   60 * minutesRound;

  return `${hoursRound} h`;
};

export default getDuration;
