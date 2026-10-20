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
    icon: '🎱',
    tag: 'Kèo Giải Trí',
    title: 'Voucher Cafe Bida "Tới Đâu Tính Tới Đó"',
    frontDesc: 'Đúng tinh thần "tới đâu tính tới đó thoai" kkk...',
    backBenefit: 'Quyền lợi: 1 buổi cafe bida xả stress khi anh về quê, bao vui vẻ thoải mái không quạu!',
    expiry: 'Tới đâu tính tới đó kkk'
  },
  {
    id: 'vc-4',
    icon: '😴',
    tag: 'Đặc Quyền Nghỉ Ngơi',
    title: 'Voucher Ngủ Nướng Bù Năng Lượng',
    frontDesc: 'Dành riêng sau những ca làm việc bận rộn cả ngày...',
    backBenefit: 'Quyền lợi: Tắt hết báo thức, ngủ một giấc thẳng cẳng từ trưa tới chiều tối mà không ai được làm phiền!',
    expiry: 'Áp dụng vào các ngày off ca'
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
