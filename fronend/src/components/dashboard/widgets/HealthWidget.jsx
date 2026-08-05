import Card from "../../common/Card";

export default function HealthWidget() {
  return (
    <Card title="Health summary">
      <h2 className="text-4xl font-bold">28</h2>

      <p className="mt-2 text-gray-600">
        Keep your streak alive today!
      </p>
    </Card>
  );
}