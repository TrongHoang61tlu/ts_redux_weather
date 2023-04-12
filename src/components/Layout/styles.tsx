import styled from 'styled-components';
import { NavLink } from 'react-router-dom';


export const Wrapper = styled.section`
  width: 100%;
  position: fixed;
  top: 0;
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
  width: 70%;
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
  width: 50px;
  height: 30px;
  background-color: #fff;
  border-radius: 15px;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    width: 20px;
    height: 20px;
    background-color: #cccccc;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    transition: left 0.3s ease-in-out;
  }

  &.active:before {
    background-color: red;
    left: calc(100% - 20px - 2px);
  }
`;

export const Bottom = styled.div`
  background-color:#9E979F;
  height: 50px;
  margin-top: 0;
`
export const ListItem = styled.ul`
  list-style-type: none;
  display: flex;
  color: white;
  align-items : center;
  margin-top:0;
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