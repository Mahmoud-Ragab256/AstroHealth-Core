import router from './router';
import { RouterProvider } from "react-router-dom";
import { useEffect } from 'react';
import { initializeAstronautProfile } from './data/astronautProfile';

export default function App() {
  useEffect(initializeAstronautProfile, []);
  return <RouterProvider router={router} />;
}
