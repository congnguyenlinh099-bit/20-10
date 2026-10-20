// Vouchers Data and Flip Interaction for Tieu My
export const vouchersData = [
  {
    id: 'vc-1',
    icon: '🧋',
    tag: 'Tiếp Pin Khẩn Cấp',
    title: 'Voucher Nạp Pin Sau Ca Đứng',
    frontDesc: 'Dành riêng cho ca làm việc bận rộn tại Thế Giới Di Động...',
    backBenefit: 'Quyền lợi: 1 ly trà sữa hoặc nước ép full topping nạp năng lượng ngay khi em thấy đứng mỏi chân hoặc hết pin!',
    expiry: 'Có hiệu lực bất cứ khi nào em cần'
  },
  {
    id: 'vc-2',
    icon: '🏸',
    tag: 'Kèo Đầm Dơi',
    title: 'Voucher So Tài Cầu Lông & Vài Lon',
    frontDesc: 'Dành riêng cho cô gái từng tập Gym & Cầu lông...',
    backBenefit: 'Quyền lợi: 1 trận so tài cầu lông khi anh về Cà Mau. Ai thua tự giác phạt "vài lon sương sương" theo luật miền Tây kkk!',
    expiry: 'Hạn dùng: Đợt anh về quê gần nhất'
  },
  {
    id: 'vc-3',
    icon: '🍜',
    tag: 'Tour Ăn Vặt SG',
    title: 'Voucher Dẫn Tour Ăn Uống Sài Gòn',
    frontDesc: 'Khi nào có dịp lên Sài Gòn chơi...',
    backBenefit: 'Quyền lợi: Lịnh dẫn đi ăn vặt đặc sản Sài Gòn, bao no bao ngon, không giới hạn số món kkk!',
    expiry: 'Hạn dùng: Khi nào em ghé SG'
  },
  {
    id: 'vc-4',
    icon: '☕',
    tag: 'Chill Không Giới Hạn',
    title: 'Voucher Cafe Ngồi Chill',
    frontDesc: 'Dành cho những lúc muốn xả stress sau giờ làm...',
    backBenefit: 'Quyền lợi: 1 buổi cafe thảnh thơi ngồi nói chuyện trời đất, không giới hạn thời gian, không giới hạn chủ đề!',
    expiry: 'Tới đâu tính tới đó kkk'
  }
];

export function renderVouchers(containerId, onFlipCallback) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = vouchersData.map(v => `
    <div class="voucher-card" data-id="${v.id}" onclick="this.classList.toggle('flipped'); if(window.onVoucherFlip) window.onVoucherFlip('${v.id}');">
      <div class="voucher-inner">
        <!-- Front side -->
        <div class="voucher-face front">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="pill-badge" style="margin: 0; font-size: 0.75rem;">${v.tag}</span>
            <span style="font-size: 1.5rem;">${v.icon}</span>
          </div>
          <div>
            <h4 style="color: var(--primary); font-size: 1.05rem; margin: 8px 0 4px;">${v.title}</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted);">${v.frontDesc}</p>
          </div>
          <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 500;">
            👉 Chạm vào thẻ để lật xem quyền lợi
          </div>
        </div>

        <!-- Back side -->
        <div class="voucher-face back">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600; font-size: 0.8rem; color: var(--primary);">ĐẶC QUYỀN ĐÃ MỞ KHÓA ✨</span>
            <span style="font-size: 1.3rem;">${v.icon}</span>
          </div>
          <div style="font-size: 0.88rem; color: var(--text-main); font-weight: 500; line-height: 1.5;">
            ${v.backBenefit}
          </div>
          <div style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">
            ⏳ ${v.expiry}
          </div>
        </div>
      </div>
    </div>
  `).join('');
}
