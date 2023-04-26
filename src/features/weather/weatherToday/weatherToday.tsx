import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { iconUrlFromcode } from 'components/format';
import dayjs from 'dayjs';
import * as React from 'react';
import { Line } from 'react-chartjs-2';
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
export interface ITodayProps {}

const options: ChartOptions<'line'> = {
  responsive: true,
  scales: {
    // x: {
    //   ticks : {
    //     maxTicksLimit : 20,
    //   }
    // },
    y: {
      ticks: {
        maxTicksLimit: 5,
      },
    },
  },
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

export default function Today(props: ITodayProps) {
  const [isActive, setIsActive] = React.useState(0);
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state: RootState) => state.weather);
  const coordinates = useAppSelector((state: RootState) => state.coordinate);
  const isCelsius = useAppSelector((state: RootState) => state.temperature.isCelsius);
  const city = useAppSelector((state: RootState) => state.search.searchText);
  const hourlyList = coordinates?.data?.hourly;
  const dailyList = coordinates?.data?.daily?.slice(0, 6);

  const handleItemClick = (key: number) => {
    setIsActive(key);
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

  const labels = hourlyList?.map((temp) => dayjs.unix(temp?.dt).format('h:mmA'));
  const filterLabel = labels?.filter((label, index) => index % 3 === 0);
  const temp = hourlyList?.map((hour) => convertCelsiusToFahrenheit(hour.temp, false));
  const filterTemp = temp?.filter((temp, index) => index % 3 === 0);

  const data = {
    type: 'line',
    labels: filterLabel,
    datasets: [
      {
        fill: false,
        label: 'Nhiệt độ',
        data: filterTemp,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.7,
      },
    ],
  };

  React.useEffect(() => {
    dispatch(fetchWeather(city)); // Gọi async thunk fetchWeather khi component mount
  }, [city]);

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
            <Items>{dayjs.unix(weatherData?.data?.dt).format('MMMM D')} </Items>
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
        <Line options={options} data={data} />
      </Chart>
      <Predict>
        {dailyList?.map((daily, index) => (
          <PredictItem
            isActive={isActive === index}
            onClick={() => handleItemClick(index)}
            key={index}
            id="index"
          >
            <ItemMonth>{dayjs.unix(daily?.dt).format('MMMM D')}</ItemMonth>
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
}
