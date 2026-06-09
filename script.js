
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
  // request_form.html과 연결된 script.js 내부의 Next 버튼 처리 로직 부분 수정
if (nextBtn) {
  nextBtn.addEventListener('click', function() {
    if (!selectedLevel) {
      alert('진행하실 서비스 레벨(Lv1 ~ Lv3)을 하나 선택해 주세요!');
      return;
    }
    
    // 👈 핵심 수정: Lv1 단계를 고르고 Next를 누르면 방금 만든 양식 창으로 순간 이동 시킵니다!
    if (selectedLevel === 'lv1') {
      window.location.href = "./request_form_lv1.html";
    } else {
      alert(`[${selectedLevel.toUpperCase()}] 단계는 현재 서브 양식 준비 중입니다! Lv1 단계를 선택해 보세요.`);
    }
  });
}
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
// ==========================================================================
// REQUEST FORM (Lv1. Standard) 파일 업로드 트리거 및 폼 제출 피드백
// ==========================================================================
document.addEventListener('DOMContentLoaded', function() {
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('objPhotos');
  const filePreview = document.getElementById('filePreview');
  const lv1RequestForm = document.getElementById('lv1RequestForm');

  // 1. 가상 업로드 박스 클릭 시 진짜 히든된 input file 단추 강제 클릭 트리거
  if (uploadZone && fileInput) {
    uploadZone.addEventListener('click', function() {
      fileInput.click();
    });

    // 2. 파일이 정상 선택되면 파일명을 눈에 보이게 리스트업 출력
    fileInput.addEventListener('change', function() {
      filePreview.innerHTML = ''; // 기존 리스트 초기화
      const files = Array.from(this.files);

      if (files.length > 5) {
        alert('사진은 최대 5장까지만 업로드 가능합니다!');
        this.value = ''; // 선택 초기화
        return;
      }

      files.forEach(file => {
        const item = document.createElement('div');
        item.className = 'file-preview-item';
        item.innerText = `✓ 첨부 완료: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        filePreview.appendChild(item);
      });
    });
  }

  // 3. 최종 의뢰서 서브밋 제출 핸들링
  if (lv1RequestForm) {
    lv1RequestForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const objName = document.getElementById('objName').value.trim();
      const objType = document.getElementById('objType').value;
      const objSize = document.getElementById('objSize').value;

      if (!objName || !objType || !objSize) {
        alert('필수 입력 항목을 확인해 주세요!');
        return;
      }

      // 최종 접수 성공 안내 메시지 바인딩
      alert(`[Lv1. Standard] 의뢰서 접수가 성공적으로 완료되었습니다!\n\n의뢰 사물: ${objName}\n카테고리: ${objType.toUpperCase()}\n\n작성하신 요청 내용을 토대로 디자이너가 1차 디지털 진단을 진행한 후 영업일 기준 4시간 이내에 최종 매칭 알림을 발송해 드리겠습니다.`);
      
      // 전송 완료 후 폼 비우고 메인으로 슥 보내기
      lv1RequestForm.reset();
      if (filePreview) filePreview.innerHTML = '';
      window.location.href = "./index.html"; 
    });
  }
});
