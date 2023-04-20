import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { convertDegreesToWindDirection, iconUrlFromcode } from 'components/format';
import dayjs from 'dayjs';
import { Hour } from 'features/weather/coordinateSlice';
import React from 'react';
import {
    Date,
    Detail,
    DetailContent,
    DetailIcon,
    DetailItem,
    DetailParams,
    Left,
    ListDetail,
    Precipitation,
    PrecipitationImg,
    PrecipitationTitle,
    Right,
    Status,
    StatusImg,
    StatusTitle,
    Table,
    Temp,
    TempDay,
    Updown,
    WeekItems,
    Wind,
    WindImg,
    WindTitle
} from './styles';

export interface IHourlyItemProps {
  data: Hour;
  openAll: boolean;
}

export default function HourlyItem({ data, openAll }: IHourlyItemProps) {
  const isCelsius = useAppSelector((state: RootState) => state.temperature.isCelsius);
  const [expandedTime, setExpandedTime] = React.useState<boolean>(false);

  //Hàm chuyển đổi C <-> F
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

  // Hàm xử lý sự kiện click vào giờ
  const handleDayClick = (dt: number) => {
    setExpandedTime((expandedTime) => !expandedTime);
  };
  // Hàm xử lý sự kiện click đóng mở tất cả các giờ
  React.useEffect(() => {
    setExpandedTime(openAll);
  }, [openAll]);

  return (
    <div>
      <div onClick={() => handleDayClick(data?.dt)}>
        <WeekItems>
          <Left>
            <Date>{dayjs.unix(data?.dt).format('h a')}</Date>
            <Temp>
              <TempDay>{convertCelsiusToFahrenheit(data?.temp, false)}</TempDay>
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
            <Updown>{expandedTime ? '▲' : '▼'}</Updown>
          </Right>
        </WeekItems>
      </div>
      <div>
        {expandedTime && (
          <Table>
            <ListDetail>
              <Detail>
                <DetailIcon src="image/feels_like.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>Feels_like</DetailItem>
                  <DetailParams>{`${data?.feels_like}°`}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/wind.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>Wind</DetailItem>
                  <DetailParams>{data?.wind_speed}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/humidity.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>Humidity</DetailItem>
                  <DetailParams>{`${data?.humidity}%`}</DetailParams>
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
                <DetailIcon src="image/cloud.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>Cloud Cover</DetailItem>
                  <DetailParams>{data?.clouds}</DetailParams>
                </DetailContent>
              </Detail>
              <Detail>
                <DetailIcon src="image/pressure.jpg"></DetailIcon>
                <DetailContent>
                  <DetailItem>Pressure</DetailItem>
                  <DetailParams>{`${data?.pressure}hPa`}</DetailParams>
                </DetailContent>
              </Detail>
            </ListDetail>
          </Table>
        )}
      </div>
    </div>
  );
}
