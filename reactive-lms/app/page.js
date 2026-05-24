'use client'
import { Button } from '@/components/ui/button';
import React from 'react';
import { toast } from 'sonner';

const page = () => {
  const handleClick = (mode)=>{
    mode ? toast.success("Test success!"): toast.error("Test error!")
  }
  return (
    <div>
      <Button variant='destructive' className="font-bold" onClick={()=>handleClick(0)}>Hello World</Button>
    </div>
  );
};

export default page;