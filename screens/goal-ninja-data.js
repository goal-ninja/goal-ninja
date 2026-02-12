// ============================================================
// GOAL NINJA — Shared Data Layer
// All screens load this via <script src="goal-ninja-data.js">
// Functions prefixed with GN_ to avoid conflicts
// ============================================================

// --- THEME ---

(function() {
    // Inject dark mode CSS immediately (before paint)
    var d = ':root[data-theme="dark"]';
    var darkCSS = [
        // Core variables
        d+'{--bg:#121212;--card-bg:#1e1e1e;--text-primary:#f0f0f0;--text-secondary:#aaa;--text-muted:#777;--accent:#f0f0f0;--border:#333;--success:#22c55e;--success-light:#14532d;--danger:#ef4444;--danger-light:#7f1d1d;--warning:#f59e0b;--warning-light:#78350f;--pro-gradient:linear-gradient(135deg,#2a2a2a 0%,#444 100%)}',
        // Body and frame
        d+' body{background:#121212;color:#f0f0f0}',
        d+' .phone-frame{background:#121212;border-color:#333}',
        // Forms
        d+' input,'+d+' select,'+d+' textarea{background:#2a2a2a;color:#f0f0f0;border-color:#444}',
        // Bottom nav
        d+' .bottom-nav{background:#1a1a1a;border-color:#333}',
        d+' .bottom-nav button{color:#777}',
        d+' .bottom-nav button.active,'+d+' .bottom-nav button:hover{color:#f0f0f0}',
        // Buttons - PRIMARY FIX: dark buttons need to invert in dark mode
        d+' .fab{background:#f0f0f0;color:#1a1a1a}',
        d+' .fab svg{color:#1a1a1a}',
        d+' .checkin-btn{background:#f0f0f0;color:#1a1a1a}',
        d+' .checkin-btn svg{color:#1a1a1a;stroke:#1a1a1a}',
        d+' .checkin-btn.paused-btn{background:#2a2a2a;color:#777}',
        d+' .add-btn{background:#f0f0f0;color:#1a1a1a}',
        // Filter tabs
        d+' .filter-tab{background:#2a2a2a;color:#aaa;border-color:#333}',
        d+' .filter-tab.active{background:#f0f0f0;color:#1a1a1a}',
        d+' .metric-tab{color:#aaa}',
        d+' .metric-tab.active{color:#f0f0f0;border-color:#f0f0f0}',
        // Cards
        d+' .mission-card{background:#1e1e1e;border-color:#333}',
        d+' .mission-card:hover{background:#252525}',
        d+' .mission-name{color:#f0f0f0}',
        d+' .mission-stat-value{color:#f0f0f0}',
        d+' .mission-stat-label{color:#777}',
        d+' .mission-meta{color:#777}',
        d+' .mission-progress{background:#333}',
        // Badges
        d+' .completed-badge{background:#14532d;color:#4ade80}',
        d+' .failed-badge{background:#7f1d1d;color:#fca5a5}',
        d+' .pro-badge{background:#78350f;color:#fbbf24}',
        // Modals
        d+' .modal{background:#1e1e1e}',
        d+' .modal-handle{background:#444}',
        d+' .modal-header .modal-title{color:#f0f0f0}',
        d+' .modal-header .modal-subtitle{color:#aaa}',
        d+' .modal-option{border-color:#333;color:#f0f0f0}',
        d+' .modal-option.selected{border-color:#f0f0f0;background:#2a2a2a}',
        d+' .modal-option .option-title{color:#f0f0f0}',
        d+' .modal-option .option-desc{color:#777}',
        d+' .modal-btn.cancel{background:#2a2a2a;color:#f0f0f0}',
        d+' .modal-btn.primary{background:#f0f0f0;color:#1a1a1a}',
        d+' .option-icon.complete{background:#14532d}',
        d+' .option-icon.missed{background:#7f1d1d}',
        d+' .photo-upload{background:#2a2a2a;color:#aaa}',
        // Profile / Settings
        d+' .settings-group{background:#1e1e1e;border-color:#333}',
        d+' .settings-item{border-color:#333}',
        d+' .settings-label{color:#f0f0f0}',
        d+' .settings-value{color:#aaa}',
        d+' .settings-icon{color:#f0f0f0}',
        d+' .settings-icon svg{color:#f0f0f0;stroke:#f0f0f0}',
        d+' .avatar-container{background:#2a2a2a}',
        d+' .avatar-edit{background:#f0f0f0;color:#1a1a1a}',
        d+' .stat-card{background:#1e1e1e}',
        d+' .stat-value{color:#f0f0f0}',
        d+' .stat-label{color:#777}',
        d+' .toggle-switch.active{background:#22c55e}',
        d+' .toggle-switch{background:#444}',
        // Activity page
        d+' .activity-item{background:#1e1e1e;border-color:#333}',
        d+' .activity-icon{background:#2a2a2a}',
        d+' .activity-group-header{color:#aaa}',
        d+' .summary-card{background:#1e1e1e}',
        // Leaderboard
        d+' .mascot-card{background:#1e1e1e}',
        d+' .your-rank-card{background:#1e1e1e}',
        d+' .podium-card{background:#1e1e1e}',
        d+' .leaderboard-item{background:#1e1e1e;border-color:#333}',
        // Savings / Vault
        d+' .vault-card{background:#1e1e1e}',
        d+' .vault-item{background:#1e1e1e}',
        d+' .transaction-item{background:#1e1e1e;border-color:#333}',
        // Subscription
        d+' .plan-card{background:#1e1e1e;border-color:#333}',
        d+' .plan-card.current{border-color:#f0f0f0}',
        d+' .feature-item{color:#aaa}',
        // Goal detail
        d+' .detail-card{background:#1e1e1e}',
        d+' .calendar-day{color:#f0f0f0}',
        d+' .calendar-day.other-month{color:#555}',
        d+' .danger-zone{background:#1e1e1e;border-color:#333}',
        d+' .danger-item{border-color:#333}',
        d+' .menu-dropdown{background:#1e1e1e;border-color:#333;box-shadow:0 4px 20px rgba(0,0,0,0.5)}',
        d+' .menu-item{color:#f0f0f0}',
        d+' .menu-item:hover{background:#2a2a2a}',
        d+' .menu-item.danger{color:#ef4444}',
        // Template / Create
        d+' .template-card{background:#1e1e1e;border-color:#333}',
        d+' .template-card:hover{background:#252525}',
        d+' .selector-field{background:#2a2a2a;border-color:#444;color:#f0f0f0}',
        d+' .step-header{color:#f0f0f0}',
        d+' .create-btn{background:#f0f0f0;color:#1a1a1a}',
        // Generic overrides for common hardcoded backgrounds
        d+' [style*="background:#f3f4f6"],'+d+' [style*="background: #f3f4f6"]{background:#2a2a2a !important}',
        d+' [style*="background:#f0f0f0"],'+d+' [style*="background: #f0f0f0"]{background:#2a2a2a !important}',
        d+' [style*="color:#1a1a1a"],'+d+' [style*="color: #1a1a1a"]{color:#f0f0f0 !important}',
        // Page header
        d+' .page-header{background:#121212}',
        d+' .page-title{color:#f0f0f0}',
        d+' h1,'+d+' h2,'+d+' h3,'+d+' h4{color:#f0f0f0}',
        d+' p{color:#ccc}',
        d+' a{color:#8bb4f0}',
        // Dropdown
        d+' .profile-dropdown{background:#1e1e1e;border-color:#333;box-shadow:0 4px 20px rgba(0,0,0,0.5)}',
        d+' .profile-dropdown a,'+d+' .profile-dropdown button{color:#f0f0f0}',
        d+' .profile-dropdown a:hover,'+d+' .profile-dropdown button:hover{background:#2a2a2a}',
        // Scroll container
        d+' .main-content{background:#121212}',
        d+' .scroll-container{background:#121212}',
        // Desktop frame background
        '@media(min-width:500px){'+d+' body{background:#000}}'
    ].join('');
    var style = document.createElement('style');
    style.textContent = darkCSS;
    document.head.appendChild(style);

    function applyTheme() {
        var pref = localStorage.getItem('goalNinjaAppearance') || 'system';
        var isDark = false;
        if (pref === 'dark') isDark = true;
        else if (pref === 'system' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) isDark = true;
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    }

    applyTheme();

    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    }

    // Expose for profile page to call after changing setting
    window.GN_applyTheme = applyTheme;
})();

