import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
      
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 5, 
    },
    x: {
      beginAtZero: true,
      min: 0,
      max: 5,
      ticks: {
        stepSize: 1,
        autoSkip: false
      }
    }
  }
};


const hazard_curve_dic: {[key:string]:Array<number>} = {
  'H1': [0.3, 0.15, 1.0, 2, 0.3],
  'H2': [0.5, 0.30, 1.2, 2, 0.6],
  'H3': [1.2, 0.30, 0.5, 2, 0.6],
  'H4': [2.0, 0.50, 0.5, 2, 1.0],
  'H5': [4.0, 1.00, 1.0, 4, 4.0],
  'H6': [6, 6, 6, 6, 36],
  // hazard_classification: function(key:string) {}
}

function hazard_classification(key:string): {[key:string]:number}[] {
  let d_list_curve: Array<number> = []
  let v_list_curve: Array<number> = []

  let [d_line_1, d_line_2, v_line_1, v_line_2, numerator] :number[] = hazard_curve_dic[key];
  let d_list:Array<number> = [];
  // for (var i = 0; i < d_line_1 + 0.01; i+=0.01) {}
  let i:number = 0;
  while (i < d_line_1 - 0.01) {
    Math.round((i += 0.01) * 100 / 100);
    d_list.push(Math.round(i * 100) / 100);
  }
  if (key === "H5") {console.log(d_list, d_list.length)}
  for (let i of d_list) {
    // console.log(i == d_line_1)
    if (i === d_line_1) {
      d_list_curve.push(i);
      d_list_curve.push(i);
      v_list_curve.push(v_line_1);
      v_list_curve.push(0);
    } else if (i < d_line_2) {
      d_list_curve.push(i);
      v_list_curve.push(v_line_2)
    } else {
      d_list_curve.push(i)
      v_list_curve.push(numerator/i)
    }
  }
  if (v_list_curve.indexOf(-1) !== 0) {
    v_list_curve.push(0)
    d_list_curve.push(d_line_1)
  }
  

  const lineArray = v_list_curve.map((xvalue, index) => {
    let lineObject:{[key:string]: number} = {};
    lineObject["x"]= xvalue;
    lineObject["y"] = d_list_curve[index];
    return lineObject
  });

  return lineArray
}


// const labels = ['0', '1', '2', '3', '4', '5'];

export const data = {
  type:"scatter",
  labels:  [0,1,2,3,4,5],
  datasets: [
    {
      label: "H1",
      data: hazard_classification("H1"),
      fill:true,
      showLine:true,
      backgroundColor: 'blue',
      pointRadius:0,
      pointHoverRadius:0
    }, 
    {
      label: "H2",
      data: hazard_classification("H2"),
      fill:true,
      showLine:true,
      backgroundColor: 'lightblue',
      pointRadius:0,
      pointHoverRadius:0
    },
    {
      label: "H3",
      data: hazard_classification("H3"),
      fill:true,
      showLine:true,
      backgroundColor: 'green',
      pointRadius:0,
      pointHoverRadius:0
    },
    {
      label: "H4",
      data: hazard_classification("H4"),
      fill:true,
      showLine:true,
      backgroundColor: 'lime',
      pointRadius:0,
      pointHoverRadius:0
    },
    {
      label: "H5",
      data: hazard_classification("H5"),
      fill:true,
      showLine:true,
      backgroundColor: 'yellow',
      pointRadius:0,
      pointHoverRadius:0
    },
    {
      label: "H6",
      data: hazard_classification("H6"),
      fill:true,
      showLine:true,
      backgroundColor: 'pink',
      pointRadius:0,
      pointHoverRadius:0
    },
      
  ],
};

function App() {
  console.log(hazard_classification("H1"))
  // console.log("1")
  return (
    <div className='App'>
      <h1>Doughnut Chart</h1>
        <Scatter options={options} data={data} />
    </div>
  )
}

export default App;
