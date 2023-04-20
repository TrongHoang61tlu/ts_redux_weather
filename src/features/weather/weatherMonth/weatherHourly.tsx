import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import dayjs from 'dayjs';
import _ from 'lodash';
import * as React from 'react';
import { Hour, fetchCoordinates } from '../coordinateSlice';
import { fetchWeather } from '../weatherSlice';
import HourlyItem from './hourlyItem/hourlyItem';
import {
    City,
    HeaderWeek,
    Main,
    ThisWeek,
    Time,
    Title,
    TitleDate,
    ToggleButton,
    Top,
    Week,
    Wrapper,
} from './styles';

export interface IHourlyProps {}

export default function Hourly(props: IHourlyProps) {
  const dispatch = useAppDispatch();
  const [city, setCity] = React.useState('hanoi');
  const [isOpen, setIsOpen] = React.useState(false);
  const weatherData = useAppSelector((state: RootState) => state.weather);
  const coordinates = useAppSelector((state: RootState) => state.coordinate);
  const hourlyList = coordinates?.data?.hourly;

  const weatherDataByDate = _.groupBy(hourlyList, (data: Hour) =>
    dayjs.unix(data.dt).format('dddd,MMMM D')
  );

  const handleOpenAllDayClick = () => {
    setIsOpen((isOpen) => !isOpen);
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
      <Top>
        <Main>
          <Title>Weekend Weather - </Title>
          <City>{`${weatherData?.data?.name}, ${weatherData?.data?.sys?.country}`}</City>
        </Main>
        <Time>{`As of ${dayjs.unix(weatherData?.data?.dt).format('h:mm a')} 
      ${dayjs.unix(weatherData?.data?.timezone).format(`[GMT]Z`)}`}</Time>
      </Top>
      <ThisWeek>
        <HeaderWeek>
          <ToggleButton onClick={handleOpenAllDayClick}>
            {isOpen ? 'Đóng tất cả' : ' Hiển thị tất cả'}
          </ToggleButton>
        </HeaderWeek>
        <Week>
          <div>
            {Object.entries(weatherDataByDate).map(([date, hourlyList]) => (
              <div key={date}>
                <TitleDate>{dayjs(date).format('dddd, MMMM DD')}</TitleDate>
                {hourlyList.map((hourlyData, index) => (
                  <HourlyItem data={hourlyData} key={index} openAll={isOpen} />
                ))}
              </div>
            ))}
          </div>
        </Week>
      </ThisWeek>
    </Wrapper>
  );
}
