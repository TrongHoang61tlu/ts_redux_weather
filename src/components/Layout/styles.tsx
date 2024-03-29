import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface ToggleButtonProps {
  isActive: boolean;
}

interface ItemProps {
  isActive: boolean;
}

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
  background-color: #1d5d75;
`;

export const TopLeft = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
export const Logo = styled.h1`
  font-size: 40px;
  font-weight: 400;
`;
export const Title = styled.h3`
  color: black;
  font-size: 32px;
  font-weight: 700;
  margin-top: 50px;
  margin-left: 10px;
`;

export const Search = styled.div`
  width: 500px;
  height: 36px;
  display: flex;
  padding: 10px;
  padding-bottom: 0;
`;

export const Button = styled.button`
  width: 100px;
  height: 100%;
  background-color: white;
  cursor: pointer;
  border: 2px solid #cccccc ;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  :hover{
    background-color: #cccccc;
  }

  }
`;

export const Input = styled.input`
  width: 70%;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 25px;
  height: 28px;
  border: 2px solid #cccccc;
  padding : 2px;
  padding-left: 15px;
  &:focus {
    outline: none;
  }
`;

export const TopRight = styled.div`
  display: flex;
  width: 210px;
  font-size: 25px;
  justify-content: space-around;
`;
export const TempChange = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleButton = styled.button<ToggleButtonProps>`
  width: 50px;
  height: 30px;
  background-color: ${(props) => (props.isActive ? '#cccc' : 'white')};
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  border: none;

  &:before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background-color: #cccccc;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    border: none;
    left: ${(props) => (props.isActive ? 'calc(100% - 20px - 2px)' : '2px')};
    transform: translateY(-50%);
    transition: left 0.3s ease-in-out;
  }
`;

export const DayNight = styled.span`
  cursor: pointer;
`;

export const Bottom = styled.div`
  background: #0006;
  height: 50px;
  margin-top: 0;
`;
export const ListItem = styled.ul`
  list-style-type: none;
  display: flex;
  color: white;
  align-items: center;
  margin-top: 0;
`;

export const Item = styled.li<ItemProps>`
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
  margin-right: 10px;
  padding: 13px;
  border-bottom: ${(props) => (props.isActive ? '2px solid white' : 'none')};
`;
export const Link = styled(NavLink)`
  text-decoration: none;
  color: white;
`;

export const Error = styled.span`
  margin-top: 0px;
  padding-left :10px;
  color: white;
`