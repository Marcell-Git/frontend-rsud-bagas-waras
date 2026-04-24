import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    const baseTitle = "RSUD Bagas Waras Klaten";
    document.title = title ? `${title} | ${baseTitle}` : baseTitle;
  }, [title]);
};

export default useTitle;
