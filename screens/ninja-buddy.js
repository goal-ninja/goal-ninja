/**
 * Ninja Buddy — Floating Draggable Mascot for Goal Ninja
 * Self-contained: injects its own CSS, DOM, and event hooks.
 * Add to any screen with: <script src="ninja-buddy.js"></script>
 */
(function() {
    'use strict';

    // ============================================================
    // CONFIGURATION
    // ============================================================
    var CONFIG = {
        SIZE: 64,
        SPEECH_DURATION: 3500,
        IDLE_TIMEOUT: 30000,
        Z_INDEX: 500,
        BOUNCE_MS: 400,
        IMAGE_BASE: '../ninja-poses/buddy/',
        STORAGE_KEY: 'goalNinjaBuddyState'
    };

    var POSES = {
        idle:       'buddy-meditate.png',
        thumbsup:   'buddy-thumbsup.png',
        action:     'buddy-action.png',
        sword:      'buddy-sword.png',
        sad:        'buddy-sad.png',
        angry:      'buddy-angry.png',
        moneybag:   'buddy-moneybag.png',
        fistpump:   'buddy-fistpump.png',
        checklist:  'buddy-checklist.png',
        alarm:      'buddy-alarm.png',
        target:     'buddy-target.png',
        dumbbell:   'buddy-dumbbell.png',
        search:     'buddy-search.png',
        wave:       'buddy-wave-cry.png',
        streak:     'buddy-streak.png',
        wealth:     'buddy-wealth.png',
        focus:      'buddy-focus.png',
        mentor:     'buddy-mentor.png',
        cash:       'buddy-cash.png',
        hourglass:  'buddy-hourglass.png'
    };

    var REACTIONS = {
        'checkin-complete': {
            poses: ['thumbsup', 'checklist', 'fistpump'],
            messages: [
                'Habit crushed! 💪',
                'Nice work, ninja!',
                'Another one down!',
                'You\'re on fire!',
                'Keep it going!',
                'That\'s the way!',
                'Discipline = freedom!',
                'Streak growing! 🔥'
            ],
            anim: 'pose-change'
        },
        'checkin-missed': {
            poses: ['sad', 'wave'],
            messages: [
                'Tomorrow\'s a new day!',
                'Don\'t give up, ninja!',
                'Stay focused!',
                'We\'ll get it next time...',
                'One miss won\'t stop you!',
                'Get back on track!'
            ],
            anim: 'shake'
        },
        'goal-completed': {
            poses: ['sword', 'action'],
            messages: [
                'GOAL COMPLETE! 🎉',
                'LEGENDARY, ninja!',
                'You did it! Champion!',
                'Target destroyed! 🎯',
                'Mission accomplished!'
            ],
            anim: 'big-celebration'
        },
        'streak-milestone': {
            poses: ['streak', 'fistpump'],
            messages: [
                'Streak milestone! 🔥',
                'Unstoppable!',
                'Consistency is key!',
                'What a streak, ninja!'
            ],
            anim: 'pose-change'
        },
        'savings-view': {
            poses: ['moneybag', 'wealth', 'cash'],
            messages: [
                'Your vault is growing!',
                'Stay consistent to keep it unlocked!',
                'Every penny counts!',
                'Saving like a ninja!'
            ],
            anim: 'pose-change'
        },
        'tap': {
            poses: ['action', 'focus', 'mentor', 'target', 'dumbbell', 'fistpump', 'alarm'],
            messages: [
                'Keep pushing!',
                'You got this, ninja!',
                'Focus mode: activated!',
                'Every day counts!',
                'Ninja discipline! 🥷',
                'No excuses today!',
                'Stay sharp!',
                'Be the ninja you\'re meant to be!',
                'Consistency beats perfection!',
                'Progress, not perfection!',
                'Small steps, big results!',
                'Your future self will thank you!',
                'Champions train daily!',
                'Show up. Do the work.',
                'Discipline is a superpower!'
            ],
            anim: 'pose-change'
        }
    };

    var PAGE_GREETINGS = {
        home:       { poses: ['action', 'fistpump'], messages: ['Ready to crush it today!', 'Let\'s check in, ninja!', 'New day, new wins!'] },
        savings:    { poses: ['moneybag', 'wealth'], messages: ['Your vault awaits!', 'Saving like a ninja!'] },
        goals:      { poses: ['target', 'focus'], messages: ['Eyes on the prize!', 'Which goal today?'] },
        detail:     { poses: ['mentor', 'checklist'], messages: ['Let\'s review progress!', 'How are we doing?'] },
        profile:    { poses: ['thumbsup', 'mentor'], messages: ['Looking good, ninja!', 'Keep it up!'] },
        habits:     { poses: ['checklist', 'focus'], messages: ['Habits make the ninja!', 'Daily actions, big results!'] },
        leaderboard:{ poses: ['streak', 'fistpump'], messages: ['Climb those ranks!', 'Compete with yourself!'] },
        templates:  { poses: ['search', 'target'], messages: ['Find your next challenge!', 'Something new to conquer?'] },
        create:     { poses: ['mentor', 'target'], messages: ['New goal incoming!', 'Let\'s set you up!'] },
        onboarding: { poses: ['action', 'thumbsup'], messages: ['Welcome, ninja!', 'Let\'s get started!'] },
        landing:    { poses: ['action', 'sword'], messages: ['Ready to level up?', 'Become a Goal Ninja!'] }
    };

    // ============================================================
    // STATE
    // ============================================================
    var phoneFrame = null;
    var currentPose = 'idle';
    var idleTimer = null;
    var speechTimer = null;
    var state = { x: -1, y: -1, hidden: false };

    // ============================================================
    // CSS INJECTION
    // ============================================================
    function injectCSS() {
        var style = document.createElement('style');
        style.id = 'ninja-buddy-styles';
        style.textContent = '' +
            '.ninja-buddy{position:absolute;width:' + CONFIG.SIZE + 'px;height:' + CONFIG.SIZE + 'px;z-index:' + CONFIG.Z_INDEX + ';cursor:grab;touch-action:none;user-select:none;-webkit-user-select:none;will-change:left,top;transition:opacity 0.3s ease;}' +
            '.ninja-buddy.dragging{cursor:grabbing;}' +
            '.ninja-buddy img{width:100%;height:100%;object-fit:contain;pointer-events:none;filter:drop-shadow(0 3px 6px rgba(0,0,0,0.18));}' +
            '@keyframes ninjaBreathe{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}' +
            '.ninja-buddy.idle img{animation:ninjaBreathe 2.5s ease-in-out infinite;}' +
            '@keyframes ninjaBounce{0%{transform:scale(1) rotate(0deg)}30%{transform:scale(1.25) rotate(-5deg)}60%{transform:scale(0.9) rotate(3deg)}100%{transform:scale(1) rotate(0deg)}}' +
            '.ninja-buddy.pose-change img{animation:ninjaBounce 0.4s ease-out;}' +
            '@keyframes ninjaFlip{0%{transform:scale(1) rotate(0deg)}25%{transform:scale(1.3) rotate(-10deg)}50%{transform:scale(1.4) rotate(360deg)}75%{transform:scale(1.1) rotate(370deg)}100%{transform:scale(1) rotate(360deg)}}' +
            '.ninja-buddy.big-celebration img{animation:ninjaFlip 0.8s ease-out;}' +
            '@keyframes ninjaShake{0%,100%{transform:translateX(0)}15%{transform:translateX(-4px) rotate(-2deg)}30%{transform:translateX(4px) rotate(2deg)}45%{transform:translateX(-3px) rotate(-1deg)}60%{transform:translateX(3px) rotate(1deg)}75%{transform:translateX(-2px)}}' +
            '.ninja-buddy.shake img{animation:ninjaShake 0.5s ease-out;}' +
            '.ninja-buddy.hidden{opacity:0;pointer-events:none;}' +
            '.ninja-speech{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%) translateY(4px);background:#ffffff;color:#1a1a1a;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display",system-ui,sans-serif;font-size:12px;font-weight:500;line-height:1.3;padding:8px 12px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.12);max-width:180px;text-align:center;opacity:0;pointer-events:none;transition:opacity 0.25s ease,transform 0.25s ease;z-index:' + (CONFIG.Z_INDEX + 1) + ';white-space:normal;}' +
            '.ninja-speech.visible{opacity:1;transform:translateX(-50%) translateY(0);}' +
            '.ninja-speech::after{content:"";position:absolute;top:100%;left:50%;transform:translateX(-50%);border:6px solid transparent;border-top-color:#ffffff;}' +
            '.ninja-speech.below{bottom:auto;top:calc(100% + 8px);}' +
            '.ninja-speech.below::after{top:auto;bottom:100%;border-top-color:transparent;border-bottom-color:#ffffff;}' +
            '.ninja-speech.left-edge{left:0;transform:translateX(0) translateY(4px);}' +
            '.ninja-speech.left-edge.visible{transform:translateX(0) translateY(0);}' +
            '.ninja-speech.left-edge::after{left:20px;}' +
            '.ninja-speech.right-edge{left:auto;right:0;transform:translateX(0) translateY(4px);}' +
            '.ninja-speech.right-edge.visible{transform:translateX(0) translateY(0);}' +
            '.ninja-speech.right-edge::after{left:auto;right:20px;}';
        document.head.appendChild(style);
    }

    // ============================================================
    // DOM INJECTION
    // ============================================================
    function injectDOM() {
        var buddy = document.createElement('div');
        buddy.className = 'ninja-buddy idle hidden';
        buddy.id = 'ninjaBuddy';
        buddy.innerHTML = '<img src="' + CONFIG.IMAGE_BASE + POSES.idle + '" alt="Ninja Buddy" id="ninjaBuddyImg">' +
            '<div class="ninja-speech" id="ninjaSpeech"></div>';
        phoneFrame.appendChild(buddy);
    }

    // ============================================================
    // POSITION PERSISTENCE
    // ============================================================
    function loadState() {
        try {
            var raw = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (raw) {
                var s = JSON.parse(raw);
                state.x = s.x || -1;
                state.y = s.y || -1;
                state.hidden = !!s.hidden;
            }
        } catch(e) {}
    }

    function saveState() {
        var buddy = document.getElementById('ninjaBuddy');
        if (!buddy) return;
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify({
                x: parseInt(buddy.style.left) || 0,
                y: parseInt(buddy.style.top) || 0,
                hidden: state.hidden
            }));
        } catch(e) {}
    }

    function restorePosition() {
        var buddy = document.getElementById('ninjaBuddy');
        if (!buddy || !phoneFrame) return;

        var fw = phoneFrame.offsetWidth;
        var fh = phoneFrame.offsetHeight;

        if (state.x >= 0 && state.y >= 0) {
            // Clamp to frame bounds
            var x = Math.min(Math.max(0, state.x), fw - CONFIG.SIZE);
            var y = Math.min(Math.max(0, state.y), fh - CONFIG.SIZE);
            buddy.style.left = x + 'px';
            buddy.style.top = y + 'px';
        } else {
            // Default position: bottom-right, above bottom nav if present
            var hasBottomNav = !!phoneFrame.querySelector('.bottom-nav');
            var bottomOffset = hasBottomNav ? 88 : 30;
            buddy.style.left = (fw - CONFIG.SIZE - 16) + 'px';
            buddy.style.top = (fh - CONFIG.SIZE - bottomOffset) + 'px';
        }

    }

    // ============================================================
    // DRAG HANDLER
    // ============================================================
    function initDrag() {
        var buddy = document.getElementById('ninjaBuddy');
        if (!buddy) return;

        var isDragging = false;
        var wasDragged = false;
        var startX, startY, origX, origY;

        function clamp(val, min, max) {
            return Math.max(min, Math.min(max, val));
        }

        function onStart(e) {
            isDragging = true;
            wasDragged = false;
            buddy.classList.add('dragging');
            buddy.classList.remove('idle');

            var point = e.touches ? e.touches[0] : e;
            startX = point.clientX;
            startY = point.clientY;
            origX = parseInt(buddy.style.left) || 0;
            origY = parseInt(buddy.style.top) || 0;

            e.preventDefault();
        }

        function onMove(e) {
            if (!isDragging) return;
            var point = e.touches ? e.touches[0] : e;
            var dx = point.clientX - startX;
            var dy = point.clientY - startY;

            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) wasDragged = true;

            var fw = phoneFrame.offsetWidth;
            var fh = phoneFrame.offsetHeight;
            var newX = clamp(origX + dx, 0, fw - CONFIG.SIZE);
            var newY = clamp(origY + dy, 0, fh - CONFIG.SIZE);

            buddy.style.left = newX + 'px';
            buddy.style.top = newY + 'px';

            e.preventDefault();
        }

        function onEnd(e) {
            if (!isDragging) return;
            isDragging = false;
            buddy.classList.remove('dragging');

            saveState();

            if (!wasDragged) {
                handleTap();
            }

            resetIdleTimer();
        }

        buddy.addEventListener('touchstart', onStart, { passive: false });
        buddy.addEventListener('mousedown', onStart);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchend', onEnd);
        document.addEventListener('mouseup', onEnd);
    }

    // ============================================================
    // POSE & ANIMATION ENGINE
    // ============================================================
    function setPose(poseKey, animationType) {
        if (!POSES[poseKey]) return;
        var img = document.getElementById('ninjaBuddyImg');
        var buddy = document.getElementById('ninjaBuddy');
        if (!img || !buddy) return;

        var newSrc = CONFIG.IMAGE_BASE + POSES[poseKey];
        currentPose = poseKey;

        function applyAnimation() {
            buddy.classList.remove('idle', 'pose-change', 'big-celebration', 'shake');
            var animClass = animationType || 'pose-change';
            buddy.classList.add(animClass);
            var duration = animClass === 'big-celebration' ? 800 : 400;
            setTimeout(function() {
                buddy.classList.remove(animClass);
                if (currentPose === 'idle') {
                    buddy.classList.add('idle');
                }
            }, duration);
        }

        // If same image already loaded, just animate
        if (img.src && img.src.indexOf(POSES[poseKey]) > -1) {
            applyAnimation();
            return;
        }

        // Preload new image, then swap + animate
        var preload = new Image();
        preload.onload = function() {
            img.src = newSrc;
            applyAnimation();
        };
        preload.onerror = function() {
            img.src = newSrc;
        };
        preload.src = newSrc;
    }

    // ============================================================
    // SPEECH BUBBLE
    // ============================================================
    function say(message, duration) {
        var bubble = document.getElementById('ninjaSpeech');
        var buddy = document.getElementById('ninjaBuddy');
        if (!bubble || !buddy || !phoneFrame) return;

        if (speechTimer) clearTimeout(speechTimer);

        bubble.textContent = message;

        // Reset positioning classes
        bubble.classList.remove('below', 'left-edge', 'right-edge');

        // Check vertical position — flip below if near top
        var topOffset = parseInt(buddy.style.top) || 0;
        if (topOffset < 80) {
            bubble.classList.add('below');
        }

        // Check horizontal position — adjust if near edges
        var leftOffset = parseInt(buddy.style.left) || 0;
        var fw = phoneFrame.offsetWidth;
        if (leftOffset < 40) {
            bubble.classList.add('left-edge');
        } else if (leftOffset > fw - 100) {
            bubble.classList.add('right-edge');
        }

        bubble.classList.add('visible');

        speechTimer = setTimeout(function() {
            bubble.classList.remove('visible');
        }, duration || CONFIG.SPEECH_DURATION);
    }

    // ============================================================
    // TAP HANDLER
    // ============================================================
    function handleTap() {
        var reaction = REACTIONS['tap'];
        var pose = reaction.poses[Math.floor(Math.random() * reaction.poses.length)];
        var msg = reaction.messages[Math.floor(Math.random() * reaction.messages.length)];

        setPose(pose, 'pose-change');
        say(msg);
        resetIdleTimer();
    }

    // ============================================================
    // REACTION ENGINE
    // ============================================================
    function react(eventType) {
        var reaction = REACTIONS[eventType];
        if (!reaction) return;

        var pose = reaction.poses[Math.floor(Math.random() * reaction.poses.length)];
        var msg = reaction.messages[Math.floor(Math.random() * reaction.messages.length)];

        setPose(pose, reaction.anim);
        say(msg);
        resetIdleTimer();
    }

    // ============================================================
    // IDLE DETECTION
    // ============================================================
    function resetIdleTimer() {
        if (idleTimer) clearTimeout(idleTimer);
        idleTimer = setTimeout(function() {
            setPose('idle', 'pose-change');
        }, CONFIG.IDLE_TIMEOUT);
    }

    // ============================================================
    // PAGE CONTEXT & GREETING
    // ============================================================
    function getPageContext() {
        var path = window.location.pathname || window.location.href;
        if (path.indexOf('savings-lock') > -1) return 'savings';
        if (path.indexOf('savings') > -1) return 'savings';
        if (path.indexOf('home') > -1) return 'home';
        if (path.indexOf('goals-list') > -1) return 'goals';
        if (path.indexOf('goal-detail') > -1) return 'detail';
        if (path.indexOf('profile') > -1) return 'profile';
        if (path.indexOf('habits') > -1) return 'habits';
        if (path.indexOf('templates') > -1) return 'templates';
        if (path.indexOf('leaderboard') > -1) return 'leaderboard';
        if (path.indexOf('create') > -1) return 'create';
        if (path.indexOf('onboarding') > -1) return 'onboarding';
        if (path.indexOf('landing') > -1) return 'landing';
        return 'home';
    }

    function showContextGreeting() {
        var context = getPageContext();
        var greeting = PAGE_GREETINGS[context];
        if (!greeting || !greeting.messages.length) return;

        setTimeout(function() {
            var pose = greeting.poses[Math.floor(Math.random() * greeting.poses.length)];
            var msg = greeting.messages[Math.floor(Math.random() * greeting.messages.length)];
            setPose(pose, 'pose-change');
            say(msg, 2500);
            resetIdleTimer();
        }, 800);
    }

    // ============================================================
    // DATA LAYER HOOKS (monkey-patch for zero-change integration)
    // ============================================================
    function hookDataLayer() {
        // Hook GN_recordHabitCheckin to detect check-in events
        if (typeof GN_recordHabitCheckin === 'function') {
            var originalRecord = GN_recordHabitCheckin;
            GN_recordHabitCheckin = function(habitId, dateStr, status) {
                originalRecord(habitId, dateStr, status);

                // Only react to today's check-ins (not auto-filled missed days)
                var today = typeof GN_getTodayDateStr === 'function' ? GN_getTodayDateStr() : '';
                if (dateStr === today) {
                    if (status === 'complete') {
                        react('checkin-complete');
                    } else if (status === 'missed') {
                        react('checkin-missed');
                    }
                }
            };
        }

        // Hook GN_checkAndUpdateStatuses to detect goal completions
        if (typeof GN_checkAndUpdateStatuses === 'function') {
            var originalCheck = GN_checkAndUpdateStatuses;
            GN_checkAndUpdateStatuses = function() {
                // Snapshot goal statuses before
                var goalsBefore = {};
                if (typeof GN_getGoals === 'function') {
                    var goals = GN_getGoals();
                    for (var i = 0; i < goals.length; i++) {
                        goalsBefore[goals[i].id] = goals[i].status;
                    }
                }

                originalCheck();

                // Check for newly completed goals
                if (typeof GN_getGoals === 'function') {
                    var goalsAfter = GN_getGoals();
                    for (var j = 0; j < goalsAfter.length; j++) {
                        if (goalsBefore[goalsAfter[j].id] === 'active' && goalsAfter[j].status === 'completed') {
                            setTimeout(function() {
                                react('goal-completed');
                            }, 500);
                            break;
                        }
                    }
                }
            };
        }
    }

    // ============================================================
    // IMAGE PRELOADER
    // ============================================================
    function preloadImages(callback) {
        var keys = Object.keys(POSES);
        var loaded = 0;
        var total = keys.length;
        for (var i = 0; i < total; i++) {
            var preImg = new Image();
            preImg.onload = preImg.onerror = function() {
                loaded++;
                if (loaded >= total && callback) callback();
            };
            preImg.src = CONFIG.IMAGE_BASE + POSES[keys[i]];
        }
    }

    // ============================================================
    // PUBLIC API
    // ============================================================
    window.NinjaBuddy = {
        react: function(eventType) { react(eventType); },
        say: function(message, duration) { say(message, duration); },
        setPose: function(poseKey) { setPose(poseKey, 'pose-change'); },
        hide: function() {
            var buddy = document.getElementById('ninjaBuddy');
            if (buddy) buddy.classList.add('hidden');
            state.hidden = true;
            saveState();
        },
        show: function() {
            var buddy = document.getElementById('ninjaBuddy');
            if (buddy) buddy.classList.remove('hidden');
            state.hidden = false;
            saveState();
        },
        toggle: function() {
            if (state.hidden) { window.NinjaBuddy.show(); }
            else { window.NinjaBuddy.hide(); }
        }
    };

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        phoneFrame = document.querySelector('.phone-frame');
        if (!phoneFrame) return; // Skip on screens without phone frame

        // Don't inject twice
        if (document.getElementById('ninjaBuddy')) return;

        injectCSS();
        injectDOM();
        loadState();
        restorePosition();
        initDrag();
        hookDataLayer();
        preloadImages();

        // Fade in after positioning (unless user manually hid it)
        if (!state.hidden) {
            var buddy = document.getElementById('ninjaBuddy');
            if (buddy) {
                setTimeout(function() {
                    buddy.classList.remove('hidden');
                }, 100);
            }
        }

        // Listen for custom events
        document.addEventListener('ninjaEvent', function(e) {
            if (e.detail && e.detail.type) {
                react(e.detail.type);
            }
        });

        resetIdleTimer();
        showContextGreeting();
    }

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
