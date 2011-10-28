NB.SETTINGS = {
  pending_signedin_action: false, 
  anagramometer: {
    fade: 2000
  }, 
  color: {
    text: '#333333', 
    source: '#990000', 
    ok: '#75d42f', 
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
  pantography: {
    alphabetString: "0123456789.,;:_@!?/#()%'-+= abcdefghijklmnopqrstuvwxyz",
    messageLength: 140,
    frequency: 600, // Frequency of broadcasts in seconds
    siderealYearInDays: 365.256363004,
    dateFirstTx: "October 28, 2011 07:20:00",
    username: 'pantography'
  }, 
  cron: {
    purge: 600000, 
    prefetch: 10000,
    refresh: 60000
  }
};

/******************************************************************************/

NB.S = NB.SETTINGS;