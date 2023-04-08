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

export interface IHeaderProps {}
export default function Header(props: IHeaderProps) {
  const [isActive, setIsActive] = React.useState(true);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const [activeItem, setActiveItem] = React.useState(0);
  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };
  return (
    <Wrapper>
      <Top>
        <TopLeft>
          <Logo>Home</Logo>
          <Title>Hanoi</Title>
        </TopLeft>
        <Search>
          <Input placeholder="Tìm kiếm"></Input>
          <Button>Tìm kiếm</Button>
        </Search>
        <TopRight>
          <ToggleButton isActive={isActive} onClick={handleToggle}>
            {isActive ? 'ON' : 'OFF'}
          </ToggleButton>
          <span>℃</span>
          <span>🌙</span>
        </TopRight>
      </Top>
      <Bottom>
        <ListItem>
          <Link to="/">
            {' '}
            <Item isActive={activeItem === 0} onClick={() => handleItemClick(0)}>
              Today
            </Item>
          </Link>
          <Link to="/daily">
            {' '}
            <Item isActive={activeItem === 1} onClick={() => handleItemClick(1)}>
              Daily
            </Item>
          </Link>
          <Link to="/month">
            {' '}
            <Item isActive={activeItem === 2} onClick={() => handleItemClick(2)}>
              Monthly
            </Item>
          </Link>
        </ListItem>
      </Bottom>
    </Wrapper>
  );
}