// --- HELPERS ---

function GN_getTodayDateStr() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function GN_formatDate(dateStr) {
    var d = new Date(dateStr + 'T12:00:00');
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

function GN_daysBetween(dateStr1, dateStr2) {
    var d1 = new Date(dateStr1 + 'T12:00:00');
    var d2 = new Date(dateStr2 + 'T12:00:00');
    return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
}

// --- MISSION CRUD ---

function GN_getMissions() {
    try {
        var data = localStorage.getItem('goalNinjaMissions');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function GN_saveMissions(missions) {
    localStorage.setItem('goalNinjaMissions', JSON.stringify(missions));
}

function GN_getMissionById(missionId) {
    var missions = GN_getMissions();
    for (var i = 0; i < missions.length; i++) {
        if (missions[i].id === missionId) return missions[i];
    }
    return null;
}

function GN_addMission(data) {
    var missions = GN_getMissions();
    var today = GN_getTodayDateStr();
    var newMission = {
        id: 'mission_' + Date.now(),
        name: data.name || 'New Mission',
        icon: data.icon || 'default',
        description: data.description || '',
        penalty: parseFloat(data.penalty) || 5,
        duration: parseInt(data.duration) || 30,
        target: parseInt(data.target) || 80,
        reminder: data.reminder || '21:00',
        createdAt: new Date().toISOString(),
        startDate: data.startDate || today,
        status: 'active'
    };
    missions.push(newMission);
    GN_saveMissions(missions);

    // Initialize empty check-in record
    var checkins = GN_getAllCheckins();
    checkins[newMission.id] = {};
    localStorage.setItem('goalNinjaCheckins', JSON.stringify(checkins));

    return newMission;
}

function GN_updateMission(missionId, updates) {
    var missions = GN_getMissions();
    for (var i = 0; i < missions.length; i++) {
        if (missions[i].id === missionId) {
            for (var key in updates) {
                if (updates.hasOwnProperty(key)) {
                    missions[i][key] = updates[key];
                }
            }
            break;
        }
    }
    GN_saveMissions(missions);
}

function GN_deleteMission(missionId) {
    var missions = GN_getMissions().filter(function(m) { return m.id !== missionId; });
    GN_saveMissions(missions);
    var checkins = GN_getAllCheckins();
    delete checkins[missionId];
    localStorage.setItem('goalNinjaCheckins', JSON.stringify(checkins));
}

// --- CHECK-IN OPERATIONS ---

function GN_getAllCheckins() {
    try {
        var data = localStorage.getItem('goalNinjaCheckins');
        return data ? JSON.parse(data) : {};
    } catch (e) {
        return {};
    }
}

function GN_getCheckinsForMission(missionId) {
    var all = GN_getAllCheckins();
    return all[missionId] || {};
}

function GN_recordCheckin(missionId, dateStr, status) {
    var checkins = GN_getAllCheckins();
    if (!checkins[missionId]) checkins[missionId] = {};
    checkins[missionId][dateStr] = status;
    localStorage.setItem('goalNinjaCheckins', JSON.stringify(checkins));
}

function GN_hasCheckedInToday(missionId) {
    var checkins = GN_getCheckinsForMission(missionId);
    var today = GN_getTodayDateStr();
    return checkins.hasOwnProperty(today);
}

function GN_getTodayCheckinStatus(missionId) {
    var checkins = GN_getCheckinsForMission(missionId);
    var today = GN_getTodayDateStr();
    return checkins[today] || null;
}

// --- COMPUTED STATS (per mission) ---

function GN_getMissionStats(missionId) {
    var mission = GN_getMissionById(missionId);
    if (!mission) return null;

    var checkins = GN_getCheckinsForMission(missionId);
    var today = GN_getTodayDateStr();
    var startDate = mission.startDate;

    // Calculate day number (1-based)
    var dayNumber = GN_daysBetween(startDate, today) + 1;
    if (dayNumber < 1) dayNumber = 1;
    if (dayNumber > mission.duration) dayNumber = mission.duration;

    var daysLeft = Math.max(0, mission.duration - dayNumber);

    // Count check-ins
    var completedDays = 0;
    var missedDays = 0;
    var dates = Object.keys(checkins);
    for (var i = 0; i < dates.length; i++) {
        if (checkins[dates[i]] === 'complete') completedDays++;
        else if (checkins[dates[i]] === 'missed') missedDays++;
    }

    var totalCheckins = completedDays + missedDays;
    var completionRate = totalCheckins > 0 ? Math.round((completedDays / totalCheckins) * 100) : 0;

    // Streaks
    var currentStreak = GN_getCurrentStreak(missionId);
    var bestStreak = GN_getBestStreak(missionId);

    // Vault amount
    var vaultAmount = missedDays * mission.penalty;

    // Progress through mission duration
    var progress = Math.min(100, Math.round((dayNumber / mission.duration) * 100));

    // Completion checks
    var isComplete = dayNumber >= mission.duration;
    var hitTarget = completionRate >= mission.target;

    return {
        dayNumber: dayNumber,
        daysLeft: daysLeft,
        totalCheckins: totalCheckins,
        completedDays: completedDays,
        missedDays: missedDays,
        currentStreak: currentStreak,
        bestStreak: bestStreak,
        completionRate: completionRate,
        vaultAmount: vaultAmount,
        progress: progress,
        isComplete: isComplete,
        hitTarget: hitTarget
    };
}

function GN_getCurrentStreak(missionId) {
    var checkins = GN_getCheckinsForMission(missionId);
    var mission = GN_getMissionById(missionId);
    if (!mission) return 0;

    var today = new Date();
    var streak = 0;

    // Walk backward from today
    for (var i = 0; i < 365; i++) {
        var d = new Date(today);
        d.setDate(d.getDate() - i);
        var dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

        // Don't count before mission started
        if (dateStr < mission.startDate) break;

        if (checkins[dateStr] === 'complete') {
            streak++;
        } else if (checkins[dateStr] === 'missed') {
            break;
        } else {
            // No check-in for today is OK (haven't checked in yet), but past days break streak
            if (i === 0) continue;
            break;
        }
    }
    return streak;
}

function GN_getBestStreak(missionId) {
    var checkins = GN_getCheckinsForMission(missionId);
    var dates = Object.keys(checkins).sort();
    if (dates.length === 0) return 0;

    var best = 0;
    var current = 0;

    for (var i = 0; i < dates.length; i++) {
        if (checkins[dates[i]] === 'complete') {
            current++;
            if (current > best) best = current;
        } else {
            current = 0;
        }
    }
    return best;
}

// --- AGGREGATE STATS ---

function GN_getActiveMissions() {
    return GN_getMissions().filter(function(m) { return m.status === 'active' || m.status === 'paused'; });
}

function GN_getCompletedMissions() {
    return GN_getMissions().filter(function(m) { return m.status === 'completed' || m.status === 'failed' || m.status === 'ended'; });
}

function GN_getVaultTotal() {
    var missions = GN_getMissions();
    var total = 0;
    for (var i = 0; i < missions.length; i++) {
        var stats = GN_getMissionStats(missions[i].id);
        if (stats) total += stats.vaultAmount;
    }
    return total;
}

function GN_getLockedVaultTotal() {
    var missions = GN_getActiveMissions();
    var total = 0;
    for (var i = 0; i < missions.length; i++) {
        var stats = GN_getMissionStats(missions[i].id);
        if (stats) total += stats.vaultAmount;
    }
    return total;
}

function GN_getUnlockedVaultTotal() {
    var missions = GN_getCompletedMissions();
    var total = 0;
    for (var i = 0; i < missions.length; i++) {
        var stats = GN_getMissionStats(missions[i].id);
        if (stats) total += stats.vaultAmount;
    }
    return total;
}

function GN_getOverallStats() {
    var missions = GN_getMissions();
    var active = GN_getActiveMissions();
    var completed = GN_getCompletedMissions();
    var totalVault = GN_getVaultTotal();

    var bestStreak = 0;
    var totalCompleted = 0;
    var totalCheckins = 0;

    for (var i = 0; i < missions.length; i++) {
        var stats = GN_getMissionStats(missions[i].id);
        if (stats) {
            if (stats.bestStreak > bestStreak) bestStreak = stats.bestStreak;
            totalCompleted += stats.completedDays;
            totalCheckins += stats.totalCheckins;
        }
    }

    var overallRate = totalCheckins > 0 ? Math.round((totalCompleted / totalCheckins) * 100) : 0;

    return {
        totalMissions: missions.length,
        activeMissions: active.length,
        completedMissions: completed.length,
        overallCompletionRate: overallRate,
        bestStreak: bestStreak,
        totalVault: totalVault,
        totalCompletedDays: totalCompleted,
        totalMissedDays: totalCheckins - totalCompleted
    };
}

// --- MISSION LIFECYCLE ---

function GN_checkAndUpdateMissionStatuses() {
    var missions = GN_getMissions();
    var today = GN_getTodayDateStr();
    var changed = false;

    for (var i = 0; i < missions.length; i++) {
        var m = missions[i];
        if (m.status !== 'active' && m.status !== 'paused') continue;
        if (m.status === 'paused') continue; // Skip auto-miss for paused missions

        var checkins = GN_getCheckinsForMission(m.id);

        // Auto-fill missed days (from startDate to yesterday)
        var startD = new Date(m.startDate + 'T12:00:00');
        var todayD = new Date(today + 'T12:00:00');
        var yesterday = new Date(todayD);
        yesterday.setDate(yesterday.getDate() - 1);

        var cursor = new Date(startD);
        while (cursor <= yesterday) {
            var dateStr = cursor.getFullYear() + '-' + String(cursor.getMonth() + 1).padStart(2, '0') + '-' + String(cursor.getDate()).padStart(2, '0');
            if (!checkins[dateStr]) {
                GN_recordCheckin(m.id, dateStr, 'missed');
                changed = true;
            }
            cursor.setDate(cursor.getDate() + 1);
        }

        // Check if mission duration has expired
        var dayNumber = GN_daysBetween(m.startDate, today) + 1;
        if (dayNumber > m.duration) {
            var stats = GN_getMissionStats(m.id);
            missions[i].status = (stats && stats.hitTarget) ? 'completed' : 'failed';
            changed = true;
        }
    }

    if (changed) {
        GN_saveMissions(missions);
    }
}

// --- SELECTED MISSION (navigation) ---

function GN_setSelectedMission(missionId) {
    localStorage.setItem('goalNinjaSelectedMission', missionId);
}

function GN_getSelectedMission() {
    return localStorage.getItem('goalNinjaSelectedMission') || null;
}

// --- ICON SVG MAPPING ---

function GN_getIconSVG(iconId, size) {
    size = size || 22;
    var icons = {
        coffee: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>',
        book: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        exercise: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 4a2 2 0 1 0-4 0 2 2 0 0 0 4 0z"/><path d="M7 21l3-6 3 2 3-7 2 1"/><path d="M5 21l4-8-2-1 2-5"/></svg>',
        phone: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="4" y1="4" x2="20" y2="20" stroke-width="2.5"/></svg>',
        money: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        meditation: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.5"/><path d="M12 7.5c-3 2-5 4-5 6.5 0 1 .5 2 2 2.5l1.5.5c1 .3 2 .3 3 0l1.5-.5c1.5-.5 2-1.5 2-2.5 0-2.5-2-4.5-5-6.5z"/><path d="M7 17c-2 .5-3 1.5-3 3h16c0-1.5-1-2.5-3-3"/></svg>',
        sleep: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
        food: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>',
        water: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
        sun: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
        shopping: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
        target: '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
    };

    // Aliases
    icons['reading'] = icons.book;
    icons['workout'] = icons.exercise;
    icons['run'] = icons.exercise;
    icons['social'] = icons.phone;
    icons['nosocial'] = icons.phone;
    icons['nocoffee'] = icons.coffee;
    icons['saving'] = icons.money;
    icons['default'] = icons.target;

    return icons[iconId] || icons['default'];
}
