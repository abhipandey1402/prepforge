import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

const ChallengeTypeOption = ({ id, title, subtitle }: { id: string; title: string; subtitle: string }) => (
    <div className="relative">
        <input type="radio" id={id} name="challengeType" className="peer sr-only" />
        <Label htmlFor={id} className="flex flex-col p-4 bg-white border rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:bg-gray-50">
            <span className="text-sm font-medium text-gray-900">{title}</span>
            <span className="text-xs text-gray-500">{subtitle}</span>
        </Label>
        <CheckCircle className="absolute h-5 w-5 right-2 top-2 text-blue-500 hidden peer-checked:block" />
    </div>
);

export default ChallengeTypeOption