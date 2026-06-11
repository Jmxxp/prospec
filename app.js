const SUPABASE_URL = "https://ltludoiuahngptaquscc.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_jM_4jdMU6CIN5CW8Ds0_oA_UAfPQZ9l";
const DEFAULT_COLOR_LABELS = {
  red: "Improvável",
  yellow: "Pouco provável",
  blue: "Provável",
  green: "Muito provável",
};
const STORE_COLORS = {
  blue: { label: "Azul", value: "#1d4ed8" },
  slate: { label: "Grafite", value: "#334155" },
  teal: { label: "Petróleo", value: "#0f766e" },
  green: { label: "Verde", value: "#166534" },
  wine: { label: "Vinho", value: "#9f1239" },
  amber: { label: "Dourado", value: "#b45309" },
  indigo: { label: "Índigo", value: "#4338ca" },
  cyan: { label: "Ciano", value: "#0e7490" },
  emerald: { label: "Esmeralda", value: "#047857" },
  rose: { label: "Rosa queimado", value: "#be123c" },
  violet: { label: "Violeta", value: "#6d28d9" },
  orange: { label: "Laranja", value: "#c2410c" },
  black: { label: "Preto", value: "#111827" },
};
const STORE_SESSION_KEY = "prospec.storeSession";
const THEME_KEY = "prospec.theme";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: window.localStorage,
  },
});

const authScreen = document.querySelector("#authScreen");
const authForm = document.querySelector("#authForm");
const authUsername = document.querySelector("#authUsername");
const authPassword = document.querySelector("#authPassword");
const authPasswordConfirm = document.querySelector("#authPasswordConfirm");
const confirmPasswordLabel = document.querySelector("#confirmPasswordLabel");
const togglePasswordBtn = document.querySelector("#togglePasswordBtn");
const authMessage = document.querySelector("#authMessage");
const authTitle = document.querySelector("#auth-title");
const authLoginModeBtn = document.querySelector("#authLoginModeBtn");
const authSignupModeBtn = document.querySelector("#authSignupModeBtn");
const authSubmitBtn = document.querySelector("#authSubmitBtn");
const authCancelBtn = document.querySelector("#authCancelBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const returnAdminBtn = document.querySelector("#returnAdminBtn");
const appShell = document.querySelector("#appShell");
const adminView = document.querySelector("#adminView");
const adminSettingsBtn = document.querySelector("#adminSettingsBtn");
const adminSettingsOverlay = document.querySelector("#adminSettingsOverlay");
const adminSettingsClose = document.querySelector("#adminSettingsClose");
const adminStoreGrid = document.querySelector("#adminStoreGrid");
const operationWorkspace = document.querySelector("#operationWorkspace");
const adminStoreSettingsList = document.querySelector("#adminStoreSettingsList");
const adminStoreSettingsMessage = document.querySelector("#adminStoreSettingsMessage");
const newStoreName = document.querySelector("#newStoreName");
const newStoreUsername = document.querySelector("#newStoreUsername");
const newStorePassword = document.querySelector("#newStorePassword");
const newStorePasswordToggleBtn = document.querySelector("#newStorePasswordToggleBtn");
const createStoreBtn = document.querySelector("#createStoreBtn");
const createStoreMessage = document.querySelector("#createStoreMessage");
const passwordAccountSelect = document.querySelector("#passwordAccountSelect");
const adminNewPassword = document.querySelector("#adminNewPassword");
const adminConfirmPassword = document.querySelector("#adminConfirmPassword");
const adminPasswordToggleBtn = document.querySelector("#adminPasswordToggleBtn");
const saveAdminPasswordBtn = document.querySelector("#saveAdminPasswordBtn");
const adminPasswordMessage = document.querySelector("#adminPasswordMessage");
const adminDailyProspects = document.querySelector("#adminDailyProspects");
const adminDailyReturns = document.querySelector("#adminDailyReturns");
const adminWeeklyProspects = document.querySelector("#adminWeeklyProspects");
const adminWeeklyReturns = document.querySelector("#adminWeeklyReturns");
const adminMonthlyProspects = document.querySelector("#adminMonthlyProspects");
const adminMonthlyReturns = document.querySelector("#adminMonthlyReturns");
const adminYearlyProspects = document.querySelector("#adminYearlyProspects");
const adminYearlyReturns = document.querySelector("#adminYearlyReturns");
const deleteStoreOverlay = document.querySelector("#deleteStoreOverlay");
const deleteStoreText = document.querySelector("#deleteStoreText");
const deleteStoreAdminPassword = document.querySelector("#deleteStoreAdminPassword");
const deleteStoreMessage = document.querySelector("#deleteStoreMessage");
const cancelDeleteStoreBtn = document.querySelector("#cancelDeleteStoreBtn");
const confirmDeleteStoreBtn = document.querySelector("#confirmDeleteStoreBtn");
const logoutOverlay = document.querySelector("#logoutOverlay");
const cancelLogoutBtn = document.querySelector("#cancelLogoutBtn");
const confirmLogoutBtn = document.querySelector("#confirmLogoutBtn");
const form = document.querySelector("#prospectForm");
const editingIdInput = document.querySelector("#editingId");
const nameInput = document.querySelector("#nameInput");
const phoneInput = document.querySelector("#phoneInput");
const cpfInput = document.querySelector("#cpfInput");
const notesInput = document.querySelector("#notesInput");
const professionalOptions = document.querySelector("#professionalOptions");
const tagOptions = document.querySelector("#tagOptions");
const formError = document.querySelector("#formError");
const submitLabel = document.querySelector("#submitLabel");
const clearFormBtn = document.querySelector("#clearFormBtn");
const searchInput = document.querySelector("#searchInput");
const statusFilter = document.querySelector("#statusFilter");
const filtersToggle = document.querySelector("#filtersToggle");
const filtersPanel = document.querySelector("#filtersPanel");
const activeFiltersCount = document.querySelector("#activeFiltersCount");
const periodFilter = document.querySelector("#periodFilter");
const dateFilter = document.querySelector("#dateFilter");
const weekFilter = document.querySelector("#weekFilter");
const monthFilter = document.querySelector("#monthFilter");
const dateFilterLabel = document.querySelector("#dateFilterLabel");
const weekFilterLabel = document.querySelector("#weekFilterLabel");
const monthFilterLabel = document.querySelector("#monthFilterLabel");
const hasPhoneFilter = document.querySelector("#hasPhoneFilter");
const hasCpfFilter = document.querySelector("#hasCpfFilter");
const listEyebrow = document.querySelector(".list-header .eyebrow");
const listTitle = document.querySelector("#list-title");
const prospectsList = document.querySelector("#prospectsList");
const emptyState = document.querySelector("#emptyState");
const template = document.querySelector("#prospectCardTemplate");
const analysisToggle = document.querySelector("#analysisToggle");
const analysisOverlay = document.querySelector("#analysisOverlay");
const analysisTitle = document.querySelector("#analysis-title");
const analysisClose = document.querySelector("#analysisClose");
const dailyGoalInput = document.querySelector("#dailyGoalInput");
const totalProspects = document.querySelector("#totalProspects");
const returnedProspects = document.querySelector("#returnedProspects");
const todayProspects = document.querySelector("#todayProspects");
const topTodayProspects = document.querySelector("#topTodayProspects");
const weekProspects = document.querySelector("#weekProspects");
const monthProspects = document.querySelector("#monthProspects");
const yearProspects = document.querySelector("#yearProspects");
const weekReturns = document.querySelector("#weekReturns");
const monthReturns = document.querySelector("#monthReturns");
const yearReturns = document.querySelector("#yearReturns");
const analysisProfessionalPerformance = document.querySelector("#analysisProfessionalPerformance");
const prevMonthBtn = document.querySelector("#prevMonthBtn");
const nextMonthBtn = document.querySelector("#nextMonthBtn");
const calendarMonthLabel = document.querySelector("#calendarMonthLabel");
const calendarGrid = document.querySelector("#calendarGrid");
const colorLabelTexts = document.querySelectorAll("[data-color-label-text]");
const colorFilterOptions = document.querySelectorAll("[data-color-filter-option]");
const themeToggleButtons = document.querySelectorAll("[data-theme-toggle]");

let authMode = "login";
let currentContext = null;
let stores = [];
let prospects = [];
let availableTags = ["Receita vencida", "Aniversário"];
let availableProfessionals = [];
let dailyGoal = 15;
let calendarDate = new Date();
let adminPeriodByStore = {};
let analysisScopeStore = null;
let storeToDelete = null;
let realtimeChannel = null;
let realtimeRefreshTimer = null;
let realtimeSubscriptionKey = "";

const LAST_SELECTION_KEY_PREFIX = "prospec.lastSelection";

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanUsername(value) {
  return normalize(value).replace(/[^a-z0-9._-]/g, "").replace(/^[._-]+|[._-]+$/g, "");
}

function cleanTag(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 40);
}

function cleanProfessionalName(value) {
  return String(value || "").trim().replace(/\s+/g, " ").slice(0, 80);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function onlyDigits(value) {
  return String(value || "").replace(/\D/g, "");
}

function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCpf(value) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function formatDateTime(isoDate) {
  if (!isoDate) return "Ainda não voltou";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(isoDate));
}

function formatWeekday(isoDate) {
  if (!isoDate) return "";
  return new Intl.DateTimeFormat("pt-BR", { weekday: "short" }).format(new Date(isoDate)).replace(".", "");
}

function formatDateTimeWithWeekday(isoDate) {
  return isoDate ? `${formatWeekday(isoDate)}, ${formatDateTime(isoDate)}` : "";
}

