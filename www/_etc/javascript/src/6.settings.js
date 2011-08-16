NB.SETTINGS = {
  pending_signedin_action: false, 
  anagramometer: {
    fade: 2000
  }, 
  color: {
    text: '#333333', 
    source: '#990000', 
    ok: '#d3120f', 
    error: '#d3120f', 
    amber: '#f74b23', 
    neutral: '#999999', 
    version_loading: '#d5d5d5', 
    version_loaded: '#333333', 
    stripe_odd: '#ddeeee', 
    stripe_even: '#cceeee'
  }, 
  form: {
    min_length: 6
  }, 
  expires: [
    ['anagram', 10], 
    ['enface', 10], 
    ['scholia', 10], 
    ['comments', 10]
  ], 
  speed: {
    faster: 200, 
    fast: 400, 
    normal: 600, 
    slow: 900, 
    slower: 1200
  }, 
  cron: {
    purge: 600000, 
    prefetch: 10000
  }
};

/******************************************************************************/

NB.S = NB.SETTINGS;