import Card from "../../common/Card";

export default function StreakWidget() {
  return (
    <Card title="🔥 Daily Streak">
      <h2 className="text-4xl font-bold">28</h2>

      <p className="mt-2 text-gray-600">
        Keep your streak alive today!
      </p>
    </Card>
  );
}