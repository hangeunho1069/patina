// ==========================================================================
// patina 통합 마스터 스크립트 (메인 마비 에러 완벽 교정 버전)
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ------------------------------------------------------------------------
  // 1. [메인 및 전 페이지 공통] 초록색 커버 박스 사방 스와이프 엔진
  // ------------------------------------------------------------------------
  const covers = document.querySelectorAll('.cover');
  
  if (covers.length > 0) {
    // 페이지 로드 후 0.5초 뒤에 active 클래스를 주어 사방으로 날려버림
    setTimeout(() => {
      covers.forEach(cover => {
        cover.classList.add('active');
      });
    }, 500);
  }


  // ------------------------------------------------------------------------
  // 2. [Start a Request 페이지] 서비스 레벨 카드 클릭 및 Next 이동 제어
  // ------------------------------------------------------------------------
  const cards = document.querySelectorAll('.selectable-card');
  const nextBtn = document.getElementById('nextStepBtn');
  let selectedLevel = null;

  if (cards.length > 0) {
    cards.forEach(card => {
      card.addEventListener('click', function() {
        cards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        selectedLevel = this.getAttribute('data-level');
        console.log("선택된 서비스 단계:", selectedLevel);
      });
    });
  }

  // 👈 핵심 에러 교정: 메인 페이지에 nextBtn이 없어도 에러가 나지 않도록 철저히 감싸둠!
  // script.js 내부의 nextBtn 이벤트 부분을 찾아서 이 구조로 덮어쓰기!
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (!selectedLevel) {
        alert('진행하실 서비스 레벨(Lv1 ~ Lv3)을 하나 선택해 주세요!');
        return;
      }
      
      if (selectedLevel === 'lv1') {
        alert('[LV1] 단계가 선택되었습니다. 의뢰서 입력 단계로 이동합니다!');
        window.location.href = "./request_form_lv1.html";
      } else if (selectedLevel === 'lv2') {
        // 👈 [교정 추가] Lv2를 고르고 Next를 누르면 여기로 순간이동!
        alert('[LV2] 단계가 선택되었습니다. 구조 봉합 의뢰서 단계로 이동합니다!');
        window.location.href = "./request_form_lv2.html";
      } else {
        alert(`[${selectedLevel.toUpperCase()}] 단계는 현재 준비 중입니다. Lv1 또는 Lv2 단계를 선택해 보세요!`);
      }
    });
  }

  // ------------------------------------------------------------------------
  // 3. [Request: Standard 페이지] Other 라디오 단추 및 밑줄 입력창 제어
  // ------------------------------------------------------------------------
  const typeRadios = document.querySelectorAll('input[name="objType"]');
  const otherText = document.getElementById('objTypeOtherText');

  // 👈 에러 방지 안전장치
  if (typeRadios.length > 0 && otherText) {
    typeRadios.forEach(radio => {
      radio.addEventListener('change', function() {
        if (document.getElementById('typeOtherRadio').checked) {
          otherText.disabled = false;
          otherText.focus();
        } else {
          otherText.disabled = true;
          otherText.value = '';
        }
      });
    });
  }


  // ------------------------------------------------------------------------
  // 4. [Request: Standard 페이지] 가상 업로드 박스 및 파일명 프리뷰 출력
  // ------------------------------------------------------------------------
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('objPhotos');
  const filePreview = document.getElementById('filePreview');
  const lv1RequestForm = document.getElementById('lv1RequestForm');

  // 👈 에러 방지 안전장치
  if (uploadZone && fileInput && filePreview) {
    uploadZone.addEventListener('click', function(e) {
      // .cover 가림막 박스를 누를 때 이벤트가 씹히지 않도록 인풋 창 강제 구동
      if (e.target.id !== 'objPhotos') {
        fileInput.click();
      }
    });

    fileInput.addEventListener('change', function() {
      filePreview.innerHTML = '';
      const files = Array.from(this.files);

      if (files.length > 5) {
        alert('사진은 최대 5장까지만 업로드 가능합니다!');
        this.value = '';
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

  // 👈 에러 방지 안전장치
  if (lv1RequestForm) {
    lv1RequestForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const objName = document.getElementById('objName').value.trim();
      if (!objName) {
        alert('필수 입력 항목을 확인해 주세요!');
        return;
      }
      alert(`[Lv1. Standard] 의뢰서 접수가 성공적으로 완료되었습니다!`);
      lv1RequestForm.reset();
      if (filePreview) filePreview.innerHTML = '';
      window.location.href = "./index.html"; 
    });
  }


  // ------------------------------------------------------------------------
  // 5. [DONATE 페이지] 기부 신청서 제출 핸들러
  // ------------------------------------------------------------------------
  const donateForm = document.getElementById('donateForm');

  // 👈 에러 방지 안전장치
  if (donateForm) {
    donateForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('donateName').value.trim();
      const contact = document.getElementById('donateContact').value.trim();
      
      alert(`감사합니다, ${name}님!\n3일 이내로 연락처(${contact})를 통해 안내를 드리겠습니다.`);
      donateForm.reset();
    });
  }

});
// script.js 내부의 nextBtn 이벤트를 아래 구조로 최종 업데이트!
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (!selectedLevel) {
        alert('진행하실 서비스 레벨(Lv1 ~ Lv3)을 하나 선택해 주세요!');
        return;
      }
      
      if (selectedLevel === 'lv1') {
        alert('[LV1] 단계가 선택되었습니다. 의뢰서 입력 단계로 이동합니다!');
        window.location.href = "./request_form_lv1.html";
      } else if (selectedLevel === 'lv2') {
        alert('[LV2] 단계가 선택되었습니다. 구조 봉합 의뢰서 단계로 이동합니다!');
        window.location.href = "./request_form_lv2.html";
      } else if (selectedLevel === 'lv3') {
        // 👈 [Lv3 연동 추가] 마스터피스 양식으로 이동
        alert('[LV3] 단계가 선택되었습니다. 마스터피스 정밀 진단 단계로 이동합니다!');
        window.location.href = "./request_form_lv3.html";
      }
    });
  }
