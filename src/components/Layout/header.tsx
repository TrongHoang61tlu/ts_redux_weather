import * as React from 'react';
import {
  Wrapper,
  Top,
  TopLeft,
  TopRight,
  Logo,
  Title,
  Search,
  Input,
  Button,
  ToggleButton,
  Bottom,
  ListItem,
  Item,
  Link,
} from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUnit } from 'features/weather/temperatureSlice';
import { RootState } from 'app/store';
import { fetchWeather } from 'features/weather/weatherSlice';
import { fetchCoordinates } from 'features/weather/coordinateSlice';

export interface IHeaderProps {}

interface ListItem {
  label: string;
  link: string;
}

interface List {
  [key: string]: ListItem;
}
export default function Header(props : IHeaderProps) {
  const [isActive, setIsActive] = React.useState(true);
  const [city, setCity] = React.useState('');
  const isCelsius = useSelector((state: any) => state.temperature.isCelsius);
  const weatherData = useSelector((state : RootState) => state.weather)
  const dispatch = useDispatch();
  const handleToggle = () => {
    setIsActive((isActive) => !isActive);
    dispatch(toggleUnit());
  };

  const [activeItem, setActiveItem] = React.useState(0);
  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };
  //Tạo list render navbar
  const List: List = {
    0: { label: 'Today', link: '/' },
    1: { label: 'Daily', link: '/daily' },
    2: { label: 'Monthly', link: '/month' },
  };
  const listKeys = Object.keys(List);
  const renderedList = listKeys.map((key) => {
    const listItem = List[key];
    return (
      <a href={listItem.link} key={key}>
        {listItem.label}
      </a>
    );
  });
  
  
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
          <ToggleButton className={!isActive ? 'active' : ''} isActive={isActive} onClick={handleToggle} id="buton">
          </ToggleButton>
          <span>{isCelsius ? '℃' : '℉'} </span>
          <span>🌙</span>
        </TopRight>
      </Top>
      <Bottom>
        <ListItem>
          {renderedList.map((item, index) => (
            <Link to={item?.props?.href} key={index}>
              <Item isActive={activeItem === index} onClick={() => handleItemClick(index)}>
                {item.props?.children}
              </Item>
            </Link>
          ))}
        </ListItem>
      </Bottom>
    </Wrapper>
  );
}
