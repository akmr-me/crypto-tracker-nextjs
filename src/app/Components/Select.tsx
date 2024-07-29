interface Option {
  label: string;
  value: string;
  selected?: boolean;
}

interface SelectProps {
  label?: string;
  options: Option[];
  disabled?: boolean;
  onSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({
  label,
  options,
  disabled = false,
  onSelect,
}: SelectProps) {
  return (
    <>
      {Boolean(label) && (
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white min-h-[64px]"
        >
          {label}
        </label>
      )}
      <select
        disabled={disabled}
        onChange={onSelect}
        id="countries"
        className="bg-transparent border border-customGray text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {options.map(({ label, value, selected }: Option) => (
          <option selected={selected} value={value} key={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
