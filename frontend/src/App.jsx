import router from './router'
import { RouterProvider } from "react-router-dom";
import { useEffect } from 'react';


function App() {

  useEffect(() => {
    const astronautData = {
      astronaut: 'Mahmoud',
      id: 'ASTRONAUT_SAME_001',
      weight: '70kg',
      sex: 'male',
    };

    localStorage.setItem('astronautData', JSON.stringify(astronautData));
  }, []);



  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
