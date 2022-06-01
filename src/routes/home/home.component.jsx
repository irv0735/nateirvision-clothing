import Directory from '../../components/directory/directory.component';

import { Outlet } from 'react-router-dom';

const Home = () => (
    <>
      <Directory />
      <Outlet />
    </>
);

export default Home;