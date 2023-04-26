import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import dayjs from 'dayjs';
import WeekItem from 'features/weather/weatherDaily/weekItem/WeekItem';
import React from 'react';
import { fetchCoordinates } from '../coordinateSlice';
import { fetchWeather } from '../weatherSlice';
import {
  City,
  HeaderWeek,
  Main,
  ThisWeek,
  ThisWeekTitle,
  Time,
  Title,
  ToggleButton,
  Top,
  Week,
  Wrapper,
} from './styles';
export interface IDailyProps {}
export default function Daily(props: IDailyProps) {
  const dispatch = useAppDispatch();
  const weatherData = useAppSelector((state: RootState) => state.weather);
  const coordinates = useAppSelector((state: RootState) => state.coordinate);
  const city = useAppSelector((state: RootState) => state.search.searchText);
  const [isOpen, setIsOpen] = React.useState(false);
  const dailyList = coordinates?.data?.daily;

  const handleOpenAllDayClick = () => {
    setIsOpen((isOpen) => !isOpen);
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
          <ThisWeekTitle>This Week</ThisWeekTitle>
          <ToggleButton onClick={handleOpenAllDayClick}>
            {isOpen ? 'Đóng tất cả' : ' Hiển thị tất cả'}
          </ToggleButton>
        </HeaderWeek>
        <Week>
          {dailyList?.map((daily) => (
            <WeekItem data={daily} key={daily?.dt} openAll={isOpen} />
          ))}
        </Week>
      </ThisWeek>
    </Wrapper>
  );
}