function isToday(isoDate) {
  if (!isoDate) return false;
  const date = new Date(isoDate);
  const today = new Date();
  return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function addDays(date, amount) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function startOfWeek(date) {
  const copy = startOfDay(date);
  const day = copy.getDay();
  copy.setDate(copy.getDate() - (day === 0 ? 6 : day - 1));
  return copy;
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function startOfYear(date) {
  return new Date(date.getFullYear(), 0, 1);
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

function addYears(date, amount) {
  return new Date(date.getFullYear() + amount, 0, 1);
}

function formatDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonthInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function getISOWeekParts(date) {
  const copy = startOfDay(date);
  copy.setDate(copy.getDate() + 3 - ((copy.getDay() + 6) % 7));
  const weekOne = new Date(copy.getFullYear(), 0, 4);
  return {
    year: copy.getFullYear(),
    week: 1 + Math.round(((copy - weekOne) / 86400000 - 3 + ((weekOne.getDay() + 6) % 7)) / 7),
  };
}

function formatWeekInputValue(date) {
  const parts = getISOWeekParts(date);
  return `${parts.year}-W${String(parts.week).padStart(2, "0")}`;
}

function parseDateInput(value) {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function parseMonthInput(value) {
  if (!value) return null;
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return null;
  return new Date(year, month - 1, 1);
}

function parseWeekInput(value) {
  const match = String(value || "").match(/^(\d{4})-W(\d{2})$/);
  if (!match) return null;
  const year = Number(match[1]);
  const week = Number(match[2]);
  if (!year || week < 1 || week > 53) return null;
  const janFourth = new Date(year, 0, 4);
  const weekOneStart = startOfWeek(janFourth);
  return addDays(weekOneStart, (week - 1) * 7);
}

function isBetween(dateValue, start, end) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  return date >= start && date < end;
}

function isSameDay(firstDate, secondDate) {
  return firstDate && secondDate && isBetween(firstDate, startOfDay(secondDate), addDays(startOfDay(secondDate), 1));
}

function isInCurrentWeek(isoDate) {
  const start = startOfWeek(new Date());
  return isBetween(isoDate, start, addDays(start, 7));
}

function isInCurrentMonth(isoDate) {
  const start = startOfMonth(new Date());
  return isBetween(isoDate, start, addMonths(start, 1));
}

function isInCurrentYear(isoDate) {
  const start = startOfYear(new Date());
  return isBetween(isoDate, start, addYears(start, 1));
}

function getColorLabel(color) {
  return DEFAULT_COLOR_LABELS[color] || color;
}

function getStoreTheme(store) {
  return STORE_COLORS[store?.accentColor] || STORE_COLORS.blue;
}

function getStoreGoal(store) {
  return Number(store?.dailyGoal) > 0 ? Number(store.dailyGoal) : 15;
}

function getSelectedColor() {
  return new FormData(form).get("color") || "blue";
}

function getSelectedTags() {
  return Array.from(tagOptions.querySelectorAll('input[name="tags"]:checked')).map((input) => input.value);
}

function getSelectedProfessionalId() {
  return professionalOptions.querySelector('input[name="professional"]:checked')?.value || null;
}

function setSelectedTags(tags = []) {
  const selected = new Set(tags);
  tagOptions.querySelectorAll('input[name="tags"]').forEach((input) => {
    input.checked = selected.has(input.value);
  });
}

function setSelectedColor(color) {
  const colorInput = form.querySelector(`input[name="color"][value="${color}"]`);
  if (colorInput) colorInput.checked = true;
}

function getDisplayName(prospect) {
  return prospect.name || prospect.phone || prospect.cpf || "Cliente sem nome";
}

function getGoalStyle(count, goal = dailyGoal) {
  const target = Number(goal) > 0 ? Number(goal) : 15;
  const ratio = Math.min(count / target, 1);
  if (document.body.classList.contains("is-dark-mode")) {
    const hue = Math.round(0 + ratio * 142);
    const lightness = Math.round(22 + ratio * 16);
    return {
      background: `hsl(${hue} 72% ${lightness}%)`,
      color: "#f8fafc",
      isOverGoal: count > target,
    };
  }
  const hue = Math.round(4 + ratio * 126);
  const lightness = Math.round(88 - ratio * 38);
  return {
    background: `hsl(${hue} 76% ${lightness}%)`,
    color: ratio > 0.58 ? "#ffffff" : "#0f172a",
    isOverGoal: count > target,
  };
}

function getSupabaseErrorMessage(error) {
  if (!error) return "";
  if (error.code === "23505") return "Já existe um registro com esse telefone ou CPF.";
  if (error.status === 429 || error.code === "over_request_rate_limit") return "Muitas tentativas em pouco tempo. Aguarde alguns minutos.";
  if (error.message?.includes("Invalid login credentials")) return "Usuário ou senha inválidos.";
  if (error.message?.includes("Email not confirmed")) return "Desative a confirmação de email no Supabase para usar login por usuário.";
  if (
    error.message?.includes("admin_create_professional") ||
    error.message?.includes("admin_get_professionals") ||
    error.message?.includes("store_get_professionals") ||
    error.message?.includes("p_professional_id") ||
    error.message?.includes("professional_id")
  ) {
    return "Atualize o banco no Supabase: rode o arquivo supabase_profissionais_prospeccao.sql no SQL Editor.";
  }
  return error.message || "Algo deu errado. Tente novamente.";
}

function isInvalidStoreSessionError(error) {
  return normalize(getSupabaseErrorMessage(error)).includes("sessao da loja invalida");
}

function saveStoreSession(context) {
  if (context?.type !== "store" || !context.token) return;
  const storeId = context.store?.store_id || context.store?.id || context.storeId || null;
  localStorage.setItem(
    STORE_SESSION_KEY,
    JSON.stringify({
      token: context.token,
      store: context.store || null,
      storeId,
      adminAccess: Boolean(context.adminUser),
    })
  );
}

function getStoredStoreSession() {
  try {
    const session = JSON.parse(localStorage.getItem(STORE_SESSION_KEY) || "null");
    return session?.token ? session : null;
  } catch {
    return null;
  }
}

function clearStoreSession() {
  localStorage.removeItem(STORE_SESSION_KEY);
}

function getCurrentStoreId() {
  return currentContext?.store?.store_id || currentContext?.store?.id || currentContext?.storeId || null;
}

function getLastSelectionKey() {
  const storeId = getCurrentStoreId();
  return storeId ? `${LAST_SELECTION_KEY_PREFIX}.${storeId}` : LAST_SELECTION_KEY_PREFIX;
}

function saveLastProspectSelection({ professionalId, tags }) {
  if (currentContext?.type !== "store") return;
  localStorage.setItem(
    getLastSelectionKey(),
    JSON.stringify({
      professionalId: professionalId || "",
      tags: Array.isArray(tags) ? tags : [],
    })
  );
}

function getLastProspectSelection() {
  try {
    return JSON.parse(localStorage.getItem(getLastSelectionKey()) || "null") || {};
  } catch {
    return {};
  }
}

function applyLastProspectSelection() {
  const lastSelection = getLastProspectSelection();
  const professionalId = availableProfessionals.some((item) => item.id === lastSelection.professionalId)
    ? lastSelection.professionalId
    : null;
  const tags = Array.isArray(lastSelection.tags)
    ? lastSelection.tags.filter((tag) => availableTags.some((item) => normalize(item) === normalize(tag)))
    : [];
  renderProfessionalOptions(professionalId);
  renderTags(tags);
}

function getStoredTheme() {
  return localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("is-dark-mode", isDark);
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  themeToggleButtons.forEach((button) => {
    button.setAttribute("aria-label", isDark ? "Ativar modo claro" : "Ativar modo escuro");
    button.title = isDark ? "Ativar modo claro" : "Ativar modo escuro";
    button.innerHTML = `<i class="fa-solid ${isDark ? "fa-sun" : "fa-moon"} top-action-icon" aria-hidden="true"></i>`;
  });
}

function initializeTheme() {
  applyTheme(getStoredTheme());
}

function toggleTheme() {
  const nextTheme = document.body.classList.contains("is-dark-mode") ? "light" : "dark";
  localStorage.setItem(THEME_KEY, nextTheme);
  applyTheme(nextTheme);
  if (currentContext) renderSummary();
  if (!analysisOverlay.hidden) renderAnalysis();
}

function adminEmailFromUsername() {
  const username = cleanUsername(authUsername.value);
  return username ? `${username}@prospec.local` : "";
}

function resetForm({ keepLastSelection = false } = {}) {
  form.reset();
  editingIdInput.value = "";
  submitLabel.textContent = "Registrar prospecção";
  formError.textContent = "";
  setSelectedColor("blue");
  if (keepLastSelection) applyLastProspectSelection();
  else {
    renderTags([]);
    renderProfessionalOptions();
  }
}

function resetAuthForm() {
  authForm.reset();
  authPassword.type = "password";
  authPasswordConfirm.type = "password";
  togglePasswordBtn.textContent = "Ver";
  setAuthMode("login");
}

function togglePasswordGroup(inputs, button) {
  const shouldShow = inputs.some((input) => input.type === "password");
  inputs.forEach((input) => {
    input.type = shouldShow ? "text" : "password";
  });
  button.textContent = shouldShow ? "Ocultar" : "Ver";
}

function setAuthMode(mode) {
  authMode = mode;
  const isSignup = mode === "signup";
  authTitle.textContent = isSignup ? "Criar conta admin" : "Entrar no Prospec";
  authSubmitBtn.textContent = isSignup ? "Criar admin" : "Entrar";
  confirmPasswordLabel.hidden = !isSignup;
  authPasswordConfirm.required = isSignup;
  authLoginModeBtn.classList.toggle("is-active", !isSignup);
  authSignupModeBtn.classList.toggle("is-active", isSignup);
  authMessage.textContent = "";
}

function showAuth(message = "") {
  appShell.hidden = true;
  authScreen.hidden = false;
  document.body.classList.remove("is-admin-context", "is-store-context");
  authCancelBtn.hidden = true;
  authMessage.textContent = message;
}

function showApp() {
  authScreen.hidden = true;
  appShell.hidden = false;
}

function setTopForContext() {
  const isAdmin = currentContext?.type === "admin";
  document.body.classList.toggle("is-admin-context", isAdmin);
  document.body.classList.toggle("is-store-context", currentContext?.type === "store");
  analysisToggle.hidden = isAdmin;
  returnAdminBtn.hidden = !currentContext?.adminUser;
  topTodayProspects.parentElement.hidden = isAdmin;
  adminView.hidden = !isAdmin;
  operationWorkspace.hidden = isAdmin;
  operationWorkspace.style.display = isAdmin ? "none" : "";
  adminView.style.display = isAdmin ? "" : "none";
}

function syncModalScrollLock() {
  document.body.classList.toggle(
    "is-modal-open",
    !analysisOverlay.hidden || !adminSettingsOverlay.hidden || !deleteStoreOverlay.hidden || !logoutOverlay.hidden
  );
}

function setLogoutConfirmOpen(isOpen) {
  logoutOverlay.hidden = !isOpen;
  syncModalScrollLock();
  if (isOpen) cancelLogoutBtn.focus();
}

function setAdminSettingsOpen(isOpen) {
  adminSettingsOverlay.hidden = !isOpen;
  syncModalScrollLock();
  if (isOpen) adminStoreSettingsList.querySelector("input, select, button")?.focus();
}

function setAnalysisOpen(isOpen, store = null) {
  analysisScopeStore = isOpen ? store : null;
  if (isOpen) renderAnalysis();
  analysisOverlay.hidden = !isOpen;
  syncModalScrollLock();
  analysisToggle.setAttribute("aria-expanded", String(isOpen));
}

function getAnalysisProspects() {
  if (currentContext?.type === "admin" && analysisScopeStore) {
    return prospects.filter((prospect) => prospect.storeId === analysisScopeStore.id);
  }
  return prospects;
}

function getAnalysisGoal() {
  if (currentContext?.type === "admin" && analysisScopeStore) return getStoreGoal(analysisScopeStore);
  return dailyGoal;
}

function buildSearchText(prospect) {
  return normalize([
    prospect.name,
    prospect.phone,
    prospect.cpf,
    prospect.notes,
    prospect.professionalName,
    ...(prospect.tags || []),
    prospect.color,
    getColorLabel(prospect.color),
    formatDateTime(prospect.createdAt),
    formatDateTime(prospect.returnedAt),
  ].join(" "));
}

function getSelectedPeriodWindow() {
  const period = periodFilter.value;
  if (period === "all") return { start: null, end: null, label: "todos", title: "Todas as prospecções" };
  if (period === "day") {
    const start = parseDateInput(dateFilter.value) || startOfDay(new Date());
    return { start, end: addDays(start, 1), label: "dia", title: "Prospecções do dia" };
  }
  if (period === "week") {
    const start = parseWeekInput(weekFilter.value) || startOfWeek(new Date());
    return { start, end: addDays(start, 7), label: "semana", title: "Prospecções da semana" };
  }
  if (period === "month") {
    const start = parseMonthInput(monthFilter.value) || startOfMonth(new Date());
    return { start, end: addMonths(start, 1), label: "mês", title: "Prospecções do mês" };
  }
  const start = startOfDay(new Date());
  return { start, end: addDays(start, 1), label: "hoje", title: "Prospecções do dia" };
}

function updateFilterSummary() {
  const periodWindow = getSelectedPeriodWindow();
  const period = periodFilter.value;
  const extraFilters = [
    period !== "today",
    statusFilter.value !== "all",
    hasPhoneFilter.checked,
    hasCpfFilter.checked,
    Boolean(searchInput.value.trim()),
  ].filter(Boolean).length;
  const periodLabels = {
    all: "Todos",
    today: "Hoje",
    day: dateFilter.value ? formatDateTime(parseDateInput(dateFilter.value)).split(",")[0] : "Dia",
    week: "Semana",
    month: monthFilter.value ? new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(parseMonthInput(monthFilter.value)) : "Mês",
  };
  listEyebrow.textContent = periodLabels[period] || periodWindow.label;
  listTitle.textContent = periodWindow.title;
  const emptyLabels = {
    todos: "encontrada",
    hoje: "hoje",
    dia: "neste dia",
    semana: "nesta semana",
    mês: "neste mês",
  };
  emptyState.querySelector("strong").textContent = `Nenhuma prospecção ${emptyLabels[periodWindow.label] || "encontrada"}`;
  emptyState.querySelector("span").textContent = "Ajuste os filtros ou cadastre uma nova prospecção.";
  activeFiltersCount.hidden = extraFilters === 0;
  activeFiltersCount.textContent = String(extraFilters);
}

function getFilteredProspects() {
  const query = normalize(searchInput.value);
  const queryDigits = onlyDigits(searchInput.value);
  const filter = statusFilter.value;
  const periodWindow = getSelectedPeriodWindow();

  return prospects
    .filter((prospect) => {
      if (periodWindow.start && !isBetween(prospect.createdAt, periodWindow.start, periodWindow.end)) return false;
      if (filter === "returned" && !prospect.returnedAt) return false;
      if (filter === "not-returned" && prospect.returnedAt) return false;
      if (["blue", "green", "yellow", "red"].includes(filter) && prospect.color !== filter) return false;
      if (hasPhoneFilter.checked && !onlyDigits(prospect.phone)) return false;
      if (hasCpfFilter.checked && !onlyDigits(prospect.cpf)) return false;
      if (!query && !queryDigits) return true;
      return buildSearchText(prospect).includes(query) || onlyDigits(`${prospect.phone} ${prospect.cpf}`).includes(queryDigits);
    })
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt));
}

function countByPeriod(items, field, period) {
  const matchers = { daily: isToday, weekly: isInCurrentWeek, monthly: isInCurrentMonth, yearly: isInCurrentYear };
  return items.filter((item) => matchers[period](item[field])).length;
}

function getPeriodBuckets(period) {
  const now = new Date();
  if (period === "daily") {
    const today = startOfDay(now);
    return Array.from({ length: 7 }, (_, index) => {
      const start = addDays(today, index - 6);
      return { label: new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit" }).format(start).replace(".", ""), start, end: addDays(start, 1) };
    });
  }
  if (period === "weekly") {
    const week = startOfWeek(now);
    return Array.from({ length: 8 }, (_, index) => {
      const start = addDays(week, (index - 7) * 7);
      return { label: `${start.getDate()}/${start.getMonth() + 1}`, start, end: addDays(start, 7) };
    });
  }
  if (period === "yearly") {
    const year = startOfYear(now);
    return Array.from({ length: 4 }, (_, index) => {
      const start = addYears(year, index - 3);
      return { label: String(start.getFullYear()), start, end: addYears(start, 1) };
    });
  }
  const month = startOfMonth(now);
  return Array.from({ length: 12 }, (_, index) => {
    const start = addMonths(month, index - 11);
    return { label: new Intl.DateTimeFormat("pt-BR", { month: "short" }).format(start).replace(".", ""), start, end: addMonths(start, 1) };
  });
}

function getPeriodWindow(period) {
  const now = new Date();
  if (period === "daily") return { start: startOfDay(now), end: addDays(startOfDay(now), 1), label: "dia" };
  if (period === "weekly") return { start: startOfWeek(now), end: addDays(startOfWeek(now), 7), label: "semana" };
  if (period === "yearly") return { start: startOfYear(now), end: addYears(startOfYear(now), 1), label: "ano" };
  return { start: startOfMonth(now), end: addMonths(startOfMonth(now), 1), label: "mês" };
}

function createAdminMetric(label, prospectsCount, returnsCount) {
  const metric = document.createElement("div");
  metric.innerHTML = `<strong>${prospectsCount}</strong><span>${label}</span><em>${returnsCount} voltaram</em>`;
  return metric;
}

function createAdminBar(label, value, max) {
  const row = document.createElement("div");
  const width = max > 0 ? Math.max((value / max) * 100, value > 0 ? 7 : 0) : 0;
  row.className = "admin-bar-row";
  row.innerHTML = `<span>${label}</span><div class="admin-bar-track"><i style="width:${width}%"></i></div><strong>${value}</strong>`;
  return row;
}

function createAdminTagChip(storeId, tag, row) {
  const chip = document.createElement("span");
  chip.className = "tag-chip admin-tag-chip";
  chip.innerHTML = `
    <span>${escapeHtml(tag)}</span>
    <button type="button" title="Excluir etiqueta ${escapeHtml(tag)}" aria-label="Excluir etiqueta ${escapeHtml(tag)}">
      <i class="fa-solid fa-xmark" aria-hidden="true"></i>
    </button>
  `;
  chip.querySelector("button").addEventListener("click", () => deleteAdminTag(storeId, tag, row));
  return chip;
}

function createTrendChart(storeProspects, period) {
  const chart = document.createElement("div");
  const buckets = getPeriodBuckets(period).map((bucket) => ({
    ...bucket,
    prospectsCount: storeProspects.filter((prospect) => isBetween(prospect.createdAt, bucket.start, bucket.end)).length,
    returnsCount: storeProspects.filter((prospect) => isBetween(prospect.returnedAt, bucket.start, bucket.end)).length,
  }));
  const maxValue = Math.max(1, ...buckets.map((bucket) => bucket.prospectsCount));
  chart.className = "admin-trend-chart";
  buckets.forEach((bucket) => {
    const item = document.createElement("div");
    const height = Math.max((bucket.prospectsCount / maxValue) * 100, bucket.prospectsCount > 0 ? 8 : 0);
    const returnsHeight = Math.max((bucket.returnsCount / maxValue) * 100, bucket.returnsCount > 0 ? 7 : 0);
    item.className = "admin-trend-item";
    item.innerHTML = `
      <div class="admin-trend-bar">
        <i style="height:${height}%" title="${bucket.prospectsCount} prospecções"></i>
        <b style="height:${returnsHeight}%" title="${bucket.returnsCount} voltaram"></b>
      </div>
      <span>${bucket.label}</span>
    `;
    chart.append(item);
  });
  return chart;
}

function createPeriodButton(store, period, label, selectedPeriod) {
  const button = document.createElement("button");
  button.className = "admin-period-button";
  button.type = "button";
  button.textContent = label;
  button.classList.toggle("is-active", period === selectedPeriod);
  button.addEventListener("click", () => {
    adminPeriodByStore[store.id] = period;
    renderAdminDashboard();
  });
  return button;
}

function createProfessionalPerformance(store, periodProspects) {
  const panel = document.createElement("section");
  panel.className = "admin-professional-performance";
  panel.innerHTML = `
    <div class="admin-professional-performance-header">
      <h4>Desempenho por profissional</h4>
      <span>Feitas, voltaram e conversão</span>
    </div>
    <div class="admin-professional-list"></div>
  `;
  const list = panel.querySelector(".admin-professional-list");
  const statsByKey = new Map();

  (store.professionals || []).forEach((professional) => {
    statsByKey.set(professional.id, {
      id: professional.id,
      name: professional.name,
      made: 0,
      returned: 0,
      isActive: professional.isActive,
    });
  });

  periodProspects.forEach((prospect) => {
    const matchingProfessional = !prospect.professionalId && prospect.professionalName
      ? (store.professionals || []).find((professional) => normalize(professional.name) === normalize(prospect.professionalName))
      : null;
    const key = prospect.professionalId || matchingProfessional?.id || (prospect.professionalName ? `name:${normalize(prospect.professionalName)}` : "missing");
    if (!statsByKey.has(key)) {
      statsByKey.set(key, {
        id: prospect.professionalId || matchingProfessional?.id || "",
        name: matchingProfessional?.name || prospect.professionalName || "Sem profissional",
        made: 0,
        returned: 0,
        isActive: true,
      });
    }
    const stats = statsByKey.get(key);
    stats.made += 1;
    if (prospect.returnedAt) stats.returned += 1;
  });

  const rows = Array.from(statsByKey.values())
    .filter((stats) => stats.made > 0 || stats.isActive)
    .sort((first, second) => second.made - first.made || second.returned - first.returned || first.name.localeCompare(second.name, "pt-BR"));

  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "admin-professional-empty";
    empty.textContent = "Nenhum profissional cadastrado nesta loja.";
    list.append(empty);
    return panel;
  }

  rows.forEach((stats) => {
    const conversion = stats.made ? Math.round((stats.returned / stats.made) * 100) : 0;
    const row = document.createElement("div");
    row.className = "admin-professional-row";
    row.innerHTML = `
      <strong>${escapeHtml(stats.name)}</strong>
      <span><b>${stats.made}</b> feitas</span>
      <span><b>${stats.returned}</b> voltaram</span>
      <em>${conversion}%</em>
    `;
    list.append(row);
  });

  return panel;
}

function createStoreSettingsRow(store) {
  const row = document.createElement("div");
  row.className = "admin-store-settings-row";
  row.dataset.storeId = store.id;
  row.innerHTML = `
    <div class="store-order-controls">
      <button class="icon-button store-move-up" type="button" title="Subir loja" aria-label="Subir ${store.name}">
        <i class="fa-solid fa-arrow-up" aria-hidden="true"></i>
      </button>
      <button class="icon-button store-move-down" type="button" title="Descer loja" aria-label="Descer ${store.name}">
        <i class="fa-solid fa-arrow-down" aria-hidden="true"></i>
      </button>
    </div>
    <div class="store-settings-content">
      <div class="store-settings-fields">
        <label>
          Nome da loja
          <input class="store-name-input" type="text" value="${escapeHtml(store.name)}" />
        </label>
        <label>
          Meta diária
          <input class="store-goal-input" type="number" min="1" step="1" value="${getStoreGoal(store)}" />
        </label>
        <label>
          Cor da loja
          <select class="store-color-select"></select>
        </label>
        <button class="secondary-button store-settings-save" type="button">Salvar loja</button>
      </div>
      <div class="store-managers-grid">
        <section class="store-mini-manager" aria-label="Etiquetas da loja">
          <strong>Etiquetas</strong>
          <div class="store-manager-form">
            <label>
              Nova etiqueta
              <input class="store-tag-input" type="text" placeholder="Retorno receita" />
            </label>
            <button class="secondary-button store-tag-save" type="button">Criar etiqueta</button>
          </div>
          <div class="store-tags-preview" aria-label="Etiquetas criadas"></div>
        </section>
        <section class="store-mini-manager" aria-label="Profissionais da loja">
          <strong>Profissionais</strong>
          <div class="store-manager-form">
            <label>
              Novo profissional
              <input class="store-professional-input" type="text" placeholder="Maria Souza" />
            </label>
            <button class="secondary-button store-professional-create" type="button">Criar profissional</button>
          </div>
          <div class="store-professionals-preview" aria-label="Profissionais cadastrados"></div>
        </section>
      </div>
      <p class="store-row-message" role="alert"></p>
    </div>
  `;
  const select = row.querySelector(".store-color-select");
  Object.entries(STORE_COLORS).forEach(([key, theme]) => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = theme.label;
    option.selected = (store.accentColor || "blue") === key;
    select.append(option);
  });
  const preview = row.querySelector(".store-tags-preview");
  store.tags.forEach((tag) => preview.append(createAdminTagChip(store.id, tag, row)));
  renderStoreProfessionals(store, row);
  row.querySelector(".store-settings-save").addEventListener("click", () => saveStoreSettings(store.id, row));
  row.querySelector(".store-tag-save").addEventListener("click", () => createAdminTag(store.id, row));
  row.querySelector(".store-professional-create").addEventListener("click", () => createAdminProfessional(store.id, row));
  row.querySelector(".store-professional-input").addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    createAdminProfessional(store.id, row);
  });
  row.querySelector(".store-move-up").addEventListener("click", () => moveStore(store.id, -1));
  row.querySelector(".store-move-down").addEventListener("click", () => moveStore(store.id, 1));
  return row;
}

