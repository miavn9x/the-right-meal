'use client';

import React, { useCallback, useRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Leaf, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipbookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// --- DATA ---
const recipesData = [
    {
        id: 1,
        title: "Gà Xào Sả Ớt",
        ingredients: "Thịt gà, sả băm, ớt, tỏi, nước mắm, tiêu, cơm nóng.",
        method: "Phi tỏi + sả → cho gà vào xào chín → nêm mắm + tiêu.",
        image: "/cong thuc/Gà Xào Sả Ớt.jpg"
    },
    {
        id: 2,
        title: "Đậu Hũ Nhồi Thịt Sốt Cà",
        ingredients: "Đậu hũ, thịt băm, cà chua, hành lá.",
        method: "Nhồi thịt vào đậu → chiên vàng → sốt cà → cho đậu vào rim 5 phút → thêm hành.",
        image: "/cong thuc/Đậu Hũ Nhồi Thịt Sốt Cà.jpg"
    },
    {
        id: 3,
        title: "Thịt Băm Xào Khoai Tây",
        ingredients: "Thịt heo băm, khoai tây, tỏi băm, tiêu, hành lá.",
        method: "Phi tỏi → cho thịt vào xào săn → thêm gia vị → cho khoai tây lát mỏng vào → thêm chút nước → để 1-2p cho mềm → thêm tiêu và hành lá.",
        image: "/cong thuc/Thịt Băm Xào Khoai Tây.jpg"
    },
    {
        id: 4,
        title: "Canh Bí Đỏ Nấu Tôm Khô",
        ingredients: "Bí đỏ, tôm khô, hành lá.",
        method: "Nấu tôm khô cho ngọt nước → cho bí vào nấu mềm → nêm gia vị → thêm hành lá.",
        image: "/cong thuc/Canh Bí Đỏ Nấu Tôm Khô.jpg"
    },
    {
        id: 5,
        title: "Bún Thịt Xào",
        ingredients: "Bún tươi, thịt heo, rau xà lách, dưa leo.",
        method: "Xào thịt → trộn cùng bún + rau → chan mắm chua ngọt.",
        image: "/cong thuc/Bún Thịt Xào.jpg"
    },
    {
        id: 6,
        title: "Gà Rim Mặn Ngọt",
        ingredients: "Thịt gà, tỏi, tiêu.",
        method: "Phi tỏi → cho gà vào đảo săn lại → thêm đường, nước mắm, tương ớt → rim nhỏ lửa 5-7p cho sệt lại → thêm tiêu.",
        image: "/cong thuc/ Gà Rim Mặn Ngọt.jpg"
    },
    {
        id: 7,
        title: "Cơm Chiên Trứng – Xúc Xích",
        ingredients: "Cơm nguội, trứng, xúc xích, hành khô, hành lá.",
        method: "Phi hành → cho xúc xích cắt hạt lựu vào đảo → cho cơm nguội vào đảo → đập trứng vào và đảo mạnh tay → nêm nước mắm/xì dầu, hạt nêm → thêm hành lá.",
        image: "/cong thuc/ Cơm Chiên Trứng – Xúc Xích.jpg"
    },
    {
        id: 8,
        title: "Canh Ngao Nấu Chua",
        ingredients: "Ngao, cà chua, dứa, hành lá, rau ngổ.",
        method: "Luộc ngao đến khi mở miệng → bỏ vỏ và giữ nước luộc → xào cà chua mềm → cho nước luộc ngao vào → thêm dứa → đun sôi → cho thịt ngao vào → nêm gia vị → thêm rau ngổ và hành lá.",
        image: "/cong thuc/Canh Ngao Nấu Chua.jpg"
    }
];

const tipsData = [
    {
        title: "Mua hải sản và rau đông lạnh",
        content: "Thực phẩm đông lạnh rẻ hơn so với đồ tươi và công nghệ đông lạnh đã thực sự được cải thiện. Trước đây, thực phẩm đông lạnh thường chất lượng không đảm bảo, nhưng bây giờ, cá được đông lạnh ngay từ trên thuyền nên giữ nguyên sự tươi ngon."
    },
    {
        title: "Chuẩn bị danh sách mặt hàng cần mua",
        content: "Khi có sẵn danh sách cần mua, bạn sẽ không bỏ sót thứ quan trọng và ít bị cám dỗ bởi những lần mua hàng bốc đồng. Bạn cũng sẽ ít mệt mỏi hơn. Mua sắm khi có sẵn danh sách giảm 30% - 50% hóa đơn của bạn. Nếu bạn lên kế hoạch nấu ăn từng tuần một, việc chi tiêu sẽ tiết kiệm hơn."
    },
    {
        title: "Đi chợ nông sản vào cuối ngày",
        content: "Trước khoảng thời gian đóng cửa, tại các chợ nông sản thường có rất nhiều đặc quyền mua với giá rẻ. Ngoài việc nhận được những món hàng chất lượng, bạn còn có những ưu đãi tuyệt vời từ người bán hàng vì họ còn muốn thanh lý để nhập hàng mới, hoặc đóng cửa về nhà sớm. Bạn thậm chí còn nhận được nhiều khuyến mại hơn nếu gặp người bán dễ tính."
    },
    {
        title: "Tìm hiểu lịch \"giảm giá\"",
        content: "Ghi chú và biết cửa hàng sẽ có những chương trình gì trong cách bán hàng. Món mà bạn thích có thể sẽ được bán trong sự kiện lớn tiếp theo của cửa hàng. Nếu các chủ cửa hàng sử dụng “thông báo bán hàng” để thu hút người mua, bạn có thể tận dụng để có được thứ mình muốn với giá hời."
    },
    {
        title: "Sử dụng tiền mặt khi mua hàng",
        content: "Ngoài các rủi ro bảo mật, thanh toán bằng thẻ có thể khiến bạn mua nhiều hơn mức cần thiết vì không thể nhìn thấy số tiền mình đang chi tiêu trên thực tế. Mua hàng không dùng tiền mặt tạo ra ảo tưởng rằng bạn có khả năng chi tiêu không giới hạn. Còn ngược lại, thanh toán bằng tiền mặt giúp bạn lập ngân sách cho các giao dịch mua sắm của mình một cách khôn ngoan."
    },
    {
        title: "Săn các mặt hàng theo mùa để tươi ngon và tiết kiệm",
        content: "Nếu bạn muốn mua những thực phẩm tươi ngon, chất lượng và giá rẻ, bạn nên bắt đầu mua sắm sớm các mặt hàng theo mùa. Ví dụ: Bạn có thể mua rau xanh vào đầu xuân, trái cây vào đầu hè, khoai lang vào đầu thu… Khi đó, bạn sẽ có được những sản phẩm ngon nhất với giá tốt nhất, vừa đảm bảo dinh dưỡng vừa tiết kiệm chi phí."
    },
    {
        title: "Không ham mua đồ giảm giá không cần thiết",
        content: "Một sai lầm thường gặp khi đi chợ là mua quá nhiều đồ giảm giá mà không cân nhắc kỹ. Bạn có thể nghĩ rằng mua đồ giảm giá là một cách tiết kiệm tiền, nhưng thực tế là nó có thể gây lãng phí và tốn kém hơn."
    }
];

const rules = [
    { title: "Luật 1 (Ngon & Bổ)", content: "Tất cả công thức đều dễ thực hiện và đạt tiêu chuẩn dinh dưỡng cơ bản." },
    { title: "Luật 2 (Chi phí)", content: "Chi phí nguyên vật liệu cho mỗi bữa ăn không vượt quá 25.000 VNĐ." },
    { title: "Luật 3 (Thời gian)", content: "Tổng thời gian chuẩn bị và nấu nướng không vượt quá 15 PHÚT." }
];

const toc = [
    "Trang Bìa",
    "Mục lục",
    "Lời nói đầu",
    "Luật Chơi của The Right Meal",
    "Survival Meal là gì?",
    "Bộ Công Thức",
    "Bảng Tính Dinh dưỡng",
    "Tips Hay",
    "Lời Kết"
];

// --- COMPONENTS ---

interface PageProps {
    children: React.ReactNode; 
    number: number;
    className?: string; // Optional styling
}

const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    return (
        <div className={`page bg-[#fffcf7] shadow-sm h-full ${props.className || ''}`} ref={ref}>
            <div className="relative h-full w-full overflow-hidden border-r border-slate-200/60 p-6 md:p-8 flex flex-col">
                {props.children}
                <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-serif italic">
                    {props.number}
                </div>
            </div>
        </div>
    );
});
Page.displayName = 'Page';

