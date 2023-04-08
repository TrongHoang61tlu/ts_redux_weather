import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


export const Wrapper = styled.section`
`;
export const Top = styled.section`
  height: 75px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
`;

export const TopLeft = styled.div`
  display: flex;
  margin-bottom:10px;
`;
export const Logo = styled.h1`
  font-size: 40px;
  font-weight: 400;
`;
export const Title = styled.h3`
  color: #b55620;
  font-size: 32px;
  font-weight: 700;
  margin-top: 50px;
  margin-left: 10px;
`;

export const Search = styled.div`
  width: 700px;
  height: 36px;
`;

export const Button = styled.button`
  width: 100px;
  height: 100%;
  background-color: dimgray;
  cursor: pointer;
  border: none;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
`;

export const Input = styled.input`
  width: 500px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 25px;
  height: 30px;
  border : 2px solid #cccccc;
`;

export const TopRight = styled.div`
  display: flex;
  width: 210px;
  font-size: 25px;
  justify-content: space-between;
`;
interface ToggleButtonProps{
  isActive : boolean;
}
export const ToggleButton = styled.button<ToggleButtonProps>`
  background-color: ${props => (props.isActive ? 'red' : 'blue')};
  width:80px;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 30px;
`;

export const Bottom = styled.div`
  background-color:#9E979F;
  height: 50px;
`
export const ListItem = styled.ul`
  list-style-type: none;
  display: flex;
  color: white;
  align-items : center;
`
interface ItemProps {
  isActive: boolean;
}
export const Item = styled.li<ItemProps>`
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
  margin-right: 10px;
  padding: 13px;
  border-bottom: ${props => (props.isActive ? '2px solid white' : 'none')};
`
export const Link = styled(NavLink)`
  text-decoration: none;
  color: white;
`