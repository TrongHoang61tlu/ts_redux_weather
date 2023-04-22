import { convertDegreesToWindDirection, iconUrlFromcode } from 'components/format';
import dayjs from 'dayjs';
import { Daily } from 'features/weather/coordinateSlice';
import React from 'react';
import {
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
  Updown,
  WeekDetail,
  WeekItems,
  Wind,
  WindImg,
  WindTitle,
} from './style';
import { convertCelsiusToFahrenheit } from 'components/format';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';

export interface IWeekItemProps {
  data: Daily;
  openAll: boolean;
}
export default function WeekItem({ data, openAll }: IWeekItemProps) {
  const [expandedDay, setExpandedDay] = React.useState<boolean>(false);
  const isCelsius = useAppSelector((state: RootState) => state.temperature.isCelsius);

  // Hàm xử lý sự kiện click vào ngày
  const handleDayClick = (date: number) => {
    setExpandedDay((expandedDay) => !expandedDay);
  };

  const leftItems = [
    { icon: 'image/humidity.jpg', label: 'Humidity', value: `${data?.humidity}°` },
    { icon: 'image/uvindex.jpg', label: 'UV Index', value: `${data?.uvi}%` },
    { icon: 'image/sunrise.jpg', label: 'Sunrise', value: `${dayjs.unix(data?.sunrise).format('h:mm a')}` },
    { icon: 'image/sunset.jpg', label: 'Sunset', value: `${dayjs.unix(data?.sunset).format('h:mm a')}` },
  ];

  const rightItems = [
    { icon: 'image/humidity.jpg', label: 'Humidity', value: `${data?.humidity}°` },
    { icon: 'image/uvindex.jpg', label: 'UV Index', value: `${data?.uvi}%` },
    { icon: 'image/moonrise.webp', label: 'Moonrise', value:`${dayjs.unix(data?.moonrise).format('h:mm a')}` },
    { icon: 'image/moonset.webp', label: 'Moonset', value: `${dayjs.unix(data?.moonset).format('h:mm a')}` },
  ];

  // Hàm xử lý sự kiện click đóng mở tất cả các ngày
  React.useEffect(() => {
    setExpandedDay(openAll);
  }, [openAll]);

  return (
    <div>
      <div onClick={() => handleDayClick(data?.dt)}>
        <WeekItems>
          <Left>
            <Date>{dayjs.unix(data?.dt).format('ddd D')}</Date>
            <Temp>
              <TempDay>{convertCelsiusToFahrenheit(isCelsius, data?.temp?.day, false)}</TempDay>
              <TempNight>
                /{convertCelsiusToFahrenheit(isCelsius, data?.temp?.night, false)}
              </TempNight>
            </Temp>
            <Status>
              <StatusImg src={iconUrlFromcode(data?.weather[0]?.icon)}></StatusImg>
              <StatusTitle>{data?.weather[0]?.main}</StatusTitle>
            </Status>
          </Left>
          <Right>
            <Precipitation>
              <PrecipitationImg src="image/dew_point.jpg"></PrecipitationImg>
              <PrecipitationTitle>{`${data?.dew_point}%`}</PrecipitationTitle>
            </Precipitation>
            <Wind>
              <WindImg src="image/wind.jpg"></WindImg>
              <WindTitle>{`${convertDegreesToWindDirection(data?.wind_deg)} ${
                data?.wind_speed
              } mph`}</WindTitle>
            </Wind>
            <Updown>{expandedDay ? '▲' : '▼'}</Updown>
          </Right>
        </WeekItems>
      </div>
      {/* Kiểm tra nếu ngày đang được mở rộng thì hiển thị các thuộc tính bổ sung */}
      {expandedDay && (
        <WeekDetail>
          <Day>
            <DayTitle>{`${dayjs.unix(data?.dt).format('ddd D')} | Day`}</DayTitle>
            <DayMain>
              <DayTemp>{convertCelsiusToFahrenheit(isCelsius, data?.temp?.day)}</DayTemp>
              <StatusImg src={iconUrlFromcode(data?.weather[0]?.icon)}></StatusImg>
              <DayProperties>
                <Precipitation>
                  <PrecipitationImg src="image/dew_point.jpg"></PrecipitationImg>
                  <PrecipitationTitle>{`${data?.dew_point}%`}</PrecipitationTitle>
                </Precipitation>
                <Wind>
                  <WindImg src="image/wind.jpg"></WindImg>
                  <WindTitle>{`${convertDegreesToWindDirection(data?.wind_deg)} ${
                    data?.wind_speed
                  } mph`}</WindTitle>
                </Wind>
              </DayProperties>
            </DayMain>
            <Content>
              {`Mainly ${data?.weather[0]?.main}. Height ${convertCelsiusToFahrenheit(
                isCelsius,
                data?.temp?.day
              )}. Winds ${convertDegreesToWindDirection(data?.wind_deg)} at ${
                data?.wind_speed
              } to ${data?.wind_gust} mph`}
            </Content>
          </Day>
          <Night>
            <DayTitle>{`${dayjs.unix(data?.dt).format('ddd D')} | Night`}</DayTitle>
            <DayMain>
              <DayTemp>{convertCelsiusToFahrenheit(isCelsius, data?.temp?.night)}</DayTemp>
              <StatusImg src={iconUrlFromcode(data?.weather[0]?.icon)}></StatusImg>
              <DayProperties>
                <Precipitation>
                  <PrecipitationImg src="image/dew_point.jpg"></PrecipitationImg>
                  <PrecipitationTitle>{`${data?.dew_point}%`}</PrecipitationTitle>
                </Precipitation>
                <Wind>
                  <WindImg src="image/wind.jpg"></WindImg>
                  <WindTitle>{`${convertDegreesToWindDirection(data?.wind_deg)} ${
                    data?.wind_speed
                  } mph`}</WindTitle>
                </Wind>
              </DayProperties>
            </DayMain>
            <Content>
              {`Mainly ${data?.weather[0]?.main}. Height ${convertCelsiusToFahrenheit(
                isCelsius,
                data?.temp?.day
              )}. Winds ${convertDegreesToWindDirection(data?.wind_deg)} at ${
                data?.wind_speed
              } to ${data?.wind_gust} mph`}
            </Content>
          </Night>
          <TableLeft>
            <ListDetail>
              {leftItems.map((item) => (
                <Detail key={item?.label}>
                  <DetailIcon src={item?.icon}></DetailIcon>
                  <DetailContent>
                    <DetailItem>{item?.label}</DetailItem>
                    <DetailParams>{item?.value}</DetailParams>
                  </DetailContent>
                </Detail>
              ))}
            </ListDetail>
          </TableLeft>
          <TableRight>
            <ListDetail>
              {rightItems.map((item) => (
                <Detail key={item?.label}>
                  <DetailIcon src={item?.icon}></DetailIcon>
                  <DetailContent>
                    <DetailItem>{item?.label}</DetailItem>
                    <DetailParams>{item?.value}</DetailParams>
                  </DetailContent>
                </Detail>
              ))}
            </ListDetail>
          </TableRight>
        </WeekDetail>
      )}
    </div>
  );
}
