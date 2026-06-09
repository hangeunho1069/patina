
// 페이지 로드가 완료되면 0.5초 뒤에 초록색 박스들을 스와이프 시킵니다.
window.addEventListener('DOMContentLoaded', () => {
  const covers = document.querySelectorAll('.cover');
  
  setTimeout(() => {
    covers.forEach((cover, index) => {
      // 모든 커버 박스에 순차적으로 active 클래스를 추가하여 사방으로 튕겨나가게 함
      cover.classList.add('active');
    });
  }, 500); // 0.5초 대기 후 모션 시작 (수정 가능)
});
// 기존 스와이프 효과 코드는 그대로 유지하면서 이 내용을 위에 덧붙여 주세요!
// This file assumes the code structure provided is for 'about.html' and requires the associated 'style.css'.
// You should add this JavaScript code to your 'script.js' file or include it in a <script> tag at the end of 'about.html'.

document.addEventListener('DOMContentLoaded', function() {
    // 1. Initial fade-in for the whole page body (optional, but makes page load smoother)
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    // Check if we are on the 'about.html' page by looking for the specific class
    const aboutPage = document.querySelector('.about-page');
    
    if (aboutPage) {
        // We're on the about page, so we only need to make sure the body fades in smoothly.
        // The hero animation is handled by CSS, and the card scroll animation is also handled by CSS via a scroll trigger.
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);
    } else {
        // We are NOT on the about page (e.g., on index.html).
        // Let's make sure the body still fades in smoothly.
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 50);

        // This section is for handling potential other scripts (like the index.html grid covers).
        // It's a good idea to keep them contained here if they are only for other pages.
        const covers = document.querySelectorAll('.cover');
        if (covers.length > 0) {
            setTimeout(() => {
                covers.forEach((cover, index) => {
                    cover.classList.add('active');
                });
            }, 500);
        }
    }
});
// ==========================================================================
// START A REQUEST 페이지 카드 토글 및 유효성 인터랙션
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.selectable-card');
  const nextBtn = document.getElementById('nextStepBtn');
  let selectedLevel = null; // 선택된 레벨을 저장할 변수

  if (cards.length > 0) {
    cards.forEach(card => {
      card.addEventListener('click', function() {
        // 1. 기존에 선택되어 있던 카드의 active(진한 녹색 테두리) 클래스를 전부 제거
        cards.forEach(c => c.classList.remove('active'));
        
        // 2. 내가 방금 클릭한 카드에만 active 클래스 주입 (테두리 등장!)
        this.classList.add('active');
        
        // 3. 선택된 데이터 레벨 저장 (예: lv1, lv2, lv3)
        selectedLevel = this.getAttribute('data-level');
        console.log("선택된 서비스 단계:", selectedLevel);
      });
    });
  }

  // Next 버튼 클릭 시 액션 (인터랙션 ③)
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (!selectedLevel) {
        alert('진행하실 서비스 레벨(Lv1 ~ Lv3)을 하나 선택해 주세요!');
        return;
      }
      
      // 성공 시 다음 단계 페이지로 연결 (예: 다음 주소창 입력 폼 이동)
      alert(`[${selectedLevel.toUpperCase()}] 단계가 선택되었습니다. 다음 의뢰서 입력 단계로 이동합니다!`);
      // window.location.href = "./request_form_next.html"; // 👈 나중에 다음 페이지 만들면 여기에 연결!
    });
  }
});
// ==========================================================================
// DONATE 페이지 신청서 제출 유효성 검사 및 인터랙션 피드백
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
  const donateForm = document.getElementById('donateForm');

  if (donateForm) {
    donateForm.addEventListener('submit', function(e) {
      e.preventDefault(); // 기본 폼 새로고침 전송 차단

      // 입력 데이터 캐싱
      const name = document.getElementById('donateName').value.trim();
      const contact = document.getElementById('donateContact').value.trim();
      const category = document.getElementById('donateCategory').value;
      const story = document.getElementById('donateStory').value.trim();

      // 간단한 유효성 재확인
      if (!name || !contact || !category || !story) {
        alert('신청서 항목을 빠짐없이 모두 기입해 주세요!');
        return;
      }

      // 기부 완료 피드백 알림 가동
      alert(`감사합니다, ${name}님!\n보내주신 사물의 소중한 이야기와 흔적을 디자이너들이 면밀히 검토한 후, 3일 이내로 연락처(${contact})를 통해 기부 수거 에코백 발송 안내를 드리겠습니다.`);
      
      // 알림 확인 후 폼 깔끔하게 리셋 초기화
      donateForm.reset();
    });
  }
});
