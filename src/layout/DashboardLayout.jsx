import React from 'react'
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className='flex flex-row items-start'>
        <Sidebar/>
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout;