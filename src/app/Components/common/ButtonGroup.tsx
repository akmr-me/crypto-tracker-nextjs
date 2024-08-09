// TODO: Make this component generic
interface ItemType {
  label: string;
  value: string | number;
}

interface PropsTypes {
  className: string;
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: string | number
  ) => void;
  data: ItemType[];
  selected: string | number;
  disabled?: boolean;
}

export default function ButtonGroup({
  className,
  onClick,
  disabled,
  selected,
  data,
}: PropsTypes) {
  return (
    <div className={className}>
      {data.map((item, index, arr) => {
        let borderRound = "";
        if (index == 0) {
          borderRound = "border-t border-b border-l rounded-s-lg";
        } else if (index == arr.length - 1) {
          borderRound = "border rounded-e-lg";
        } else {
          borderRound = "border-t border-b border-l";
        }
        return (
          <button
            key={item.label}
            disabled={selected === item.value}
            onClick={(e) => onClick(e, item.value)}
            className={`px-4 py-2 text-sm font-medium text-gray-900 border-gray-900 ${borderRound} hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-blue-700 dark:focus:bg-gray-700 ${
              selected === item.value
                ? "bg-gray-700 text-white"
                : "bg-transparent"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
