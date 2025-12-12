'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Flame } from 'lucide-react';
import Image from 'next/image';

interface Recipe {
  title: string;
  image: string;
  ingredients: string;
  instructions: string;
  nutrition: string; // Placeholder content for now as user didn't provide specific numbers
}

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe | null;
}

export default function RecipeModal({ isOpen, onClose, recipe }: RecipeModalProps) {
  if (!recipe) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            // Tối ưu: max-h-[100dvh] cho mobile, bo góc dưới = 0 cho mobile
            className="relative w-full max-w-5xl bg-[#F2F0E9] rounded-none md:rounded-2xl shadow-2xl overflow-hidden h-dvh md:h-auto md:max-h-[90vh] flex flex-col md:flex-row"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors text-slate-900"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left: Image */}
            {/* Tối ưu: h-48 cho mobile để chừa chỗ cho nội dung */}
            <div className="w-full md:w-1/2 h-48 md:h-auto shrink-0 relative">
              <Image
                src={recipe.image}
                alt={recipe.title}
                fill
                className="object-cover"
              />
               <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/80 to-transparent p-4 md:p-10">
                  {/* Tối ưu: text-2xl cho mobile */}
                  <h3 className="font-(--font-playfair) text-2xl md:text-4xl text-white mb-0 md:mb-2">{recipe.title}</h3>
                   <div className="flex gap-4 text-white/90 text-sm font-bold tracking-widest uppercase">
                     {/* Metadata removed as it's not in the data source */}
                   </div>
               </div>
            </div>

            {/* Right: Content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-white flex-1">
              
              {/* Ingredients */}
              <div className="mb-6 md:mb-8">
                <h4 className="font-(--font-playfair) text-xl md:text-2xl text-[#2D2A26] mb-3 md:mb-4 border-b border-[#A67C52] pb-2 inline-block">
                  Nguyên Liệu
                </h4>
                {/* Tối ưu: text-base cho mobile */}
                <p className="text-[#59554D] leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {recipe.ingredients}
                </p>
              </div>

              {/* Instructions */}
              <div className="mb-6 md:mb-8">
                <h4 className="font-(--font-playfair) text-xl md:text-2xl text-[#2D2A26] mb-3 md:mb-4 border-b border-[#A67C52] pb-2 inline-block">
                  Cách Làm
                </h4>
                <p className="text-[#59554D] leading-relaxed text-base md:text-lg whitespace-pre-line">
                  {recipe.instructions}
                </p>
              </div>

              {/* Nutrition (Bottom of Content) */}
              {/* Tối ưu: padding nhỏ hơn trên mobile */}
              <div className="bg-[#EBE7DE] p-4 md:p-6 rounded-xl border border-[#D6D3C9]">
                <h4 className="font-bold text-[#A67C52] text-xs md:text-sm uppercase tracking-widest mb-2 md:mb-3 flex items-center gap-2">
                   <Flame className="w-4 h-4" /> Bảng Tính Dinh Dưỡng
                </h4>
                {/* Removed extra <p> wrapper causing hydration error */}
                <div className="whitespace-pre-line text-[#2D2A26] leading-relaxed text-sm font-medium">
                    {recipe.nutrition ? (
                        recipe.nutrition
                    ) : (
                        <span className="italic text-slate-500">Thông tin dinh dưỡng chi tiết đang được cập nhật trong E-book trọn bộ.</span>
                    )}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
