import styled from 'styled-components';

export const Wrapper = styled.div`
  background: white;
  width: 90%;
  margin: auto;
  margin-top: 150px;
  border-radius: 6px;
  margin-bottom: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

export const Top = styled.div`
  padding: 16px 26px 6px !important;
`;
export const Main = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  line-height: 1.08em;
`;

export const City = styled.p`
  font-size: 1rem;
  padding-left: 4px;
`;

export const Time = styled.p`
  font-size: 1rem;
  opacity: 0.65;
  margin-top: 0;
`;

export const ThisWeek = styled.div`
  padding: 16px 26px 6px !important;
`;

export const ThisWeekTitle = styled.h3`
  margin: 0;
`;

export const Week = styled.div``;

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

export const Right = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
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

export const Updown = styled.div`
  width: 33%;
  display: flex;
  justify-content: end;
`;

export const WeekDetail = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 10px;
  width: 100%;
`;

export const Day = styled.div``;

export const DayTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1em;
  min-height: 1em;
`;

export const DayMain = styled.div`
  display: flex;
  align-items: center;
`;

export const DayTemp = styled.span`
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
`;

export const DayProperties = styled.div`
  margin-left: auto;
`;

export const Content = styled.p`
  margin-bottom: 0;
`;

export const Night = styled.div``;

export const TableLeft = styled.div``;

export const ListDetail = styled.ul`
  list-style: none;
  border: 1px solid #dedede;
  border-radius: 6px;
  margin: 0;
  padding-right: 40px;
  line-height: 1.5;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 0px;
`;

export const Detail = styled.li`
  width: 100%;
  display: flex;
  &:nth-last-child(1),
  &:nth-last-child(2) {
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

export const TableRight = styled.div`

`;
