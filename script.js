
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

document.addEventListener('DOMContentLoaded', () => {
  // 1. 페이지가 로드될 때 바디 전체가 부드럽게 페이드인 되며 싱크를 맞춤
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 50);

  // 2. 기존 메인 페이지용 그리드 커버 스와이프 인터랙션 트리거 (기존 코드 연동 보존)
  const covers = document.querySelectorAll('.cover');
  if (covers.length > 0) {
    setTimeout(() => {
      covers.forEach((cover) => {
        cover.classList.add('active');
      });
    }, 500);
  }
});
