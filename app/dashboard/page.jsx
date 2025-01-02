import React from 'react';
import { Button } from '../../components/ui/button';
import CreateForm from './_components/CreateForm'
function Dashboard() {
  return (
    <div className='p-10 flex justify-between items-center'> 
      <h2 className='font-bold text-4xl'>Dashboard</h2>
      <CreateForm/>
      </div>
  )
}

export default Dashboard