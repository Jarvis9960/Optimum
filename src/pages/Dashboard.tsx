
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Activity, Calendar, TrendingUp, Clock, Star, FileText, Globe, Download } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Clients',
      value: '48',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Treatments',
      value: '23',
      change: '+8%',
      icon: Activity,
      color: 'text-green-600'
    },
    {
      title: 'This Week',
      value: '156',
      change: '+15%',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: 'Success Rate',
      value: '94%',
      change: '+2%',
      icon: TrendingUp,
      color: 'text-emerald-600'
    }
  ];

  const programStats = [
    {
      title: 'PDF Programs Generated',
      value: '127',
      icon: FileText,
      color: 'text-red-600'
    },
    {
      title: 'Online Programs',
      value: '45',
      icon: Globe,
      color: 'text-blue-600'
    }
  ];

  // Line chart data for PDF and Online programs
  const programData = [
    { month: 'Jan', pdfPaid: 12, pdfUnpaid: 3, onlinePaid: 8, onlineUnpaid: 2 },
    { month: 'Feb', pdfPaid: 15, pdfUnpaid: 5, onlinePaid: 12, onlineUnpaid: 3 },
    { month: 'Mar', pdfPaid: 18, pdfUnpaid: 4, onlinePaid: 15, onlineUnpaid: 1 },
    { month: 'Apr', pdfPaid: 22, pdfUnpaid: 6, onlinePaid: 18, onlineUnpaid: 2 },
    { month: 'May', pdfPaid: 25, pdfUnpaid: 3, onlinePaid: 22, onlineUnpaid: 4 },
    { month: 'Jun', pdfPaid: 28, pdfUnpaid: 5, onlinePaid: 25, onlineUnpaid: 2 },
    { month: 'Jul', pdfPaid: 30, pdfUnpaid: 4, onlinePaid: 28, onlineUnpaid: 3 },
    { month: 'Aug', pdfPaid: 32, pdfUnpaid: 6, onlinePaid: 30, onlineUnpaid: 1 },
    { month: 'Sep', pdfPaid: 35, pdfUnpaid: 3, onlinePaid: 32, onlineUnpaid: 2 },
    { month: 'Oct', pdfPaid: 38, pdfUnpaid: 5, onlinePaid: 35, onlineUnpaid: 3 },
    { month: 'Nov', pdfPaid: 40, pdfUnpaid: 4, onlinePaid: 38, onlineUnpaid: 1 },
    { month: 'Dec', pdfPaid: 42, pdfUnpaid: 6, onlinePaid: 40, onlineUnpaid: 2 }
  ];

  const recentActivity = [
    { client: 'John Smith', action: 'Completed exercise session', time: '2 hours ago' },
    { client: 'Emma Johnson', action: 'Started new treatment plan', time: '4 hours ago' },
    { client: 'Michael Brown', action: 'Updated progress notes', time: '6 hours ago' },
    { client: 'Sarah Wilson', action: 'Scheduled follow-up', time: '1 day ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground mt-1">
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
                      {user.subscriptionExpiry && (
                        `Expires ${new Date(user.subscriptionExpiry).toLocaleDateString()}`
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Program Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-gray-100 dark:bg-gray-800 ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Program Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Program Revenue - Current Year</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={programData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="pdfPaid" stroke="#22c55e" name="PDF Paid" strokeWidth={2} />
              <Line dataKey="pdfUnpaid" stroke="#ef4444" name="PDF Unpaid" strokeWidth={2} />
              <Line dataKey="onlinePaid" stroke="#3b82f6" name="Online Paid" strokeWidth={2} />
              <Line dataKey="onlineUnpaid" stroke="#f59e0b" name="Online Unpaid" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {activity.client}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <Button variant="ghost" className="w-full">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start medical-gradient text-white">
                <Users className="h-4 w-4 mr-2" />
                Add New Client
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Appointment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Activity className="h-4 w-4 mr-2" />
                Create Treatment Plan
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Generate PDF Program
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
