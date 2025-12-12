'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle } from 'lucide-react';

interface DownloadModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would handle the actual form submission/API call
        setIsSubmitted(true);
        // Simulate download or email logic here
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-[#2D2A26] p-8 text-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-[#A67C52] via-[#F2F0E9] to-[#A67C52]"></div>
                            <button 
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <h3 className="font-(--font-playfair) text-3xl text-[#F2F0E9] mb-2">
                                Tải E-book Ngay
                            </h3>
                            <p className="text-[#A67C52] text-sm font-medium tracking-widest uppercase">
                                Survival Meal ULIS
                            </p>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-10">
                            {!isSubmitted ? (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <p className="text-slate-600 text-center mb-6">
                                        Vui lòng để lại thông tin để chúng mình gửi trọn bộ E-book đến bạn ngay lập tức!
                                    </p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Họ và Tên</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="VD: Nguyễn Văn A" 
                                                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#A67C52] focus:ring-1 focus:ring-[#A67C52] transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Email hoặc SĐT</label>
                                            <input 
                                                required
                                                type="text" 
                                                placeholder="VD: example@ulis.vnu.edu.vn" 
                                                className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-hidden focus:border-[#A67C52] focus:ring-1 focus:ring-[#A67C52] transition-all"
                                            />
                                        </div>
                                    </div>

                                    <button 
                                        type="submit"
                                        className="w-full bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2 mt-4"
                                    >
                                        <Download className="w-5 h-5" /> TẢI MIỄN PHÍ NGAY
                                    </button>
                                    
                                    <p className="text-xs text-center text-slate-400">
                                        Cam kết bảo mật thông tin 100%.
                                    </p>
                                </form>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-600" />
                                    </div>
                                    <h4 className="font-(--font-playfair) text-2xl text-slate-900 mb-4">
                                        Đăng Ký Thành Công!
                                    </h4>
                                    <p className="text-slate-600 mb-8">
                                        Cảm ơn bạn. E-book đang được gửi tới email của bạn. Hãy kiểm tra cả hộp thư Spam nhé!
                                    </p>
                                    <button 
                                        onClick={onClose}
                                        className="bg-[#2D2A26] hover:bg-black text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform"
                                    >
                                        Đóng & Quay Lại
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
