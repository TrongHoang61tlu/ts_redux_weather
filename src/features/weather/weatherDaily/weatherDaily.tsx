import { useAppDispatch } from 'app/hooks';
import { RootState } from 'app/store';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
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
import WeekItem from 'features/weather/weatherDaily/weekItem/WeekItem';
export interface IDailyProps {}
export default function Daily(props: IDailyProps) {
  const [expandedDay, setExpandedDay] = React.useState<number[]>([]);
  const [city, setCity] = React.useState('hanoi');
  const dispatch = useAppDispatch();
  const weatherData = useSelector((state: RootState) => state.weather);
  const coordinates = useSelector((state: RootState) => state.coordinate);
  const dailyList = coordinates?.data?.daily;

  const handleOpenAllDayClick = () => {
    if (expandedDay?.length === dailyList?.length) {
      setExpandedDay([]);
    } else {
      const date = dailyList.map((day) => day?.dt);
      setExpandedDay(date);
    }
  };
  // console.log(expandedDay);

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
    <div>
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
              {expandedDay?.length === dailyList?.length ? 'Đóng tất cả' : ' Hiển thị tất cả'}
            </ToggleButton>
          </HeaderWeek>
          <Week>
            {dailyList?.map((daily) => (
              <WeekItem
                data={daily}
                key={daily?.dt}
                expandedDayProps={expandedDay}
                setExpandedDayProps={setExpandedDay}
              />
            ))}
          </Week>
        </ThisWeek>
      </Wrapper>
    </div>
  );
}
