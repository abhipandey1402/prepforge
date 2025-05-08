import React from 'react';
import { Input } from '@/components/ui/input';

interface PasswordInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange }) => (
    <Input
        type="password"
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="bg-white border-none outline-none  text-neutral-900 placeholder-white py-4 px-4 h-10"
        style={{ fontSize: "1rem" }}
    />
);

export default PasswordInput;
