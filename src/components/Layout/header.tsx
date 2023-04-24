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
  Error,
} from './styles';
import { setSearchText } from 'features/weather/searchSlice';

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
  2: { label: 'Hourly', link: '/hour' },
};

export default function Header(props: IHeaderProps) {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState('0');
  const weatherData = useSelector((state: RootState) => state.weather);
  const isCelsius = useSelector((state: RootState) => state.temperature.isCelsius);
  const [city, setCity] = React.useState('');

  const handleSearchClick = () => {
    dispatch(setSearchText(city));
    setCity('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

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
        <div>
          <Search>
            <Input
              placeholder="Tìm kiếm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            ></Input>
            <Button onClick={handleSearchClick}>Tìm kiếm</Button>
          </Search>
          {weatherData.searchError && <Error>{weatherData.searchError}</Error>}
        </div>
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
              <Item isActive={activeItem === item} onClick={() => handleItemClick(item)}>
                {List[item].label}
              </Item>
            </Link>
          ))}
        </ListItem>
      </Bottom>
    </Wrapper>
  );
}
