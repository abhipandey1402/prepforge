import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SelectField = ({ label, options }: { label: string; options: string[] }) => (
    <div className="w-full bg-transparent">
        <Label className="block text-sm text-gray-600 mb-1">{label}</Label>
        <Select>
            <SelectTrigger className="w-full !bg-transparent !text-black dark:!text-white border border-gray-300">
                <SelectValue placeholder={options[0]} />
            </SelectTrigger>
            <SelectContent className="w-full bg-white dark:bg-black text-black dark:text-white">
                {options.map((option, idx) => (
                    <SelectItem key={idx} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);

export default SelectField;
