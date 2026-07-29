import DashboardLayout from "../components/layout/DashboardLayout";

import StreakWidget from "../components/dashboard/widgets/StreakWidget";
import TodaysMissionWidget from "../components/dashboard/widgets/TodaysMissionWidget";
import AIWidget from "../components/dashboard/widgets/AIWidget";
import CodingHoursWidget from "../components/dashboard/widgets/CodingHoursWidget";
import LeetCodeWidget from "../components/dashboard/widgets/LeetCodeWidget";
import AnalyticsWidget from "../components/dashboard/widgets/AnalyticsWidget";
import ProfileWidget from "../components/dashboard/widgets/ProfileWidget";
import HealthWidget from "../components/dashboard/widgets/HealthWidget";
import JournalWidget from "../components/dashboard/widgets/JournalWidget";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl space-y-6">

        <StreakWidget />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          <div className="space-y-6">
            <TodaysMissionWidget />
            <ProfileWidget />
            <HealthWidget />
            <JournalWidget />
          </div>

          <div className="space-y-6">
            <AIWidget />
            <CodingHoursWidget />
            <LeetCodeWidget />
            <AnalyticsWidget />
          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}