function setStoreRowMessage(row, message, isError = true) {
  if (!row) return;
  const messageElement = row.querySelector(".store-row-message");
  if (!messageElement) return;
  messageElement.textContent = message;
  messageElement.classList.toggle("is-success", Boolean(message) && !isError);
}

function renderStoreProfessionals(store, row) {
  const preview = row.querySelector(".store-professionals-preview");
  if (!preview) return;
  preview.innerHTML = "";
  const professionals = [...(store.professionals || [])].sort((first, second) => first.name.localeCompare(second.name, "pt-BR"));
  professionals.forEach((professional) => {
    const item = document.createElement("div");
    item.className = "store-professional-row";
    item.dataset.professionalId = professional.id;
    item.innerHTML = `
      <input class="store-professional-name" type="text" value="${escapeHtml(professional.name)}" />
      <label class="store-professional-active">
        <input type="checkbox" ${professional.isActive ? "checked" : ""} />
        Ativo
      </label>
      <button class="secondary-button store-professional-save" type="button">Salvar</button>
    `;
    item.querySelector(".store-professional-save").addEventListener("click", () => saveAdminProfessional(store.id, professional.id, item));
    preview.append(item);
  });
}

function renderSummary() {
  const analysisProspects = getAnalysisProspects();
  const analysisGoal = getAnalysisGoal();
  const todayCount = analysisProspects.filter((prospect) => isToday(prospect.createdAt)).length;
  const todayGoalStyle = getGoalStyle(todayCount, analysisGoal);
  analysisTitle.textContent = analysisScopeStore ? `Análise de ${analysisScopeStore.name}` : "Análise das prospecções";
  dailyGoalInput.value = analysisGoal;
  dailyGoalInput.disabled = true;
  totalProspects.textContent = analysisProspects.length;
  returnedProspects.textContent = analysisProspects.filter((prospect) => prospect.returnedAt).length;
  todayProspects.textContent = todayCount;
  if (currentContext?.type === "store") {
    topTodayProspects.textContent = todayCount;
    topTodayProspects.parentElement.style.background = todayGoalStyle.background;
    topTodayProspects.parentElement.style.color = todayGoalStyle.color;
    topTodayProspects.parentElement.classList.toggle("is-over-goal", todayGoalStyle.isOverGoal);
  }
  weekProspects.textContent = analysisProspects.filter((prospect) => isInCurrentWeek(prospect.createdAt)).length;
  monthProspects.textContent = analysisProspects.filter((prospect) => isInCurrentMonth(prospect.createdAt)).length;
  yearProspects.textContent = analysisProspects.filter((prospect) => isInCurrentYear(prospect.createdAt)).length;
  weekReturns.textContent = analysisProspects.filter((prospect) => isInCurrentWeek(prospect.returnedAt)).length;
  monthReturns.textContent = analysisProspects.filter((prospect) => isInCurrentMonth(prospect.returnedAt)).length;
  yearReturns.textContent = analysisProspects.filter((prospect) => isInCurrentYear(prospect.returnedAt)).length;
}

