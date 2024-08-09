interface SkeletonType {
  height: string;
  width: string;
  rounded?: string;
}
export default function Skeleton({
  height = "",
  width = "",
  rounded = "full",
}: SkeletonType) {
  return (
    <div
      className={`${height} bg-gray-200 rounded-${rounded} dark:bg-gray-700 ${width} mb-4`}
    />
  );
}
