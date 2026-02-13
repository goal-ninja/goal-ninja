// ============================================================
// GOAL NINJA — Shared Data Layer (v2: Goals + Habits)
// All screens load this via <script src="goal-ninja-data.js">
// Functions prefixed with GN_ to avoid conflicts
// ============================================================

// --- THEME ---

(function() {
    var d = ':root[data-theme="dark"]';
    var darkCSS = [
        d+'{--bg:#121212;--card-bg:#1e1e1e;--text-primary:#f0f0f0;--text-secondary:#aaa;--text-muted:#777;--accent:#f0f0f0;--border:#333;--success:#22c55e;--success-light:#14532d;--danger:#ef4444;--danger-light:#7f1d1d;--warning:#f59e0b;--warning-light:#78350f;--pro-gradient:linear-gradient(135deg,#2a2a2a 0%,#444 100%)}',
        d+' body{background:#121212;color:#f0f0f0}',
        d+' .phone-frame{background:#121212;border-color:#333}',
        d+' input,'+d+' select,'+d+' textarea{background:#2a2a2a;color:#f0f0f0;border-color:#444}',
        d+' .bottom-nav{background:#1e1e1e;box-shadow:0 2px 20px rgba(0,0,0,0.4),0 0 0 1px rgba(255,255,255,0.06)}',
        d+' .nav-item{color:#777}',
        d+' .nav-item.active{color:#f0f0f0;background:rgba(255,255,255,0.1)}',
        d+' .nav-item:hover{color:#ccc}',
        d+' .fab{background:#f0f0f0;color:#1a1a1a}',
        d+' .fab svg{color:#1a1a1a}',
        d+' .checkin-btn{background:#f0f0f0;color:#1a1a1a}',
        d+' .checkin-btn svg{color:#1a1a1a;stroke:#1a1a1a}',
        d+' .checkin-btn.paused-btn{background:#2a2a2a;color:#777}',
        d+' .add-btn{background:#f0f0f0;color:#1a1a1a}',
        d+' .filter-tab{background:#2a2a2a;color:#aaa;border-color:#333}',
        d+' .filter-tab.active{background:#f0f0f0;color:#1a1a1a}',
        d+' .metric-tab{color:#aaa}',
        d+' .metric-tab.active{color:#f0f0f0;border-color:#f0f0f0}',
        d+' .mission-card,.goal-card,.habit-card{background:#1e1e1e;border-color:#333}',
        d+' .mission-card:hover,.goal-card:hover,.habit-card:hover{background:#252525}',
        d+' .mission-name,.goal-name,.habit-name{color:#f0f0f0}',
        d+' .mission-stat-value,.goal-stat-value,.habit-stat-value{color:#f0f0f0}',
        d+' .mission-stat-label,.goal-stat-label,.habit-stat-label{color:#777}',
        d+' .mission-meta,.goal-meta,.habit-meta{color:#777}',
        d+' .mission-progress,.goal-progress{background:#333}',
        d+' .completed-badge{background:#14532d;color:#4ade80}',
        d+' .failed-badge{background:#7f1d1d;color:#fca5a5}',
        d+' .pro-badge{background:#78350f;color:#fbbf24}',
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
        d+' .activity-item{background:#1e1e1e;border-color:#333}',
        d+' .activity-icon{background:#2a2a2a}',
        d+' .activity-group-header{color:#aaa}',
        d+' .summary-card{background:#1e1e1e}',
        d+' .mascot-card{background:#1e1e1e}',
        d+' .your-rank-card{background:#1e1e1e}',
        d+' .podium-card{background:#1e1e1e}',
        d+' .leaderboard-item{background:#1e1e1e;border-color:#333}',
        d+' .vault-card{background:#1e1e1e}',
        d+' .vault-item{background:#1e1e1e}',
        d+' .transaction-item{background:#1e1e1e;border-color:#333}',
        d+' .plan-card{background:#1e1e1e;border-color:#333}',
        d+' .plan-card.current{border-color:#f0f0f0}',
        d+' .feature-item{color:#aaa}',
        d+' .detail-card{background:#1e1e1e}',
        d+' .calendar-day{color:#f0f0f0}',
        d+' .calendar-day.other-month{color:#555}',
        d+' .danger-zone{background:#1e1e1e;border-color:#333}',
        d+' .danger-item{border-color:#333}',
        d+' .menu-dropdown{background:#1e1e1e;border-color:#333;box-shadow:0 4px 20px rgba(0,0,0,0.5)}',
        d+' .menu-item{color:#f0f0f0}',
        d+' .menu-item:hover{background:#2a2a2a}',
        d+' .menu-item.danger{color:#ef4444}',
        d+' .template-card{background:#1e1e1e;border-color:#333}',
        d+' .template-card:hover{background:#252525}',
        d+' .selector-field{background:#2a2a2a;border-color:#444;color:#f0f0f0}',
        d+' .step-header{color:#f0f0f0}',
        d+' .create-btn{background:#f0f0f0;color:#1a1a1a}',
        d+' [style*="background:#f3f4f6"],'+d+' [style*="background: #f3f4f6"]{background:#2a2a2a !important}',
        d+' [style*="background:#f0f0f0"],'+d+' [style*="background: #f0f0f0"]{background:#2a2a2a !important}',
        d+' [style*="color:#1a1a1a"],'+d+' [style*="color: #1a1a1a"]{color:#f0f0f0 !important}',
        d+' .page-header{background:#121212}',
        d+' .page-title{color:#f0f0f0}',
        d+' h1,'+d+' h2,'+d+' h3,'+d+' h4{color:#f0f0f0}',
        d+' p{color:#ccc}',
        d+' a{color:#8bb4f0}',
        d+' .profile-dropdown{background:#1e1e1e;border-color:#333;box-shadow:0 4px 20px rgba(0,0,0,0.5)}',
        d+' .profile-dropdown a,'+d+' .profile-dropdown button{color:#f0f0f0}',
        d+' .profile-dropdown a:hover,'+d+' .profile-dropdown button:hover{background:#2a2a2a}',
        d+' .main-content{background:#121212}',
        d+' .scroll-container{background:#121212}',
        // Goal tag pills in habit cards
        d+' .goal-tag{background:#2a2a2a;color:#aaa;border-color:#444}',
        // Analytics ring chart
        d+' .ring-label{color:#f0f0f0}',
        d+' .ring-sublabel{color:#777}',
        // Habit row inside goal detail
        d+' .habit-row{background:#1e1e1e;border-color:#333}',
        d+' .habit-row:hover{background:#252525}',
        d+' .habit-analytics{background:#161616;border-color:#333}',
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
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);
    }
    window.GN_applyTheme = applyTheme;
})();

