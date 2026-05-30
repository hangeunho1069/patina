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
