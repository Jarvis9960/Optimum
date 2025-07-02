import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, FileText, Globe } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DashboardStatCard } from "@/components/DashboardStatCard";
import pdfGif from "../../public/pdf_icon.gif";
import onlineProgram from "../../public/online_pro.gif";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const programRevenueData = [
    { month: "Jan", pdf: 1200, online: 800 },
    { month: "Feb", pdf: 1500, online: 1200 },
    { month: "Mar", pdf: 1800, online: 1500 },
    { month: "Apr", pdf: 2200, online: 1800 },
    { month: "May", pdf: 2500, online: 2200 },
    { month: "Jun", pdf: 2800, online: 2500 },
  ];

  const clientEngagementData = [
    { day: "Mon", completed: 15, missed: 2 },
    { day: "Tue", completed: 20, missed: 3 },
    { day: "Wed", completed: 18, missed: 1 },
    { day: "Thu", completed: 25, missed: 4 },
    { day: "Fri", completed: 22, missed: 2 },
    { day: "Sat", completed: 10, missed: 5 },
    { day: "Sun", completed: 5, missed: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1
            className="text-4xl font-bold text-gray-900 dark:text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Here's what's happening with your practice today.
          </p>
        </div>

        {user?.subscriptionTier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 md:mt-0"
          >
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-primary" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="capitalize">
                        {user.subscriptionTier}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {user.subscriptionPeriod}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {user.subscriptionExpiry &&
                        `Expires ${new Date(
                          user.subscriptionExpiry
                        ).toLocaleDateString()}`}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Stats and Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
        <DashboardStatCard
          title="PDF Programs"
          value={127}
          total={200}
          image={pdfGif} // Placeholder image for PDF
          footerText="Last updated"
          footerValue="Today"
          Icon={FileText}
        />
        <DashboardStatCard
          title="Online Programs"
          value={45}
          total={100}
          image={onlineProgram} // Placeholder image for Online
          footerText="Last updated"
          footerValue="Today"
          Icon={Globe}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.03,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          <Card className="">
            <CardHeader>
              <CardTitle>Program Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={programRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="pdf"
                    stackId="a"
                    fill="#8884d8"
                    name="PDF Revenue"
                    animationDuration={1500}
                  />
                  <Bar
                    dataKey="online"
                    stackId="a"
                    fill="#82ca9d"
                    name="Online Revenue"
                    animationDuration={1500}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.03,
            transition: { type: "spring", stiffness: 300 },
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Client Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clientEngagementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#8884d8"
                    name="Completed"
                    strokeWidth={2}
                    animationDuration={1500}
                  />
                  <Line
                    type="monotone"
                    dataKey="missed"
                    stroke="#ff7300"
                    name="Missed"
                    strokeWidth={2}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
