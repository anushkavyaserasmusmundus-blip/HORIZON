import HealthCard from "./HealthCard";

export default function HealthGrid({ items = [] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <HealthCard
          key={item.type}
          icon={item.icon}
          title={item.type}
          value={item.value}
          unit={item.unit}
          status={item.status}
        />
      ))}
    </div>
  );
}