// --- MIGRATION (runs once) ---

(function() {
    if (localStorage.getItem('goalNinjaMigrationDone')) return;
    var raw = localStorage.getItem('goalNinjaMissions');
    if (!raw) { localStorage.setItem('goalNinjaMigrationDone', 'true'); return; }
    try {
        var missions = JSON.parse(raw);
        if (!missions || missions.length === 0) { localStorage.setItem('goalNinjaMigrationDone', 'true'); return; }
    } catch(e) { localStorage.setItem('goalNinjaMigrationDone', 'true'); return; }

    var oldCheckins = {};
    try { var cr = localStorage.getItem('goalNinjaCheckins'); if (cr) oldCheckins = JSON.parse(cr); } catch(e) {}

    var newGoals = [];
    var newHabits = [];
    var newCheckins = {};

    for (var i = 0; i < missions.length; i++) {
        var m = missions[i];
        var goalId = 'goal_m_' + m.id;
        var habitId = 'habit_m_' + m.id;

        newGoals.push({
            id: goalId,
            name: m.name || 'Untitled Goal',
            icon: m.icon || 'default',
            description: m.description || '',
            duration: m.duration || 30,
            target: m.target || 80,
            startDate: m.startDate,
            createdAt: m.createdAt,
            status: m.status || 'active',
            habitIds: [habitId]
        });

        newHabits.push({
            id: habitId,
            name: m.name || 'Untitled Habit',
            icon: m.icon || 'default',
            penalty: m.penalty || 5,
            reminder: m.reminder || '21:00',
            goalIds: [goalId],
            createdAt: m.createdAt
        });

        if (oldCheckins[m.id]) {
            newCheckins[habitId] = oldCheckins[m.id];
        }
    }

    localStorage.setItem('goalNinjaGoals', JSON.stringify(newGoals));
    localStorage.setItem('goalNinjaHabits', JSON.stringify(newHabits));
    localStorage.setItem('goalNinjaCheckins', JSON.stringify(newCheckins));
    localStorage.setItem('goalNinjaMigrationDone', 'true');
    // Old data kept as backup — don't delete goalNinjaMissions
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

// ============================================================
// GOAL CRUD
// ============================================================

function GN_getGoals() {
    try { var d = localStorage.getItem('goalNinjaGoals'); return d ? JSON.parse(d) : []; }
    catch(e) { return []; }
}

function GN_saveGoals(goals) {
    localStorage.setItem('goalNinjaGoals', JSON.stringify(goals));
}

function GN_getGoalById(goalId) {
    var goals = GN_getGoals();
    for (var i = 0; i < goals.length; i++) {
        if (goals[i].id === goalId) return goals[i];
    }
    return null;
}

function GN_addGoal(data) {
    var goals = GN_getGoals();
    var today = GN_getTodayDateStr();
    var goal = {
        id: 'goal_' + Date.now(),
        name: data.name || 'New Goal',
        icon: data.icon || 'default',
        description: data.description || '',
        duration: parseInt(data.duration) || 30,
        target: parseInt(data.target) || 80,
        startDate: data.startDate || today,
        createdAt: new Date().toISOString(),
        status: 'active',
        habitIds: []
    };
    goals.push(goal);
    GN_saveGoals(goals);
    return goal;
}

function GN_updateGoal(goalId, updates) {
    var goals = GN_getGoals();
    for (var i = 0; i < goals.length; i++) {
        if (goals[i].id === goalId) {
            for (var key in updates) {
                if (updates.hasOwnProperty(key)) goals[i][key] = updates[key];
            }
            break;
        }
    }
    GN_saveGoals(goals);
}

function GN_deleteGoal(goalId) {
    var goal = GN_getGoalById(goalId);
    if (!goal) return;

    // Unlink habits — remove goalId from each habit's goalIds
    var habits = GN_getHabits();
    var checkins = GN_getAllCheckins();
    for (var i = 0; i < habits.length; i++) {
        var idx = habits[i].goalIds.indexOf(goalId);
        if (idx > -1) {
            habits[i].goalIds.splice(idx, 1);
            // If habit has no more goals, delete it and its checkins
            if (habits[i].goalIds.length === 0) {
                delete checkins[habits[i].id];
                habits.splice(i, 1);
                i--;
            }
        }
    }
    GN_saveHabits(habits);
    localStorage.setItem('goalNinjaCheckins', JSON.stringify(checkins));

    // Remove the goal
    var goals = GN_getGoals().filter(function(g) { return g.id !== goalId; });
    GN_saveGoals(goals);
}

function GN_getActiveGoals() {
    return GN_getGoals().filter(function(g) { return g.status === 'active' || g.status === 'paused'; });
}

function GN_getCompletedGoals() {
    return GN_getGoals().filter(function(g) { return g.status === 'completed' || g.status === 'failed' || g.status === 'ended'; });
}

// ============================================================
// HABIT CRUD
// ============================================================

function GN_getHabits() {
    try { var d = localStorage.getItem('goalNinjaHabits'); return d ? JSON.parse(d) : []; }
    catch(e) { return []; }
}

function GN_saveHabits(habits) {
    localStorage.setItem('goalNinjaHabits', JSON.stringify(habits));
}

function GN_getHabitById(habitId) {
    var habits = GN_getHabits();
    for (var i = 0; i < habits.length; i++) {
        if (habits[i].id === habitId) return habits[i];
    }
    return null;
}

function GN_addHabit(data) {
    var habits = GN_getHabits();
    var habit = {
        id: 'habit_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        name: data.name || 'New Habit',
        icon: data.icon || 'default',
        penalty: parseFloat(data.penalty) || 5,
        reminder: data.reminder || '21:00',
        goalIds: data.goalIds || [],
        createdAt: new Date().toISOString()
    };
    habits.push(habit);
    GN_saveHabits(habits);

    // Initialize empty check-in record
    var checkins = GN_getAllCheckins();
    checkins[habit.id] = {};
    localStorage.setItem('goalNinjaCheckins', JSON.stringify(checkins));

    // Link to goals
    if (habit.goalIds.length > 0) {
        var goals = GN_getGoals();
        for (var i = 0; i < goals.length; i++) {
            if (habit.goalIds.indexOf(goals[i].id) > -1 && goals[i].habitIds.indexOf(habit.id) === -1) {
                goals[i].habitIds.push(habit.id);
            }
        }
        GN_saveGoals(goals);
    }

    return habit;
}

function GN_updateHabit(habitId, updates) {
    var habits = GN_getHabits();
    for (var i = 0; i < habits.length; i++) {
        if (habits[i].id === habitId) {
            for (var key in updates) {
                if (updates.hasOwnProperty(key)) habits[i][key] = updates[key];
            }
            break;
        }
    }
    GN_saveHabits(habits);
}

function GN_deleteHabit(habitId) {
    // Remove from all goals' habitIds
    var goals = GN_getGoals();
    for (var i = 0; i < goals.length; i++) {
        var idx = goals[i].habitIds.indexOf(habitId);
        if (idx > -1) goals[i].habitIds.splice(idx, 1);
    }
    GN_saveGoals(goals);

    // Remove habit
    var habits = GN_getHabits().filter(function(h) { return h.id !== habitId; });
    GN_saveHabits(habits);

    // Remove checkins
    var checkins = GN_getAllCheckins();
    delete checkins[habitId];
    localStorage.setItem('goalNinjaCheckins', JSON.stringify(checkins));
}

function GN_getHabitsForGoal(goalId) {
    var goal = GN_getGoalById(goalId);
    if (!goal) return [];
    var habits = GN_getHabits();
    var result = [];
    for (var i = 0; i < goal.habitIds.length; i++) {
        for (var j = 0; j < habits.length; j++) {
            if (habits[j].id === goal.habitIds[i]) {
                result.push(habits[j]);
                break;
            }
        }
    }
    return result;
}

function GN_getGoalsForHabit(habitId) {
    var habit = GN_getHabitById(habitId);
    if (!habit) return [];
    var goals = GN_getGoals();
    var result = [];
    for (var i = 0; i < habit.goalIds.length; i++) {
        for (var j = 0; j < goals.length; j++) {
            if (goals[j].id === habit.goalIds[i]) {
                result.push(goals[j]);
                break;
            }
        }
    }
    return result;
}

function GN_linkHabitToGoal(habitId, goalId) {
    var habit = GN_getHabitById(habitId);
    var goal = GN_getGoalById(goalId);
    if (!habit || !goal) return;

    if (habit.goalIds.indexOf(goalId) === -1) {
        GN_updateHabit(habitId, { goalIds: habit.goalIds.concat([goalId]) });
    }
    if (goal.habitIds.indexOf(habitId) === -1) {
        GN_updateGoal(goalId, { habitIds: goal.habitIds.concat([habitId]) });
    }
}

function GN_unlinkHabitFromGoal(habitId, goalId) {
    var habit = GN_getHabitById(habitId);
    var goal = GN_getGoalById(goalId);
    if (habit) {
        GN_updateHabit(habitId, { goalIds: habit.goalIds.filter(function(id) { return id !== goalId; }) });
    }
    if (goal) {
        GN_updateGoal(goalId, { habitIds: goal.habitIds.filter(function(id) { return id !== habitId; }) });
    }
}

// Get all active habits (habits that belong to at least one active goal)
function GN_getActiveHabits() {
    var activeGoalIds = GN_getActiveGoals().map(function(g) { return g.id; });
    return GN_getHabits().filter(function(h) {
        for (var i = 0; i < h.goalIds.length; i++) {
            if (activeGoalIds.indexOf(h.goalIds[i]) > -1) return true;
        }
        return false;
    });
}

// ============================================================
// CHECK-IN OPERATIONS (per habit)
// ============================================================

function GN_getAllCheckins() {
    try { var d = localStorage.getItem('goalNinjaCheckins'); return d ? JSON.parse(d) : {}; }
    catch(e) { return {}; }
}

function GN_getCheckinsForHabit(habitId) {
    var all = GN_getAllCheckins();
    return all[habitId] || {};
}

function GN_recordHabitCheckin(habitId, dateStr, status) {
    var checkins = GN_getAllCheckins();
    if (!checkins[habitId]) checkins[habitId] = {};
    checkins[habitId][dateStr] = status;
    localStorage.setItem('goalNinjaCheckins', JSON.stringify(checkins));
}

function GN_hasHabitCheckedInToday(habitId) {
    var checkins = GN_getCheckinsForHabit(habitId);
    return checkins.hasOwnProperty(GN_getTodayDateStr());
}

function GN_getHabitCheckinStatus(habitId, dateStr) {
    var checkins = GN_getCheckinsForHabit(habitId);
    return checkins[dateStr] || null;
}

// ============================================================
// STATS — Per Habit
// ============================================================

function GN_getHabitStats(habitId, goalId) {
    // goalId is optional — used to scope stats to a specific goal's date range
    var habit = GN_getHabitById(habitId);
    if (!habit) return null;

    var checkins = GN_getCheckinsForHabit(habitId);
    var today = GN_getTodayDateStr();

    // If goalId provided, scope to that goal's date range
    var goal = goalId ? GN_getGoalById(goalId) : null;
    var startDate = goal ? goal.startDate : null;
    var duration = goal ? goal.duration : null;

    // If no goal context, use all checkins
    var completedDays = 0;
    var missedDays = 0;
    var dates = Object.keys(checkins);

    for (var i = 0; i < dates.length; i++) {
        // If scoped to a goal, only count checkins within the goal's date range
        if (startDate) {
            if (dates[i] < startDate) continue;
            var dayNum = GN_daysBetween(startDate, dates[i]) + 1;
            if (duration && dayNum > duration) continue;
        }
        if (checkins[dates[i]] === 'complete') completedDays++;
        else if (checkins[dates[i]] === 'missed') missedDays++;
    }

    var totalCheckins = completedDays + missedDays;
    var completionRate = totalCheckins > 0 ? Math.round((completedDays / totalCheckins) * 100) : 0;
    var currentStreak = GN_getCurrentStreakForHabit(habitId, startDate);
    var bestStreak = GN_getBestStreakForHabit(habitId, startDate);
    var vaultAmount = missedDays * habit.penalty;

    var dayNumber = 0;
    var daysLeft = 0;
    var progress = 0;
    if (goal) {
        dayNumber = GN_daysBetween(goal.startDate, today) + 1;
        if (dayNumber < 1) dayNumber = 1;
        if (dayNumber > goal.duration) dayNumber = goal.duration;
        daysLeft = Math.max(0, goal.duration - dayNumber);
        progress = Math.min(100, Math.round((dayNumber / goal.duration) * 100));
    }

    return {
        completedDays: completedDays,
        missedDays: missedDays,
        totalCheckins: totalCheckins,
        completionRate: completionRate,
        currentStreak: currentStreak,
        bestStreak: bestStreak,
        vaultAmount: vaultAmount,
        dayNumber: dayNumber,
        daysLeft: daysLeft,
        progress: progress
    };
}

function GN_getCurrentStreakForHabit(habitId, startDate) {
    var checkins = GN_getCheckinsForHabit(habitId);
    var today = new Date();
    var streak = 0;
    for (var i = 0; i < 365; i++) {
        var d = new Date(today);
        d.setDate(d.getDate() - i);
        var dateStr = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
        if (startDate && dateStr < startDate) break;
        if (checkins[dateStr] === 'complete') {
            streak++;
        } else if (checkins[dateStr] === 'missed') {
            break;
        } else {
            if (i === 0) continue; // Today not checked in yet is OK
            break;
        }
    }
    return streak;
}

function GN_getBestStreakForHabit(habitId, startDate) {
    var checkins = GN_getCheckinsForHabit(habitId);
    var dates = Object.keys(checkins).sort();
    if (dates.length === 0) return 0;
    var best = 0;
    var current = 0;
    for (var i = 0; i < dates.length; i++) {
        if (startDate && dates[i] < startDate) continue;
        if (checkins[dates[i]] === 'complete') {
            current++;
            if (current > best) best = current;
        } else {
            current = 0;
        }
    }
    return best;
}

// ============================================================
// STATS — Per Goal (aggregate across habits)
// ============================================================

function GN_getGoalStats(goalId) {
    var goal = GN_getGoalById(goalId);
    if (!goal) return null;

    var habits = GN_getHabitsForGoal(goalId);
    var today = GN_getTodayDateStr();
    var dayNumber = GN_daysBetween(goal.startDate, today) + 1;
    if (dayNumber < 1) dayNumber = 1;
    if (dayNumber > goal.duration) dayNumber = goal.duration;
    var daysLeft = Math.max(0, goal.duration - dayNumber);
    var progress = Math.min(100, Math.round((dayNumber / goal.duration) * 100));

    var totalCompleted = 0;
    var totalCheckins = 0;
    var totalVault = 0;
    var bestStreak = 0;
    var habitStats = [];

    for (var i = 0; i < habits.length; i++) {
        var hs = GN_getHabitStats(habits[i].id, goalId);
        if (hs) {
            totalCompleted += hs.completedDays;
            totalCheckins += hs.totalCheckins;
            totalVault += hs.vaultAmount;
            if (hs.bestStreak > bestStreak) bestStreak = hs.bestStreak;
            habitStats.push({ habit: habits[i], stats: hs });
        }
    }

    var completionRate = totalCheckins > 0 ? Math.round((totalCompleted / totalCheckins) * 100) : 0;
    var isComplete = dayNumber >= goal.duration;
    var hitTarget = completionRate >= goal.target;

    return {
        dayNumber: dayNumber,
        daysLeft: daysLeft,
        progress: progress,
        habitCount: habits.length,
        completionRate: completionRate,
        vaultAmount: totalVault,
        bestStreak: bestStreak,
        isComplete: isComplete,
        hitTarget: hitTarget,
        habitStats: habitStats
    };
}

// ============================================================
// VAULT / SAVINGS
// ============================================================

function GN_getVaultTotal() {
    var habits = GN_getHabits();
    var total = 0;
    for (var i = 0; i < habits.length; i++) {
        var stats = GN_getHabitStats(habits[i].id);
        if (stats) total += stats.vaultAmount;
    }
    return total;
}

function GN_getGoalVaultTotal(goalId) {
    var stats = GN_getGoalStats(goalId);
    return stats ? stats.vaultAmount : 0;
}

function GN_getLockedVaultTotal() {
    var goals = GN_getActiveGoals();
    var total = 0;
    for (var i = 0; i < goals.length; i++) {
        total += GN_getGoalVaultTotal(goals[i].id);
    }
    return total;
}

function GN_getUnlockedVaultTotal() {
    var goals = GN_getCompletedGoals();
    var total = 0;
    for (var i = 0; i < goals.length; i++) {
        var stats = GN_getGoalStats(goals[i].id);
        if (stats && stats.hitTarget) total += stats.vaultAmount;
    }
    return total;
}

// ============================================================
// OVERALL STATS
// ============================================================

function GN_getOverallStats() {
    var goals = GN_getGoals();
    var habits = GN_getHabits();
    var active = GN_getActiveGoals();
    var completed = GN_getCompletedGoals();
    var totalVault = GN_getVaultTotal();

    var bestStreak = 0;
    var totalCompleted = 0;
    var totalCheckins = 0;

    for (var i = 0; i < habits.length; i++) {
        var stats = GN_getHabitStats(habits[i].id);
        if (stats) {
            if (stats.bestStreak > bestStreak) bestStreak = stats.bestStreak;
            totalCompleted += stats.completedDays;
            totalCheckins += stats.totalCheckins;
        }
    }

    var overallRate = totalCheckins > 0 ? Math.round((totalCompleted / totalCheckins) * 100) : 0;

    return {
        totalGoals: goals.length,
        activeGoals: active.length,
        completedGoals: completed.length,
        totalHabits: habits.length,
        activeHabits: GN_getActiveHabits().length,
        overallCompletionRate: overallRate,
        bestStreak: bestStreak,
        totalVault: totalVault,
        totalCompletedDays: totalCompleted,
        totalMissedDays: totalCheckins - totalCompleted
    };
}

// ============================================================
// LIFECYCLE — Auto-miss + expiration
// ============================================================

function GN_checkAndUpdateStatuses() {
    var goals = GN_getGoals();
    var today = GN_getTodayDateStr();
    var changed = false;

    for (var i = 0; i < goals.length; i++) {
        var g = goals[i];
        if (g.status !== 'active' && g.status !== 'paused') continue;
        if (g.status === 'paused') continue; // Skip auto-miss for paused goals

        var habits = GN_getHabitsForGoal(g.id);

        // Auto-fill missed days for each habit
        for (var h = 0; h < habits.length; h++) {
            var checkins = GN_getCheckinsForHabit(habits[h].id);
            var startD = new Date(g.startDate + 'T12:00:00');
            var todayD = new Date(today + 'T12:00:00');
            var yesterday = new Date(todayD);
            yesterday.setDate(yesterday.getDate() - 1);

            var cursor = new Date(startD);
            while (cursor <= yesterday) {
                var dateStr = cursor.getFullYear() + '-' + String(cursor.getMonth() + 1).padStart(2, '0') + '-' + String(cursor.getDate()).padStart(2, '0');
                if (!checkins[dateStr]) {
                    GN_recordHabitCheckin(habits[h].id, dateStr, 'missed');
                    changed = true;
                }
                cursor.setDate(cursor.getDate() + 1);
            }
        }

        // Check if goal duration has expired
        var dayNumber = GN_daysBetween(g.startDate, today) + 1;
        if (dayNumber > g.duration) {
            var stats = GN_getGoalStats(g.id);
            goals[i].status = (stats && stats.hitTarget) ? 'completed' : 'failed';
            changed = true;
        }
    }

    if (changed) {
        GN_saveGoals(goals);
    }
}

// ============================================================
// NAVIGATION STATE
// ============================================================

function GN_setSelectedGoal(goalId) {
    localStorage.setItem('goalNinjaSelectedGoal', goalId);
}

function GN_getSelectedGoal() {
    return localStorage.getItem('goalNinjaSelectedGoal') || null;
}

// ============================================================
// LEGACY WRAPPERS (backward compat during transition)
// Screens not yet updated can still call old function names
// ============================================================

function GN_getMissions() { return GN_getGoals(); }
function GN_saveMissions(m) { GN_saveGoals(m); }
function GN_getMissionById(id) { return GN_getGoalById(id); }
function GN_addMission(data) {
    // Old flow: single mission = 1 goal + 1 habit
    var goal = GN_addGoal(data);
    GN_addHabit({
        name: data.name || 'New Habit',
        icon: data.icon || 'default',
        penalty: parseFloat(data.penalty) || 5,
        reminder: data.reminder || '21:00',
        goalIds: [goal.id]
    });
    return goal;
}
function GN_updateMission(id, updates) { GN_updateGoal(id, updates); }
function GN_deleteMission(id) { GN_deleteGoal(id); }
function GN_getActiveMissions() { return GN_getActiveGoals(); }
function GN_getCompletedMissions() { return GN_getCompletedGoals(); }
function GN_setSelectedMission(id) { GN_setSelectedGoal(id); }
function GN_getSelectedMission() { return GN_getSelectedGoal(); }

// Legacy check-in wrappers — route to first habit of a goal
function GN_getCheckinsForMission(goalId) {
    var goal = GN_getGoalById(goalId);
    if (goal && goal.habitIds && goal.habitIds.length > 0) {
        return GN_getCheckinsForHabit(goal.habitIds[0]);
    }
    return {};
}
function GN_recordCheckin(goalId, dateStr, status) {
    var goal = GN_getGoalById(goalId);
    if (goal && goal.habitIds) {
        for (var i = 0; i < goal.habitIds.length; i++) {
            GN_recordHabitCheckin(goal.habitIds[i], dateStr, status);
        }
    }
}
function GN_hasCheckedInToday(goalId) {
    var goal = GN_getGoalById(goalId);
    if (goal && goal.habitIds && goal.habitIds.length > 0) {
        return GN_hasHabitCheckedInToday(goal.habitIds[0]);
    }
    return false;
}
function GN_getTodayCheckinStatus(goalId) {
    var goal = GN_getGoalById(goalId);
    if (goal && goal.habitIds && goal.habitIds.length > 0) {
        return GN_getHabitCheckinStatus(goal.habitIds[0], GN_getTodayDateStr());
    }
    return null;
}
function GN_getMissionStats(goalId) {
    var stats = GN_getGoalStats(goalId);
    if (!stats) return null;
    // Map to old shape
    return {
        dayNumber: stats.dayNumber,
        daysLeft: stats.daysLeft,
        totalCheckins: stats.habitStats.length > 0 ? stats.habitStats[0].stats.totalCheckins : 0,
        completedDays: stats.habitStats.length > 0 ? stats.habitStats[0].stats.completedDays : 0,
        missedDays: stats.habitStats.length > 0 ? stats.habitStats[0].stats.missedDays : 0,
        currentStreak: stats.habitStats.length > 0 ? stats.habitStats[0].stats.currentStreak : 0,
        bestStreak: stats.bestStreak,
        completionRate: stats.completionRate,
        vaultAmount: stats.vaultAmount,
        progress: stats.progress,
        isComplete: stats.isComplete,
        hitTarget: stats.hitTarget
    };
}
function GN_getCurrentStreak(goalId) {
    var goal = GN_getGoalById(goalId);
    if (goal && goal.habitIds && goal.habitIds.length > 0) {
        return GN_getCurrentStreakForHabit(goal.habitIds[0], goal.startDate);
    }
    return 0;
}
function GN_getBestStreak(goalId) {
    var goal = GN_getGoalById(goalId);
    if (goal && goal.habitIds && goal.habitIds.length > 0) {
        return GN_getBestStreakForHabit(goal.habitIds[0], goal.startDate);
    }
    return 0;
}
function GN_checkAndUpdateMissionStatuses() { GN_checkAndUpdateStatuses(); }

// ============================================================
// ICON SVG MAPPING
// ============================================================

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
