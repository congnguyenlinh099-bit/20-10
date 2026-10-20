import { audioService } from './audio-service.js';
import { particleEngine } from './particles.js';
import { renderVouchers } from './vouchers.js';

let heartCount = 0;
const letterText = `Gửi Tiểu My,

Hôm nay 20/10, ở shop Đầm Dơi chắc khách đông đứng mỏi nhừ chân rồi ha kkk.

Tính gửi lời chúc bình thường mà sợ trôi tin nhắn giống mấy lời chúc văn mẫu, nên anh làm cái trang nho nhỏ này gửi về Đầm Dơi cho em giải trí sau ca làm.

Mấy ngày qua nói chuyện thấy em vui tính, dễ thương mà cũng chịu khó ghê. Chúc My ngày 20/10 lúc nào cũng tươi tắn, nhiều năng lượng, tan ca về nhà thảnh thơi nghỉ ngơi nha.

Còn mấy cái kèo hẹn cầu lông với vài lon sương sương thì nhớ giữ lời đó, anh vẫn nhớ hoài kkk!`;

function typeWriter(text, elementId, onComplete) {
  const el = document.getElementById(elementId);
  if (!el) return;
  let idx = 0;
  el.textContent = '';

  function step() {
    if (idx < text.length) {
      el.textContent += text.charAt(idx);
      idx++;
      setTimeout(step, idx % 3 === 0 ? 30 : 20);
    } else if (onComplete) {
      onComplete();
    }
  }
  step();
}

export function unboxGift() {
  const box = document.getElementById('gift-box');
  const stage1 = document.getElementById('unboxing-stage');
  const stage2 = document.getElementById('content-stage');
  const audioBtn = document.getElementById('audio-toggle');

  if (box) box.style.animation = 'giftPop 0.8s forwards';

  audioService.playChime();
  audioService.startBGM();
  if (audioBtn) audioBtn.classList.add('playing');

  const rect = box ? box.getBoundingClientRect() : { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  particleEngine.burst(rect.x + 70, rect.y + 70, 40);

  setTimeout(() => {
    if (stage1) stage1.style.display = 'none';
    if (stage2) stage2.classList.add('revealed');

    typeWriter(letterText, 'letter-content', () => {
      const sig = document.getElementById('letter-signature');
      if (sig) sig.style.display = 'block';
    });
  }, 750);
}

export function sendHeart(e) {
  heartCount++;
  const countEl = document.getElementById('heart-counter');
  if (countEl) countEl.innerText = `${heartCount} năng lượng đã gửi`;

  audioService.playNote(523.25 + heartCount * 20, 0, 0.4, 'sine', 0.1);

  const heart = document.createElement('div');
  heart.className = 'floating-heart-el';
  heart.innerHTML = ['❤️', '💖', '✨', '🌸'][heartCount % 4];
  heart.style.left = `${(e ? e.clientX : window.innerWidth / 2) - 15}px`;
  heart.style.top = `${(e ? e.clientY : window.innerHeight / 2) - 15}px`;
  heart.style.fontSize = `${Math.random() * 12 + 20}px`;

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2200);
}

export function copyFeedback() {
  const msg = "Nhận được quà 20/10 rồi nha kkk! Em mở đủ 4 voucher rồi đó, khi nào về Cà Mau nhớ kèo cầu lông với vài lon nghen 🏸🍻";
  navigator.clipboard.writeText(msg).then(() => {
    showToast("Đã copy tin nhắn! Em dán vào Zalo gửi cho anh nhé ✨");
  }).catch(() => {
    showToast("Đã ghi nhận! Chúc em ngày 20/10 thật vui nha ✨");
  });
}

function showToast(text) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = text;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// Global hook for flip sounds
window.onVoucherFlip = () => {
  audioService.playNote(659.25, 0, 0.5, 'triangle', 0.08);
};

document.addEventListener('DOMContentLoaded', () => {
  particleEngine.start();
  renderVouchers('vouchers-container');

  const audioBtn = document.getElementById('audio-toggle');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => audioService.toggle(audioBtn));
  }

  window.unboxGift = unboxGift;
  window.sendHeart = sendHeart;
  window.copyFeedback = copyFeedback;
});
