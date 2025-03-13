import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import axios from "axios";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  Pie,
  PieChart,
  Cell,
  Line,
  LineChart
} from "recharts";

interface AccidentData {
  id: number;
  timestamp: string;
  location: string;
  severity_level: string;
  severity_score: number;
  accuracy: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const COLORS = [
  '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', 
  '#059669', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0', 
  '#d97706', '#f59e0b', '#fbbf24', '#fcd34d', '#fef3c7', 
];

function AccidentDataDashboard() {
  const [databaseData, setDatabaseData] = useState<AccidentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalAccidents, setTotalAccidents] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get<{ data: AccidentData[] }>(`${API_URL}/fetch_database`);
        setDatabaseData(response.data.data);
        setTotalAccidents(response.data.data.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate average severity score
  const averageSeverityScore = totalAccidents > 0
    ? databaseData.reduce((sum, item) => sum + item.severity_score, 0) / totalAccidents
    : 0;

  // Get accidents by month for line and bar charts
  const getAccidentsByMonth = () => {
    const monthlyData: Record<string, number> = {};
    const months = ["January", "February", "March", "April", "May", "June"];
    
    months.forEach(month => monthlyData[month] = 0);
    
    
    databaseData.forEach(item => {
      const date = new Date(item.timestamp);
      const month = date.toLocaleString('en-US', { month: 'long' });
      if (months.includes(month)) {
        monthlyData[month] += 1;
      }
    });
    
    return months.map(month => ({
      name: month,
      value: monthlyData[month]
    }));
  };

  
  const getAccidentsByTime = () => {
    const timeslots: Record<string, number> = {};
    
    databaseData.forEach(item => {
      const date = new Date(item.timestamp);
      const hour = date.getHours();
      const timeslot = `${hour}:00 - ${hour + 1}:00`;
      timeslots[timeslot] = (timeslots[timeslot] || 0) + 1;
    });
    
    return Object.entries(timeslots)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); 
  };

  
  const getAccidentsByLocation = () => {
    const locations: Record<string, number> = {};
    
    databaseData.forEach(item => {
      locations[item.location] = (locations[item.location] || 0) + 1;
    });
    
    return Object.entries(locations)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5); 
  };

  
  const getSeverityByLocation = () => {
    const severityByLocation: Record<string, number> = {};
    const locationCount: Record<string, number> = {};
    
    databaseData.forEach(item => {
      severityByLocation[item.location] = (severityByLocation[item.location] || 0) + item.severity_score;
      locationCount[item.location] = (locationCount[item.location] || 0) + 1;
    });
    
    return Object.entries(severityByLocation)
      .map(([name, totalScore]) => ({
        name,
        value: parseFloat((totalScore / locationCount[name]).toFixed(2))
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6); // Top 6 locations
  };

  // Get severity level distribution for donut chart
  const getSeverityLevelDistribution = () => {
    const severityLevels: Record<string, number> = {};
    
    databaseData.forEach(item => {
      severityLevels[item.severity_level] = (severityLevels[item.severity_level] || 0) + 1;
    });
    
    return Object.entries(severityLevels)
      .map(([name, value]) => ({ name, value }));
  };

  // Get monthly trend data for line chart
  const monthlyTrendData = getAccidentsByMonth();
  const timeDistributionData = getAccidentsByTime();
  const locationDistributionData = getAccidentsByLocation();
  const severityByLocationData = getSeverityByLocation();
  const severityLevelData = getSeverityLevelDistribution();

  // Custom tooltip formatter
  const tooltipFormatter = (value: number) => [`${value}`, "Value"];
  
  // Custom label formatter for pie chart
  const renderCustomizedLabel = ({ name, percent }: any) => {
    return `${name}: ${(percent * 100).toFixed(0)}%`;
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Bar Chart - Monthly Accidents</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">Loading...</div>
            ) : (
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyTrendData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`${value}`, 'Accidents']} />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-sm text-muted-foreground mt-2">
                  <p>Trending up by 5.2% this month</p>
                  <p>Showing total accidents for the last 6 months</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Line Chart - Monthly Trend</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">Loading...</div>
            ) : (
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyTrendData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`${value}`, 'Accidents']} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#2563eb" 
                      strokeWidth={2} 
                      dot={{ r: 6, fill: "#2563eb" }} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div className="text-sm text-muted-foreground mt-2">
                  <p>Trending up by 5.2% this month</p>
                  <p>Showing total accidents for the last 6 months</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Donut Chart - Severity Levels */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pie Chart - Donut with Text</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">Loading...</div>
            ) : (
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={severityLevelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {severityLevelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={tooltipFormatter} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold">{totalAccidents}</div>
                  <div className="text-sm text-muted-foreground">Accidents</div>
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  <p>Trending up by 5.2% this month</p>
                  <p>Showing total accidents for the last 6 months</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Severity Score by Location */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Severity Score by Location</CardTitle>
            <CardDescription>Average severity scores</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">Loading...</div>
            ) : (
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={severityByLocationData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <RechartsTooltip formatter={(value) => [`${value}`, 'Severity Score']} />
                    <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-sm text-muted-foreground mt-2">
                  <p>Showing average severity scores by top locations</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Accidents by Time */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Accidents by Time</CardTitle>
            <CardDescription>Top accident time slots</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">Loading...</div>
            ) : (
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={timeDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {timeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={tooltipFormatter} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Accidents by Location */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Accidents by Location</CardTitle>
            <CardDescription>Top accident locations</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-64">Loading...</div>
            ) : (
              <div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={locationDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {locationDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={tooltipFormatter} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AccidentDataDashboard;