function renderAnalysisProfessionalPerformance() {
  const professionals = currentContext?.type === "admin" && analysisScopeStore
    ? analysisScopeStore.professionals || []
    : availableProfessionals;
  analysisProfessionalPerformance.innerHTML = "";
  analysisProfessionalPerformance.append(createProfessionalPerformance({ professionals }, getAnalysisProspects()));
}

function renderAdminDashboard() {
  const totals = {
    dailyProspects: countByPeriod(prospects, "createdAt", "daily"),
    dailyReturns: countByPeriod(prospects, "returnedAt", "daily"),
    weeklyProspects: countByPeriod(prospects, "createdAt", "weekly"),
    weeklyReturns: countByPeriod(prospects, "returnedAt", "weekly"),
    monthlyProspects: countByPeriod(prospects, "createdAt", "monthly"),
    monthlyReturns: countByPeriod(prospects, "returnedAt", "monthly"),
    yearlyProspects: countByPeriod(prospects, "createdAt", "yearly"),
    yearlyReturns: countByPeriod(prospects, "returnedAt", "yearly"),
  };
  const maxMonth = Math.max(1, ...stores.map((store) => countByPeriod(prospects.filter((p) => p.storeId === store.id), "createdAt", "monthly")));
  adminDailyProspects.textContent = totals.dailyProspects;
  adminDailyReturns.textContent = `${totals.dailyReturns} voltaram`;
  adminWeeklyProspects.textContent = totals.weeklyProspects;
  adminWeeklyReturns.textContent = `${totals.weeklyReturns} voltaram`;
  adminMonthlyProspects.textContent = totals.monthlyProspects;
  adminMonthlyReturns.textContent = `${totals.monthlyReturns} voltaram`;
  adminYearlyProspects.textContent = totals.yearlyProspects;
  adminYearlyReturns.textContent = `${totals.yearlyReturns} voltaram`;
  adminStoreGrid.innerHTML = "";
  adminStoreSettingsList.innerHTML = "";
  passwordAccountSelect.innerHTML = "";
  stores.forEach((store) => {
    const option = document.createElement("option");
    option.value = store.id;
    option.textContent = store.name;
    passwordAccountSelect.append(option);
    adminStoreSettingsList.append(createStoreSettingsRow(store));
    const storeProspects = prospects.filter((prospect) => prospect.storeId === store.id);
    const storeGoal = getStoreGoal(store);
    const storeTheme = getStoreTheme(store);
    const selectedPeriod = adminPeriodByStore[store.id] || "monthly";
    const periodWindow = getPeriodWindow(selectedPeriod);
    const periodProspects = storeProspects.filter((prospect) => isBetween(prospect.createdAt, periodWindow.start, periodWindow.end));
    const periodReturns = storeProspects.filter((prospect) => isBetween(prospect.returnedAt, periodWindow.start, periodWindow.end));
    const conversion = periodProspects.length > 0 ? Math.round((periodReturns.length / periodProspects.length) * 100) : 0;
    const dailyProspects = countByPeriod(storeProspects, "createdAt", "daily");
    const dailyReturns = countByPeriod(storeProspects, "returnedAt", "daily");
    const monthlyProspects = countByPeriod(storeProspects, "createdAt", "monthly");
    const monthlyReturns = countByPeriod(storeProspects, "returnedAt", "monthly");
    const goalStyle = getGoalStyle(dailyProspects, storeGoal);
    const card = document.createElement("article");
    card.className = "admin-store-card";
    card.style.setProperty("--store-accent", storeTheme.value);
    card.style.borderLeftColor = storeTheme.value;
    card.innerHTML = `
      <div class="admin-store-header">
        <div>
          <h3>${escapeHtml(store.name)}</h3>
          <span class="admin-store-username">${escapeHtml(store.username)}</span>
        </div>
        <div class="admin-store-actions">
          <span class="admin-goal-pill" style="background:${goalStyle.background}; color:${goalStyle.color}">${dailyProspects}/${storeGoal} hoje</span>
          <button class="admin-store-access" type="button">Acessar</button>
          <button class="admin-store-analysis" type="button">Análise</button>
          <button class="admin-store-delete" type="button" title="Excluir loja" aria-label="Excluir loja ${escapeHtml(store.name)}">
            <i class="fa-solid fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div class="admin-store-metrics"></div>
      <div class="admin-period-controls"></div>
      <div class="admin-comparison">
        <div><strong>${periodProspects.length}</strong><span>Prospecções neste ${periodWindow.label}</span></div>
        <div><strong>${periodReturns.length}</strong><span>Voltaram neste ${periodWindow.label}</span></div>
        <div><strong>${conversion}%</strong><span>Conversão deste ${periodWindow.label}</span></div>
      </div>
      <div class="admin-professional-performance-slot"></div>
      <div class="admin-store-chart"></div>
    `;
    card.querySelector(".admin-store-metrics").append(
      createAdminMetric("Hoje", dailyProspects, dailyReturns),
      createAdminMetric("Semana", countByPeriod(storeProspects, "createdAt", "weekly"), countByPeriod(storeProspects, "returnedAt", "weekly")),
      createAdminMetric("Mês", monthlyProspects, monthlyReturns),
      createAdminMetric("Ano", countByPeriod(storeProspects, "createdAt", "yearly"), countByPeriod(storeProspects, "returnedAt", "yearly"))
    );
    card.querySelector(".admin-period-controls").append(
      createPeriodButton(store, "daily", "Dia", selectedPeriod),
      createPeriodButton(store, "weekly", "Semana", selectedPeriod),
      createPeriodButton(store, "monthly", "Mês", selectedPeriod),
      createPeriodButton(store, "yearly", "Ano", selectedPeriod)
    );
    card.querySelector(".admin-professional-performance-slot").append(createProfessionalPerformance(store, periodProspects));
    card.querySelector(".admin-store-chart").append(
      createAdminBar("Mês", monthlyProspects, maxMonth),
      createAdminBar("Conversão mês", monthlyProspects ? Math.round((monthlyReturns / monthlyProspects) * 100) : 0, 100),
      createTrendChart(storeProspects, selectedPeriod)
    );
    card.querySelector(".admin-store-analysis").addEventListener("click", (event) => {
      event.stopPropagation();
      setAnalysisOpen(true, store);
    });
    card.querySelector(".admin-store-access").addEventListener("click", (event) => {
      event.stopPropagation();
      accessStoreFromAdmin(store);
    });
    card.querySelector(".admin-store-delete").addEventListener("click", (event) => {
      event.stopPropagation();
      openDeleteStore(store);
    });
    adminStoreGrid.append(card);
  });
}

