import {
  AuthService
} from "./chunk-4RA6UK54.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-KK6EC5LB.js";
import {
  ActivatedRoute,
  ChangeDetectionStrategy,
  Component,
  Router,
  RouterLink,
  __async,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-VSPK3BNN.js";

// src/app/pages/login/login.component.ts
function LoginComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function LoginComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 20);
    \u0275\u0275listener("click", function LoginComponent_Conditional_24_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.skipLogin());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
var LoginComponent = class _LoginComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.previewShortcut = true ? "Skip login \u2014 Demo Mode" : null;
    this.email = signal("");
    this.password = signal("");
    this.error = signal(null);
    this.busy = signal(false);
  }
  submit() {
    return __async(this, null, function* () {
      this.error.set(null);
      this.busy.set(true);
      try {
        yield this.auth.login(this.email(), this.password());
        this.goToApp();
      } catch (err) {
        this.error.set(err instanceof Error ? err.message : "We could not sign you in. Check your details and try again.");
      } finally {
        this.busy.set(false);
      }
    });
  }
  skipLogin() {
    this.auth.previewSignIn();
    this.goToApp();
  }
  goToApp() {
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl");
    void this.router.navigateByUrl(returnUrl && returnUrl.startsWith("/") ? returnUrl : "/items");
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoginComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 49, vars: 6, consts: [["loginForm", "ngForm"], [1, "auth"], [1, "auth__panel"], [1, "auth__brand"], ["aria-hidden", "true", 1, "auth__mark"], [1, "auth__tagline"], ["novalidate", "", 1, "form", 3, "ngSubmit"], [1, "auth__heading"], ["role", "alert", 1, "alert", "alert-danger"], [1, "field"], ["for", "email", 1, "label"], ["id", "email", "name", "email", "type", "email", "autocomplete", "username", "placeholder", "you@company.com", 1, "input", 3, "ngModelChange", "ngModel"], ["for", "password", 1, "label"], ["id", "password", "name", "password", "type", "password", "autocomplete", "current-password", "placeholder", "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], ["type", "button", 1, "auth__shortcut"], [1, "auth__alt", "small"], ["routerLink", "/signup"], [1, "auth__aside"], [1, "auth__points"], ["type", "button", 1, "auth__shortcut", 3, "click"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = \u0275\u0275getCurrentView();
        \u0275\u0275elementStart(0, "div", 1)(1, "section", 2)(2, "div", 3)(3, "span", 4);
        \u0275\u0275text(4, "SR");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "StockRoom");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 5);
        \u0275\u0275text(8, "Warehouse inventory, counted once and counted right.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "form", 6, 0);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener() {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.submit());
        });
        \u0275\u0275elementStart(11, "h2", 7);
        \u0275\u0275text(12, "Sign in");
        \u0275\u0275elementEnd();
        \u0275\u0275template(13, LoginComponent_Conditional_13_Template, 2, 1, "p", 8);
        \u0275\u0275elementStart(14, "div", 9)(15, "label", 10);
        \u0275\u0275text(16, "Email address");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(17, "input", 11);
        \u0275\u0275listener("ngModelChange", function LoginComponent_Template_input_ngModelChange_17_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.email.set($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(18, "div", 9)(19, "label", 12);
        \u0275\u0275text(20, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "input", 13);
        \u0275\u0275listener("ngModelChange", function LoginComponent_Template_input_ngModelChange_21_listener($event) {
          \u0275\u0275restoreView(_r1);
          return \u0275\u0275resetView(ctx.password.set($event));
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "button", 14);
        \u0275\u0275text(23);
        \u0275\u0275elementEnd();
        \u0275\u0275template(24, LoginComponent_Conditional_24_Template, 2, 1, "button", 15);
        \u0275\u0275elementStart(25, "p", 16);
        \u0275\u0275text(26, " No account yet? ");
        \u0275\u0275elementStart(27, "a", 17);
        \u0275\u0275text(28, "Create one");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(29, "aside", 18)(30, "h2");
        \u0275\u0275text(31, "Everything on the floor, in one ledger.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "ul", 19)(33, "li")(34, "strong");
        \u0275\u0275text(35, "Per-location balances");
        \u0275\u0275elementEnd();
        \u0275\u0275text(36, " \u2014 know exactly which zone holds what.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "li")(38, "strong");
        \u0275\u0275text(39, "Movements that never overdraw");
        \u0275\u0275elementEnd();
        \u0275\u0275text(40, " \u2014 stock in, out and between zones stays honest.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "li")(42, "strong");
        \u0275\u0275text(43, "A full audit trail");
        \u0275\u0275elementEnd();
        \u0275\u0275text(44, " \u2014 who moved it, how much, and when.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "li")(46, "strong");
        \u0275\u0275text(47, "Low-stock alerts");
        \u0275\u0275elementEnd();
        \u0275\u0275text(48, " \u2014 reorder before the shelf runs dry.");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_1_0;
        let tmp_6_0;
        \u0275\u0275advance(13);
        \u0275\u0275conditional((tmp_1_0 = ctx.error()) ? 13 : -1, tmp_1_0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.email());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.password());
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.busy());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.busy() ? "Signing in\u2026" : "Sign in", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_6_0 = ctx.previewShortcut) ? 24 : -1, tmp_6_0);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterLink], styles: ["\n\n.auth[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 460px) minmax(0, 1fr);\n  min-height: calc(100svh - 0px);\n  background: var(--color-surface-sunken);\n}\n.auth__panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-5);\n  padding: var(--space-6) var(--space-5);\n  background: var(--color-surface);\n  border-right: 1px solid var(--color-border);\n}\n.auth__brand[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.auth__mark[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border-radius: var(--radius-md);\n  background: var(--color-accent);\n  color: var(--color-ink-invert);\n  font-weight: 800;\n}\n.auth__tagline[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--color-ink-muted);\n}\n.auth__heading[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n}\n.auth__shortcut[_ngcontent-%COMP%] {\n  align-self: center;\n  min-height: var(--tap-target);\n  padding: 0 var(--space-3);\n  background: none;\n  border: 0;\n  color: var(--color-ink-subtle);\n  font-size: var(--text-sm);\n  font-weight: 600;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.auth__shortcut[_ngcontent-%COMP%]:hover {\n  color: var(--color-ink-muted);\n}\n.auth__alt[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--color-ink-muted);\n}\n.auth__aside[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-4);\n  padding: var(--space-7) var(--space-6);\n  background: var(--color-shell);\n  color: var(--color-shell-ink);\n}\n.auth__aside[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--color-ink-invert);\n  max-width: 22ch;\n}\n.auth__points[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  max-width: 46ch;\n}\n.auth__points[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding-left: var(--space-4);\n  border-left: 2px solid var(--color-accent);\n}\n.auth__points[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-ink-invert);\n}\n@media (max-width: 900px) {\n  .auth[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .auth__panel[_ngcontent-%COMP%] {\n    border-right: 0;\n    padding: var(--space-5) var(--space-4);\n  }\n  .auth__aside[_ngcontent-%COMP%] {\n    padding: var(--space-5) var(--space-4) calc(var(--space-6) + env(safe-area-inset-bottom));\n  }\n  .auth__aside[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: var(--text-lg);\n  }\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", imports: [FormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="auth">
  <section class="auth__panel">
    <div class="auth__brand">
      <span class="auth__mark" aria-hidden="true">SR</span>
      <h1>StockRoom</h1>
      <p class="auth__tagline">Warehouse inventory, counted once and counted right.</p>
    </div>

    <form class="form" (ngSubmit)="submit()" #loginForm="ngForm" novalidate>
      <h2 class="auth__heading">Sign in</h2>

      @if (error(); as message) {
        <p class="alert alert-danger" role="alert">{{ message }}</p>
      }

      <div class="field">
        <label class="label" for="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          class="input"
          autocomplete="username"
          placeholder="you@company.com"
          [ngModel]="email()"
          (ngModelChange)="email.set($event)"
        />
      </div>

      <div class="field">
        <label class="label" for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          class="input"
          autocomplete="current-password"
          placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
          [ngModel]="password()"
          (ngModelChange)="password.set($event)"
        />
      </div>

      <button type="submit" class="btn btn-primary btn-block" [disabled]="busy()">
        {{ busy() ? 'Signing in\u2026' : 'Sign in' }}
      </button>

      @if (previewShortcut; as shortcutLabel) {
        <button type="button" class="auth__shortcut" (click)="skipLogin()">{{ shortcutLabel }}</button>
      }

      <p class="auth__alt small">
        No account yet? <a routerLink="/signup">Create one</a>
      </p>
    </form>
  </section>

  <aside class="auth__aside">
    <h2>Everything on the floor, in one ledger.</h2>
    <ul class="auth__points">
      <li><strong>Per-location balances</strong> \u2014 know exactly which zone holds what.</li>
      <li><strong>Movements that never overdraw</strong> \u2014 stock in, out and between zones stays honest.</li>
      <li><strong>A full audit trail</strong> \u2014 who moved it, how much, and when.</li>
      <li><strong>Low-stock alerts</strong> \u2014 reorder before the shelf runs dry.</li>
    </ul>
  </aside>
</div>
`, styles: ["/* src/app/pages/login/auth.css */\n.auth {\n  display: grid;\n  grid-template-columns: minmax(0, 460px) minmax(0, 1fr);\n  min-height: calc(100svh - 0px);\n  background: var(--color-surface-sunken);\n}\n.auth__panel {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-5);\n  padding: var(--space-6) var(--space-5);\n  background: var(--color-surface);\n  border-right: 1px solid var(--color-border);\n}\n.auth__brand {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.auth__mark {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border-radius: var(--radius-md);\n  background: var(--color-accent);\n  color: var(--color-ink-invert);\n  font-weight: 800;\n}\n.auth__tagline {\n  margin: 0;\n  color: var(--color-ink-muted);\n}\n.auth__heading {\n  font-size: var(--text-lg);\n}\n.auth__shortcut {\n  align-self: center;\n  min-height: var(--tap-target);\n  padding: 0 var(--space-3);\n  background: none;\n  border: 0;\n  color: var(--color-ink-subtle);\n  font-size: var(--text-sm);\n  font-weight: 600;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.auth__shortcut:hover {\n  color: var(--color-ink-muted);\n}\n.auth__alt {\n  text-align: center;\n  color: var(--color-ink-muted);\n}\n.auth__aside {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-4);\n  padding: var(--space-7) var(--space-6);\n  background: var(--color-shell);\n  color: var(--color-shell-ink);\n}\n.auth__aside h2 {\n  color: var(--color-ink-invert);\n  max-width: 22ch;\n}\n.auth__points {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  max-width: 46ch;\n}\n.auth__points li {\n  padding-left: var(--space-4);\n  border-left: 2px solid var(--color-accent);\n}\n.auth__points strong {\n  color: var(--color-ink-invert);\n}\n@media (max-width: 900px) {\n  .auth {\n    grid-template-columns: 1fr;\n  }\n  .auth__panel {\n    border-right: 0;\n    padding: var(--space-5) var(--space-4);\n  }\n  .auth__aside {\n    padding: var(--space-5) var(--space-4) calc(var(--space-6) + env(safe-area-inset-bottom));\n  }\n  .auth__aside h2 {\n    font-size: var(--text-lg);\n  }\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/pages/login/login.component.ts", lineNumber: 13 });
})();
export {
  LoginComponent
};
