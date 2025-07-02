import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import CountUp from 'react-countup';

interface DashboardStatCardProps {
  title: string;
  value: number;
  total: number;
  image: string;
  footerText: string;
  footerValue: string;
  Icon: React.ElementType;
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  value,
  total,
  image,
  footerText,
  footerValue,
  Icon,
}) => {
  const progressPercentage = (value / total) * 100;

  return (
    <motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card className="bg-white dark:bg-gray-800/50 rounded-3xl shadow-lg border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Icon className="h-5 w-5" />
              <span className="font-medium text-sm">{title}</span>
            </div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{Math.round(progressPercentage)}%</span>
          </div>

          <div className="text-center my-8">
            <h2 className="text-7xl font-bold text-gray-800 dark:text-white">
              <CountUp end={value} duration={2} separator="," />
            </h2>
            <p className="text-gray-500 dark:text-gray-400">/ {total}</p>
          </div>
          
          <Progress value={progressPercentage} className="h-2 bg-gray-200 dark:bg-gray-700" />

          <div className="mt-6 flex justify-between items-end">
             <div className="relative w-24 h-20">
                <img src={image} alt={title} className="absolute bottom-0 left-0 h-16 w-16 object-contain" />
            </div>
            <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400">{footerText}</p>
                <p className="font-semibold text-gray-700 dark:text-gray-200">{footerValue}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};