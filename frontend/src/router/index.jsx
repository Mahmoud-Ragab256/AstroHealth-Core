import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';
import MainLayout from '../layout/';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />

        <Route path="dashboard" element={<div>Dashboard Page</div>} />
        <Route path="radiation-test" element={<div>Radiation Test Page</div>} />

        <Route path="emergency">
          <Route path="measurements" element={<div>Measurements Page</div>} />
          <Route path="videos" element={<div>Videos Page</div>} />
        </Route>

        <Route path="psychological">
          <Route path="schedule" element={<div>Daily Schedule Page</div>} />
          <Route path="assessment" element={<div>Psychological Assessment Page</div>} />
          <Route path="puzzles" element={<div>Puzzles Page</div>} />
        </Route>

        <Route path="gravity">
          <Route path="assessment" element={<div>Gravity Assessment Page</div>} />
          <Route path="exercises" element={<div>Exercises Page</div>} />
        </Route>

        <Route path="nutrition" element={<div>Nutrition Page</div>} />
        <Route path="respiration" element={<div>Respiration Page</div>} />
        <Route path="reports" element={<div>History & Reports Page</div>} />
      </Route>
    </>
  )
);

export default router;