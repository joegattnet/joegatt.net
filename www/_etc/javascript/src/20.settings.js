NB.SETTINGS = {
  pending_signedin_action: false,
  anagramometer: {
    fade: 2000
  },
  color: {
    text: '#333333',
    source: '#660000',
    ok: '#00cc00',
    error: '#cc0000',
    amber: '#999999',
    neutral: '#999999',
    version_loading: '#eeeeee',
    version_loaded: '#333333',
    stripe_odd: '#ddeeee',
    stripe_even: '#cceeee'
  },
  form: {
    min_length: 6
  },
  purge: [
    ['anagram', 1],
    ['enface', 5],
    ['scholia', 5],
    ['comments' ,10]
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