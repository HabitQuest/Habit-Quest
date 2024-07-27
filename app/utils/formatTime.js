export function formatTime(time) {
  const [hours, minutes] = time.split(":");
  const hoursInt = parseInt(hours, 10);
  const period = hoursInt >= 12 ? "PM" : "AM";
  const hours12 = hoursInt % 12 || 12;

  return `${hours12}:${minutes} ${period}`;
}
