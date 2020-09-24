import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import coinAxios from '../apis/CoinAxios';
import CoinData from '../components/CoinData';
import { Link } from "react-router-dom";
import HistoryChart from '../components/HistoryChart'
function CoinDetailPage() {
    const { id } = useParams();
  const [coinData, setCoinData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [day, week, year, detail] = await Promise.all([
        coinAxios.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "1",
          },
        }),
        coinAxios.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "7",
          },
        }),
        coinAxios.get(`/coins/${id}/market_chart/`, {
          params: {
            vs_currency: "usd",
            days: "365",
          },
        }),
        coinAxios.get("/coins/markets/", {
          params: {
            vs_currency: "usd",
            ids: id,
          },
        }),
      ]);
      console.log(day);

      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const renderData = () => {
    if (isLoading) {
      return <div>Loading....</div>;
    }
    return (
      <div className="coinlist">
          <Link to={'/'}>
          <button className="bg-white mt-3 p-2 rounded border">
              back
          </button>
          </Link>
          
        <HistoryChart data={coinData} />
        <CoinData data={coinData.detail} />
      </div>
    );
  };

  return renderData()
}

export default CoinDetailPage
