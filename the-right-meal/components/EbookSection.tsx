'use client';

import { useState } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";
import { Download, Clock, Wallet, Heart, ChefHat, Flame } from "lucide-react";
import RecipeModal from './RecipeModal';
import FlipbookModal from './FlipbookModal';
import DownloadModal from './DownloadModal';

// 1. RECIPE DATA
const recipes = [
    {
        title: "Gà Xào Sả Ớt",
        image: "/cong thuc/Gà Xào Sả Ớt.jpg",
        ingredients: "Thịt gà, sả băm, ớt, tỏi, nước mắm, tiêu, cơm nóng.",
        instructions: "1. Phi thơm tỏi và sả băm.\n2. Cho gà vào xào săn chín kĩ.\n3. Nêm nước mắm, hạt tiêu cho vừa miệng.\n4. Dùng kèm cơm nóng.",
        nutrition: "Năng lượng: 450 – 520 Kcal\n\nĐiểm mạnh dinh dưỡng:\nĐẠM KÈM NĂNG LƯỢNG BỀN VỮNG – Cung cấp cả Protein chất lượng cao và Carb dồi dào từ cơm.\n\nTác dụng chiến lược:\nNguồn năng lượng hoàn hảo để duy trì sự tập trung cho buổi học kéo dài."
    },
    {
        title: "Đậu Hũ Nhồi Thịt Sốt Cà",
        image: "/cong thuc/Đậu Hũ Nhồi Thịt Sốt Cà.jpg",
        ingredients: "Đậu hũ, thịt băm, cà chua, hành lá, gia vị.",
        instructions: "1. Nhồi thịt băm đã ướp vào miếng đậu hũ.\n2. Chiên vàng các mặt đậu.\n3. Làm sốt cà chua, nêm nếm vừa ăn.\n4. Cho đậu vào rim 5 phút, rắc hành lá.",
        nutrition: "Năng lượng: 380 – 450 Kcal\n\nĐiểm mạnh dinh dưỡng:\nPROTEIN TINH GỌN (LEAN PROTEIN) – Hàm lượng đạm từ đậu phụ và thịt băm cao, chất béo thấp.\n\nTác dụng chiến lược:\nHỗ trợ phục hồi cơ bắp và giữ no lâu sau bữa ăn. Rất tốt cho người tập thể thao/giữ dáng."
    },
    {
        title: "Thịt Băm Khoai Tây",
        image: "/cong thuc/Thịt Băm Xào Khoai Tây.jpg",
        ingredients: "Thịt heo băm, khoai tây, tỏi băm, tiêu, hành lá.",
        instructions: "1. Phi thơm tỏi, cho thịt vào xào săn.\n2. Nêm gia vị vừa ăn.\n3. Cho khoai tây thái lát mỏng vào xào cùng.\n4. Thêm chút nước, đun 1-2 phút cho khoai mềm.\n5. Rắc tiêu và hành lá.",
        nutrition: ""
    },
    {
        title: "Canh Bí Đỏ Nấu Tôm Khô",
        image: "/cong thuc/Canh Bí Đỏ Nấu Tôm Khô.jpg",
        ingredients: "Bí đỏ, tôm khô, hành lá, gia vị.",
        instructions: "1. Nấu tôm khô với nước sôi cho ngọt nước.\n2. Cho bí đỏ cắt miếng vào nấu mềm.\n3. Nêm gia vị vừa miệng.\n4. Tắt bếp, thêm hành lá cắt nhỏ.",
        nutrition: "Năng lượng: 120 – 180 Kcal\n\nĐiểm mạnh dinh dưỡng:\nVITAMIN VÀ KHOÁNG CHẤT (LOW CAL) – Rất ít calo, giàu chất xơ và vitamin (Beta-Carotene).\n\nTác dụng chiến lược:\nTuyệt vời để bổ sung vào bữa ăn chính, tăng thể tích mà không tăng nhiều calo, hỗ trợ tiêu hóa."
    },
    {
        title: "Bún Thịt Xào",
        image: "/cong thuc/Bún Thịt Xào.jpg",
        ingredients: "Bún tươi, thịt heo, rau xà lách, dưa leo, mắm chua ngọt.",
        instructions: "1. Thịt heo ướp gia vị, xào chín tới.\n2. Xếp bún, rau sống, dưa leo ra bát.\n3. Cho thịt xào lên trên.\n4. Chan nước mắm chua ngọt và trộn đều.",
        nutrition: "Năng lượng: 400 – 480 Kcal\n\nĐiểm mạnh dinh dưỡng:\nCÂN BẰNG TỐT NHẤT (THE BALANCER) – Lượng rau xanh và chất xơ lớn, Carb và Đạm vừa phải.\n\nTác dụng chiến lược:\nGiúp tiêu hóa nhẹ nhàng và tránh cảm giác đầy bụng, buồn ngủ sau khi ăn trưa."
    },
    {
        title: "Gà Rim Mặn Ngọt",
        image: "/cong thuc/ Gà Rim Mặn Ngọt.jpg",
        ingredients: "Thịt gà, tỏi, tiêu, đường, mắm, tương ớt.",
        instructions: "1. Phi thơm tỏi, cho gà vào đảo săn.\n2. Thêm đường, mắm, tương ớt vào rim.\n3. Đun nhỏ lửa 5-7 phút cho sốt sệt lại.\n4. Rắc hạt tiêu cho thơm.",
        nutrition: ""
    },
    {
        title: "Cơm Chiên Trứng – Xúc Xích",
        image: "/cong thuc/ Cơm Chiên Trứng – Xúc Xích.jpg",
        ingredients: "Cơm nguội, trứng, xúc xích, hành khô, hành lá.",
        instructions: "1. Phi thơm hành khô.\n2. Cho xúc xích thái hạt lựu vào đảo sơ.\n3. Cho cơm nguội vào đảo tơi.\n4. Đập trứng vào đảo đều tay cho trứng bám cơm.\n5. Nêm nếm gia vị, thêm hành lá.",
        nutrition: "Năng lượng: 500 – 600 Kcal\n\nĐiểm mạnh dinh dưỡng:\nNẠP NHIÊN LIỆU NHANH – Hàm lượng Carb và Fat cao. Nguồn năng lượng dự trữ cho cơ thể.\n\nTác dụng chiến lược:\nPhù hợp cho những ngày hoạt động thể lực cao hoặc cần cấp cứu năng lượng gấp."
    },
    {
        title: "Canh Ngao Nấu Chua",
        image: "/cong thuc/Canh Ngao Nấu Chua.jpg",
        ingredients: "Ngao, cà chua, dứa, hành lá, rau ngổ.",
        instructions: "1. Luộc ngao há miệng, nhặt thịt, giữ nước trong.\n2. Xào cà chua cho mềm, đổ nước luộc ngao vào.\n3. Thêm dứa đun sôi.\n4. Thả thịt ngao vào, nêm gia vị.\n5. Thêm rau ngổ, hành lá rồi tắt bếp.",
        nutrition: ""
    },
];

