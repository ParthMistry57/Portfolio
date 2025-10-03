import { useEffect, useRef } from 'react';

const Analytics = () => {
  const hasTracked = useRef(false);

  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Check if we've already tracked this session
        if (hasTracked.current) {
          console.log('Already tracked this session, skipping...');
          return; // Don't track again
        }

        // Mark as tracked IMMEDIATELY to prevent double execution
        hasTracked.current = true;
        sessionStorage.setItem('hasTracked', 'true');
        console.log('Marked as tracked to prevent double execution');

        console.log('Tracking visitor...');

        // Get or create session ID
        let sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
          sessionId = Math.random().toString(36).substring(2, 15);
          sessionStorage.setItem('sessionId', sessionId);
        }

        console.log('Session ID:', sessionId);

        // Track visitor (only counts once per session)
        const response = await fetch('https://portfolio-production-bde8.up.railway.app/api/analytics/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId
          })
        });

        const result = await response.json();
        console.log('Analytics response:', result);
      } catch (error) {
        console.log('Analytics tracking failed:', error);
      }
    };

    trackVisitor();
  }, []); // Only run once when component mounts

  return null; // This component doesn't render anything
};

export default Analytics;
