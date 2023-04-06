import * as React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.section`
`;
const Top = styled.section`
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;

const TopLeft = styled.div`
  display: flex;
`;
const Logo = styled.h1`
  font-size: 40px;
  font-weight: 400;
`;
const Title = styled.h3`
  color: #b55620;
  font-size: 32px;
  font-weight: 700;
  margin-top: 50px;
  margin-left: 10px;
`;

const Search = styled.div`
  width: 700px;
  height: 30px;
`;

const Button = styled.button`
  width: 100px;
  height: 100%;
  background-color: #cccccc;
  cursor: pointer;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
`;

const Input = styled.input`
  width: 500px;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  height: 24px;
`;

const TopRight = styled.div`
  display: flex;
  width: 210px;
  font-size: 32px;
  justify-content: space-between;
`;

const ToggleButton = styled.button`
  background-color: red;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 50%;
`;

const Bottom = styled.div`
  background-color:#9E979F;
  height: 50px;
`
const ListItem = styled.ul`
  list-style-type: none;
  display: flex;
  color: white;
  display: flex;
  align-items : center;
`
const Item = styled.li`
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
  margin-right: 10px;
  padding: 13px;
  border-bottom: 1px solid #fffff' 
`
const Link = styled(NavLink)`
  text-decoration: none;
  color: white;
`
export interface IHeaderProps {}
export default function Header(props: IHeaderProps) {
  const [active, setActive] = React.useState(false);

  const handleToggle = () => {
    setActive(!active);
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
          <ToggleButton onClick={handleToggle}>{active ? 'ON' : 'OFF'}</ToggleButton>
          <span>℃</span>
          <span>🌙</span>
        </TopRight>
      </Top>
      <Bottom>
          <ListItem>
            <Item><Link to="/">Today</Link></Item>
            <Item><Link to="/daily">Daily</Link></Item>
            <Item><Link to='/Month'>Monthly</Link></Item>
          </ListItem>
      </Bottom>
    </Wrapper>
  );
}
