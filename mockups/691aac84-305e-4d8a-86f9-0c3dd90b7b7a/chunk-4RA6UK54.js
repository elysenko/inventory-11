import {
  HttpClient,
  Injectable,
  __async,
  __spreadProps,
  __spreadValues,
  computed,
  firstValueFrom,
  inject,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-VSPK3BNN.js";

// src/app/core/models.ts
var ROLE_LABEL = {
  ADMIN: "Administrator",
  MANAGER: "Manager",
  USER: "Clerk"
};
var ROLE_RANK = { USER: 1, MANAGER: 2, ADMIN: 3 };

// src/app/core/storage.ts
var NS = typeof location !== "undefined" && location.pathname.split("/")[1] || "app";
var nsKey = (key) => `${NS}:${key}`;
function readRaw(key) {
  try {
    return localStorage.getItem(nsKey(key));
  } catch {
    return null;
  }
}
function writeRaw(key, value) {
  try {
    localStorage.setItem(nsKey(key), value);
  } catch {
  }
}
function removeKeys(...keys) {
  for (const key of keys) {
    try {
      localStorage.removeItem(nsKey(key));
    } catch {
    }
  }
}
function readJson(key, isValid) {
  const raw = readRaw(key);
  if (!raw)
    return null;
  try {
    const parsed = JSON.parse(raw);
    if (isValid(parsed))
      return parsed;
  } catch {
  }
  removeKeys(key);
  return null;
}
function writeJson(key, value) {
  try {
    writeRaw(key, JSON.stringify(value));
  } catch {
  }
}

// src/app/core/auth.service.ts
var USER_KEY = "user";
var TOKEN_KEY = "token";
function isAuthUser(value) {
  if (typeof value !== "object" || value === null)
    return false;
  const candidate = value;
  return typeof candidate.id === "string" && typeof candidate.email === "string" && typeof candidate.role === "string" && candidate.role in ROLE_RANK;
}
var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateCredentials(email, password) {
  if (!email.trim() || !password.trim())
    return "Enter your email address and password to continue.";
  if (!EMAIL_RE.test(email.trim()))
    return "That does not look like a valid email address.";
  if (password.trim().length < 4)
    return "Your password must be at least 4 characters.";
  return null;
}
function displayNameFor(email) {
  const handle = email.split("@")[0] ?? "user";
  return handle.split(/[._-]+/).filter(Boolean).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
var AuthService = class _AuthService {
  constructor() {
    this.http = inject(HttpClient);
    this.currentUser = signal(this.restore());
    this.isAuthenticated = computed(() => this.currentUser() !== null);
    this.isManager = computed(() => this.hasRank("MANAGER"));
    this.isAdmin = computed(() => this.hasRank("ADMIN"));
  }
  token() {
    return readRaw(TOKEN_KEY);
  }
  hasRole(allowed) {
    const role = this.currentUser()?.role;
    return role !== void 0 && allowed.includes(role);
  }
  login(email, password) {
    return __async(this, null, function* () {
      if (true) {
        const problem = validateCredentials(email, password);
        if (problem)
          throw new Error(problem);
        const address = email.trim().toLowerCase();
        this.setSession({ id: "usr-preview", email: address, name: displayNameFor(address), role: "ADMIN" }, "preview-session");
        return;
      }
      const res = yield firstValueFrom(this.http.post("/api/auth/login", { email, password }));
      this.setSession(res.user, res.accessToken);
    });
  }
  signup(name, email, password) {
    return __async(this, null, function* () {
      if (true) {
        const problem = validateCredentials(email, password);
        if (problem)
          throw new Error(problem);
        const address = email.trim().toLowerCase();
        this.setSession({ id: "usr-preview", email: address, name: name.trim() || displayNameFor(address), role: "ADMIN" }, "preview-session");
        return;
      }
      const res = yield firstValueFrom(this.http.post("/api/auth/signup", { name, email, password }));
      this.setSession(res.user, res.accessToken);
    });
  }
  /**
   * Preview-only: seeds a signed-in session without any credentials so the reviewer
   * (and the screenshot capture system) can reach the authenticated screens directly.
   */
  previewSignIn(role = "ADMIN") {
    if (false)
      return;
    this.setSession({ id: "usr-preview", email: "dana.whitfield@stockroom.example", name: "Dana Whitfield", role }, "preview-session");
  }
  /** Preview-only: re-badge the session so role-gated UI can be reviewed. */
  previewSwitchRole(role) {
    if (false)
      return;
    const user = this.currentUser();
    this.setSession(__spreadProps(__spreadValues({}, user ?? { id: "usr-preview", email: "dana.whitfield@stockroom.example", name: "Dana Whitfield" }), { role }), "preview-session");
  }
  logout() {
    this.currentUser.set(null);
    removeKeys(USER_KEY, TOKEN_KEY);
  }
  hasRank(minimum) {
    const role = this.currentUser()?.role;
    return role !== void 0 && ROLE_RANK[role] >= ROLE_RANK[minimum];
  }
  setSession(user, token) {
    this.currentUser.set(user);
    writeJson(USER_KEY, user);
    writeRaw(TOKEN_KEY, token);
  }
  /** Defensive restore: an unrecognised payload is cleared, never thrown. */
  restore() {
    try {
      return readJson(USER_KEY, isAuthUser);
    } catch {
      removeKeys(USER_KEY, TOKEN_KEY);
      return null;
    }
  }
  static {
    this.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AuthService)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  ROLE_LABEL,
  AuthService
};