const tips = [
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
        content: "Trước khoảng thời gian đóng cửa, tại các chợ nông sản thường có rất nhiều đặc quyền mua với giá rẻ. Ngoài việc nhận được những món hàng chất lượng, bạn còn có những ưu đãi tuyệt vời từ người bán hàng vì họ còn muốn thanh lý để nhập hàng mới, hoặc đóng cửa về nhà sớm."
    },
    {
        title: "Tìm hiểu lịch 'giảm giá'",
        content: "Ghi chú và biết cửa hàng sẽ có những chương trình gì trong cách bán hàng. Món mà bạn thích có thể sẽ được bán trong sự kiện lớn tiếp theo của cửa hàng. Nếu các chủ cửa hàng sử dụng “thông báo bán hàng” để thu hút người mua, bạn có thể tận dụng để có được thứ mình muốn với giá hời."
    },
    {
        title: "Sử dụng tiền mặt khi mua hàng",
        content: "Ngoài các rủi ro bảo mật, thanh toán bằng thẻ có thể khiến bạn mua nhiều hơn mức cần thiết vì không thể nhìn thấy số tiền mình đang chi tiêu trên thực tế. Mua hàng không dùng tiền mặt tạo ra ảo tưởng rằng bạn có khả năng chi tiêu không giới hạn."
    },
    {
        title: "Săn các mặt hàng theo mùa",
        content: "Nếu bạn muốn mua những thực phẩm tươi ngon, chất lượng và giá rẻ, bạn nên bắt đầu mua sắm sớm các mặt hàng theo mùa. Ví dụ: Bạn có thể mua rau xanh vào đầu xuân, trái cây vào đầu hè, khoai lang vào đầu thu… Khi đó bạn sẽ có được những sản phẩm ngon nhất với giá tốt nhất."
    },
    {
        title: "Không ham mua đồ giảm giá không cần thiết",
        content: "Một sai lầm thường gặp khi đi chợ là mua quá nhiều đồ giảm giá mà không cân nhắc kỹ. Bạn có thể nghĩ rằng mua đồ giảm giá là một cách tiết kiệm tiền, nhưng thực tế là nó có thể gây lãng phí và tốn kém hơn."
    }
];

