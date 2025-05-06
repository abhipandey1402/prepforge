import { Star, StarHalf } from 'lucide-react';
import { FC } from 'react';

// Define the types for SuccessStoryCard props
interface SuccessStoryCardProps {
    initial: string;
    name: string;
    position: string;
    testimonial: string;
    rating: number;
}

const SuccessStoryCard: FC<SuccessStoryCardProps> = ({ initial, name, position, testimonial, rating }) => {
    // Define a function to generate the correct background color and text color based on initial
    const getInitialColor = (initial: string) => {
        switch (initial) {
            case 'JD':
                return 'bg-blue-100 text-blue-600';
            case 'SR':
                return 'bg-green-100 text-green-600';
            case 'MP':
                return 'bg-orange-100 text-orange-600';
            default:
                return 'bg-gray-100 text-gray-600';
        }
    };

    // Define a function to generate the stars based on the rating
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;

        return (
            <>
                {Array.from({ length: fullStars }, (_, index) => (
                    <Star key={`full-${index}`} className="h-5 w-5 fill-current text-yellow-500" />
                ))}
                {halfStar && <StarHalf className="h-5 w-5 fill-current text-yellow-500" />}
            </>
        );
    };

    return (
        <div className="bg-slate-100 p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
            <div className="flex items-center mb-4">
                <div className={`h-12 w-12 rounded-full ${getInitialColor(initial)} flex items-center justify-center mr-4`}>
                    <span className="font-bold">{initial}</span>
                </div>
                <div>
                    <div className="font-medium text-gray-900">{name}</div>
                    <div className="text-sm text-blue-600">{position}</div>
                </div>
            </div>
            <p className="text-gray-700 mb-4">{testimonial}</p>
            <div className="flex items-center">
                {renderStars(rating)}
            </div>
        </div>
    );
};

export default SuccessStoryCard