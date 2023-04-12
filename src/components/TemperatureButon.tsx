// TemperatureSwitch.tsx
import { toggleUnit } from 'features/weather/temperatureSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const TemperatureButton = () => {
  const isCelsius = useSelector((state : any) => state.temperature.isCelsius);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleUnit());
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={isCelsius}
          onChange={handleToggle}
        />
        {isCelsius ? 'Celsius' : 'Fahrenheit'}
      </label>
    </div>
  );
};

export default TemperatureButton;
