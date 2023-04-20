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
import { useTemperatureConversion } from 'hooks/useIsCelsius';

export interface IWeekItemProps {
  data: Daily;
  openAll: boolean;
}
export default function WeekItem({ data, openAll }: IWeekItemProps) {
  const [expandedDay, setExpandedDay] = React.useState<boolean>(false);

  //Hàm chuyển đổi C <-> F
  const {convertCelsiusToFahrenheit} = useTemperatureConversion();

  // Hàm xử lý sự kiện click vào ngày
  const handleDayClick = (date: number) => {
    setExpandedDay((expandedDay) => !expandedDay);
  };
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
              <TempDay>{convertCelsiusToFahrenheit(data?.temp?.day, false)}</TempDay>
              <TempNight>/{convertCelsiusToFahrenheit(data?.temp?.night, false)}</TempNight>
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
              <DayTemp>{convertCelsiusToFahrenheit(data?.temp?.day)}</DayTemp>
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
                data?.temp?.day
              )}. Winds ${convertDegreesToWindDirection(data?.wind_deg)} at ${
                data?.wind_speed
              } to ${data?.wind_gust} mph`}
            </Content>
          </Day>
          <Night>
            <DayTitle>{`${dayjs.unix(data?.dt).format('ddd D')} | Night`}</DayTitle>
            <DayMain>
              <DayTemp>{convertCelsiusToFahrenheit(data?.temp?.night)}</DayTemp>
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
                data?.temp?.day
              )}. Winds ${convertDegreesToWindDirection(data?.wind_deg)} at ${
                data?.wind_speed
              } to ${data?.wind_gust} mph`}
            </Content>
          </Night>
          <TableLeft>
            <ListDetail>
              <Detail>
                <DetailIcon src="image/humidity.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>Humidity</DetailItem>
                  <DetailParams>{`${data?.humidity} %`}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/uvindex.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>UV Index</DetailItem>
                  <DetailParams>{data?.uvi}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/sunrise.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>Sunrise</DetailItem>
                  <DetailParams>{dayjs.unix(data?.sunrise).format('h:mm a')}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/sunset.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>Sunset</DetailItem>
                  <DetailParams>{dayjs.unix(data?.sunset).format('h:mm a')}</DetailParams>
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
                  <DetailParams>{`${data?.humidity} %`}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/uvindex.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>UV Index</DetailItem>
                  <DetailParams>{data?.uvi}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/moonrise.webp"></DetailIcon>
                <DetailContent>
                  <DetailItem>Moonrise</DetailItem>
                  <DetailParams>{dayjs.unix(data?.moonrise).format('h:mm a')}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/moonset.webp"></DetailIcon>
                <DetailContent>
                  <DetailItem>Moonset</DetailItem>
                  <DetailParams>{dayjs.unix(data?.moonset).format('h:mm a')}</DetailParams>
                </DetailContent>
              </Detail>
            </ListDetail>
          </TableRight>
        </WeekDetail>
      )}
    </div>
  );
}
