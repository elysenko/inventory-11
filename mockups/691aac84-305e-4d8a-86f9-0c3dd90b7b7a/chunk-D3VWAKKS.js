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

// src/app/pages/signup/signup.component.ts
function SignupComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function SignupComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 23);
    \u0275\u0275listener("click", function SignupComponent_Conditional_31_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.skipLogin());
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
var SignupComponent = class _SignupComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.previewShortcut = true ? "Skip login \u2014 Demo Mode" : null;
    this.name = signal("");
    this.email = signal("");
    this.password = signal("");
    this.confirm = signal("");
    this.error = signal(null);
    this.busy = signal(false);
  }
  submit() {
    return __async(this, null, function* () {
      this.error.set(null);
      if (!this.name().trim()) {
        this.error.set("Tell us your name so movements can be attributed to you.");
        return;
      }
      if (this.password() !== this.confirm()) {
        this.error.set("Those two passwords do not match.");
        return;
      }
      this.busy.set(true);
      try {
        yield this.auth.signup(this.name(), this.email(), this.password());
        this.goToApp();
      } catch (err) {
        this.error.set(err instanceof Error ? err.message : "We could not create that account. Try again.");
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
    this.\u0275fac = function SignupComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SignupComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SignupComponent, selectors: [["app-signup"]], decls: 54, vars: 8, consts: [[1, "auth"], [1, "auth__panel"], [1, "auth__brand"], ["aria-hidden", "true", 1, "auth__mark"], [1, "auth__tagline"], ["novalidate", "", 1, "form", 3, "ngSubmit"], [1, "auth__heading"], ["role", "alert", 1, "alert", "alert-danger"], [1, "field"], ["for", "name", 1, "label"], ["id", "name", "name", "name", "type", "text", "autocomplete", "name", "placeholder", "Alex Moreau", 1, "input", 3, "ngModelChange", "ngModel"], ["for", "signup-email", 1, "label"], ["id", "signup-email", "name", "email", "type", "email", "autocomplete", "email", "placeholder", "you@company.com", 1, "input", 3, "ngModelChange", "ngModel"], ["for", "signup-password", 1, "label"], ["id", "signup-password", "name", "password", "type", "password", "autocomplete", "new-password", "placeholder", "At least 8 characters", 1, "input", 3, "ngModelChange", "ngModel"], ["for", "signup-confirm", 1, "label"], ["id", "signup-confirm", "name", "confirm", "type", "password", "autocomplete", "new-password", "placeholder", "Repeat your password", 1, "input", 3, "ngModelChange", "ngModel"], ["type", "submit", 1, "btn", "btn-primary", "btn-block", 3, "disabled"], ["type", "button", 1, "auth__shortcut"], [1, "auth__alt", "small"], ["routerLink", "/login"], [1, "auth__aside"], [1, "auth__points"], ["type", "button", 1, "auth__shortcut", 3, "click"]], template: function SignupComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "SR");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "h1");
        \u0275\u0275text(6, "StockRoom");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p", 4);
        \u0275\u0275text(8, "Create your warehouse account.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(9, "form", 5);
        \u0275\u0275listener("ngSubmit", function SignupComponent_Template_form_ngSubmit_9_listener() {
          return ctx.submit();
        });
        \u0275\u0275elementStart(10, "h2", 6);
        \u0275\u0275text(11, "Create account");
        \u0275\u0275elementEnd();
        \u0275\u0275template(12, SignupComponent_Conditional_12_Template, 2, 1, "p", 7);
        \u0275\u0275elementStart(13, "div", 8)(14, "label", 9);
        \u0275\u0275text(15, "Full name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "input", 10);
        \u0275\u0275listener("ngModelChange", function SignupComponent_Template_input_ngModelChange_16_listener($event) {
          return ctx.name.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 8)(18, "label", 11);
        \u0275\u0275text(19, "Email address");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(20, "input", 12);
        \u0275\u0275listener("ngModelChange", function SignupComponent_Template_input_ngModelChange_20_listener($event) {
          return ctx.email.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 8)(22, "label", 13);
        \u0275\u0275text(23, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "input", 14);
        \u0275\u0275listener("ngModelChange", function SignupComponent_Template_input_ngModelChange_24_listener($event) {
          return ctx.password.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(25, "div", 8)(26, "label", 15);
        \u0275\u0275text(27, "Confirm password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(28, "input", 16);
        \u0275\u0275listener("ngModelChange", function SignupComponent_Template_input_ngModelChange_28_listener($event) {
          return ctx.confirm.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "button", 17);
        \u0275\u0275text(30);
        \u0275\u0275elementEnd();
        \u0275\u0275template(31, SignupComponent_Conditional_31_Template, 2, 1, "button", 18);
        \u0275\u0275elementStart(32, "p", 19);
        \u0275\u0275text(33, " Already have an account? ");
        \u0275\u0275elementStart(34, "a", 20);
        \u0275\u0275text(35, "Sign in");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(36, "aside", 21)(37, "h2");
        \u0275\u0275text(38, "New accounts start as clerks.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(39, "ul", 22)(40, "li")(41, "strong");
        \u0275\u0275text(42, "Clerks");
        \u0275\u0275elementEnd();
        \u0275\u0275text(43, " browse the catalogue and record stock movements.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(44, "li")(45, "strong");
        \u0275\u0275text(46, "Managers");
        \u0275\u0275elementEnd();
        \u0275\u0275text(47, " also maintain items and locations, and read the audit log.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(48, "li")(49, "strong");
        \u0275\u0275text(50, "Administrators");
        \u0275\u0275elementEnd();
        \u0275\u0275text(51, " manage service credentials on top of everything else.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(52, "li");
        \u0275\u0275text(53, "Ask an administrator to raise your role once your account exists.");
        \u0275\u0275elementEnd()()()();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_7_0;
        \u0275\u0275advance(12);
        \u0275\u0275conditional((tmp_0_0 = ctx.error()) ? 12 : -1, tmp_0_0);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.name());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.email());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.password());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.confirm());
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.busy());
        \u0275\u0275advance();
        \u0275\u0275textInterpolate1(" ", ctx.busy() ? "Creating account\u2026" : "Create account", " ");
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_7_0 = ctx.previewShortcut) ? 31 : -1, tmp_7_0);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterLink], styles: ["\n\n.auth[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: minmax(0, 460px) minmax(0, 1fr);\n  min-height: calc(100svh - 0px);\n  background: var(--color-surface-sunken);\n}\n.auth__panel[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-5);\n  padding: var(--space-6) var(--space-5);\n  background: var(--color-surface);\n  border-right: 1px solid var(--color-border);\n}\n.auth__brand[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.auth__mark[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border-radius: var(--radius-md);\n  background: var(--color-accent);\n  color: var(--color-ink-invert);\n  font-weight: 800;\n}\n.auth__tagline[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--color-ink-muted);\n}\n.auth__heading[_ngcontent-%COMP%] {\n  font-size: var(--text-lg);\n}\n.auth__shortcut[_ngcontent-%COMP%] {\n  align-self: center;\n  min-height: var(--tap-target);\n  padding: 0 var(--space-3);\n  background: none;\n  border: 0;\n  color: var(--color-ink-subtle);\n  font-size: var(--text-sm);\n  font-weight: 600;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.auth__shortcut[_ngcontent-%COMP%]:hover {\n  color: var(--color-ink-muted);\n}\n.auth__alt[_ngcontent-%COMP%] {\n  text-align: center;\n  color: var(--color-ink-muted);\n}\n.auth__aside[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-4);\n  padding: var(--space-7) var(--space-6);\n  background: var(--color-shell);\n  color: var(--color-shell-ink);\n}\n.auth__aside[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--color-ink-invert);\n  max-width: 22ch;\n}\n.auth__points[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  max-width: 46ch;\n}\n.auth__points[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding-left: var(--space-4);\n  border-left: 2px solid var(--color-accent);\n}\n.auth__points[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-ink-invert);\n}\n@media (max-width: 900px) {\n  .auth[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .auth__panel[_ngcontent-%COMP%] {\n    border-right: 0;\n    padding: var(--space-5) var(--space-4);\n  }\n  .auth__aside[_ngcontent-%COMP%] {\n    padding: var(--space-5) var(--space-4) calc(var(--space-6) + env(safe-area-inset-bottom));\n  }\n  .auth__aside[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: var(--text-lg);\n  }\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SignupComponent, [{
    type: Component,
    args: [{ selector: "app-signup", imports: [FormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="auth">
  <section class="auth__panel">
    <div class="auth__brand">
      <span class="auth__mark" aria-hidden="true">SR</span>
      <h1>StockRoom</h1>
      <p class="auth__tagline">Create your warehouse account.</p>
    </div>

    <form class="form" (ngSubmit)="submit()" novalidate>
      <h2 class="auth__heading">Create account</h2>

      @if (error(); as message) {
        <p class="alert alert-danger" role="alert">{{ message }}</p>
      }

      <div class="field">
        <label class="label" for="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          class="input"
          autocomplete="name"
          placeholder="Alex Moreau"
          [ngModel]="name()"
          (ngModelChange)="name.set($event)"
        />
      </div>

      <div class="field">
        <label class="label" for="signup-email">Email address</label>
        <input
          id="signup-email"
          name="email"
          type="email"
          class="input"
          autocomplete="email"
          placeholder="you@company.com"
          [ngModel]="email()"
          (ngModelChange)="email.set($event)"
        />
      </div>

      <div class="field">
        <label class="label" for="signup-password">Password</label>
        <input
          id="signup-password"
          name="password"
          type="password"
          class="input"
          autocomplete="new-password"
          placeholder="At least 8 characters"
          [ngModel]="password()"
          (ngModelChange)="password.set($event)"
        />
      </div>

      <div class="field">
        <label class="label" for="signup-confirm">Confirm password</label>
        <input
          id="signup-confirm"
          name="confirm"
          type="password"
          class="input"
          autocomplete="new-password"
          placeholder="Repeat your password"
          [ngModel]="confirm()"
          (ngModelChange)="confirm.set($event)"
        />
      </div>

      <button type="submit" class="btn btn-primary btn-block" [disabled]="busy()">
        {{ busy() ? 'Creating account\u2026' : 'Create account' }}
      </button>

      @if (previewShortcut; as shortcutLabel) {
        <button type="button" class="auth__shortcut" (click)="skipLogin()">{{ shortcutLabel }}</button>
      }

      <p class="auth__alt small">
        Already have an account? <a routerLink="/login">Sign in</a>
      </p>
    </form>
  </section>

  <aside class="auth__aside">
    <h2>New accounts start as clerks.</h2>
    <ul class="auth__points">
      <li><strong>Clerks</strong> browse the catalogue and record stock movements.</li>
      <li><strong>Managers</strong> also maintain items and locations, and read the audit log.</li>
      <li><strong>Administrators</strong> manage service credentials on top of everything else.</li>
      <li>Ask an administrator to raise your role once your account exists.</li>
    </ul>
  </aside>
</div>
`, styles: ["/* src/app/pages/login/auth.css */\n.auth {\n  display: grid;\n  grid-template-columns: minmax(0, 460px) minmax(0, 1fr);\n  min-height: calc(100svh - 0px);\n  background: var(--color-surface-sunken);\n}\n.auth__panel {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-5);\n  padding: var(--space-6) var(--space-5);\n  background: var(--color-surface);\n  border-right: 1px solid var(--color-border);\n}\n.auth__brand {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-2);\n}\n.auth__mark {\n  display: grid;\n  place-items: center;\n  width: 44px;\n  height: 44px;\n  border-radius: var(--radius-md);\n  background: var(--color-accent);\n  color: var(--color-ink-invert);\n  font-weight: 800;\n}\n.auth__tagline {\n  margin: 0;\n  color: var(--color-ink-muted);\n}\n.auth__heading {\n  font-size: var(--text-lg);\n}\n.auth__shortcut {\n  align-self: center;\n  min-height: var(--tap-target);\n  padding: 0 var(--space-3);\n  background: none;\n  border: 0;\n  color: var(--color-ink-subtle);\n  font-size: var(--text-sm);\n  font-weight: 600;\n  text-decoration: underline;\n  cursor: pointer;\n}\n.auth__shortcut:hover {\n  color: var(--color-ink-muted);\n}\n.auth__alt {\n  text-align: center;\n  color: var(--color-ink-muted);\n}\n.auth__aside {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: var(--space-4);\n  padding: var(--space-7) var(--space-6);\n  background: var(--color-shell);\n  color: var(--color-shell-ink);\n}\n.auth__aside h2 {\n  color: var(--color-ink-invert);\n  max-width: 22ch;\n}\n.auth__points {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-3);\n  max-width: 46ch;\n}\n.auth__points li {\n  padding-left: var(--space-4);\n  border-left: 2px solid var(--color-accent);\n}\n.auth__points strong {\n  color: var(--color-ink-invert);\n}\n@media (max-width: 900px) {\n  .auth {\n    grid-template-columns: 1fr;\n  }\n  .auth__panel {\n    border-right: 0;\n    padding: var(--space-5) var(--space-4);\n  }\n  .auth__aside {\n    padding: var(--space-5) var(--space-4) calc(var(--space-6) + env(safe-area-inset-bottom));\n  }\n  .auth__aside h2 {\n    font-size: var(--text-lg);\n  }\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SignupComponent, { className: "SignupComponent", filePath: "src/app/pages/signup/signup.component.ts", lineNumber: 13 });
})();
export {
  SignupComponent
};
