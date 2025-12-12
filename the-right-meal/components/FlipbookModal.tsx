'use client';

import React, { useCallback, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipbookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Define Page props interface for the forwardRef component
interface PageProps {
    children: React.ReactNode; 
    number: number;
}

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div className="page bg-white shadow-xl h-full" ref={ref}>
            <div className="relative h-full w-full overflow-hidden border-r border-slate-200">
                {props.children}
                <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 text-xs text-slate-400 font-mono">
                    {props.number}
                </div>
            </div>
        </div>
    );
});

Page.displayName = 'Page'; // Helper for devtools

export default function FlipbookModal({ isOpen, onClose }: FlipbookModalProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookRef = useRef<any>(null);

    // Helper to flip pages via buttons
    const nextFlip = useCallback(() => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipNext();
        }
    }, []);

    const prevFlip = useCallback(() => {
        if (bookRef.current) {
            bookRef.current.pageFlip().flipPrev();
        }
    }, []);

    // 9 images available: 1.png to 9.png
    const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-8 bg-black/90 backdrop-blur-md"
                    onClick={onClose}
                >
                    {/* Close Button - Tối ưu vị trí cho mobile dễ bấm hơn */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    {/* Book Container - Stop click propagation */}
                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="relative w-full max-w-5xl flex items-center justify-center h-[80vh] md:h-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                         {/* Navigation Buttons for PC */}
                        <button 
                            onClick={prevFlip}
                            className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center transition-colors"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        
                        <button 
                            onClick={nextFlip}
                            className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center transition-colors"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* REACT PAGE FLIP WRAPPER */}
                        {/* Tối ưu: Dùng responsive container để book tự scale trên mobile */}
                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                             {/* @ts-expect-error - Library types are mismatching with React 19 ref forwarding */}
                             <HTMLFlipBook 
                                width={400} 
                                height={600} 
                                size="stretch"
                                minWidth={280} // Giảm min width để fit màn hình nhỏ
                                maxWidth={600}
                                minHeight={400}
                                maxHeight={900}
                                maxShadowOpacity={0.5}
                                showCover={true}
                                mobileScrollSupport={true}
                                className="flip-book shadow-2xl"
                                ref={bookRef}
                                style={{ margin: '0 auto' }}
                                useMouseEvents={true} // Enable touch swipe
                            >
                                {pages.map((p) => (
                                    <Page key={p} number={p}>
                                        <Image 
                                            src={`/ebook/${p}.png`} 
                                            alt={`Page ${p}`} 
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            priority={p <= 2} // Preload bìa
                                        />
                                    </Page> 
                                ))}
                            </HTMLFlipBook>
                        </div>
                
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
