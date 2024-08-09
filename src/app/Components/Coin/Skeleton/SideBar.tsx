import Skeleton from "@/app/Components/common/Skeleton";

export default function SideBarSkeleton() {
  return (
    <div className="sidebarRoot w-[30%] flex flex-col items-center m-6 border-r-2 border-gray-500">
      <Skeleton width="w-[200px]" height="h-[200px]" />
      <Skeleton width="w-[200px]" height="h-[56px]" rounded="none" />
      {new Array(6).fill(0).map((_, index) => {
        return (
          <Skeleton
            width="w-[90%] mx-5"
            height="h-[12px]"
            rounded="none"
            key={index}
          />
        );
      })}
      <div className="mt-6 w-[90%]">
        {[1, 2, 3].map((_, index) => {
          return (
            <div className="flex justify-between" key={index}>
              <Skeleton width="w-[80px]" height="h-[20px]" rounded="none" />
              <Skeleton width="w-[80px]" height="h-[20px]" rounded="none" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
