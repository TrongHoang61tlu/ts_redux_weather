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
import { faker } from '@faker-js/faker';

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

const labels = ['15:00', '18:00', '21:00'];

export const data = {
  labels,
  datasets: [
    {
      fill: false,
      label: 'Nhiệt độ',
      data: labels.map(() => faker.datatype.number({ min: 24, max: 32 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      tension: 0.7,
    },
  ],
};

export interface ITodayProps {}

export default function Today(props: ITodayProps) {
  const [isActive, setIsActive] = React.useState(0)
  const handleItemClick = (index: number) => {
    setIsActive(index);
  };
  return (
    <Wrapper>
      <Banner>
        <BannerLeft>
          <BannerTitle>
            <Image src={require('../../../assets/image/th.png')} />
            <Temp>25.3℃</Temp>
          </BannerTitle>
          <BannerContent>
            <Items>Chance of precipitation: 0%</Items>
            <Items>Humidity: 80%</Items>
            <Items>Wind: 4.54 m/s</Items>
          </BannerContent>
        </BannerLeft>
        <BannerRight>
          <City>Hanoi , VN</City>
          <BannerContent>
            <Items>Population: 1,431,270</Items>
            <Items>April 4 </Items>
            <Items>partly cloudy</Items>
          </BannerContent>
        </BannerRight>
      </Banner>
      <Chart>
        <TitleChart>Temperature ℃</TitleChart>
        <Line options={options} data={data} />;
      </Chart>
      <Predict>
        <PredictItem isActive={isActive === 0} onClick={() => handleItemClick(0)}>
           <ItemMonth>April 4</ItemMonth>
           <Icon src={require('../../../assets/image/th.png')} ></Icon>
           <ItemMonth>25.3℃</ItemMonth>
           <ItemMonth>partly cloudy</ItemMonth>
        </PredictItem>
        <PredictItem isActive={isActive === 1} onClick={() => handleItemClick(1)}>
           <ItemMonth>April 4</ItemMonth>
           <Icon src={require('../../../assets/image/th.png')} ></Icon>
           <ItemMonth>25.3℃</ItemMonth>
           <ItemMonth>partly cloudy</ItemMonth>
        </PredictItem>
        <PredictItem isActive={isActive === 2} onClick={() => handleItemClick(2)}>
           <ItemMonth>April 4</ItemMonth>
           <Icon src={require('../../../assets/image/th.png')} ></Icon>
           <ItemMonth>25.3℃</ItemMonth>
           <ItemMonth>partly cloudy</ItemMonth>
        </PredictItem>
        <PredictItem isActive={isActive === 3} onClick={() => handleItemClick(3)}>
           <ItemMonth>April 4</ItemMonth>
           <Icon src={require('../../../assets/image/th.png')} ></Icon>
           <ItemMonth>25.3℃</ItemMonth>
           <ItemMonth>partly cloudy</ItemMonth>
        </PredictItem>
        <PredictItem isActive={isActive === 4} onClick={() => handleItemClick(4)}>
           <ItemMonth>April 4</ItemMonth>
           <Icon src={require('../../../assets/image/th.png')} ></Icon>
           <ItemMonth>25.3℃</ItemMonth>
           <ItemMonth>partly cloudy</ItemMonth>
        </PredictItem>
        <PredictItem isActive={isActive === 5} onClick={() => handleItemClick(5)}>
           <ItemMonth>April 4</ItemMonth>
           <Icon src={require('../../../assets/image/th.png')} ></Icon>
           <ItemMonth>25.3℃</ItemMonth>
           <ItemMonth>partly cloudy</ItemMonth>
        </PredictItem>
      </Predict>

    </Wrapper>
  );
}
