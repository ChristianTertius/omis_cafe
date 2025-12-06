import { PropsWithChildren } from "react";

type ModalProps = {
    show: boolean;
    onClose: () => void;
    title?: string;
};

export default function Modal({ show, onClose, title, children }: PropsWithChildren<ModalProps>) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
                {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
}
