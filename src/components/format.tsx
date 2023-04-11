const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  export const dateFormat = (strDate: any) => {
    const date = new Date(strDate * 1000);
    return days[date.getDay()];
    
  };
  
  export const formatDateTime = (dt: number): string => {
    const date = new Date(dt * 1000); // Đổi số giây sang mili giây
    const month = date.toLocaleString('en-US', { month: 'short' });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  export const timeFormat = (mili : any) => {
    const date = new Date(mili * 1000);
    var hours = date.getHours();
    var minutes :any = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
    // return date.getHours() <= 12 ? time + ' AM' : time + ' PM'
  };

  export const iconUrlFromcode = (code: any) =>
  `https://openweathermap.org/img/w/${code}.png`;

  
  