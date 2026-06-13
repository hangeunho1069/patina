// ==========================================================================
// patina 통합 마스터 스크립트 (구형 알림창 중복 충돌 완벽 클린업 버전)
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // ------------------------------------------------------------------------
  // 1. [공통] 초록색 커버 박스 사방 스와이프 엔진
  // ------------------------------------------------------------------------
  const covers = document.querySelectorAll('.cover');
  
  if (covers.length > 0) {
    setTimeout(() => {
      covers.forEach(cover => {
        cover.classList.add('active');
      });
    }, 500);
  }


  // ------------------------------------------------------------------------
  // 2. [Start a Request 페이지] 서비스 레벨 카드 클릭 활성화
  // ------------------------------------------------------------------------
  const cards = document.querySelectorAll('.selectable-card');
  const nextBtn = document.getElementById('nextStepBtn');
  let selectedLevel = null;

  if (cards.length > 0) {
    cards.forEach(card => {
      card.addEventListener('click', function() {
        // 기존 active(진한 녹색 테두리) 모두 제거
        cards.forEach(c => c.classList.remove('active'));
        // 클릭한 카드에 클래스 추가
        this.classList.add('active');
        selectedLevel = this.getAttribute('data-level');
        console.log("현재 선택된 레벨 변수 업데이트:", selectedLevel);
      });
    });
  }


  // ------------------------------------------------------------------------
  // 3. [교정 완료] Next 버튼 클릭 시 주소창 강제 순간이동 제어 (단 하나의 분기만 실행)
  // ------------------------------------------------------------------------
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      if (!selectedLevel) {
        alert('진행하실 서비스 레벨(Lv1 ~ Lv3)을 하나 선택해 주세요!');
        return;
      }
      
      // 👈 구형 알림창의 찌꺼기 텍스트를 모두 원천 삭제하고, 실제 파일 경로로 명시적 매칭합니다.
      if (selectedLevel === 'lv1') {
        window.location.href = "./request_form_lv1.html";
      } 
      else if (selectedLevel === 'lv2') {
        window.location.href = "./request_form_lv2.html";
      } 
      else if (selectedLevel === 'lv3') {
        window.location.href = "./request_form_lv3.html";
      } 
      else {
        alert('올바른 서비스 단계를 고른 뒤 Next를 눌러주세요.');
      }
    });
  }


  // ------------------------------------------------------------------------
  // 4. [각 서브 폼 공통] Other 라디오 단추 및 하단 인풋창 잠금해제 제어
  // ------------------------------------------------------------------------
  const typeRadios = document.querySelectorAll('input[name="objType"]');
  const otherText = document.getElementById('objTypeOtherText');

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
  // 5. [각 서브 폼 공통] 가상 업로드 존 캔버스 및 파일 첨부 프리뷰 리스트업
  // ------------------------------------------------------------------------
  const uploadZone = document.getElementById('uploadZone');
  const fileInput = document.getElementById('objPhotos');
  const filePreview = document.getElementById('filePreview');
  const lv1RequestForm = document.getElementById('lv1RequestForm');
  const lv2RequestForm = document.getElementById('lv2RequestForm');
  const lv3RequestForm = document.getElementById('lv3RequestForm');

  if (uploadZone && fileInput && filePreview) {
    uploadZone.addEventListener('click', function(e) {
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

  // 폼 제출 핸들러 (Lv1, Lv2, Lv3 통합 방어막)
  function handleFormSubmit(formElement, successMsg) {
    if (formElement) {
      formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        alert(successMsg);
        formElement.reset();
        if (filePreview) filePreview.innerHTML = '';
        window.location.href = "./index.html";
      });
    }
  }

  handleFormSubmit(lv1RequestForm, '[Lv1. Standard] 의뢰서 접수가 성공적으로 완료되었습니다!');
  handleFormSubmit(lv2RequestForm, '[Lv2. Advanced] 의뢰서 접수가 성공적으로 완료되었습니다!');
  handleFormSubmit(lv3RequestForm, '[Lv3. Masterpiece] 의뢰서 접수가 성공적으로 완료되었습니다!');


  // ------------------------------------------------------------------------
  // 6. [DONATE 페이지] 기부 신청서 제출 피드백
  // ------------------------------------------------------------------------
  const donateForm = document.getElementById('donateForm');

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
// script.js 내부 nextBtn 분기 로직 점검용
else if (selectedLevel === 'lv3') {
  window.location.href = "./request_form_collection.html"; // 👈 방금 만든 이 파일 이름과 정확히 매칭하기!
}
