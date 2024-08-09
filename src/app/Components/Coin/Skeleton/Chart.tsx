import Skeleton from "../../common/Skeleton";

export default function SideBarSkeleton() {
  return (
    <div className="sidebarRoot w-[70%] flex flex-col items-center m-6 border-gray-500">
      <Skeleton width="w-[220px]" height="h-[20px]" rounded="none" />
      <Skeleton width="w-full" height="h-[500px]" rounded="none" />
      <div className="flex w-full gap-4 mt-5 justify-center">
        {new Array(5).fill(0).map((_, index) => {
          return (
            <Skeleton
              width="w-[80px]"
              height="h-[24px] inline"
              rounded="none"
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
