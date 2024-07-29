export default function Skeleton({
  height = 2.5,
  width = 48,
  rounded = "full",
}) {
  return (
    <div
      className={`h-${height} bg-gray-200 rounded-${rounded} dark:bg-gray-700 w-${width} mb-4`}
    ></div>
  );
}
