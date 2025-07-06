import React from 'react';
import { Lock } from 'lucide-react';
import { FormData, ShowPasswordsState } from '../types/settings.types';
import PasswordInput from './PasswordInput';

interface SecuritySectionProps {
    formData: FormData;
    showPasswords: ShowPasswordsState;
    passwordChangeLoading: boolean;
    onFormChange: (field: keyof FormData, value: string) => void;
    onTogglePasswordVisibility: (field: keyof ShowPasswordsState) => void;
    onPasswordChange: () => void;
}

const SecuritySection: React.FC<SecuritySectionProps> = ({
    formData,
    showPasswords,
    passwordChangeLoading,
    onFormChange,
    onTogglePasswordVisibility,
    onPasswordChange,
}) => (
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6 text-orange-500" />
            Security
        </h2>

        <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Change Password</h3>
            <div className="grid gap-4">
                <PasswordInput
                    placeholder="Current Password"
                    value={formData.currentPassword}
                    onChange={(value) => onFormChange('currentPassword', value)}
                    showPassword={showPasswords.current}
                    onToggleVisibility={() => onTogglePasswordVisibility('current')}
                />
                <PasswordInput
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={(value) => onFormChange('newPassword', value)}
                    showPassword={showPasswords.new}
                    onToggleVisibility={() => onTogglePasswordVisibility('new')}
                />
                <PasswordInput
                    placeholder="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={(value) => onFormChange('confirmPassword', value)}
                    showPassword={showPasswords.confirm}
                    onToggleVisibility={() => onTogglePasswordVisibility('confirm')}
                />
            </div>
            <div className="flex gap-4 mt-4">
                <button
                    onClick={onPasswordChange}
                    disabled={passwordChangeLoading}
                    className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2 rounded transition-colors"
                >
                    {passwordChangeLoading ? "Changing Password..." : "Change Password"}
                </button>
                {/* <button
                    onClick={onResetPassword}
                    className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded transition-colors"
                >
                    Reset Password
                </button> */}
            </div>
        </div>
    </div>
);

export default SecuritySection;