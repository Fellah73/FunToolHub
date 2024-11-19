export  function getCookies(): string[] {
    if (typeof document !== 'undefined') {
      const cookies = document.cookie.split(';');
      if (cookies.length === 1 && cookies[0] === '') {
        return [];
      }
      return cookies.filter(cookie => cookie.trim() !== '');
    }
    return [];
  }