type ScrollListener = () => void;

const listeners = new Set<ScrollListener>();

export function subscribeScroll(listener: ScrollListener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function notifyScroll() {
  listeners.forEach((listener) => listener());
}
