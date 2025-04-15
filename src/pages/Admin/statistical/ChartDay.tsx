/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import axios from "axios";
import { useMemo, useState } from "react";
import { Line } from "react-chartjs-2";

const ChartDay = () => {
  const [day, setDay] = useState(7);
  const [dataChart, setDataChart] = useState([]);
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", { orderDate_gte: day }],
    queryFn: async () => {
      const daysAgo = new Date(Date.now() - day * 24 * 60 * 60 * 1000);
      const formattedDate = daysAgo.toISOString().split("T")[0]; // "2025-04-06"
      const params = {
        statusPayment: true,
        orderDate_gte: formattedDate,
      };

      const { data } = await axios.get(`http://localhost:3000/orders`, {
        params,
      });
      return data;
    },
  });

  useMemo(() => {
    if (!orders) return [];
    const result: any = [];

    for (let i = day - 1; i >= 0; i--) {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() - i);

      const dateStr = dateObj.toISOString().split("T")[0];

      const dailyRevenue = orders
        .filter((order: any) => {
          const orderDate = new Date(order.orderDate)
            .toISOString()
            .split("T")[0];
          return orderDate === dateStr;
        })
        .reduce((sum: any, order: any) => sum + order.total, 0);

      result.push({
        date: dateStr,
        revenue: dailyRevenue,
      });
    }

    setDataChart(result);

    // console.log(result);
  }, [orders, day]);

  const onChangeDay = (value: any) => {
    setDay(value);
  };

  if (isLoading) return <div>Loading</div>;

  const chartData = {
    labels: dataChart.map((item: any) => item.date),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: dataChart.map((item: any) => item.revenue),
        borderColor: "#1677ff",
        backgroundColor: "#1677ff55",
        tension: 0.3, // độ cong của line
        fill: true, // nếu
        pointRadius: 5, //
        pointHoverRadius: 10, //
        // backgroundColor: "#1677ff",
        // borderRadius: 3,
        // barThickness: 40,
      },
    ],
  };

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            context.dataset.label +
            ": " +
            context.formattedValue.toLocaleString("vi-VN") +
            " VND",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 45, // xoay nhãn để không bị đè nhau
          minRotation: 30,
        },
      },
      y: {
        ticks: {
          callback: function (value: number | string) {
            return value.toLocaleString("vi-VN") + " VND";
          },
        },
      },
    },
  };

  return (
    <div>
      <h1 className="text-center font-semibold text-3xl mb-3">
        Doanh thu theo ngày
      </h1>
      <div className="flex items-center gap-2 mb-5">
        <h1 className="text-xl font-medium">Ngày:</h1>
        <Select
          // allowClear
          placeholder="Lọc theo mức độ ưu tiên"
          defaultValue={`${day}`}
          onChange={(value) => {
            onChangeDay(value);
          }}
          style={{ width: 200 }}
        >
          <Select.Option value="7">7 ngày gần nhất</Select.Option>
          <Select.Option value="21">21 ngày gần nhất</Select.Option>
        </Select>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};
export default ChartDay;
