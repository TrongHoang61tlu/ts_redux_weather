import styled from 'styled-components';

interface PredictItemsProps {
  isActive: boolean;
}

export const Wrapper = styled.section`
  margin-top: 150px;
`;

export const Banner = styled.div`
  width: 90%;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  margin: 0 auto;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  text-shadow: 0 0 5px #17243280;
`;

export const BannerLeft = styled.div``;

export const BannerRight = styled.div``;

export const BannerTitle = styled.h1`
  display: flex;
  align-items: center;
`;

export const Image = styled.img`
  width: 100px;
  height: 100%;
`;
export const Temp = styled.div`
  font-size: 4rem;
  margin: 0 0 0 30px;
`;
export const BannerContent = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const Items = styled.li`
  display: flex;
`;

export const City = styled.h1`
  font-weight: 700;
`;

export const Chart = styled.div`
  width: 90%;
  margin: 40px auto;
  padding: 18px;
  background: white;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const TitleChart = styled.h3`
  font-size: 2rem;
`;

export const Predict = styled.div`
  width: 90%;
  margin: 80px auto;
  padding: 18px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;

export const PredictItem = styled.div<PredictItemsProps>`
  background-color: ${(props) => (props.isActive ? 'white' : 'rgba(192, 192, 192, 0.5)')};
  cursor: pointer;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const ItemMonth = styled.p`
  font-size: 1.3rem;
  display: flex;
  justify-content: center;
  color: rgba(0, 0, 0, 0.5);
`;

export const Icon = styled.img`
  width: 25px;
  height: 20px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
