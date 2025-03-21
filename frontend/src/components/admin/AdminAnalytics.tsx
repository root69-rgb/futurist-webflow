
import React from 'react';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Demo data
const visitData = [
  { month: 'Jan', visitors: 1200, pageViews: 5400 },
  { month: 'Feb', visitors: 1900, pageViews: 6200 },
  { month: 'Mar', visitors: 2400, pageViews: 7800 },
  { month: 'Apr', visitors: 1800, pageViews: 5900 },
  { month: 'May', visitors: 2800, pageViews: 9200 },
  { month: 'Jun', visitors: 3600, pageViews: 11500 },
  { month: 'Jul', visitors: 3200, pageViews: 10200 },
];

const seoData = [
  { month: 'Jan', ranking: 95, impressions: 12000 },
  { month: 'Feb', ranking: 89, impressions: 15000 },
  { month: 'Mar', ranking: 72, impressions: 19500 },
  { month: 'Apr', ranking: 68, impressions: 22000 },
  { month: 'May', ranking: 52, impressions: 28000 },
  { month: 'Jun', ranking: 40, impressions: 35000 },
  { month: 'Jul', ranking: 32, impressions: 42000 },
];

const sourceData = [
  { name: 'Direct', value: 30 },
  { name: 'Organic Search', value: 40 },
  { name: 'Social Media', value: 20 },
  { name: 'Referral', value: 10 },
];

const pageViewData = [
  { page: 'Home', views: 4500 },
  { page: 'Services', views: 3200 },
  { page: 'Portfolio', views: 2800 },
  { page: 'Contact', views: 2100 },
  { page: 'Blog', views: 1800 },
  { page: 'About', views: 1500 },
];

const AdminAnalytics = () => {
  // Chart configurations
  const visitConfig = {
    visitors: { label: 'Visitors', theme: { light: '#4f46e5', dark: '#818cf8' } },
    pageViews: { label: 'Page Views', theme: { light: '#0ea5e9', dark: '#38bdf8' } },
  };

  const seoConfig = {
    ranking: { label: 'Keyword Ranking', theme: { light: '#10b981', dark: '#34d399' } },
    impressions: { label: 'Impressions', theme: { light: '#f59e0b', dark: '#fbbf24' } },
  };

  const sourceConfig = {
    Direct: { label: 'Direct', theme: { light: '#4f46e5', dark: '#818cf8' } },
    'Organic Search': { label: 'Organic Search', theme: { light: '#0ea5e9', dark: '#38bdf8' } },
    'Social Media': { label: 'Social Media', theme: { light: '#10b981', dark: '#34d399' } },
    Referral: { label: 'Referral', theme: { light: '#f59e0b', dark: '#fbbf24' } },
  };

  const pageViewConfig = {
    views: { label: 'Page Views', theme: { light: '#4f46e5', dark: '#818cf8' } },
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Website Traffic</CardTitle>
            <CardDescription>Monthly visitors and page views</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={visitConfig}
              className="h-64"
            >
              <LineChart data={visitData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line 
                  type="monotone" 
                  dataKey="visitors" 
                  name="visitors" 
                  stroke="var(--color-visitors)" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="pageViews" 
                  name="pageViews" 
                  stroke="var(--color-pageViews)" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">SEO Performance</CardTitle>
            <CardDescription>Keyword ranking and impressions</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={seoConfig}
              className="h-64"
            >
              <LineChart data={seoData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ranking" 
                  name="ranking" 
                  stroke="var(--color-ranking)" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="impressions" 
                  name="impressions" 
                  stroke="var(--color-impressions)" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Traffic Sources</CardTitle>
            <CardDescription>Where visitors are coming from</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={sourceConfig}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sourceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar 
                    dataKey="value" 
                    name="name" 
                    fill="var(--color-Organic Search)" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Popular Pages</CardTitle>
            <CardDescription>Most viewed pages on the website</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={pageViewConfig}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={pageViewData}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="page" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar 
                    dataKey="views"
                    name="views" 
                    fill="var(--color-views)" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
