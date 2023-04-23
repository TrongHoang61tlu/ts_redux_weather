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
  WindTitle,
} from './styles';
import { convertCelsiusToFahrenheit } from 'components/format';
import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';

export interface IHourlyItemProps {
  data: Hour;
  openAll: boolean;
}

export default function HourlyItem({ data, openAll }: IHourlyItemProps) {
  const [expandedTime, setExpandedTime] = React.useState<boolean>(false);
  const isCelsius = useAppSelector((state : RootState) => state.temperature.isCelsius )

  // Hàm xử lý sự kiện click vào giờ
  const handleDayClick = (dt: number) => {
    setExpandedTime((expandedTime) => !expandedTime);
  };
  // Hàm xử lý sự kiện click đóng mở tất cả các giờ
  React.useEffect(() => {
    setExpandedTime(openAll);
  }, [openAll]);

  const detailItems = [
    { icon: "image/feels_like.jpg", label: "Feels_like", value: `${data?.feels_like}°` },
    { icon: "image/wind.jpg", label: "Wind", value: data?.wind_speed },
    { icon: "image/humidity.jpg", label: "Humidity", value: `${data?.humidity}%` },
    { icon: "image/uvindex.jpg", label: "UV Index", value: data?.uvi },
    { icon: "image/cloud.jpg", label: "Cloud Cover", value: data?.clouds },
    { icon: "image/pressure.jpg", label: "Pressure", value: `${data?.pressure}hPa` },
  ];
  
  return (
    <div>
      <div onClick={() => handleDayClick(data?.dt)}>
        <WeekItems>
          <Left>
            <Date>{dayjs.unix(data?.dt).format('h a')}</Date>
            <Temp>
              <TempDay>{convertCelsiusToFahrenheit(isCelsius,data?.temp, false)}</TempDay>
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
              {detailItems.map((item) => (
              <Detail key={item?.label}>
                <DetailIcon src={item?.icon}></DetailIcon>
                <DetailContent>
                  <DetailItem>{item?.label}</DetailItem>
                  <DetailParams>{item?.value}</DetailParams>
                </DetailContent>
              </Detail>
              ))}
            </ListDetail>
          </Table>
        )}
      </div>
    </div>
  );
}
