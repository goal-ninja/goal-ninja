var CACHE_NAME = 'goal-ninja-v32';
var urlsToCache = [
  './screens/goal-ninja-data.js',
  './screens/ninja-buddy.js',
  './screens/goal-effect-home.html',
  './screens/goal-effect-goals-list.html',
  './screens/goal-effect-habits-list.html',
  './screens/goal-effect-goal-detail.html',
  './screens/goal-effect-savings.html',
  './screens/goal-effect-savings-lock.html',
  './screens/goal-effect-profile.html',
  './screens/goal-effect-activity.html',
  './screens/goal-effect-templates.html',
  './screens/goal-effect-create-from-template.html',
  './screens/goal-effect-subscription.html',
  './screens/goal-effect-leaderboard.html',
  './screens/goal-effect-onboarding.html',
  './screens/goal-effect-landing.html',
  './screens/goal-effect-navigator.html',
  './ninja-poses/ninja-action.png',
  './ninja-poses/ninja-thumbsup.png',
  './ninja-poses/ninja-focus.png',
  './ninja-poses/ninja-stumble.png',
  './ninja-poses/ninja-wealth.png',
  './ninja-poses/ninja-mentor.png',
  './ninja-poses/ninja-hourglass.png',
  './ninja-poses/ninja-bag.png',
  './ninja-poses/ninja-coin.png',
  './ninja-poses/ninja-goalslash.png',
  './ninja-poses/ninja-streak.png',
  './ninja-poses/ninja-meditate.png',
  './ninja-poses/buddy/buddy-action.png',
  './ninja-poses/buddy/buddy-alarm.png',
  './ninja-poses/buddy/buddy-angry.png',
  './ninja-poses/buddy/buddy-bag.png',
  './ninja-poses/buddy/buddy-cash.png',
  './ninja-poses/buddy/buddy-checklist.png',
  './ninja-poses/buddy/buddy-coin.png',
  './ninja-poses/buddy/buddy-dumbbell.png',
  './ninja-poses/buddy/buddy-fistpump.png',
  './ninja-poses/buddy/buddy-focus.png',
  './ninja-poses/buddy/buddy-goalslash.png',
  './ninja-poses/buddy/buddy-hourglass.png',
  './ninja-poses/buddy/buddy-hydrate.png',
  './ninja-poses/buddy/buddy-laptop.png',
  './ninja-poses/buddy/buddy-meditate.png',
  './ninja-poses/buddy/buddy-mentor.png',
  './ninja-poses/buddy/buddy-moneybag.png',
  './ninja-poses/buddy/buddy-sad.png',
  './ninja-poses/buddy/buddy-search.png',
  './ninja-poses/buddy/buddy-streak.png',
  './ninja-poses/buddy/buddy-stumble.png',
  './ninja-poses/buddy/buddy-sword.png',
  './ninja-poses/buddy/buddy-target.png',
  './ninja-poses/buddy/buddy-thumbsup.png',
  './ninja-poses/buddy/buddy-wait.png',
  './ninja-poses/buddy/buddy-wave-cry.png',
  './ninja-poses/buddy/buddy-wealth.png'
];

// Install - cache all files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

// Activate - clean old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch - cache first, then network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request).then(function(fetchResponse) {
          return caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
  );
});
