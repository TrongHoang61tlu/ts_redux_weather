export const iconUrlFromcode = (code: string) => `https://openweathermap.org/img/w/${code}.png`;

export const convertDegreesToWindDirection = (degrees: number) => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
    'N',
  ];
  const index = Math.round((degrees % 360) / 22.5);
  return directions[index];
};
