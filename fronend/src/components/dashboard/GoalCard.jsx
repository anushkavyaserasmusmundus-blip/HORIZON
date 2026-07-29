import Card from "../common/Card";

export default function GoalCard() {
  return (
    <Card title="Current Goal">
      <h3 className="font-semibold text-lg">
        Become a Backend Engineer
      </h3>

      <p className="mt-2">
        Progress: 45%
      </p>
    </Card>
  );
}