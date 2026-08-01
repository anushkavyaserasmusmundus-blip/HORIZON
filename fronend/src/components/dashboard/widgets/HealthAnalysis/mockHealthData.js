const healthData = {
  today: [
    { type: "Sleep", value: "7.5", unit: "hrs", icon: "😴", status: "Good" },
    { type: "Water", value: "2.3", unit: "L", icon: "💧", status: "Hydrated" },
    { type: "Steps", value: "8.2k", unit: "steps", icon: "🚶", status: "On Track" },
    { type: "Menstrual Cycle", value: "Day 14", unit: "", icon: "🌸", status: "Ovulation" },
  ],
  weekly: [
    { type: "Sleep", value: "7.2", unit: "hrs avg", icon: "😴", status: "Consistent" },
    { type: "Hydration", value: "2.1", unit: "L avg", icon: "💧", status: "Balanced" },
    { type: "Steps", value: "45k", unit: "steps", icon: "🚶", status: "Active" },
    { type: "Menstrual Cycle", value: "Ovulation window", unit: "", icon: "🌸", status: "Ovulation" },
  ],
  monthly: [
    { type: "Sleep", value: "7.0", unit: "hrs avg", icon: "😴", status: "Healthy" },
    { type: "Water", value: "2.0", unit: "L avg", icon: "💧", status: "Improving" },
    { type: "Menstrual Cycle", value: "Luteal", unit: "", icon: "🌸", status: "Luteal" },
    { type: "Energy", value: "High", unit: "", icon: "⚡", status: "Good" },
  ],
};

export default healthData;