function renderCalendar() {
  const analysisProspects = getAnalysisProspects();
  const analysisGoal = getAnalysisGoal();
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
  const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  calendarMonthLabel.textContent = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(firstDay);
  calendarGrid.innerHTML = "";
  weekdays.forEach((weekday) => {
    const cell = document.createElement("div");
    cell.className = "weekday-cell";
    cell.textContent = weekday;
    calendarGrid.append(cell);
  });
  for (let index = 0; index < firstWeekday; index += 1) {
    const emptyCell = document.createElement("div");
    emptyCell.className = "calendar-empty";
    calendarGrid.append(emptyCell);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const count = analysisProspects.filter((prospect) => isSameDay(prospect.createdAt, date)).length;
    const returnedCount = analysisProspects.filter((prospect) => isSameDay(prospect.returnedAt, date)).length;
    const goalStyle = getGoalStyle(count, analysisGoal);
    const dayCell = document.createElement("div");
    dayCell.className = "calendar-day";
    dayCell.style.background = goalStyle.background;
    dayCell.style.color = goalStyle.color;
    dayCell.title = `${count} prospecções feitas, ${returnedCount} voltaram`;
    dayCell.classList.toggle("is-today", isToday(date));
    dayCell.classList.toggle("is-over-goal", goalStyle.isOverGoal);
    dayCell.innerHTML = `<span class="calendar-day-number">${day}</span><strong class="calendar-day-count">${count}</strong>`;
    calendarGrid.append(dayCell);
  }
}

function renderAnalysis() {
  renderSummary();
  renderAnalysisProfessionalPerformance();
  renderCalendar();
}

function renderColorLabels() {
  colorLabelTexts.forEach((label) => {
    label.textContent = getColorLabel(label.dataset.colorLabelText);
  });
  colorFilterOptions.forEach((option) => {
    option.textContent = getColorLabel(option.dataset.colorFilterOption);
  });
}

function renderTags(selectedTags = getSelectedTags()) {
  const selected = new Set(selectedTags);
  tagOptions.innerHTML = "";
  availableTags.forEach((tag) => {
    const label = document.createElement("label");
    label.className = "tag-option";
    label.innerHTML = `
      <input type="checkbox" name="tags" value="${escapeHtml(tag)}" ${selected.has(tag) ? "checked" : ""} />
      <span>${escapeHtml(tag)}</span>
    `;
    tagOptions.append(label);
  });
}

function renderProfessionalOptions(selectedId = getSelectedProfessionalId()) {
  professionalOptions.innerHTML = "";
  if (!availableProfessionals.length) {
    const empty = document.createElement("span");
    empty.className = "professional-empty";
    empty.textContent = "Nenhum profissional cadastrado";
    professionalOptions.append(empty);
    return;
  }
  availableProfessionals.forEach((professional) => {
    const label = document.createElement("label");
    label.className = "professional-option";
    label.innerHTML = `
      <input type="radio" name="professional" value="${escapeHtml(professional.id)}" ${professional.id === selectedId ? "checked" : ""} />
      <span>${escapeHtml(professional.name)}</span>
    `;
    professionalOptions.append(label);
  });
}

function renderProspects() {
  updateFilterSummary();
  const filteredProspects = getFilteredProspects();
  prospectsList.innerHTML = "";
  emptyState.classList.toggle("is-visible", filteredProspects.length === 0);
  filteredProspects.forEach((prospect) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const meta = card.querySelector(".card-meta");
    const badge = card.querySelector(".return-badge");
    const colorBadge = card.querySelector(".color-badge");
    const returnButton = card.querySelector(".mark-returned-button");
    const unmarkReturnButton = card.querySelector(".unmark-returned-button");
    const whatsappButton = card.querySelector(".whatsapp-button");
    const notes = card.querySelector(".card-notes");
    const tags = card.querySelector(".card-tags");
    const professional = card.querySelector(".card-professional");
    const infoRow = card.querySelector(".card-info-row");
    const digits = onlyDigits(prospect.phone);
    card.dataset.color = prospect.color;
    card.querySelector(".card-name").textContent = getDisplayName(prospect);
    card.querySelector(".created-date").textContent = formatDateTimeWithWeekday(prospect.createdAt);
    if (prospect.notes) notes.textContent = prospect.notes;
    else notes.remove();
    if (prospect.tags?.length) {
      prospect.tags.forEach((tag) => tags.append(createChip(tag, "tag-chip")));
    } else {
      tags.remove();
    }
    if (prospect.professionalName) {
      professional.innerHTML = `
        <i class="fa-solid fa-user-check" aria-hidden="true"></i>
        <span>Profissional</span>
        <strong>${escapeHtml(prospect.professionalName)}</strong>
      `;
    } else {
      infoRow.remove();
    }
    if (prospect.phone) meta.append(createChip(prospect.phone));
    if (prospect.cpf) meta.append(createChip(prospect.cpf));
    if (!prospect.phone && !prospect.cpf) meta.append(createChip("Sem telefone ou CPF"));
    colorBadge.textContent = getColorLabel(prospect.color);
    if (prospect.returnedAt) {
      badge.innerHTML = `<i class="fa-solid fa-check" aria-hidden="true"></i><span>Voltou</span>`;
      badge.title = formatDateTime(prospect.returnedAt);
      badge.classList.add("is-returned");
    } else {
      badge.textContent = "Não voltou";
    }
    returnButton.hidden = Boolean(prospect.returnedAt);
    unmarkReturnButton.hidden = !prospect.returnedAt;
    whatsappButton.href = digits.length >= 10 ? `https://wa.me/55${digits}` : "";
    whatsappButton.classList.toggle("is-hidden", digits.length < 10);
    returnButton.addEventListener("click", () => markReturned(prospect.id));
    unmarkReturnButton.addEventListener("click", () => unmarkReturned(prospect.id));
    card.querySelector(".edit-button").addEventListener("click", () => editProspect(prospect.id));
    card.querySelector(".delete-button").addEventListener("click", () => deleteProspect(prospect.id));
    prospectsList.append(card);
  });
  renderAnalysis();
}

function createChip(text, className = "meta-chip") {
  const chip = document.createElement("span");
  chip.className = className;
  chip.textContent = text;
  return chip;
}

function fromDbProspect(row) {
  return {
    id: row.id,
    storeId: row.store_id,
    name: row.name || "",
    phone: row.phone || "",
    cpf: row.cpf || "",
    notes: row.notes || "",
    professionalId: row.professional_id || "",
    professionalName: row.professional_name_snapshot || row.professional_name || "",
    tags: Array.isArray(row.tags) ? row.tags : [],
    color: row.probability || "blue",
    createdAt: row.created_at,
    returnedAt: row.returned_at,
    updatedAt: row.updated_at,
  };
}

function fromDbStore(row) {
  return {
    id: row.id,
    name: row.name,
    username: row.username,
    dailyGoal: Number(row.daily_goal) || 15,
    accentColor: STORE_COLORS[row.accent_color] ? row.accent_color : "blue",
    sortOrder: Number(row.sort_order) || 0,
    tags: Array.isArray(row.tags) ? row.tags : [],
    professionals: Array.isArray(row.professionals) ? row.professionals : [],
    createdAt: row.created_at,
  };
}

