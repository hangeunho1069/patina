
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
