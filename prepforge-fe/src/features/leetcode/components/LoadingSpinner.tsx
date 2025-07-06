// components/LoadingSpinner.tsx
interface LoadingSpinnerProps {
    size?: number;
    className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24, className = "" }) => {
    return (
        <div
            className={`animate-spin rounded-full border-2 border-gray-300 border-t-orange-600 ${className}`}
            style={{ width: size, height: size }}
        ></div>
    );
};