function getRealtimeSubscriptionKey() {
  if (currentContext?.type === "admin") return `admin:${currentContext.user?.id || "active"}`;
  if (currentContext?.type === "store") return `store:${getCurrentStoreId() || currentContext.token || "active"}`;
  return "";
}

function stopRealtimeSubscription() {
  if (realtimeRefreshTimer) {
    clearTimeout(realtimeRefreshTimer);
    realtimeRefreshTimer = null;
  }
  if (realtimeChannel) {
    supabaseClient.removeChannel(realtimeChannel);
    realtimeChannel = null;
  }
  realtimeSubscriptionKey = "";
}

function scheduleRealtimeRefresh() {
  if (!currentContext) return;
  if (realtimeRefreshTimer) clearTimeout(realtimeRefreshTimer);
  realtimeRefreshTimer = setTimeout(() => {
    realtimeRefreshTimer = null;
    refreshAppData();
  }, 250);
}

function addRealtimeListener(channel, table, filter = null) {
  const config = { event: "*", schema: "public", table };
  if (filter) config.filter = filter;
  channel.on("postgres_changes", config, scheduleRealtimeRefresh);
}

function ensureRealtimeSubscription() {
  const subscriptionKey = getRealtimeSubscriptionKey();
  if (!subscriptionKey || subscriptionKey === realtimeSubscriptionKey) return;
  stopRealtimeSubscription();
  realtimeSubscriptionKey = subscriptionKey;

  if (currentContext?.type === "store") {
    const storeId = getCurrentStoreId();
    realtimeChannel = supabaseClient.channel(storeId ? `prospec-store:${storeId}` : `prospec-db-${subscriptionKey}`);
    realtimeChannel.on("broadcast", { event: "changed" }, scheduleRealtimeRefresh);
    if (storeId) {
      addRealtimeListener(realtimeChannel, "prospects", `store_id=eq.${storeId}`);
      addRealtimeListener(realtimeChannel, "prospect_tags", `store_id=eq.${storeId}`);
      addRealtimeListener(realtimeChannel, "prospect_professionals", `store_id=eq.${storeId}`);
      addRealtimeListener(realtimeChannel, "stores", `id=eq.${storeId}`);
    } else {
      addRealtimeListener(realtimeChannel, "prospects");
    }
  } else if (currentContext?.type === "admin") {
    realtimeChannel = supabaseClient.channel(`prospec-db-${subscriptionKey}`);
    addRealtimeListener(realtimeChannel, "stores");
    addRealtimeListener(realtimeChannel, "prospects");
    addRealtimeListener(realtimeChannel, "prospect_tags");
    addRealtimeListener(realtimeChannel, "prospect_professionals");
  }

  realtimeChannel?.subscribe();
}

async function loadDailyGoal() {
  if (currentContext?.type === "store") {
    const { data, error } = await supabaseClient.rpc("store_get_daily_goal", { p_token: currentContext.token });
    if (!error) dailyGoal = Number(data) || 15;
  } else {
    dailyGoal = 15;
  }
  dailyGoalInput.value = dailyGoal;
  dailyGoalInput.disabled = currentContext?.type !== "admin";
}

async function loadAdminData() {
  let storesResult = await supabaseClient
    .from("stores")
    .select("id,name,username,daily_goal,accent_color,sort_order,created_at")
    .is("deleted_at", null)
    .order("sort_order")
    .order("name");
  if (storesResult.error?.message?.includes("daily_goal") || storesResult.error?.message?.includes("accent_color") || storesResult.error?.message?.includes("sort_order")) {
    storesResult = await supabaseClient.from("stores").select("id,name,username,created_at").is("deleted_at", null).order("name");
  }
  let prospectsResult = await supabaseClient.from("prospects").select("*").order("created_at", { ascending: false });
  if (prospectsResult.error?.message?.includes("tags")) {
    prospectsResult = await supabaseClient.from("prospects").select("*").order("created_at", { ascending: false });
  }
  const tagsResult = await supabaseClient.rpc("admin_get_tags");
  const professionalsResult = await supabaseClient.rpc("admin_get_professionals");
  if (storesResult.error) throw storesResult.error;
  if (prospectsResult.error) throw prospectsResult.error;
  if (professionalsResult.error && !professionalsResult.error.message?.includes("admin_get_professionals")) {
    throw professionalsResult.error;
  }
  const tagsByStore = new Map();
  if (!tagsResult.error && Array.isArray(tagsResult.data)) {
    tagsResult.data.forEach((tag) => {
      const storeId = tag.store_id || tag.storeId;
      if (!storeId) return;
      if (!tagsByStore.has(storeId)) tagsByStore.set(storeId, []);
      tagsByStore.get(storeId).push(cleanTag(tag.label));
    });
  }
  const professionalsByStore = new Map();
  if (!professionalsResult.error && Array.isArray(professionalsResult.data)) {
    professionalsResult.data.forEach((professional) => {
      const storeId = professional.store_id || professional.storeId;
      if (!storeId) return;
      if (!professionalsByStore.has(storeId)) professionalsByStore.set(storeId, []);
      professionalsByStore.get(storeId).push({
        id: professional.id,
        name: cleanProfessionalName(professional.name),
        isActive: professional.is_active !== false,
      });
    });
  }
  stores = storesResult.data.map((row) => fromDbStore({ ...row, tags: tagsByStore.get(row.id) || [], professionals: professionalsByStore.get(row.id) || [] }));
  prospects = prospectsResult.data.map(fromDbProspect);
}

async function loadStoreData() {
  const [prospectsResult, tagsResult, professionalsResult] = await Promise.all([
    supabaseClient.rpc("store_get_prospects", { p_token: currentContext.token }),
    supabaseClient.rpc("store_get_tags", { p_token: currentContext.token }),
    supabaseClient.rpc("store_get_professionals", { p_token: currentContext.token }),
  ]);
  const { data, error } = prospectsResult;
  if (error) throw error;
  if (tagsResult.error) {
    if (isInvalidStoreSessionError(tagsResult.error)) throw tagsResult.error;
    formError.textContent = `Não consegui carregar as etiquetas: ${getSupabaseErrorMessage(tagsResult.error)}`;
    availableTags = ["Receita vencida", "Aniversário"];
  } else if (Array.isArray(tagsResult.data)) {
    availableTags = tagsResult.data.map((item) => cleanTag(item.label || item)).filter(Boolean);
  }
  if (professionalsResult.error) {
    if (isInvalidStoreSessionError(professionalsResult.error)) throw professionalsResult.error;
    availableProfessionals = [];
  } else if (Array.isArray(professionalsResult.data)) {
    availableProfessionals = professionalsResult.data
      .map((item) => ({
        id: item.id,
        name: cleanProfessionalName(item.name),
        isActive: item.is_active !== false,
      }))
      .filter((item) => item.id && item.name);
  }
  if (editingIdInput.value) {
    renderTags();
    renderProfessionalOptions();
  } else {
    applyLastProspectSelection();
  }
  prospects = data.map(fromDbProspect);
}

async function refreshAppData() {
  try {
    await loadDailyGoal();
    if (currentContext?.type === "admin") {
      await loadAdminData();
      renderAdminDashboard();
    } else {
      await loadStoreData();
      renderProspects();
      renderSummary();
    }
    if (!analysisOverlay.hidden) renderAnalysis();
    ensureRealtimeSubscription();
  } catch (error) {
    if (currentContext?.type === "store" && isInvalidStoreSessionError(error)) {
      stopRealtimeSubscription();
      clearStoreSession();
      currentContext = null;
      prospects = [];
      availableTags = ["Receita vencida", "Aniversário"];
      availableProfessionals = [];
      renderTags();
      renderProfessionalOptions();
      showAuth("Sessão da loja expirou. Entre novamente.");
      return;
    }
    formError.textContent = getSupabaseErrorMessage(error);
    authMessage.textContent = getSupabaseErrorMessage(error);
  }
}

async function adminLogin() {
  const email = adminEmailFromUsername();
  if (!email) {
    authMessage.textContent = "Digite o usuário admin.";
    return;
  }
  if (authPassword.value.length < 6) {
    authMessage.textContent = "A senha precisa ter pelo menos 6 caracteres.";
    return;
  }
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password: authPassword.value });
  if (error) {
    authMessage.textContent = getSupabaseErrorMessage(error);
    return;
  }
  currentContext = { type: "admin", user: data.user };
  resetAuthForm();
  setTopForContext();
  await refreshAppData();
  showApp();
  setTopForContext();
}

async function adminSignup() {
  const email = adminEmailFromUsername();
  if (!email) {
    authMessage.textContent = "Digite o usuário admin que você quer criar.";
    return;
  }
  if (authPassword.value.length < 6) {
    authMessage.textContent = "A senha precisa ter pelo menos 6 caracteres.";
    return;
  }
  if (authPassword.value !== authPasswordConfirm.value) {
    authMessage.textContent = "As senhas não conferem.";
    return;
  }
  const { data, error } = await supabaseClient.auth.signUp({ email, password: authPassword.value });
  if (error) {
    authMessage.textContent = getSupabaseErrorMessage(error);
    return;
  }
  if (!data.session) {
    authMessage.textContent = "Conta criada. Desative a confirmação de email no Supabase para entrar direto.";
    return;
  }
  currentContext = { type: "admin", user: data.user };
  resetAuthForm();
  setTopForContext();
  await refreshAppData();
  showApp();
  setTopForContext();
}

async function storeLogin() {
  const username = cleanUsername(authUsername.value);
  if (!username) {
    authMessage.textContent = "Digite o usuário da loja.";
    return;
  }
  if (authPassword.value.length < 6) {
    authMessage.textContent = "Digite a senha da loja.";
    return;
  }
  const { data, error } = await supabaseClient.rpc("store_login", { p_username: username, p_password: authPassword.value });
  if (error) {
    authMessage.textContent = getSupabaseErrorMessage(error);
    return;
  }
  currentContext = { type: "store", token: data.token, store: data, storeId: data.store_id || data.id || null };
  saveStoreSession(currentContext);
  resetAuthForm();
  setTopForContext();
  await refreshAppData();
  showApp();
  setTopForContext();
}