export default function FlipbookModal({ isOpen, onClose }: FlipbookModalProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const bookRef = useRef<any>(null);

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

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/90 backdrop-blur-md"
                    onClick={onClose}
                >
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-colors z-50 p-2"
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <motion.div 
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="relative w-full max-w-6xl flex items-center justify-center h-[95vh] md:h-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Navigation Buttons */}
                        <button onClick={prevFlip} className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center transition-colors">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={nextFlip} className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full items-center justify-center transition-colors">
                            <ChevronRight className="w-6 h-6" />
                        </button>

                        <div className="w-full h-full flex items-center justify-center overflow-hidden">
                             {/* @ts-expect-error - Library types mismatch */}
                             <HTMLFlipBook 
                                width={550} 
                                height={750} 
                                size="stretch"
                                minWidth={300}
                                maxWidth={1000}
                                minHeight={400}
                                maxHeight={1200}
                                showCover={true}
                                mobileScrollSupport={true}
                                className="flip-book shadow-2xl"
                                ref={bookRef}
                                style={{ margin: '0 auto' }}
                            >
                                {/* PAGE 1: COVER */}
                                <div className="page" data-density="hard">
                                    <div className="relative w-full h-full">
                                        <Image src="/ebook/1.png" alt="Cover" fill className="object-cover" priority />
                                    </div>
                                </div>

                                {/* PAGE 2: MỤC LỤC */}
                                <Page number={2}>
                                    <div className="flex flex-col h-full justify-center">
                                        <h2 className="font-serif text-3xl font-bold text-center text-[#A67C52] mb-8 border-b-2 border-[#A67C52] pb-4 inline-block mx-auto">Mục Lục</h2>
                                        <ul className="space-y-4 px-4">
                                            {toc.map((item, idx) => (
                                                <li key={idx} className="flex items-baseline justify-between text-slate-700 hover:text-[#A67C52] transition-colors cursor-pointer group">
                                                    <span className="font-serif text-lg font-medium relative z-10 bg-[#fffcf7] pr-2 group-hover:pl-2 transition-all">
                                                        {idx + 1}. {item}
                                                    </span>
                                                    <span className="flex-1 border-b border-dotted border-slate-300 mx-2 relative -top-1"></span>
                                                    <span className="text-sm font-mono text-slate-400">{idx === 0 ? '1' : ''}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Page>

                                           {/* PAGE 3: LỜI NÓI ĐẦU */}
                                <Page number={3}>
                                    <div className="flex flex-col h-full justify-center text-center px-4">
                                        <div className="mb-6 mx-auto w-12 h-12 text-[#A67C52]">
                                            <Leaf className="w-full h-full" />
                                        </div>
                                        <h2 className="story-script-regular text-3xl font-bold text-[#2D2A26] mb-6">Lời Nói Đầu</h2>
                                        <p className="text-slate-600 leading-relaxed text-lg font-light italic">
                                            &quot;Nhóm 60 - CNTT & TT ULIS hiểu rõ cuộc chiến giữa chi tiêu và dinh dưỡng của bạn. Chúng mình mong E-book này là cầu nối giúp sinh viên tự chủ tài chính ngay từ căn bếp, mang đến giải pháp <strong className="text-[#A67C52] not-italic">&quot;CƠM TỰ NẤU, TIỀN TỰ CHỦ&quot;</strong> dành riêng cho cộng đồng ULIS.&quot;
                                        </p>
                                        <div className="mt-8 w-24 h-0.5 bg-[#A67C52] mx-auto opacity-50"></div>
                                    </div>
                                </Page>
                                {/* PAGE 4: SURVIVAL MEAL LÀ GÌ? */}
                                <Page number={4}>
                                     <div className="flex flex-col h-full justify-center">
                                        <h2 className="font-serif text-2xl font-bold text-[#2D2A26] mb-6 border-l-4 border-[#A67C52] pl-4">Survival Meal ULIS là gì?</h2>
                                        <div className="text-slate-600 space-y-4 text-justify leading-relaxed text-sm md:text-base">
                                            <p><strong className="text-[#A67C52]">Survival Meal ULIS</strong> là &quot;Kỹ thuật sinh tồn ẩm thực&quot; được thiết kế riêng cho sinh viên ULIS: bữa ăn cung cấp đủ năng lượng và dinh dưỡng để bạn vượt qua ngày dài học tập và hoạt động, với chi phí dưới <strong className="text-slate-900">25.000 VNĐ</strong> và thời gian chế biến dưới <strong className="text-slate-900">15 phút</strong>:</p>
                                            <ul className="list-disc pl-5 space-y-2 marker:text-[#A67C52]">
                                                <li>Survival Meal là công cụ kiểm soát tài chính hiệu quả nhất, giúp bạn đảm bảo mọi bữa ăn đều nằm trong ngân sách dưới 25.000 VNĐ, biến việc nấu ăn thành kỹ năng tiết kiệm tiền mặt.</li>
                                                <li>Với cam kết chỉ 15 phút chế biến, bữa ăn này giúp bạn phá vỡ rào cản thời gian, giải phóng quỹ thời gian quý báu để tập trung vào việc học, hoạt động ngoại khóa hoặc nghỉ ngơi.</li>
                                            </ul>
                                            <p className="bg-[#A67C52]/10 p-3 rounded-lg border border-[#A67C52]/20 italic text-slate-800 text-sm">
                                                Đây là bữa ăn &quot;ngon, bổ, rẻ&quot; đã được thẩm định. Nó đảm bảo bạn duy trì được năng lượng và sức khỏe cần thiết để &quot;sinh tồn&quot; và vượt qua lịch trình bận rộn của sinh viên ULIS.
                                            </p>
                                        </div>
                                     </div>
                                </Page>

                                {/* PAGE 5: LUẬT CHƠI */}
                                <Page number={5}>
                                    <div className="flex flex-col h-full justify-center">
                                        <h2 className="font-serif text-2xl font-bold text-center text-[#2D2A26] mb-8 uppercase tracking-widest">Luật Chơi<br/><span className="text-[#A67C52] text-sm lowercase tracking-normal font-sans italic">của The Right Meal</span></h2>
                                        <div className="space-y-6">
                                            {rules.map((rule, idx) => (
                                                <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-[#A67C52]/20">
                                                    <h4 className="font-serif font-bold text-[#A67C52] mb-1">{rule.title}</h4>
                                                    <p className="text-slate-600 text-sm leading-relaxed">{rule.content}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </Page>

                                {/* PAGE 6: SECTION TITLE */}
                                <Page number={6}>
                                    <div className="flex flex-col h-full justify-center items-center">
                                        <h1 className="story-script-regular text-5xl md:text-6xl text-[#A67C52] text-center leading-tight p-4">
                                            Bộ Công Thức <br/> Nấu Ăn
                                        </h1>
                                        <div className="w-24 h-1 bg-[#A67C52] mt-6 rounded-full opacity-60"></div>
                                    </div>
                                </Page>

                                {/* RECIPE PAGES: 1 Recipe per Page (Pages 7-14) */}
                                {recipesData.map((recipe, index) => (
                                    <Page key={recipe.id} number={7 + index}>
                                        <div className="flex flex-col h-full items-center">
                                            {/* Header - Removed "Bộ Công Thức" header as we have a title page now */}
                                            <div className="w-full flex-1 flex flex-col items-center">
                                                <div className="bg-white/50 p-4 rounded-xl border border-[#A67C52]/10 w-full h-full flex flex-col">
                                                    
                                                     <h3 className="story-script-regular font-bold text-2xl text-[#2D2A26] leading-tight text-center mb-4">
                                                        <span className="text-[#A67C52] mr-2">#{recipe.id}.</span>
                                                        {recipe.title}
                                                    </h3>

                                                    <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow-md mb-6 shrink-0 max-h-[230px] md:max-h-[280px]">
                                                        <Image src={recipe.image || '/placeholder-food.jpg'} alt={recipe.title} fill className="object-cover" />
                                                    </div>

                                                    <div className="flex-1 overflow-auto w-full space-y-4 px-2">
                                                        <div>
                                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 border-b border-dashed border-slate-300 pb-1">Nguyên Liệu:</p>
                                                            <ul className="text-sm text-slate-700 leading-relaxed list-none pl-0 m-0 space-y-1">
                                                                {recipe.ingredients.split(/,|;/).map((item: string, i: number) => (
                                                                    <li key={i} className="pl-4 relative before:content-['-'] before:absolute before:left-0 before:text-slate-400">
                                                                        {item.trim()}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 border-b border-dashed border-slate-300 pb-1">Cách Làm:</p>
                                                            <ul className="text-sm text-slate-700 leading-relaxed list-none pl-0 m-0 space-y-2">
                                                                {recipe.method.split('→').map((step: string, i: number) => (
                                                                    <li key={i} className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-[#A67C52]">
                                                                        <span className="font-semibold text-slate-600 mr-2">B{i+1}:</span>
                                                                        {step.trim()}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Page>
                                ))}

                                {/* PAGE 15: NUTRITION */}
                                <Page number={15}>
                                    <div className="flex flex-col h-full overflow-hidden px-2">
                                         <h2 className="font-serif text-3xl font-bold text-center text-[#2D2A26] mb-4 pt-6">Bảng Tính Dinh Dưỡng</h2>
                                         
                                         <div className="flex-1 overflow-auto pb-4 custom-scrollbar">
                                            {/* Intro Text - Beige Box */}
                                            <div className="mb-6 text-xs sm:text-sm text-slate-700 text-justify leading-relaxed bg-[#FDF6E3] p-4 rounded-xl border border-[#A67C52]/20 shadow-sm">
                                                <strong className="text-[#A67C52]">Bạn không cần phải là chuyên gia dinh dưỡng để biết mình đang nạp gì vào cơ thể!</strong> Survival Meal ULIS không chỉ giúp bạn &quot;sống sót&quot; về tài chính mà còn giúp bạn &quot;phát triển&quot; về thể chất. Mỗi bữa ăn đều là một quyết định chiến lược giúp bạn khỏe mạnh và duy trì ngân sách dưới <strong className="text-[#A67C52]">25.000 VNĐ</strong> một cách thông minh nhất.
                                            </div>

                                            {/* Table Implementation - Dark Theme */}
                                            <div className="w-full text-xs sm:text-[11px] md:text-xs">
                                                {/* Header */}
                                                <div className="grid grid-cols-12 gap-2 bg-[#1A202C] text-white p-3 font-bold mb-3 rounded-lg items-center text-center shadow-md uppercase tracking-wider">
                                                    <div className="col-span-1">STT</div>
                                                    <div className="col-span-3">Món Ăn</div>
                                                    <div className="col-span-2">Kcal</div>
                                                    <div className="col-span-3">Điểm Mạnh</div>
                                                    <div className="col-span-3">Chiến Lược</div>
                                                </div>
                                                
                                                {/* Rows */}
                                                <div className="space-y-3">
                                                    {/* Row 1 */}
                                                    <div className="grid grid-cols-12 gap-2 bg-[#2D3748] text-white p-3 items-center rounded-lg shadow-md min-h-[60px]">
                                                        <div className="col-span-1 font-bold text-base text-center text-[#F6AD55]">1</div>
                                                        <div className="col-span-3 font-bold text-[#EDF2F7]">Đậu Hũ Nhồi Thịt Sốt Cà</div>
                                                        <div className="col-span-2 text-center text-[#F6AD55] font-semibold">380 - 450</div>
                                                        <div className="col-span-3 text-left">
                                                            <strong className="block text-[#F6AD55] mb-1 uppercase text-[10px]">PROTEIN TINH GỌN</strong>
                                                            <span className="text-slate-300 block leading-tight">Đạm cao từ đậu & thịt, ít béo.</span>
                                                        </div>
                                                        <div className="col-span-3 italic text-slate-400 text-left leading-tight">
                                                            Hỗ trợ cơ bắp & giữ no lâu. Tốt cho tập luyện.
                                                        </div>
                                                    </div>

                                                    {/* Row 2 */}
                                                    <div className="grid grid-cols-12 gap-2 bg-[#2D3748] text-white p-3 items-center rounded-lg shadow-md min-h-[60px]">
                                                        <div className="col-span-1 font-bold text-base text-center text-[#F6AD55]">2</div>
                                                        <div className="col-span-3 font-bold text-[#EDF2F7]">Gà Xào Sả Ớt <br/><span className="font-normal italic text-slate-400 text-[10px]">(+ Cơm)</span></div>
                                                        <div className="col-span-2 text-center text-[#F6AD55] font-semibold">450 - 520</div>
                                                        <div className="col-span-3 text-left">
                                                            <strong className="block text-[#F6AD55] mb-1 uppercase text-[10px]">ĐẠM & NĂNG LƯỢNG</strong>
                                                            <span className="text-slate-300 block leading-tight">Protein cao + Carb dồi dào.</span>
                                                        </div>
                                                        <div className="col-span-3 italic text-slate-400 text-left leading-tight">
                                                            Năng lượng bền vững để học tập tập trung.
                                                        </div>
                                                    </div>

                                                    {/* Row 3 */}
                                                    <div className="grid grid-cols-12 gap-2 bg-[#2D3748] text-white p-3 items-center rounded-lg shadow-md min-h-[60px]">
                                                        <div className="col-span-1 font-bold text-base text-center text-[#F6AD55]">3</div>
                                                        <div className="col-span-3 font-bold text-[#EDF2F7]">Bún Thịt Xào</div>
                                                        <div className="col-span-2 text-center text-[#F6AD55] font-semibold">400 - 480</div>
                                                        <div className="col-span-3 text-left">
                                                            <strong className="block text-[#68D391] mb-1 uppercase text-[10px]">CÂN BẰNG TỐT</strong>
                                                            <span className="text-slate-300 block leading-tight">Nhiều rau xơ, Carb & Đạm vừa phải.</span>
                                                        </div>
                                                        <div className="col-span-3 italic text-slate-400 text-left leading-tight">
                                                            Tiêu hóa nhẹ, tránh buồn ngủ sau ăn.
                                                        </div>
                                                    </div>

                                                    {/* Row 4 */}
                                                    <div className="grid grid-cols-12 gap-2 bg-[#2D3748] text-white p-3 items-center rounded-lg shadow-md min-h-[60px]">
                                                        <div className="col-span-1 font-bold text-base text-center text-[#F6AD55]">4</div>
                                                        <div className="col-span-3 font-bold text-[#EDF2F7]">Cơm Chiên Trứng Xúc Xích</div>
                                                        <div className="col-span-2 text-center text-[#F6AD55] font-semibold">500 - 600</div>
                                                        <div className="col-span-3 text-left">
                                                            <strong className="block text-[#F6AD55] mb-1 uppercase text-[10px]">NHIÊN LIỆU NHANH</strong>
                                                            <span className="text-slate-300 block leading-tight">Carb & Fat cao.</span>
                                                        </div>
                                                        <div className="col-span-3 italic text-slate-400 text-left leading-tight">
                                                            Cấp cứu năng lượng gấp cho hoạt động cao.
                                                        </div>
                                                    </div>

                                                    {/* Row 5 */}
                                                     <div className="grid grid-cols-12 gap-2 bg-[#2D3748] text-white p-3 items-center rounded-lg shadow-md min-h-[60px]">
                                                        <div className="col-span-1 font-bold text-base text-center text-[#F6AD55]">5</div>
                                                        <div className="col-span-3 font-bold text-[#EDF2F7]">Canh Bí Đỏ Tôm Khô</div>
                                                        <div className="col-span-2 text-center text-[#F6AD55] font-semibold">120 - 180</div>
                                                        <div className="col-span-3 text-left">
                                                            <strong className="block text-[#68D391] mb-1 uppercase text-[10px]">VITAMIN (LOW CAL)</strong>
                                                            <span className="text-slate-300 block leading-tight">Ít calo, giàu xơ & Beta-Carotene.</span>
                                                        </div>
                                                        <div className="col-span-3 italic text-slate-400 text-left leading-tight">
                                                            Tăng thể tích bữa ăn, hỗ trợ tiêu hóa.
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                         </div>
                                    </div>
                                </Page> 

                                {/* PAGE 16: TIPS 1-4 */}
                                <Page number={16}>
                                    <h2 className="font-serif text-3xl font-bold text-center text-[#A67C52] mb-6">Tips Hay</h2>
                                    <div className="space-y-3">
                                         {tipsData.slice(0, 4).map((tip, idx) => (
                                            <div key={idx} className="bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                                                <h4 className="font-serif font-bold text-[#A67C52] text-lg mb-1">{idx+1}. {tip.title}</h4>
                                                <p className="text-[12px] sm:text-[14px] text-slate-600 text-justify leading-relaxed">{tip.content}</p>
                                            </div>
                                         ))}
                                    </div>
                                </Page>

                                {/* PAGE 17: TIPS 5-7 */}
                                <Page number={17}>
                                    {/* Add a spacer to match the height of the Main Title + Margin on Page 16 so cards align */}
                                    <div className=" w-full mb-16 pointer-events-none md:block hidden"></div> 
                                    {/* Mobile: just top align. Desktop: align with opposite page cards */}
                                    
                                    <div className="space-y-4">
                                         {tipsData.slice(4, 7).map((tip, idx) => (
                                            <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                                                <h4 className="font-serif font-bold text-[#A67C52] text-lg mb-2">{idx+5}. {tip.title}</h4>
                                                <p className="text-[12px] sm:text-[14px] text-slate-600 text-justify leading-relaxed">{tip.content}</p>
                                            </div>
                                         ))}
                                    </div>
                                </Page>

                                {/* PAGE 18: CONCLUSION */}
                                <Page number={18}>
                                    <div className="flex flex-col h-full justify-center text-center px-4">
                                        <h2 className="font-serif text-3xl font-bold text-[#2D2A26] mb-6 story-script-regular">Lời Kết</h2>
                                        <p className="text-slate-600 leading-relaxed text-base italic mb-8">
                                            &quot;HÀNH TRÌNH TIẾT KIỆM CỦA BẠN CHỈ MỚI BẮT ĐẦU! Cảm ơn bạn đã tin tưởng The Right Meal. Đừng quên truy cập Website/Fanpage của Nhóm 60 để nhận thêm Thực đơn mẫu, Mẹo đi chợ và tham gia cộng đồng Review Quán Ăn Ngon - Rẻ nhé!&quot;
                                        </p>
                                        <div className="flex justify-center mb-8">
                                            <div className="w-16 h-16 bg-[#A67C52] rounded-full flex items-center justify-center">
                                                <Award className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </Page>

                                {/* BACK COVER - Optional 14 */}
                                <div className="page" data-density="hard">
                                     <div className="relative w-full h-full bg-[#2D2A26] flex items-center justify-center">
                                         <div className="text-center">
                                            <h3 className="font-serif text-2xl text-[#f39c12] mb-2">THE RIGHT MEAL</h3>
                                            <p className="text-slate-400 text-sm">Design by Team 60</p>
                                         </div>
                                     </div>
                                </div>

                            </HTMLFlipBook>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
