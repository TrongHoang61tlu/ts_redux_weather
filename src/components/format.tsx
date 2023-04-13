export const timeFormat = (mili: any) => {
  const date = new Date(mili * 1000);
  var hours = date.getHours();
  var minutes: any = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
  // return date.getHours() <= 12 ? time + ' AM' : time + ' PM'
};

export const iconUrlFromcode = (code: any) => `https://openweathermap.org/img/w/${code}.png`;
