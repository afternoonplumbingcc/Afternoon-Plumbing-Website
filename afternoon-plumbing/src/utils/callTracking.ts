interface CallTracker {
  phoneNumber: string;
  sessionId: string;
  trackPhoneClick: (phoneNumber: string, location?: string) => void;
  getSessionId: () => string;
}

export const createCallTracker = (phoneNumber: string): CallTracker => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const trackPhoneClick = (phone: string, location = 'header') => {
    if (typeof window !== 'undefined') {
      if ((window as any).gtag) {
        (window as any).gtag('event', 'generate_lead', {
          event_category: 'Phone',
          event_label: location,
          phone_number: phone,
          session_id: sessionId
        });
      }
      console.log('📞 Phone click tracked:', { phone, location, sessionId });
    }
  };

  return {
    phoneNumber,
    sessionId,
    trackPhoneClick,
    getSessionId: () => sessionId
  };
};

export const initCallTracker = (phoneNumber: string): CallTracker => {
  return createCallTracker(phoneNumber);
};

export const autoTrackPhoneLinks = (phoneNumber: string) => {
  if (typeof document === 'undefined') return;

  const observer = new MutationObserver(() => {
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
      if (link.hasAttribute('data-tracked')) return;

      link.setAttribute('data-tracked', 'true');
      link.addEventListener('click', () => {
        const tracker = initCallTracker(phoneNumber);
        tracker.trackPhoneClick(phoneNumber, 'auto');
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};
