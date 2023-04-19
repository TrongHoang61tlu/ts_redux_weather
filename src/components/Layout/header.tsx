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
  TempChange,
  Title,
  ToggleButton,
  Top,
  TopLeft,
  TopRight,
  Wrapper,
  DayNight,
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

export default function Header(props: IHeaderProps) {
  const [isActive, setIsActive] = React.useState(false);
  const [city, setCity] = React.useState('');
  const [activeItem, setActiveItem] = React.useState('0');
  const weatherData = useSelector((state: RootState) => state.weather);
  const isCelsius = useSelector((state: RootState) => state.temperature.isCelsius);
  const dispatch = useDispatch();
  const handleToggle = () => {
    setIsActive((isActive) => !isActive);
    dispatch(toggleUnit());
  };
  const handleItemClick = (key: string) => {
    setActiveItem(key);
  };

  return (
    <Wrapper>
      <Top>
        <TopLeft>
          <Logo>Home</Logo>
          <Title>{weatherData?.data?.name}</Title>
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
          <TempChange>
            <ToggleButton isActive={isActive} onClick={handleToggle} id="buton"></ToggleButton>
            <span>{isCelsius ? '℃' : '℉'} </span>
          </TempChange>
          <DayNight>🌙</DayNight>
        </TopRight>
      </Top>
      <Bottom>
        <ListItem>
          {Object.keys(List).map((item, index) => (
            <Link to={List[item].link} key={item}>
              <Item
                isActive={activeItem === item}
                onClick={() => handleItemClick(item)}
              >
                {List[item].label}
              </Item>
            </Link>
          ))}
        </ListItem>
      </Bottom>
    </Wrapper>
  );
}
