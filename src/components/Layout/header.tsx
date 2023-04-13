import { RootState } from 'app/store';
import { toggleUnit } from 'features/weather/temperatureSlice';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bottom,
  Button,
  Input,
  Item,
  Link,
  ListItem,
  Logo,
  Search,
  Title,
  ToggleButton,
  Top,
  TopLeft,
  TopRight,
  Wrapper,
} from './styles';

export interface IHeaderProps {}

interface ListItemProps {
  label: string;
  link: string;
}

interface ListProps {
  [key: string]: ListItemProps;
}

const List: ListProps = {
  0: { label: 'Today', link: '/' },
  1: { label: 'Daily', link: '/daily' },
  2: { label: 'Monthly', link: '/month' },
};

const mappedList = Object.keys(List).map((key) => {
  const item = List[Number(key)];
  return {
    id: Number(key),
    label: item.label,
    link: item.link,
  };
});

export default function Header(props: IHeaderProps) {
  const [isActive, setIsActive] = React.useState(true);
  const [city, setCity] = React.useState('');
  const [activeItem, setActiveItem] = React.useState(0);
  const weatherData = useSelector((state: RootState) => state.weather);
  const isCelsius = useSelector((state: RootState) => state.temperature.isCelsius);
  const dispatch = useDispatch();
  const handleToggle = () => {
    setIsActive((isActive) => !isActive);
    dispatch(toggleUnit());
  };
  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  return (
    <Wrapper>
      <Top>
        <TopLeft>
          <Logo>Home</Logo>
          <Title>{`${weatherData?.data?.name}`}</Title>
        </TopLeft>
        <Search>
          <Input
            placeholder="Tìm kiếm"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Input>
          <Button>Tìm kiếm</Button>
        </Search>
        <TopRight>
          <ToggleButton   
            isActive={!isActive}
            onClick={handleToggle}
            id="buton"
          ></ToggleButton>
          <span>{isCelsius ? '℃' : '℉'} </span>
          <span>🌙</span>
        </TopRight>
      </Top>
      <Bottom>
        <ListItem>
          {mappedList?.map((item, index) => (
            <Link to={item?.link} key={index}>
              <Item isActive={activeItem === index} onClick={() => handleItemClick(index)}>
                {item?.label}
              </Item>
            </Link>
          ))}
        </ListItem>
      </Bottom>
    </Wrapper>
  );
};
