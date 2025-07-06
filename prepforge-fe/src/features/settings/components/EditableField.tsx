import React from 'react';
import { Edit3, Save, X } from 'lucide-react';
import { EditableFieldProps } from '../types/settings.types';

const EditableField: React.FC<EditableFieldProps> = ({
    icon: Icon,
    label,
    type = 'text',
    shouldEdit,
    value,
    isEditing,
    onEdit,
    onSave,
    onCancel,
    onChange
}) => (
    <div className="bg-gray-900 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-300">{label}</span>
            </div>
            {shouldEdit && !isEditing && (
                <button
                    onClick={onEdit}
                    className="text-orange-500 hover:text-orange-400 transition-colors"
                >
                    <Edit3 className="w-4 h-4" />
                </button>
            )}
        </div>
        {isEditing ? (
            <div className="flex items-center gap-2">
                <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 bg-gray-800 text-white p-2 rounded border border-gray-600 focus:border-orange-500 focus:outline-none"
                />
                <button
                    onClick={onSave}
                    className="text-green-500 hover:text-green-400 transition-colors"
                >
                    <Save className="w-4 h-4" />
                </button>
                <button
                    onClick={onCancel}
                    className="text-red-500 hover:text-red-400 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        ) : (
            <p className="text-white">{value}</p>
        )}
    </div>
);

export default EditableField;