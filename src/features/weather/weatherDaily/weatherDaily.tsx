import { useAppDispatch } from 'app/hooks';
import { RootState } from 'app/store';
import { convertDegreesToWindDirection, iconUrlFromcode } from 'components/format';
import dayjs from 'dayjs';
import React from 'react';
import { useSelector } from 'react-redux';
import { fetchCoordinates } from '../coordinateSlice';
import { fetchWeather } from '../weatherSlice';
import {
  City,
  Content,
  Date,
  Day,
  DayMain,
  DayProperties,
  DayTemp,
  DayTitle,
  Detail,
  DetailContent,
  DetailIcon,
  DetailItem,
  DetailParams,
  Left,
  ListDetail,
  Main,
  Night,
  Precipitation,
  PrecipitationImg,
  PrecipitationTitle,
  Right,
  Status,
  StatusImg,
  StatusTitle,
  TableLeft,
  TableRight,
  Temp,
  TempDay,
  TempNight,
  ThisWeek,
  ThisWeekTitle,
  Time,
  Title,
  Top,
  Updown,
  Week,
  WeekDetail,
  WeekItems,
  Wind,
  WindImg,
  WindTitle,
  Wrapper,
} from './styles';
export interface IDailyProps {}

export default function Daily(props: IDailyProps) {
  const [expandedDay, setExpandedDay] = React.useState(null);
  const [city, setCity] = React.useState('hanoi');
  const dispatch = useAppDispatch();
  const weatherData = useSelector((state: RootState) => state.weather);
  const coordinates = useSelector((state: RootState) => state.coordinate);
  const isCelsius = useSelector((state: RootState) => state.temperature.isCelsius);
  const dailyList = coordinates?.data?.daily;

  const convertCelsiusToFahrenheit = (celsius: number, checker: boolean = true) => {
    let result = '';
    if (isCelsius) {
      result = checker ? `${celsius} ℃` : `${celsius}° `;
    } else {
      const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(0);
      result = checker ? `${fahrenheit} ℉` : `${fahrenheit}°`;
    }
    return result;
  };

  // Hàm xử lý sự kiện click vào ngày
  const handleDayClick = (key: any) => {
    // Nếu ngày đã được mở rộng, đóng nó lại
    if (expandedDay === key) {
      setExpandedDay(null);
    }
    // Nếu chưa được mở rộng, mở rộng nó
    else {
      setExpandedDay(key);
    }
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
          <ThisWeekTitle>This Week</ThisWeekTitle>
          <Week>
            {dailyList?.map((daily, index) => (
              <div key={index}>
                <div onClick={() => handleDayClick(index)}>
                  <WeekItems>
                    <Left>
                      <Date>{dayjs.unix(daily?.dt).format('ddd D')}</Date>
                      <Temp>
                        <TempDay>{convertCelsiusToFahrenheit(daily?.temp?.day, false)}</TempDay>
                        <TempNight>
                          /{convertCelsiusToFahrenheit(daily?.temp?.night, false)}
                        </TempNight>
                      </Temp>
                      <Status>
                        <StatusImg src={iconUrlFromcode(daily?.weather[0]?.icon)}></StatusImg>
                        <StatusTitle>{daily?.weather[0]?.main}</StatusTitle>
                      </Status>
                    </Left>
                    <Right>
                      <Precipitation>
                        <PrecipitationImg src="image/dew_point.jpg"></PrecipitationImg>
                        <PrecipitationTitle>{`${daily?.dew_point}%`}</PrecipitationTitle>
                      </Precipitation>
                      <Wind>
                        <WindImg src="image/wind.jpg"></WindImg>
                        <WindTitle>{`${convertDegreesToWindDirection(daily?.wind_deg)} ${
                          daily?.wind_speed
                        } mph`}</WindTitle>
                      </Wind>
                      <Updown>▼</Updown>
                    </Right>
                  </WeekItems>
                </div>
                {/* Kiểm tra nếu ngày đang được mở rộng thì hiển thị các thuộc tính bổ sung */}
                {expandedDay === index && (
                  <WeekDetail>
                    <Day>
                      <DayTitle>{`${dayjs.unix(daily?.dt).format('ddd D')} | Day`}</DayTitle>
                      <DayMain>
                        <DayTemp>{convertCelsiusToFahrenheit(daily?.temp?.day)}</DayTemp>
                        <StatusImg src={iconUrlFromcode(daily?.weather[0]?.icon)}></StatusImg>
                        <DayProperties>
                          <Precipitation>
                            <PrecipitationImg src="image/dew_point.jpg"></PrecipitationImg>
                            <PrecipitationTitle>{`${daily?.dew_point}%`}</PrecipitationTitle>
                          </Precipitation>
                          <Wind>
                            <WindImg src="image/wind.jpg"></WindImg>
                            <WindTitle>{`${convertDegreesToWindDirection(daily?.wind_deg)} ${
                              daily?.wind_speed
                            } mph`}</WindTitle>
                          </Wind>
                        </DayProperties>
                      </DayMain>
                      <Content>
                        {`Mainly ${daily?.weather[0]?.main}. Height ${convertCelsiusToFahrenheit(
                          daily?.temp?.day
                        )}. Winds ${convertDegreesToWindDirection(daily?.wind_deg)} at ${
                          daily?.wind_speed
                        } to ${daily?.wind_gust} mph`}
                      </Content>
                    </Day>
                    <Night>
                      <DayTitle>{`${dayjs.unix(daily?.dt).format('ddd D')} | Night`}</DayTitle>
                      <DayMain>
                        <DayTemp>{convertCelsiusToFahrenheit(daily?.temp?.night)}</DayTemp>
                        <StatusImg src={iconUrlFromcode(daily?.weather[0]?.icon)}></StatusImg>
                        <DayProperties>
                          <Precipitation>
                            <PrecipitationImg src="image/dew_point.jpg"></PrecipitationImg>
                            <PrecipitationTitle>{`${daily?.dew_point}%`}</PrecipitationTitle>
                          </Precipitation>
                          <Wind>
                            <WindImg src="image/wind.jpg"></WindImg>
                            <WindTitle>{`${convertDegreesToWindDirection(daily?.wind_deg)} ${
                              daily?.wind_speed
                            } mph`}</WindTitle>
                          </Wind>
                        </DayProperties>
                      </DayMain>
                      <Content>
                        {`Mainly ${daily?.weather[0]?.main}. Height ${convertCelsiusToFahrenheit(
                          daily?.temp?.day
                        )}. Winds ${convertDegreesToWindDirection(daily?.wind_deg)} at ${
                          daily?.wind_speed
                        } to ${daily?.wind_gust} mph`}
                      </Content>
                    </Night>
                    <TableLeft>
                      <ListDetail>
                        <Detail>
                          <DetailIcon src="image/humidity.jpg"></DetailIcon>
                          <DetailContent>
                            <DetailItem>Humidity</DetailItem>
                            <DetailParams>{`${daily?.humidity} %`}</DetailParams>
                          </DetailContent>
                        </Detail>
                        <Detail>
                          <DetailIcon src="image/uvindex.jpg"></DetailIcon>
                          <DetailContent>
                            <DetailItem>UV Index</DetailItem>
                            <DetailParams>{daily?.uvi}</DetailParams>
                          </DetailContent>
                        </Detail>
                        <Detail>
                          <DetailIcon src="image/sunrise.jpg"></DetailIcon>
                          <DetailContent>
                            <DetailItem>Sunrise</DetailItem>
                            <DetailParams>
                              {dayjs.unix(daily?.sunrise).format('h:mm a')}
                            </DetailParams>
                          </DetailContent>
                        </Detail>
                        <Detail>
                          <DetailIcon src="image/sunset.jpg"></DetailIcon>
                          <DetailContent>
                            <DetailItem>Sunset</DetailItem>
                            <DetailParams>
                              {dayjs.unix(daily?.sunset).format('h:mm a')}
                            </DetailParams>
                          </DetailContent>
                        </Detail>
                      </ListDetail>
                    </TableLeft>
                    <TableRight>
                      <ListDetail>
                        <Detail>
                          <DetailIcon src="image/humidity.jpg"></DetailIcon>
                          <DetailContent>
                            <DetailItem>Humidity</DetailItem>
                            <DetailParams>{`${daily?.humidity} %`}</DetailParams>
                          </DetailContent>
                        </Detail>
                        <Detail>
                          <DetailIcon src="image/uvindex.jpg"></DetailIcon>
                          <DetailContent>
                            <DetailItem>UV Index</DetailItem>
                            <DetailParams>{daily?.uvi}</DetailParams>
                          </DetailContent>
                        </Detail>
                        <Detail>
                          <DetailIcon src="image/moonrise.webp"></DetailIcon>
                          <DetailContent>
                            <DetailItem>Moonrise</DetailItem>
                            <DetailParams>
                              {dayjs.unix(daily?.moonrise).format('h:mm a')}
                            </DetailParams>
                          </DetailContent>
                        </Detail>
                        <Detail>
                          <DetailIcon src="image/moonset.webp"></DetailIcon>
                          <DetailContent>
                            <DetailItem>Moonset</DetailItem>
                            <DetailParams>
                              {dayjs.unix(daily?.moonset).format('h:mm a')}
                            </DetailParams>
                          </DetailContent>
                        </Detail>
                      </ListDetail>
                    </TableRight>
                  </WeekDetail>
                )}
              </div>
            ))}
          </Week>
        </ThisWeek>
      </Wrapper>
    </div>
  );
}
