import styled from "styled-components";

export const WeekItems = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  color: #2b2b2b;
  border-top: 1px solid #dedede;
`;


export const Left = styled.div`
  display: flex;
  width: 40%;
  align-items: center;
`;

export const Date = styled.h3`
  font-size: 0.875rem !important;
  font-weight: 400;
  width: 33%;
`;

export const Temp = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
`;

export const TempDay = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
`;

export const TempNight = styled.span`
  font-size: 0.875rem;
`;

export const Status = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatusImg = styled.img``;

export const StatusTitle = styled.span`
  padding-left: 13px;
  font-size: 0.875rem;
`;

export const Right = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
  align-items: center;
`;

export const Precipitation = styled.div`
  width: 33%;
  display: flex;
  align-items: center;
`;

export const PrecipitationImg = styled.img`
  width: 20px;
`;

export const PrecipitationTitle = styled.span`
  padding-left: 13px;
  font-size: 0.875rem;
`;

export const Wind = styled.div`
  display: flex;
  align-items: center;
`;

export const WindImg = styled.img`
  width: 30px;
`;

export const WindTitle = styled.span`
  padding-left: 2px;
  font-size: 0.875rem;
`;

export const Updown = styled.div`
  width: 33%;
  display: flex;
  justify-content: end;
`;

export const Table = styled.div``;

export const ListDetail = styled.ul`
  list-style: none;
  border: 1px solid #dedede;
  border-radius: 6px;
  margin: 0;
  padding-right: 40px;
  line-height: 1.5;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0px;
`;

export const Detail = styled.li`
  width: 100%;
  display: flex;
  &:nth-last-child(1),
  &:nth-last-child(2),
  &:nth-last-child(3) {
    border-top: 1px solid #dedede !important;
  }
  align-items: center;
  padding: 20px 0;
`;

export const DetailIcon = styled.img`
  width: 20px;
  padding-right: 10px;
`;

export const DetailContent = styled.div`
  display: block;
`;

export const DetailItem = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.2;
`;

export const DetailParams = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
`;
