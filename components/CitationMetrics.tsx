// components/CitationMetrics.tsx
import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BookOpen, Award, BarChart2 } from "lucide-react";

interface CitationMetricsProps {
  metrics: {
    totalCitations: number;
    citationsSince2020: number;
    hIndex: number;
    hIndexSince2020: number;
    i10Index: number;
    i10IndexSince2020: number;
    citationsByYear: Record<string, number>;
  };
}

export const CitationMetrics: React.FC<CitationMetricsProps> = ({
  metrics,
}) => {
  const years = Object.keys(metrics.citationsByYear);
  const citations = Object.values(metrics.citationsByYear);
  const maxCitation = Math.max(...citations);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      }}
      className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-6 space-y-6"
    >
      <div className="flex items-center space-x-4 mb-4">
        <BarChart2 className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Research Impact
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          icon={TrendingUp}
          title="Total Citations"
          value={metrics.totalCitations}
          gradient="from-blue-500 to-purple-600"
        />
        <MetricCard
          icon={BookOpen}
          title="Since 2020"
          value={metrics.citationsSince2020}
          gradient="from-green-500 to-teal-600"
        />
        <MetricCard
          icon={Award}
          title="h-index"
          value={metrics.hIndex}
          gradient="from-orange-500 to-red-600"
        />
        <MetricCard
          icon={Award}
          title="i10-index"
          value={metrics.i10Index}
          gradient="from-pink-500 to-rose-600"
        />
      </div>

      {/* <div className="w-full h-40 relative bg-gray-100 dark:bg-gray-700 rounded-2xl overflow-hidden p-4">
        <div className="absolute inset-0 flex items-end space-x-1 pb-2">
          {years.map((year, index) => {
            const height = (citations[index] / maxCitation) * 100;
            return (
              <motion.div
                key={year}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  type: "spring",
                }}
                className="w-full bg-blue-500/70 hover:bg-blue-500 transition-all rounded-t-lg group"
                style={{ height: `${height}%` }}
              >
                <div className="opacity-0 group-hover:opacity-100 text-xs text-white text-center pt-1">
                  {citations[index]}
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500 dark:text-gray-400 px-2">
          {years.map((year) => (
            <span key={year}>{year}</span>
          ))}
        </div>
      </div> */}
    </motion.div>
  );
};

interface MetricCardProps {
  icon: React.ElementType;
  title: string;
  value: number;
  gradient: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  title,
  value,
  gradient,
}) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`bg-gradient-to-br ${gradient} text-white rounded-2xl p-4 shadow-lg transform transition-transform`}
  >
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-sm font-medium opacity-80">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <Icon className="w-8 h-8 opacity-70" />
    </div>
  </motion.div>
);
