interface FormData {
    name: string;
    email: string;
    contact?: string;
    linkedinId?: string;
    message: string;
}

export const Modal = ({
    isOpen,
    onClose,
    title,
    formData,
    setFormData,
    onSubmit,
    messagePlaceholder
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onSubmit: (e: React.FormEvent) => void;
    messagePlaceholder: string;
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-4 max-w-[50%] w-full max-h-[95vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-blue-950">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="flex justify-between w-full gap-4">
                        <div className="w-[50%]">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="w-[50%]">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between w-full gap-4">
                        <div className="w-[50%]">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Contact Number (Optional)
                            </label>
                            <input
                                type="tel"
                                value={formData.contact}
                                onChange={(e) =>
                                    setFormData({ ...formData, contact: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your contact number"
                            />
                        </div>

                        <div className="w-[50%]">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                LinkedIn ID
                            </label>
                            <input
                                type="text"
                                value={formData.linkedinId}
                                onChange={(e) =>
                                    setFormData({ ...formData, linkedinId: e.target.value })
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your LinkedIn profile URL or username"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Message *
                        </label>
                        <textarea
                            required
                            rows={4}
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder={messagePlaceholder}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors duration-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
