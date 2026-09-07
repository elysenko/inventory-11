import {
  AuthService,
  ROLE_LABEL
} from "./chunk-4RA6UK54.js";
import {
  ChangeDetectionStrategy,
  Component,
  RouterLink,
  inject,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-VSPK3BNN.js";

// src/app/pages/forbidden/forbidden.component.ts
var ForbiddenComponent = class _ForbiddenComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.roleLabel = ROLE_LABEL;
  }
  static {
    this.\u0275fac = function ForbiddenComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ForbiddenComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ForbiddenComponent, selectors: [["app-forbidden"]], decls: 17, vars: 1, consts: [[1, "page", "page--narrow"], [1, "card"], [1, "empty"], ["aria-hidden", "true", 1, "empty__icon"], [1, "empty__title"], [1, "row"], ["routerLink", "/items", 1, "btn", "btn-primary"], ["routerLink", "/movements/new", 1, "btn"]], template: function ForbiddenComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "section", 1)(2, "div", 2)(3, "span", 3);
        \u0275\u0275text(4, "\u26BF");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "That area needs a higher role");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "p");
        \u0275\u0275text(8, " You are signed in as ");
        \u0275\u0275elementStart(9, "strong");
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275text(11, ". The catalogue, locations, audit log and settings each require manager or administrator access. Ask an administrator to raise your role. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 5)(13, "a", 6);
        \u0275\u0275text(14, "Back to items");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "a", 7);
        \u0275\u0275text(16, "Record a movement");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275textInterpolate(ctx.auth.currentUser() ? ctx.roleLabel[ctx.auth.currentUser().role] : "a guest");
      }
    }, dependencies: [RouterLink], styles: ["\n\n.page--narrow[_ngcontent-%COMP%] {\n  max-width: 620px;\n  padding-top: var(--space-7);\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ForbiddenComponent, [{
    type: Component,
    args: [{ selector: "app-forbidden", imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page page--narrow">
  <section class="card">
    <div class="empty">
      <span class="empty__icon" aria-hidden="true">\u26BF</span>
      <p class="empty__title">That area needs a higher role</p>
      <p>
        You are signed in as
        <strong>{{ auth.currentUser() ? roleLabel[auth.currentUser()!.role] : 'a guest' }}</strong>.
        The catalogue, locations, audit log and settings each require manager or administrator
        access. Ask an administrator to raise your role.
      </p>
      <div class="row">
        <a class="btn btn-primary" routerLink="/items">Back to items</a>
        <a class="btn" routerLink="/movements/new">Record a movement</a>
      </div>
    </div>
  </section>
</div>
`, styles: ["/* src/app/pages/forbidden/forbidden.component.css */\n.page--narrow {\n  max-width: 620px;\n  padding-top: var(--space-7);\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ForbiddenComponent, { className: "ForbiddenComponent", filePath: "src/app/pages/forbidden/forbidden.component.ts", lineNumber: 13 });
})();
export {
  ForbiddenComponent
};