export default function EbookSection() {
    const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
    const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

    const openModal = (recipe: typeof recipes[0]) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    return (
        <section id="ebook" className="relative py-8 md:py-10 bg-[#fffcf7] font-(--font-outfit)">
            {/* Blend Overlay: Fades from About section's #F2F0E9 to transparent */}
            <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#F2F0E9] to-transparent z-0 pointer-events-none"></div>
            {/* Modal */}
            <RecipeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} recipe={selectedRecipe} />
            <FlipbookModal isOpen={isFlipbookOpen} onClose={() => setIsFlipbookOpen(false)} />
            <DownloadModal isOpen={isDownloadModalOpen} onClose={() => setIsDownloadModalOpen(false)} />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                
                {/* 0. SECTION HEADER (Moved to top) */}
                <div className="text-center mb-10 md:mb-16 max-w-4xl mx-auto">
                    <span className="text-[#A67C52] font-bold tracking-widest uppercase text-sm mb-3 block">
                        E-book
                    </span>
                    <h2 className="story-script-regular text-4xl md:text-5xl lg:text-7xl text-slate-900 leading-tight mb-4 md:mb-6">
                        Survival Meal <span className="text-[#A67C52] italic">ULIS</span>
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-900 font-light max-w-4xl mx-auto">
                        Giải pháp &quot;Ăn Ngon - Sống Khỏe - Tiết Kiệm&quot; dành riêng cho sinh viên.
                    </p>
                    <div className="w-24 md:w-32 h-1 bg-[#A67C52] mx-auto mt-6 md:mt-8"></div>
                </div>

                {/* 1. HERO - BOOK LEFT / CONTENT RIGHT */}
                <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-16 md:mb-24 items-start">
                    {/* Left: Book Cover + CTA Button */}
                    <div className="lg:col-span-5 flex flex-col items-center lg:items-center text-center">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            onClick={() => setIsFlipbookOpen(true)}
                            className="relative w-[280px] sm:w-[350px] md:w-[400px] aspect-3/4 shadow-2xl rounded-r-2xl border-l-4 border-[#2D2A26] overflow-hidden transform hover:rotate-2 transition-transform duration-500 cursor-pointer mb-6 md:mb-8"
                        >
                            <Image src="/ebook/1.png" alt="Survival Meal ULIS Ebook" fill className="object-cover" />
                             {/* Badge */}
                             <div className="absolute top-4 right-4 bg-[#e74c3c] text-white font-bold text-sm px-3 py-1 rounded-full shadow-lg">
                                FREE
                            </div>
                        </motion.div>
                        
                        {/* CTA moved under book */}
                        <button 
                            onClick={() => setIsDownloadModalOpen(true)}
                            className="w-full sm:w-auto bg-[#e74c3c] hover:bg-[#c0392b] text-white font-bold px-8 py-3 rounded-full flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                        >
                            <Download className="w-5 h-5" /> TẢI MIỄN PHÍ NGAY
                        </button>
                    </div>

                    {/* Right: Foreword & Definition */}
                    <div className="lg:col-span-7 space-y-8 md:space-y-10">
                        

                         {/* Part 3: Lời Nói Đầu */}
                         <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border-l-4 border-[#A67C52]">
                            <h3 className="font-(--font-playfair) text-2xl md:text-3xl text-slate-900 mb-4 flex items-center gap-3">
                                <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-[#A67C52]" />
                                Lời Nói Đầu
                            </h3>
                            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                                <strong>Nhóm 60 - CNTT & TT ULIS</strong> hiểu rõ cuộc chiến giữa chi tiêu và dinh dưỡng của bạn. Chúng mình mong E-book này là cầu nối giúp sinh viên tự chủ tài chính ngay từ căn bếp, mang đến giải pháp <strong>&quot;CƠM TỰ NẤU, TIỀN TỰ CHỦ&quot;</strong> dành riêng cho cộng đồng ULIS.
                            </p>
                         </div>

                         {/* Part 5: Survival Meal ULIS là gì? */}
                         <div>
                            <div className="inline-block bg-[#f39c12] text-white px-4 py-1 text-xs font-bold uppercase rounded-md tracking-widest mb-3">
                                Định nghĩa
                            </div>
                            <h2 className="font-(--font-playfair) text-3xl md:text-4xl text-slate-900 mb-4">
                                &quot;Survival Meal ULIS&quot; là gì?
                            </h2>
                            <div className="space-y-4 text-slate-600 leading-relaxed text-base md:text-lg">
                                <p>
                                    <strong>Survival Meal ULIS</strong> là &quot;Kỹ thuật sinh tồn ẩm thực&quot; được thiết kế riêng cho sinh viên ULIS: bữa ăn cung cấp đủ năng lượng và dinh dưỡng để bạn vượt qua ngày dài học tập và hoạt động, với chi phí dưới <strong>25.000 VNĐ</strong> và thời gian chế biến dưới <strong>15 phút</strong>.
                                </p>
                                <p>
                                    Survival Meal là công cụ kiểm soát tài chính hiệu quả nhất, giúp bạn đảm bảo mọi bữa ăn đều nằm trong ngân sách dưới 25.000 VNĐ, biến việc nấu ăn thành kỹ năng tiết kiệm tiền mặt.
                                </p>
                                <p>
                                    Với cam kết chỉ 15 phút chế biến, bữa ăn này giúp bạn phá vỡ rào cản thời gian, giải phóng quỹ thời gian quý báu để tập trung vào việc học, hoạt động ngoại khóa hoặc nghỉ ngơi.
                                </p>
                                <p className="italic text-slate-800 border-l-2 border-[#f39c12] pl-4">
                                    Đây là bữa ăn &quot;ngon, bổ, rẻ&quot; đã được thẩm định. Nó đảm bảo bạn duy trì được năng lượng và sức khỏe cần thiết để &quot;sinh tồn&quot; và vượt qua lịch trình bận rộn của sinh viên ULIS.
                                </p>
                            </div>
                         </div>

                    </div>
                </div>

                {/* 2. RULES SECTION (Redesigned) */}
                <div className="mb-16 md:mb-24">
                     <div className="text-center mb-10 md:mb-16">
                        <span className="text-[#A67C52] font-bold tracking-widest uppercase text-sm mb-2 block">Core Values</span>
                        <h2 className="story-script-regular text-3xl md:text-4xl lg:text-5xl text-slate-900">Luật Chơi Của The Right Meal</h2>
                        <div className="w-16 h-1 bg-[#A67C52] mx-auto mt-6 rounded-full"></div>
                     </div>

                     <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {/* Rule 1 */}
                        <motion.div 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-linear-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Heart className="w-8 h-8 text-white" />
                            </div>
                            <div className="mt-8 md:mt-10 text-center">
                                <h4 className="font-(--font-playfair) text-xl md:text-2xl text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
                                    Ngon & Bổ
                                </h4>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    Tất cả công thức đều dễ thực hiện và đạt tiêu chuẩn dinh dưỡng cơ bản.
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 text-4xl md:text-6xl font-black text-slate-100 -z-10 select-none group-hover:text-green-50 transition-colors">01</div>
                        </motion.div>

                        {/* Rule 2 */}
                        <motion.div 
                             initial={{ opacity: 0, y: 50 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-linear-to-br from-orange-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Wallet className="w-8 h-8 text-white" />
                            </div>
                            <div className="mt-8 md:mt-10 text-center">
                                <h4 className="font-(--font-playfair) text-xl md:text-2xl text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                                    Chi Phí Thấp
                                </h4>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    Cam kết chi phí nguyên vật liệu không vượt quá <strong>25.000 VNĐ/bữa</strong>.
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 text-4xl md:text-6xl font-black text-slate-100 -z-10 select-none group-hover:text-orange-50 transition-colors">02</div>
                        </motion.div>

                        {/* Rule 3 */}
                        <motion.div 
                             initial={{ opacity: 0, y: 50 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.6, delay: 0.5 }}
                            className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 relative group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-linear-to-br from-red-500 to-rose-700 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                <Clock className="w-8 h-8 text-white" />
                            </div>
                            <div className="mt-8 md:mt-10 text-center">
                                <h4 className="font-(--font-playfair) text-xl md:text-2xl text-slate-900 mb-3 group-hover:text-red-600 transition-colors">
                                    Tốc Độ
                                </h4>
                                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                                    Tổng thời gian chuẩn bị và nấu nướng không vượt quá <strong>15 PHÚT</strong>.
                                </p>
                            </div>
                            <div className="absolute top-4 right-4 text-4xl md:text-6xl font-black text-slate-100 -z-10 select-none group-hover:text-red-50 transition-colors">03</div>
                        </motion.div>
                     </div>
                </div>

                {/* 3. RECIPE GRID (The Core Content) */}
                <div className="mb-16 md:mb-24">
                    <div className="text-center mb-8 md:mb-12">
                        <span className="block text-[#A67C52] font-bold tracking-[0.2em] uppercase text-sm mb-3">Menu Sinh Tồn</span>
                        <h2 className="story-script-regular text-3xl md:text-4xl lg:text-5xl text-slate-900">Bộ Công Thức</h2>
                        <div className="w-20 h-1 bg-[#A67C52] mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {recipes.map((item, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ delay: idx * 0.05 }}
                                onClick={() => openModal(item)}
                                className="group cursor-pointer relative aspect-3/4 rounded-2xl overflow-hidden shadow-lg"
                            >
                                <Image 
                                    src={item.image} 
                                    alt={item.title} 
                                    fill 
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0 pointer-events-auto">
                                        <span className="inline-block bg-white text-[#A67C52] text-sm font-bold px-4 py-2 rounded-full shadow-lg hover:bg-[#A67C52] hover:text-white transition-colors border border-[#A67C52]">
                                            Xem chi tiết
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-0 left-0 w-full p-3 md:p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300 bg-linear-to-t from-black/90 to-transparent pt-12">
                                    <h3 className="font-(--font-playfair) text-lg md:text-2xl text-[#F2F0E9] mb-1 leading-tight drop-shadow-md">
                                        {item.title}
                                    </h3>
                                    <div className="w-10 h-0.5 bg-[#A67C52] group-hover:w-full transition-all duration-500"></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 4. TIPS SECTION */}
                <section className="mb-16 md:mb-24 bg-[#EBE7DE] rounded-3xl p-6 md:p-16 relative overflow-hidden">
                    <div className="absolute -right-20 -top-20 w-48 h-48 md:w-64 md:h-64 bg-[#A67C52]/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="mb-8 md:mb-12 text-center md:text-left">
                        <h3 className="story-script-regular text-3xl md:text-4xl text-slate-900 mb-4 md:mb-6">
                            Tips & Công Cụ<br/>
                            <span className="text-[#A67C52] text-xl md:text-2xl italic">Mẹo vặt vàng cho sinh viên</span>
                        </h3>
                        <p className="text-slate-600 max-w-2xl text-sm md:text-base">
                            Những mẹo vặt giúp sinh viên ULIS chuẩn bị bữa ăn siêu tốc chỉ với 10 phút.
                        </p>
                    </div>
                        
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6 relative z-10">
                        {tips.map((tip, idx) => (
                            <div key={idx} className="bg-white p-5 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                <span className="font-(--font-playfair) text-lg md:text-xl text-[#A67C52] block mb-2">#{idx + 1}. {tip.title}</span>
                                <p className="text-slate-700 text-sm leading-relaxed text-justify">{tip.content}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. CONCLUSION & REGISTRATION FORM */}
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-8 md:mb-12">
                        <Flame className="w-10 h-10 md:w-12 md:h-12 text-[#e74c3c] mx-auto mb-4 md:mb-6" />
                        <h2 className="story-script-regular text-2xl md:text-3xl lg:text-4xl text-slate-900 mb-4 md:mb-6">
                            Lời Kết
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 italic leading-relaxed px-2">
                            &quot;HÀNH TRÌNH TIẾT KIỆM CỦA BẠN CHỈ MỚI BẮT ĐẦU! Cảm ơn bạn đã tin tưởng The Right Meal. Đừng quên truy cập Website/Fanpage của Nhóm 60 để nhận thêm Thực đơn mẫu, Mẹo đi chợ và tham gia cộng đồng Review Quán Ăn Ngon - Rẻ nhé!&quot;
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
