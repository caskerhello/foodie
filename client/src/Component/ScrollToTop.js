import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//페이지 변경시 스크롤 초기화 위한 컴포넌트
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // 페이지 이동 시 스크롤을 맨 위로
  }, [location]); // location이 변경될 때마다 실행

  return null;
}

export default ScrollToTop;