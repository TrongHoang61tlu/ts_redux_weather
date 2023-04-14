import { RootState } from 'app/store';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import {  iconUrlFromcode, timeFormat } from 'components/format';
import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoordinates } from '../coordinateSlice';
import { fetchWeather } from '../weatherSlice';
import {
  Banner,
  BannerContent,
  BannerLeft,
  BannerRight,
  BannerTitle,
  Chart,
  City,
  Icon,
  Image,
  ItemMonth,
  Items,
  Predict,
  PredictItem,
  Temp,
  TitleChart,
  Wrapper,
} from './styles';
import dayjs from 'dayjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};


export interface ITodayProps {}
export default function Today(props: ITodayProps) {
  const [isActive, setIsActive] = React.useState(0);
  const [city, setCity] = React.useState('hanoi');
  const dispatch = useDispatch<any>();
  const weatherData = useSelector((state: RootState) => state.weather);
  const coordinates = useSelector((state: RootState) => state.coordinate);
  const hourlyList = coordinates?.data?.hourly;
  const dailyList = coordinates?.data?.daily?.slice(0,6);
  const isCelsius = useSelector((state: RootState) => state.temperature.isCelsius);
  const handleItemClick = (index: number) => {
    setIsActive(index);
  };

  const convertCelsiusToFahrenheit = (celsius: number, checker: boolean = true) => {
    let result = '';
    if (isCelsius) {
      result = checker ? `${celsius} ℃` : `${celsius} `;
    } else {
      const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);
      result = checker ? `${fahrenheit} ℉` : `${fahrenheit}`;
    }
    return result;
  };

  const labels = hourlyList?.map((temp) => timeFormat(temp?.dt));
  const dataChar = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'Nhiệt độ',
        data: hourlyList?.map((hour) => convertCelsiusToFahrenheit(hour?.temp, false)),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.7,
      },
    ],
  };

  React.useEffect(() => {
    dispatch(fetchWeather(city)); // Gọi async thunk fetchWeather khi component mount
  }, []);
  React.useEffect(() => {
    const lat = weatherData?.data?.coord?.lat;
    const lon = weatherData?.data?.coord?.lon;
    if (lat && lon) {
      dispatch(fetchCoordinates({ lat, lon }));
    }
  }, [weatherData?.data?.id]);
  
  return (
    <Wrapper>
      <Banner>
        <BannerLeft>
          <BannerTitle>
            <Image
              src={
                weatherData?.data?.weather?.length > 0
                  ? iconUrlFromcode(weatherData?.data?.weather[0]?.icon)
                  : ''
              }
            />
            <Temp>{convertCelsiusToFahrenheit(coordinates?.data?.current?.temp)}</Temp>
          </BannerTitle>
          <BannerContent>
            <Items>Chance of precipitation: 0%</Items>
            <Items>{`Humidity: ${weatherData?.data?.main?.humidity}%`}</Items>
            <Items>{`Wind: ${weatherData?.data?.wind?.speed} m/s`}</Items>
          </BannerContent>
        </BannerLeft>
        <BannerRight>
          <City>{`${weatherData?.data?.name}, ${weatherData?.data?.sys?.country} `}</City>
          <BannerContent>
            <Items>Population: 1,431,270</Items>
            <Items>{`${dayjs.unix((weatherData?.data?.dt)).format('MMMM D')}`} </Items>
            <Items>
              {weatherData?.data?.weather?.length > 0
                ? weatherData?.data?.weather[0]?.description
                : ''}
            </Items>
          </BannerContent>
        </BannerRight>
      </Banner>
      <Chart>
        <TitleChart>{`Temperature ${isCelsius ? '℃' : '℉'}`}</TitleChart>
        <Line options={options} data={dataChar} />
      </Chart>
      <Predict>
        {dailyList?.map((daily, index) => (
          <PredictItem isActive={isActive === index} onClick={() => handleItemClick(index)} key={index}>
            <ItemMonth>{`${(dayjs.unix(daily?.dt)).format('MMMM D')}`}</ItemMonth>
            <Icon src={iconUrlFromcode(daily?.weather[0].icon)}></Icon>
            <ItemMonth>{convertCelsiusToFahrenheit(daily?.temp?.day)}</ItemMonth>
            <ItemMonth>
              {daily?.weather?.length > 0 ? daily?.weather[0].description : null}
            </ItemMonth>
          </PredictItem>
        ))}
      </Predict>
    </Wrapper>
  );
};
