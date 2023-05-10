import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { getAge } from "../util/getAge";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

export const options = {
  maintainAspectRatio: true,
  plugins: {
    title: {
      display: true,
    },
  },
  layout: {
    padding: {
      right: 50,
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      title: {
        display: true,
        text: "Age",
      },
    },
    y: {
      stacked: true,
      title: {
        display: true,
        text: "Number of users by gender",
      },
    },
  },
};

export default function ChartElement() {
  var rows = useSelector((state: RootState) => state.formSliceReducer.data);
  const dataSet = new Map();

  rows.forEach((e) => {
    if (dataSet.has(e.country))
      dataSet.set(e.country, dataSet.get(e.country) + 1);
    else dataSet.set(e.country, 0);
  });

  const labels = [...Array(101).keys()].slice(31, 41);

  const maleFiltered = rows.filter((row) => {
    let age = getAge(row.dob);
    if (age && age > 30 && row.gender === "Male") return true;
  });

  const femaleFiltered = rows.filter((row) => {
    let age = getAge(row.dob);
    if (age && age > 30 && row.gender === "Female") return true;
  });

  const maleDataSet = new Map();
  labels.forEach((e) => {
    maleDataSet.set(e, 0);
  });
  const femaleDataSet = new Map();
  labels.forEach((e) => {
    femaleDataSet.set(e, 0);
  });

  maleFiltered.forEach((e) => {
    maleDataSet.set(getAge(e.dob), maleDataSet.get(getAge(e.dob)) + 1);
  });
  femaleFiltered.forEach((e) => {
    femaleDataSet.set(getAge(e.dob), maleDataSet.get(getAge(e.dob)) + 1);
  });

  const doughnutData = {
    labels: Array.from(dataSet.keys()),
    datasets: [
      {
        label: "# of Users",
        data: Array.from(dataSet.values()),
        backgroundColor: [
          "rgba(255, 99, 132, 2)",
          "rgba(54, 162, 235, 2)",
          "rgba(255, 206, 86, 02)",
          "rgba(75, 192, 192, 02)",
          "rgba(153, 102, 255, 02)",
          "rgba(255, 159, 64, 02)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  const barGraphData = {
    labels,
    datasets: [
      {
        label: "Male ",
        data: Array.from(maleDataSet.values()),
        backgroundColor: "rgba(153, 102, 255, 1)",
        stack: "Stack 0",
      },
      {
        label: "Female",
        data: Array.from(femaleDataSet.values()),
        backgroundColor: "rgb(75, 192, 192)",
        stack: "Stack 0",
      },
    ],
  };

  return (
    <div className="p-4 flex h-screen w-full justify-around py-32 gap-4">
      <section className="flex  gap-5 font-semibold text-gray-600 flex-col items-center">
        <h1>Number of users by country</h1>
        <Doughnut
          options={{ maintainAspectRatio: true }}
          height="400px"
          width="400px"
          data={doughnutData}
        />
      </section>
      <section className="flex gap-5 font-semibold h-full text-gray-600 flex-col items-center">
        <h1>Number of users by gender</h1>
        <Bar
          height="400px"
          width="400px"
          options={options}
          data={barGraphData}
        />
      </section>
    </div>
  );
}
