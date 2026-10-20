import { audioService } from './audio-service.js';
import { particleEngine } from './particles.js';
import { renderVouchers } from './vouchers.js';

let heartCount = 0;
const letterText = `Gửi Tiểu My,

Hôm nay là 20/10, ngày tôn vinh phái đẹp, anh muốn gửi đến em một món quà số đặc biệt được lập trình riêng từ Sài Gòn.

Mấy ngày qua trò chuyện cùng em, anh cảm nhận được một cô gái rất dễ thương: vừa tháo vát, rạng rỡ trong công việc tại Thế Giới Di Động, lại vừa là "công chúa" hiếu thảo bên mâm cơm ấm áp của mẹ.

Anh biết những ca đứng làm việc dài rất mỏi chân và tiêu hao nhiều năng lượng. Nhân ngày 20/10, chúc My luôn giữ nụ cười tươi tắn, ngày làm việc thật nhẹ nhàng, và luôn ngập tràn niềm vui cùng gia đình nhé.

Và nhớ là... kèo cầu lông so tài cùng "vài lon sương sương" khi anh về Cà Mau vẫn đang chờ em đó nha kkk!`;

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
  const msg = "Cảm ơn anh Lệnh về món quà 20/10 siêu tinh tế nha kkk! Em nhận đủ 4 voucher rồi đó, khi nào về Cà Mau nhớ thực hiện nha 🏸✨";
  navigator.clipboard.writeText(msg).then(() => {
    showToast("Đã copy tin nhắn! Em dán vào Zalo gửi cho anh nhé ❤️");
  }).catch(() => {
    showToast("Đã ghi nhận! Chúc em ngày 20/10 thật tuyệt vời ✨");
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
