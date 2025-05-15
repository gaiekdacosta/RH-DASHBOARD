type SelectPeriodProps = {
    value: number;
    onChange: (value: number) => void;
};

const SelectPeriod = ({ value, onChange }: SelectPeriodProps) => {
    return (
        <select
            className="cursor-pointer text-[12px] font-semibold p-0 bg-transparent border-0 text-gray-200 focus:outline-none focus:ring-0 appearance-none"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        >
            <option value={7}>Últimos 7 dias</option>
            <option value={30}>Últimos 30 dias</option>
            <option value={60}>Últimos 60 dias</option>
            <option value={90}>Últimos 90 dias</option>
        </select>
    );
};

export default SelectPeriod;