async function login() {
  const username = cleanUsername(authUsername.value);
  const password = authPassword.value;
  if (!username) {
    authMessage.textContent = "Digite seu usuário.";
    return;
  }
  if (password.length < 6) {
    authMessage.textContent = "Digite sua senha.";
    return;
  }

  const storeResult = await supabaseClient.rpc("store_login", { p_username: username, p_password: password });
  if (!storeResult.error) {
    currentContext = {
      type: "store",
      token: storeResult.data.token,
      store: storeResult.data,
      storeId: storeResult.data.store_id || storeResult.data.id || null,
    };
    saveStoreSession(currentContext);
    resetAuthForm();
    setTopForContext();
    await refreshAppData();
    showApp();
    setTopForContext();
    return;
  }

  const { data, error } = await supabaseClient.auth.signInWithPassword({ email: `${username}@prospec.local`, password });
  if (error) {
    authMessage.textContent = "Usuário ou senha inválidos.";
    return;
  }
  currentContext = { type: "admin", user: data.user };
  resetAuthForm();
  setTopForContext();
  await refreshAppData();
  showApp();
  setTopForContext();
}

async function submitAuth(event) {
  event.preventDefault();
  authMessage.textContent = "";
  if (authMode === "signup") await adminSignup();
  else await login();
}

async function logout() {
  setLogoutConfirmOpen(false);
  stopRealtimeSubscription();
  if (currentContext?.type === "store") {
    await supabaseClient.rpc("store_logout", { p_token: currentContext.token });
    if (currentContext.adminUser) await supabaseClient.auth.signOut();
  } else {
    await supabaseClient.auth.signOut();
  }
  clearStoreSession();
  currentContext = null;
  stores = [];
  prospects = [];
  resetForm();
  setAnalysisOpen(false);
  setAdminSettingsOpen(false);
  renderProspects();
  showAuth();
}

async function createStore() {
  createStoreMessage.textContent = "";
  const payload = {
    p_name: newStoreName.value.trim(),
    p_username: cleanUsername(newStoreUsername.value),
    p_password: newStorePassword.value,
  };
  if (!payload.p_name || !payload.p_username || payload.p_password.length < 6) {
    createStoreMessage.textContent = "Preencha nome, usuário e senha com pelo menos 6 caracteres.";
    return;
  }
  const { error } = await supabaseClient.rpc("admin_create_store", payload);
  if (error) {
    createStoreMessage.textContent = getSupabaseErrorMessage(error);
    return;
  }
  newStoreName.value = "";
  newStoreUsername.value = "";
  newStorePassword.value = "";
  createStoreMessage.textContent = "Loja criada com sucesso.";
  await refreshAppData();
}

function openDeleteStore(store) {
  storeToDelete = store;
  deleteStoreText.textContent = `Para excluir "${store.name}", digite a senha do admin. Essa ação apaga a loja e suas prospecções.`;
  deleteStoreAdminPassword.value = "";
  deleteStoreMessage.textContent = "";
  deleteStoreOverlay.hidden = false;
  syncModalScrollLock();
}

function closeDeleteStore() {
  storeToDelete = null;
  deleteStoreOverlay.hidden = true;
  syncModalScrollLock();
}

async function confirmDeleteStore() {
  if (!storeToDelete) return;
  const { error } = await supabaseClient.rpc("admin_delete_store", {
    p_store_id: storeToDelete.id,
    p_admin_password: deleteStoreAdminPassword.value,
  });
  if (error) {
    deleteStoreMessage.textContent = getSupabaseErrorMessage(error);
    return;
  }
  closeDeleteStore();
  await refreshAppData();
}

async function updateStorePassword() {
  const storeId = passwordAccountSelect.value;
  if (!storeId || adminNewPassword.value.length < 6) {
    adminPasswordMessage.textContent = "Escolha a loja e informe uma senha com pelo menos 6 caracteres.";
    return;
  }
  if (adminNewPassword.value !== adminConfirmPassword.value) {
    adminPasswordMessage.textContent = "As senhas não conferem.";
    return;
  }
  const { error } = await supabaseClient.rpc("admin_update_store_password", {
    p_store_id: storeId,
    p_password: adminNewPassword.value,
  });
  if (error) {
    adminPasswordMessage.textContent = getSupabaseErrorMessage(error);
    return;
  }
  adminNewPassword.value = "";
  adminConfirmPassword.value = "";
  adminPasswordMessage.textContent = "Senha da loja atualizada.";
}

async function createAdminTag(storeId, row) {
  const input = row.querySelector(".store-tag-input");
  const label = cleanTag(input.value);
  adminStoreSettingsMessage.textContent = "";
  setStoreRowMessage(row, "");
  if (!label) {
    setStoreRowMessage(row, "Digite o nome da etiqueta.");
    return;
  }
  const { error } = await supabaseClient.rpc("admin_create_tag", { p_store_id: storeId, p_label: label });
  if (error) {
    const message = getSupabaseErrorMessage(error);
    adminStoreSettingsMessage.textContent = message;
    setStoreRowMessage(row, message);
    return;
  }
  input.value = "";
  const preview = row.querySelector(".store-tags-preview");
  if (preview && !Array.from(preview.children).some((chip) => normalize(chip.textContent) === normalize(label))) {
    preview.append(createAdminTagChip(storeId, label, row));
  }
  const store = stores.find((item) => item.id === storeId);
  if (store && !store.tags.some((tag) => normalize(tag) === normalize(label))) store.tags.push(label);
  adminStoreSettingsMessage.textContent = "Etiqueta criada para a loja.";
  setStoreRowMessage(row, "Etiqueta criada.", false);
}

async function deleteAdminTag(storeId, tag, row) {
  const label = cleanTag(tag);
  if (!label || !confirm(`Excluir a etiqueta "${label}" desta loja?`)) return;
  adminStoreSettingsMessage.textContent = "";
  setStoreRowMessage(row, "");
  const { error } = await supabaseClient.rpc("admin_delete_tag", { p_store_id: storeId, p_label: label });
  if (error) {
    const message = getSupabaseErrorMessage(error);
    adminStoreSettingsMessage.textContent = message;
    setStoreRowMessage(row, message);
    return;
  }
  const store = stores.find((item) => item.id === storeId);
  if (store) store.tags = store.tags.filter((item) => normalize(item) !== normalize(label));
  adminStoreSettingsMessage.textContent = "Etiqueta excluída da loja.";
  setStoreRowMessage(row, "Etiqueta excluída.", false);
  await refreshAppData();
}

async function createAdminProfessional(storeId, row) {
  const input = row.querySelector(".store-professional-input");
  const button = row.querySelector(".store-professional-create");
  const name = cleanProfessionalName(input.value);
  adminStoreSettingsMessage.textContent = "";
  setStoreRowMessage(row, "");
  if (!name) {
    setStoreRowMessage(row, "Digite o nome do profissional.");
    return;
  }
  button.disabled = true;
  try {
    const { error } = await supabaseClient.rpc("admin_create_professional", { p_store_id: storeId, p_name: name });
    if (error) throw error;
    input.value = "";
    adminStoreSettingsMessage.textContent = "Profissional criado para a loja.";
    setStoreRowMessage(row, "Profissional criado.", false);
    await refreshAppData();
  } catch (error) {
    const message = getSupabaseErrorMessage(error);
    adminStoreSettingsMessage.textContent = message;
    setStoreRowMessage(row, message);
  } finally {
    button.disabled = false;
  }
}

async function saveAdminProfessional(storeId, professionalId, row) {
  const name = cleanProfessionalName(row.querySelector(".store-professional-name").value);
  const isActive = row.querySelector(".store-professional-active input").checked;
  const settingsRow = row.closest(".admin-store-settings-row");
  adminStoreSettingsMessage.textContent = "";
  setStoreRowMessage(settingsRow, "");
  if (!name) {
    setStoreRowMessage(settingsRow, "Digite o nome do profissional.");
    return;
  }
  const { error } = await supabaseClient.rpc("admin_update_professional", {
    p_store_id: storeId,
    p_professional_id: professionalId,
    p_name: name,
    p_is_active: isActive,
  });
  if (error) {
    const message = getSupabaseErrorMessage(error);
    adminStoreSettingsMessage.textContent = message;
    setStoreRowMessage(settingsRow, message);
    return;
  }
  adminStoreSettingsMessage.textContent = "Profissional atualizado.";
  setStoreRowMessage(settingsRow, "Profissional atualizado.", false);
  await refreshAppData();
}

async function saveStoreSettings(storeId, row) {
  adminStoreSettingsMessage.textContent = "";
  const name = row.querySelector(".store-name-input").value.trim();
  const goal = Number(row.querySelector(".store-goal-input").value);
  const accentColor = row.querySelector(".store-color-select").value;
  if (!name) {
    adminStoreSettingsMessage.textContent = "Informe o nome da loja.";
    return;
  }
  if (!Number.isFinite(goal) || goal < 1) {
    adminStoreSettingsMessage.textContent = "Informe uma meta maior que zero.";
    return;
  }
  try {
    const { error } = await supabaseClient.rpc("admin_update_store_settings", {
      p_store_id: storeId,
      p_name: name,
      p_daily_goal: Math.round(goal),
      p_accent_color: accentColor,
      p_sort_order: stores.find((store) => store.id === storeId)?.sortOrder || 0,
    });
    if (error) throw error;
    adminStoreSettingsMessage.textContent = "Configuração da loja atualizada.";
    await refreshAppData();
  } catch (error) {
    adminStoreSettingsMessage.textContent = getSupabaseErrorMessage(error);
  }
}

async function moveStore(storeId, direction) {
  const currentIndex = stores.findIndex((store) => store.id === storeId);
  const nextIndex = currentIndex + direction;
  if (currentIndex < 0 || nextIndex < 0 || nextIndex >= stores.length) return;
  const reordered = [...stores];
  [reordered[currentIndex], reordered[nextIndex]] = [reordered[nextIndex], reordered[currentIndex]];
  stores = reordered.map((store, index) => ({ ...store, sortOrder: index + 1 }));
  renderAdminDashboard();
  const order = stores.map((store, index) => ({ id: store.id, sort_order: index + 1 }));
  const { error } = await supabaseClient.rpc("admin_update_store_order", { p_order: order });
  if (error) {
    adminStoreSettingsMessage.textContent = getSupabaseErrorMessage(error);
    await refreshAppData();
  }
}

