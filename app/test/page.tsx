"use client"

import { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import ColorPicker from '@/components/ui/color-picker';

const data = [{ name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
{ name: 'Page A', uv: 500, pv: 2400, amt: 2400 },
{ name: 'Page A', uv: 600, pv: 2400, amt: 2400 },
{ name: 'Page A', uv: 700, pv: 2400, amt: 2400 }
];

export default function Component() {
  const [lineColor, setLineColor] = useState('#8884d8');

  return (
    <div>
      <div className="space-y-4 mb-8">
        <h1 className="text-2xl font-semibold">Line Settings</h1>
        <div>
          {/* <Label>Line Color</Label> */}
          <ColorPicker onChange={setLineColor} />
        </div>
      </div>
      <LineChart width={600} height={300} data={data}>
        <Line isAnimationActive={false} type="monotone" dataKey="uv" stroke={lineColor} />
        {/* <CartesianGrid stroke="#ccc" /> */}
        {/* <XAxis dataKey="name" /> */}
        {/* <YAxis /> */}
      </LineChart>
    </div>
  )
}
