const getDuration = my_time => {
  if (my_time === "NaN" || my_time === null || my_time === undefined) {
    return "无";
  }
  let hours = my_time / 1000 / 60 / 60;
  let hoursRound = hours.toFixed(3);
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

  return `${hoursRound}`;
};

// 按照每天8小时计算
export function getTimeConsuming (my_time) {
  let days = parseInt(my_time / (60 * 60 * 8));
  let hours = parseInt((my_time % (60 * 60 * 8)) / (60 * 60));
  let minutes = parseInt((my_time % (60 * 60)) / 60);
  let time = "";
  if(days) time += days + "天";
  if(hours) time += hours + "小时";
  // if(minutes) time += minutes + "分钟";
  if(!time) time = 0;
  return time;
}

export function convertToHoursFormat (templateTimeConsuming) {
  // let days = parseInt(templateTimeConsuming / (60 * 60 * 8));
  let hours = parseInt((templateTimeConsuming / (60 * 60)));
  let minutes = parseInt((templateTimeConsuming % (60 * 60)) / 60);
  let time = hours;
  if(minutes) time = hours+parseFloat((minutes / 60).toFixed(2)) +"h";
  return time;
}

export default getDuration;