async function accessStoreFromAdmin(store) {
  const { data, error } = await supabaseClient.rpc("admin_open_store", { p_store_id: store.id });
  if (error) {
    adminStoreSettingsMessage.textContent = getSupabaseErrorMessage(error);
    return;
  }
  currentContext = { type: "store", token: data.token, store: data, storeId: data.store_id || data.id || store.id || null, adminUser: currentContext.user };
  saveStoreSession(currentContext);
  setAnalysisOpen(false);
  setAdminSettingsOpen(false);
  setTopForContext();
  await refreshAppData();
  setTopForContext();
}

async function returnToAdmin() {
  if (currentContext?.type === "store" && currentContext.token) {
    await supabaseClient.rpc("store_logout", { p_token: currentContext.token });
  }
  clearStoreSession();
  const { data } = await supabaseClient.auth.getSession();
  if (!data.session?.user) {
    await logout();
    return;
  }
  currentContext = { type: "admin", user: data.session.user };
  setTopForContext();
  await refreshAppData();
  setTopForContext();
}

async function upsertProspect(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const phone = formatPhone(phoneInput.value);
  const cpf = formatCpf(cpfInput.value);
  const notes = notesInput.value.trim();
  const color = getSelectedColor();
  const tags = getSelectedTags();
  const professionalId = getSelectedProfessionalId();
  const editingId = editingIdInput.value;
  if (!name && !phone && !cpf) {
    formError.textContent = "Preencha pelo menos nome, telefone ou CPF.";
    return;
  }
  if (availableProfessionals.length > 0 && !professionalId) {
    formError.textContent = "Selecione o profissional que realizou a prospecção.";
    return;
  }
  const payload = {
    p_token: currentContext.token,
    p_name: name || null,
    p_phone: phone || null,
    p_cpf: cpf || null,
    p_notes: notes || null,
    p_probability: color,
    p_tags: tags,
    p_professional_id: professionalId,
  };
  const request = editingId
    ? supabaseClient.rpc("store_update_prospect", { p_id: editingId, ...payload })
    : supabaseClient.rpc("store_create_prospect", payload);
  let { error } = await request;
  if (error?.message?.includes("p_tags") || error?.message?.includes("p_professional_id")) {
    const fallbackPayload = { ...payload };
    delete fallbackPayload.p_tags;
    delete fallbackPayload.p_professional_id;
    const fallbackRequest = await (editingId
      ? supabaseClient.rpc("store_update_prospect", { p_id: editingId, ...fallbackPayload })
      : supabaseClient.rpc("store_create_prospect", fallbackPayload));
    error = fallbackRequest.error;
  }
  if (error) {
    formError.textContent = getSupabaseErrorMessage(error);
    return;
  }
  if (!editingId) saveLastProspectSelection({ professionalId, tags });
  resetForm({ keepLastSelection: !editingId });
  await refreshAppData();
}

async function markReturned(id) {
  const { error } = await supabaseClient.rpc("store_mark_returned", { p_token: currentContext.token, p_id: id });
  if (error) formError.textContent = getSupabaseErrorMessage(error);
  else await refreshAppData();
}

async function unmarkReturned(id) {
  const { error } = await supabaseClient.rpc("store_unmark_returned", { p_token: currentContext.token, p_id: id });
  if (error) formError.textContent = getSupabaseErrorMessage(error);
  else await refreshAppData();
}

function editProspect(id) {
  const prospect = prospects.find((item) => item.id === id);
  if (!prospect) return;
  editingIdInput.value = prospect.id;
  nameInput.value = prospect.name;
  phoneInput.value = prospect.phone;
  cpfInput.value = prospect.cpf;
  notesInput.value = prospect.notes;
  if (prospect.professionalId && !availableProfessionals.some((item) => item.id === prospect.professionalId)) {
    availableProfessionals.push({ id: prospect.professionalId, name: prospect.professionalName || "Profissional inativo", isActive: false });
  }
  prospect.tags?.forEach((tag) => {
    if (!availableTags.some((item) => normalize(item) === normalize(tag))) availableTags.push(tag);
  });
  renderProfessionalOptions(prospect.professionalId);
  renderTags(prospect.tags || []);
  setSelectedColor(prospect.color);
  submitLabel.textContent = "Salvar alterações";
  nameInput.focus();
}

async function deleteProspect(id) {
  const prospect = prospects.find((item) => item.id === id);
  if (!prospect || !confirm(`Excluir o registro de ${getDisplayName(prospect)}?`)) return;
  const { error } = await supabaseClient.rpc("store_delete_prospect", { p_token: currentContext.token, p_id: id });
  if (error) formError.textContent = getSupabaseErrorMessage(error);
  else await refreshAppData();
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getPersistedAuthSession() {
  const firstAttempt = await supabaseClient.auth.getSession();
  if (firstAttempt.data.session?.user) return firstAttempt.data;
  await wait(150);
  return (await supabaseClient.auth.getSession()).data;
}

async function bootstrap() {
  initializeTheme();
  initializeFilters();
  renderColorLabels();
  renderTags();
  const data = await getPersistedAuthSession();
  const storedStoreSession = getStoredStoreSession();
  if (storedStoreSession) {
    const storedStoreId = storedStoreSession.storeId || storedStoreSession.store?.store_id || storedStoreSession.store?.id || null;
    currentContext = {
      type: "store",
      token: storedStoreSession.token,
      store: storedStoreSession.store || (storedStoreId ? { id: storedStoreId, store_id: storedStoreId } : null),
      storeId: storedStoreId,
      adminUser: storedStoreSession.adminAccess ? data.session?.user : null,
    };
    try {
      setTopForContext();
      await refreshAppData();
      if (!currentContext) {
        if (data.session?.user) {
          currentContext = { type: "admin", user: data.session.user };
          setTopForContext();
          await refreshAppData();
          showApp();
          setTopForContext();
        }
        return;
      }
      showApp();
      setTopForContext();
      return;
    } catch {
      stopRealtimeSubscription();
      clearStoreSession();
      currentContext = null;
    }
  }
  if (data.session?.user) {
    currentContext = { type: "admin", user: data.session.user };
    setTopForContext();
    await refreshAppData();
    showApp();
    setTopForContext();
    return;
  }
  showAuth();
}

function initializeFilters() {
  const now = new Date();
  dateFilter.value = formatDateInputValue(now);
  weekFilter.value = formatWeekInputValue(now);
  monthFilter.value = formatMonthInputValue(now);
  updatePeriodFilterVisibility();
  updateFilterSummary();
}

function setFiltersOpen(isOpen) {
  filtersPanel.hidden = !isOpen;
  filtersToggle.setAttribute("aria-expanded", String(isOpen));
}

function updatePeriodFilterVisibility() {
  const period = periodFilter.value;
  dateFilterLabel.hidden = period !== "day";
  weekFilterLabel.hidden = period !== "week";
  monthFilterLabel.hidden = period !== "month";
}

function handleFilterChange() {
  updatePeriodFilterVisibility();
  renderProspects();
}

function handleProspectFormEnter(event) {
  if (event.key !== "Enter" || event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) return;
  const fields = [nameInput, phoneInput, cpfInput, notesInput];
  const currentIndex = fields.indexOf(event.target);
  if (currentIndex === -1) return;

  event.preventDefault();
  if (currentIndex < fields.length - 1) {
    fields[currentIndex + 1].focus();
    return;
  }
  form.requestSubmit();
}

phoneInput.addEventListener("input", () => {
  phoneInput.value = formatPhone(phoneInput.value);
});
cpfInput.addEventListener("input", () => {
  cpfInput.value = formatCpf(cpfInput.value);
});
togglePasswordBtn.addEventListener("click", () => togglePasswordGroup([authPassword, authPasswordConfirm], togglePasswordBtn));
newStorePasswordToggleBtn.addEventListener("click", () => togglePasswordGroup([newStorePassword], newStorePasswordToggleBtn));
adminPasswordToggleBtn.addEventListener("click", () => togglePasswordGroup([adminNewPassword, adminConfirmPassword], adminPasswordToggleBtn));
authForm.addEventListener("submit", submitAuth);
authLoginModeBtn.addEventListener("click", () => setAuthMode("login"));
authSignupModeBtn.addEventListener("click", () => setAuthMode("signup"));
logoutBtn.addEventListener("click", () => setLogoutConfirmOpen(true));
cancelLogoutBtn.addEventListener("click", () => setLogoutConfirmOpen(false));
confirmLogoutBtn.addEventListener("click", logout);
logoutOverlay.addEventListener("click", (event) => {
  if (event.target === logoutOverlay) setLogoutConfirmOpen(false);
});
returnAdminBtn.addEventListener("click", returnToAdmin);
adminSettingsBtn.addEventListener("click", () => setAdminSettingsOpen(true));
adminSettingsClose.addEventListener("click", () => setAdminSettingsOpen(false));
adminSettingsOverlay.addEventListener("click", (event) => {
  if (event.target === adminSettingsOverlay) setAdminSettingsOpen(false);
});
createStoreBtn.addEventListener("click", createStore);
saveAdminPasswordBtn.addEventListener("click", updateStorePassword);
cancelDeleteStoreBtn.addEventListener("click", closeDeleteStore);
confirmDeleteStoreBtn.addEventListener("click", confirmDeleteStore);
form.addEventListener("submit", upsertProspect);
form.addEventListener("keydown", handleProspectFormEnter);
clearFormBtn.addEventListener("click", resetForm);
searchInput.addEventListener("input", renderProspects);
filtersToggle.addEventListener("click", () => setFiltersOpen(filtersPanel.hidden));
document.addEventListener("click", (event) => {
  if (!filtersPanel.hidden && !event.target.closest(".filter-menu")) setFiltersOpen(false);
});
periodFilter.addEventListener("change", handleFilterChange);
dateFilter.addEventListener("change", renderProspects);
weekFilter.addEventListener("change", renderProspects);
monthFilter.addEventListener("change", renderProspects);
statusFilter.addEventListener("change", renderProspects);
hasPhoneFilter.addEventListener("change", renderProspects);
hasCpfFilter.addEventListener("change", renderProspects);
themeToggleButtons.forEach((button) => button.addEventListener("click", toggleTheme));
analysisToggle.addEventListener("click", () => setAnalysisOpen(analysisOverlay.hidden, null));
analysisClose.addEventListener("click", () => setAnalysisOpen(false));
analysisOverlay.addEventListener("click", (event) => {
  if (event.target === analysisOverlay) setAnalysisOpen(false);
});
prevMonthBtn.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1);
  renderCalendar();
});
nextMonthBtn.addEventListener("click", () => {
  calendarDate = new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1);
  renderCalendar();
});

bootstrap();
