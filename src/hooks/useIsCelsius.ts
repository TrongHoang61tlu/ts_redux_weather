import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

export const useCelsius = () => {
  const isCelsius = useSelector((state: RootState) => state.temperature.isCelsius);
  return isCelsius;
}

export const useTemperatureConversion = () => {
  const isCelsius = useCelsius();

  const convertCelsiusToFahrenheit = (celsius: number, checker: boolean = true) => {
    let result = '';
    if (isCelsius) {
      result = checker ? `${celsius} ℃` : `${celsius}° `;
    } else {
      const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);
      result = checker ? `${fahrenheit} ℉` : `${fahrenheit}°`;
    }
    return result;
  };

  return { convertCelsiusToFahrenheit };
}
