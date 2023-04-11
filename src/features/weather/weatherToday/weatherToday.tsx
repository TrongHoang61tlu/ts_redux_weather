import * as React from 'react';
import {
  Banner,
  Wrapper,
  BannerLeft,
  BannerRight,
  BannerTitle,
  Image,
  Temp,
  BannerContent,
  Items,
  City,
  Chart,
  TitleChart,
  Predict,
  PredictItem,
  ItemMonth,
  Icon,
} from './styles';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
// import { useGetCityQuery } from '../city.service';
import { fetchWeather } from '../weatherSlice';
import { Dayly, fetchCoordinates } from '../coordinateSlice';
import { RootState } from 'app/store';
import { formatDateTime, iconUrlFromcode, timeFormat } from 'components/format';

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

export const options = {
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
  const handleItemClick = (index: number) => {
    setIsActive(index);
  };
  const [city, setCity] = React.useState('hanoi');

  const dispatch = useDispatch<any>();
  const weatherData = useSelector((state: RootState) => state.weather);

  const coordinates = useSelector((state: RootState) => state.coordinate);

  const Hourly = coordinates?.data?.hourly;
  const Daily = coordinates?.data?.daily?.filter((dayly, index) => index < 6);

  React.useEffect(() => {
    dispatch(fetchWeather(city)); // Gọi async thunk fetchWeather khi component mount
  }, []);

  React.useEffect(() => {
    dispatch(
      fetchCoordinates({ lat: weatherData?.data?.coord?.lat, lon: weatherData?.data?.coord?.lon })
    ); // Gọi async thunk fetchCoordinates khi component mount
  }, [weatherData]);

  //Biểu đồ
  const labels = Hourly?.map((temp) => timeFormat(temp?.dt));

  const dataChar = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'Nhiệt độ',
        data: Hourly?.map((hour) => hour.temp),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.7,
      },
    ],
  };

  return (
    <Wrapper>
      <Banner>
        <BannerLeft>
          <BannerTitle>
            <Image src={weatherData?.data?.weather?.length > 0 ? iconUrlFromcode(weatherData?.data?.weather[0]?.icon) : ''} />
            <Temp>{`${coordinates?.data?.current?.temp}℃`}</Temp>
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
            <Items>{`${formatDateTime(weatherData?.data?.dt)}`} </Items>
            <Items>
              {weatherData?.data?.weather?.length > 0
                ? weatherData?.data?.weather[0]?.description
                : ''}
            </Items>
          </BannerContent>
        </BannerRight>
      </Banner>
      <Chart>
        <TitleChart>Temperature ℃</TitleChart>
        <Line options={options} data={dataChar} />
      </Chart>
      <Predict>
        {Daily?.map((daily, index) => (
          <PredictItem isActive={isActive === index} onClick={() => handleItemClick(index)}>
            <ItemMonth>{`${formatDateTime(daily?.dt)}`}</ItemMonth>
            <Icon src={iconUrlFromcode(daily?.weather[0].icon)}></Icon>
            <ItemMonth>{`${daily?.temp?.day}℃`}</ItemMonth>
            <ItemMonth>
              {daily?.weather?.length > 0 ? daily?.weather[0].description  : null}
            </ItemMonth>
          </PredictItem>
        ))}
      </Predict>
    </Wrapper>
  );
}
