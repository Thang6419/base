import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  max-height: ${({ maxHeight }) => maxHeight || '100vh'};
`;

const Inner = styled.div`
  position: relative;
  overflow: hidden;
`;

const Content = styled.div`
  will-change: transform;
`;

const Thumb = styled.div`
  position: absolute;
  top: 0;
  right: 2px;
  width: 6px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.3);
  transition: opacity 0.3s;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  cursor: pointer;
`;

const Track = styled.div`
  position: absolute;
  top: 0;
  right: 2px;
  width: 6px;
  height: 100%;
  background: transparent;
  cursor: pointer;
`;

export default function FakeScrollWrapper({ children, maxHeight = '100vh' }) {
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const thumbRef = useRef(null);
  const trackRef = useRef(null);

  const [thumbVisible, setThumbVisible] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [dragging, setDragging] = useState(false);

  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const animationFrame = useRef(null);
  const hideTimeout = useRef(null);
  const location = useLocation();

  useEffect(() => {
    updateThumbPos();

    return () => {
      cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (wrapper) wrapper.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (wrapper) wrapper.removeEventListener('wheel', handleWheel);
    };
  }, [thumbHeight]);

  useEffect(() => {
    if (!contentRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      updateThumbPos();
    });

    resizeObserver.observe(contentRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    targetScroll.current = 0;
    currentScroll.current = 0;
    if (contentRef.current) {
      contentRef.current.style.transform = `translateY(0px)`;
    }
  }, [location.pathname]);
  // Smooth scroll handler
  const animateScroll = () => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) {
      animationFrame.current = requestAnimationFrame(animateScroll);
      return;
    }

    const scrollHeight = content.scrollHeight;
    const visibleHeight = wrapper.clientHeight;
    const maxScroll = Math.max(scrollHeight - visibleHeight, 0);

    let diff = targetScroll.current - currentScroll.current;

    // Clamp currentScroll vào khoảng [0, maxScroll]
    if (currentScroll.current > maxScroll) currentScroll.current = maxScroll;
    if (currentScroll.current < 0) currentScroll.current = 0;

    // Nếu khoảng cách nhỏ đủ để coi là đã dừng
    if (Math.abs(diff) < 0.5) {
      currentScroll.current = targetScroll.current;

      // Clamp targetScroll trong phạm vi hợp lệ
      if (targetScroll.current > maxScroll) targetScroll.current = maxScroll;
      if (targetScroll.current < 0) targetScroll.current = 0;

      content.style.transform = `translateY(-${currentScroll.current}px)`;
      updateThumbPos();

      animationFrame.current = null; // Dừng animation
      return;
    }

    // Di chuyển dần currentScroll về targetScroll
    currentScroll.current += diff * 0.12;

    // Clamp lại sau khi thay đổi
    if (currentScroll.current > maxScroll) currentScroll.current = maxScroll;
    if (currentScroll.current < 0) currentScroll.current = 0;

    content.style.transform = `translateY(-${currentScroll.current}px)`;
    updateThumbPos();

    animationFrame.current = requestAnimationFrame(animateScroll);
  };

  const updateThumbPos = () => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const scrollHeight = content.scrollHeight;
    const visibleHeight = wrapper.clientHeight;

    if (scrollHeight <= visibleHeight) {
      // Ẩn thumb, reset scroll vị trí về đầu
      setThumbVisible(false);
      setThumbTop(0);
      setThumbHeight(0);
      targetScroll.current = 0;
      currentScroll.current = 0;
      if (content.style) content.style.transform = `translateY(0px)`;
      return;
    }

    setThumbVisible(true);

    const ratio = visibleHeight / scrollHeight;
    const newHeight = Math.max(visibleHeight * ratio, 20);
    setThumbHeight(newHeight);

    const maxScroll = scrollHeight - visibleHeight;
    const maxThumbTop = visibleHeight - newHeight;

    // Clamp currentScroll trong phạm vi scroll hợp lệ
    if (currentScroll.current > maxScroll) currentScroll.current = maxScroll;
    if (currentScroll.current < 0) currentScroll.current = 0;

    // Tính vị trí top của thumb theo currentScroll
    const top = (currentScroll.current / maxScroll) * maxThumbTop;
    setThumbTop(top);
  };

  const handleWheel = e => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    if (!wrapper || !content) return;

    const visibleHeight = wrapper.clientHeight;
    const scrollHeight = content.scrollHeight;
    const maxScroll = scrollHeight - visibleHeight;

    // Nếu không có gì để scroll → cho phép truyền lên
    if (scrollHeight <= visibleHeight) return;

    const delta = e.deltaY;
    const newTarget = targetScroll.current + delta;

    if (
      (delta > 0 && currentScroll.current >= maxScroll) ||
      (delta < 0 && currentScroll.current <= 0)
    ) {
      // Nếu đang ở cuối hoặc đầu → không block event
      return;
    }

    e.preventDefault(); // chặn scroll mặc định
    e.stopPropagation(); // chặn truyền lên trên

    targetScroll.current = Math.max(0, Math.min(newTarget, maxScroll));
    showThumb();
  };

  const showThumb = () => {
    setThumbVisible(true);
    clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      if (!dragging) setThumbVisible(false);
    }, 2000);

    // Nếu animation chưa chạy thì bắt đầu
    if (!animationFrame.current) {
      animationFrame.current = requestAnimationFrame(animateScroll);
    }
  };

  const handleThumbMouseDown = e => {
    e.preventDefault();
    setDragging(true);
    const startY = e.clientY;
    const startTop = thumbTop;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    const onMove = moveEvent => {
      if (!wrapper || !content) return;
      const deltaY = moveEvent.clientY - startY;
      const scrollHeight = content.scrollHeight;
      const visibleHeight = wrapper.clientHeight;
      const trackHeight = visibleHeight - thumbHeight;
      const scrollableHeight = scrollHeight - visibleHeight;

      const thumbNewTop = Math.min(Math.max(startTop + deltaY, 0), trackHeight);
      const newScrollTop = (thumbNewTop / trackHeight) * scrollableHeight;

      targetScroll.current = newScrollTop;
      showThumb();
    };

    const onUp = () => {
      setDragging(false);
      showThumb();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const handleTrackClick = e => {
    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    const content = contentRef.current;
    const thumb = thumbRef.current;

    if (!track || !wrapper || !content || !thumb) return;

    const trackRect = track.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const trackHeight = track.offsetHeight;
    const thumbHeight = thumb.offsetHeight;
    const maxThumbTop = trackHeight - thumbHeight;

    // Tính vị trí thumb muốn đến
    let targetThumbTop = clickY - thumbHeight / 2;
    targetThumbTop = Math.max(0, Math.min(targetThumbTop, maxThumbTop));

    const contentHeight = content.scrollHeight;
    const visibleHeight = wrapper.clientHeight;
    const scrollableHeight = contentHeight - visibleHeight;

    const newTargetScroll = (targetThumbTop / maxThumbTop) * scrollableHeight;

    // Nếu bạn dùng scroll animate (manual)
    targetScroll.current = newTargetScroll;
    showThumb();

    // Nếu dùng LocomotiveScroll, thay bằng:
    // scrollInstance.scrollTo(newTargetScroll, { duration: 0.6 });
  };

  return (
    <Wrapper ref={wrapperRef} maxHeight={maxHeight}>
      <Inner>
        <Content ref={contentRef}>{children}</Content>
      </Inner>
      <Track ref={trackRef} onClick={handleTrackClick}>
        <Thumb
          ref={thumbRef}
          visible={thumbVisible}
          style={{ height: `${thumbHeight}px`, top: `${thumbTop}px` }}
          onMouseDown={handleThumbMouseDown}
        />
      </Track>
    </Wrapper>
  );
}
