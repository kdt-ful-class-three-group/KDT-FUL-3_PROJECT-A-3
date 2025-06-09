// 나중에 Stock interface 수정
export interface Stock {
  name: string;
  symbol: string;
}

interface Props {
  results: Stock[];
  onSelect: (id: string) => void;
  visible?: boolean;
}

export function SearchDropdown({ results, onSelect, visible }: Props) {
  const dropdownClass = `absolute left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-md max-h-60 overflow-auto ${
    visible ? 'block' : 'hidden'
  }`;

  return (
    <div className="relative w-full">
      <ul className={dropdownClass}>
        {results.map((stock) => (
          <li
            key={stock.symbol}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(stock.symbol)}
          >
            {stock.name} ({stock.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
}