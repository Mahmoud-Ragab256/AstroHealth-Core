import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import MainLayout from '../layouts';
import EmergencyLayout from '../layouts/EmergencyLayout';
import PsychologicalLayout from '../layouts/PsychologicalLayout';
import GravityLayout from '../layouts/GravityLayout';
import NutritionLayout from '../layouts/Nutrition-Respiration';
import Dashboard from '../pages/Dashboard';
import RadiationTest from '../pages/RadiationTest';
import EmergencyMeasurements from '../pages/Emergency/Measurements';
import EmergencyVideos from '../pages/Emergency/Videos';
import DailySchedule from '../pages/Psychological/DailySchedule';
import PsychologicalAssessment from '../pages/Psychological/Assessment';
import PsychologicalPuzzles from '../pages/Psychological/Puzzles';
import GravityAssessment from '../pages/Gravity/Assessment';
import GravityExercises from '../pages/Gravity/Exercises';
import NutritionAssessment from '../pages/Nutrition-Respiration/NutritionAssessment';
import NutritionRespiration from '../pages/Nutrition-Respiration/NutritionRespiration';
import HistoryReports from '../pages/HistoryReports';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="radiation-test" element={<RadiationTest />} />

        <Route path="emergency" element={<EmergencyLayout />}>
          <Route index element={<Navigate to="measurements" replace />} />
          <Route path="measurements" element={<EmergencyMeasurements />} />
          <Route path="videos" element={<EmergencyVideos />} />
        </Route>

        <Route path="psychological" element={<PsychologicalLayout />}>
          <Route index element={<Navigate to="schedule" replace />} />
          <Route path="schedule" element={<DailySchedule />} />
          <Route path="assessment" element={<PsychologicalAssessment />} />
          <Route path="puzzles" element={<PsychologicalPuzzles />} />
        </Route>

        <Route path="gravity" element={<GravityLayout />}>
          <Route index element={<Navigate to="assessment" replace />} />
          <Route path="assessment" element={<GravityAssessment />} />
          <Route path="exercises" element={<GravityExercises />} />
        </Route>

        <Route path="nutrition" element={<NutritionLayout />}>
          <Route index element={<Navigate to="assessment" replace />} />
          <Route path="assessment" element={<NutritionAssessment />} />
          <Route path="respiration" element={<NutritionRespiration />} />
        </Route>

        <Route path="reports" element={<HistoryReports />} />
      </Route>
    </>
  )
);

export default router;