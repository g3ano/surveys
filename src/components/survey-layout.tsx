import SurveyDataProvider from '@/hooks/useSurveyData';
import { Outlet } from 'react-router-dom';

export default function SurveyLayout() {
  return (
    <>
      <SurveyDataProvider>
        <Outlet />
      </SurveyDataProvider>
    </>
  );
}
