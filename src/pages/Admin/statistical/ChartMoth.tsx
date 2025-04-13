/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
import { Select } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartMonth = () => {
  const [year, setYear] = useState(2025);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", { orderDate_like: year }],
    queryFn: async () => {
      const params = {
        statusPayment: true,
        orderDate_like: year,
      };

      const { data } = await axios.get(`http://localhost:3000/orders`, {
        params,
      });
      // console.log(data);
      return data;
    },
  });

  // console.log(orders);
  if (isLoading) return <div>Loading</div>;

  const filteredOrders = orders.reduce((acc: any, order: any) => {
    // Lấy tháng từ orderDate
    const date = new Date(order.orderDate);
    const month = date.toLocaleString("default", { month: "short" }); // chỉ lấy tháng
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month] += order.totalPrice;
    return acc;
  }, {});

  // Chuyển đổi kết quả sang mảng dạng { month, revenue }
  const data = months.map((month) => ({
    month,
    revenue: filteredOrders[month] || 0,
  }));

  const chartData = {
    labels: data.map((item) => item.month),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: data.map((item) => item.revenue),
        backgroundColor: "#1677ff",
        borderRadius: 3,
        barThickness: 40,
      },
    ],
  };

  const options = {
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
        Doanh thu theo tháng
      </h1>
      <div className="flex items-center gap-2 mb-5">
        <h1 className="text-xl font-medium">Năm:</h1>
        <Select
          // allowClear
          placeholder="Lọc theo mức độ ưu tiên"
          // defaultValue={2025}
          value={year}
          onChange={(value) => {
            setYear(value);
          }}
          style={{ width: 200 }}
        >
          <Select.Option value="2025">2025</Select.Option>
          <Select.Option value="2024">2024</Select.Option>
          <Select.Option value="2023">2023</Select.Option>
        </Select>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ChartMonth;
