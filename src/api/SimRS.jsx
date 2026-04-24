import { useState, useEffect, useMemo } from "react";
import api from "./axios";

const SimRS = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (isInitial = false) => {
    if (isInitial) setLoading(true);
    try {
      const response = await api.get("/simrs/beds");

      setBeds(response.data);
    } catch (err) {
      console.error("Error fetching SIMRS data via proxy:", err);
      setError("Gagal mengambil data dari server RSUD");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(true);

    const interval = setInterval(() => {
      fetchData(false);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const roomSummary = useMemo(() => {
    if (!beds || !Array.isArray(beds)) return [];

    const summary = beds.reduce((acc, item) => {
      const roomName = item.namaruangan;
      const className = item.namakelas;
      const key = `${roomName}-${className}`;
      
      if (!acc[key]) {
        acc[key] = {
          room: roomName,
          class: className,
          total: 0,
          filled: 0,
        };
      }
      acc[key].total += 1;
      if (item.statusbed === "ISI") acc[key].filled += 1;
      return acc;
    }, {});

    const result = Object.values(summary);

    const getPriority = (className) => {
      if (!className) return 99;
      const c = className.toUpperCase();
      if (c.includes("VIP")) return 1;
      if (c.includes("KELAS III") || c.includes("KELAS 3")) return 4;
      if (c.includes("KELAS II") || c.includes("KELAS 2")) return 3;
      if (c.includes("KELAS I") || c.includes("KELAS 1")) return 2;
      if (c.includes("NON KELAS")) return 5;
      return 6;
    };

    return result.sort((a, b) => {
      const pA = getPriority(a.class);
      const pB = getPriority(b.class);

      if (pA !== pB) return pA - pB;
      return a.room.localeCompare(b.room);
    });
  }, [beds]);
  return { roomSummary, loading, error, refresh: fetchData };
};

export default SimRS;
