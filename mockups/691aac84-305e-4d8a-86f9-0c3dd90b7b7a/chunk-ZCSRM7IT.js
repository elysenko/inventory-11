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
  ChangeDetectionStrategy,
  Component,
  RouterLink,
  __spreadProps,
  __spreadValues,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VSPK3BNN.js";

// src/app/pages/admin/settings/settings.component.ts
var _forTrack0 = ($index, $item) => $item.service;
var _forTrack1 = ($index, $item) => $item.key;
function SettingsComponent_Conditional_10_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const group_r1 = ctx.$implicit;
    const \u0275$index_26_r2 = ctx.$index;
    const \u0275$count_26_r3 = ctx.$count;
    \u0275\u0275textInterpolate2(" ", group_r1.title, "", \u0275$index_26_r2 === \u0275$count_26_r3 - 1 ? "" : ", ", " ");
  }
}
function SettingsComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 7)(1, "span")(2, "strong");
    \u0275\u0275text(3, "The following need credentials to activate:");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, SettingsComponent_Conditional_10_For_5_Template, 1, 2, null, null, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r3.unconfigured());
  }
}
function SettingsComponent_For_12_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 10);
    \u0275\u0275text(1, "Configured");
    \u0275\u0275elementEnd();
  }
}
function SettingsComponent_For_12_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "Needs credentials");
    \u0275\u0275elementEnd();
  }
}
function SettingsComponent_For_12_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const group_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", group_r6.title, " credentials saved.");
  }
}
function SettingsComponent_For_12_For_13_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Currently set. Values are masked once stored. ");
  }
}
function SettingsComponent_For_12_For_13_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Not configured \u2014 the service stays inactive until this is set. ");
  }
}
function SettingsComponent_For_12_For_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 15)(1, "label", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementStart(3, "span", 19);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "input", 20);
    \u0275\u0275listener("ngModelChange", function SettingsComponent_For_12_For_13_Template_input_ngModelChange_5_listener($event) {
      const entry_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.setDraft(entry_r8.key, $event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 21);
    \u0275\u0275template(7, SettingsComponent_For_12_For_13_Conditional_7_Template, 1, 0)(8, SettingsComponent_For_12_For_13_Conditional_8_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const entry_r8 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("for", entry_r8.key);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", entry_r8.label, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(entry_r8.key);
    \u0275\u0275advance();
    \u0275\u0275property("id", entry_r8.key)("name", entry_r8.key)("placeholder", entry_r8.configured ? "" : ctx_r3.placeholder)("ngModel", ctx_r3.draftFor(entry_r8));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(entry_r8.configured ? 7 : 8);
  }
}
function SettingsComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "section", 8)(1, "div", 9)(2, "div")(3, "h2");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 4);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(7, SettingsComponent_For_12_Conditional_7_Template, 2, 0, "span", 10)(8, SettingsComponent_For_12_Conditional_8_Template, 2, 0, "span", 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "form", 12);
    \u0275\u0275listener("ngSubmit", function SettingsComponent_For_12_Template_form_ngSubmit_9_listener() {
      const group_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.save(group_r6));
    });
    \u0275\u0275template(10, SettingsComponent_For_12_Conditional_10_Template, 2, 1, "p", 13);
    \u0275\u0275elementStart(11, "div", 14);
    \u0275\u0275repeaterCreate(12, SettingsComponent_For_12_For_13_Template, 9, 8, "div", 15, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 16)(15, "button", 17);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const group_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(group_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(group_r6.blurb);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isConfigured(group_r6) ? 7 : 8);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r3.savedKey() === group_r6.service ? 10 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(group_r6.entries);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Save ", group_r6.title, "");
  }
}
var PLACEHOLDER = "PLACEHOLDER_CONFIGURE_IN_SETTINGS";
var SettingsComponent = class _SettingsComponent {
  constructor() {
    this.placeholder = PLACEHOLDER;
    this.settings = signal([
      { key: "DATABASE_URL", service: "postgresql", label: "Connection string", value: "postgresql://stockroom:\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022@app-db-postgresql:5432/stockroom", configured: true },
      { key: "JWT_SECRET", service: "postgresql", label: "JWT signing secret", value: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", configured: true },
      { key: "MINIO_ENDPOINT", service: "minio", label: "Endpoint", value: PLACEHOLDER, configured: false },
      { key: "MINIO_ACCESS_KEY", service: "minio", label: "Access key", value: PLACEHOLDER, configured: false },
      { key: "MINIO_SECRET_KEY", service: "minio", label: "Secret key", value: PLACEHOLDER, configured: false }
    ]);
    this.drafts = signal({});
    this.savedKey = signal(null);
    this.groups = computed(() => [
      {
        service: "postgresql",
        title: "PostgreSQL",
        blurb: "Backs the item catalogue, stock levels and the movement ledger.",
        entries: this.settings().filter((entry) => entry.service === "postgresql")
      },
      {
        service: "minio",
        title: "MinIO object storage",
        blurb: "Provisioned for future attachments. StockRoom does not upload anything yet.",
        entries: this.settings().filter((entry) => entry.service === "minio")
      }
    ]);
    this.unconfigured = computed(() => this.groups().filter((group) => group.entries.some((entry) => !entry.configured)));
  }
  isConfigured(group) {
    return group.entries.every((entry) => entry.configured);
  }
  draftFor(entry) {
    return this.drafts()[entry.key] ?? (entry.configured ? entry.value : "");
  }
  setDraft(key, value) {
    this.drafts.update((drafts) => __spreadProps(__spreadValues({}, drafts), { [key]: value }));
  }
  save(group) {
    const drafts = this.drafts();
    this.settings.update((entries) => entries.map((entry) => {
      if (entry.service !== group.service)
        return entry;
      const draft = drafts[entry.key];
      if (draft === void 0 || draft.trim() === "" || draft.trim() === PLACEHOLDER)
        return entry;
      return __spreadProps(__spreadValues({}, entry), { value: draft.trim(), configured: true });
    }));
    this.savedKey.set(group.service);
  }
  static {
    this.\u0275fac = function SettingsComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _SettingsComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SettingsComponent, selectors: [["app-settings"]], decls: 13, vars: 1, consts: [[1, "page", "page--narrow"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "page-sub"], [1, "page-actions"], ["routerLink", "/items", 1, "btn"], ["role", "status", 1, "alert", "alert-warn"], [1, "card"], [1, "card-head"], [1, "badge", "badge-ok"], [1, "badge", "badge-low"], ["novalidate", "", 1, "card-body", "form", 3, "ngSubmit"], ["role", "status", 1, "alert", "alert-info"], [1, "form-grid"], [1, "field", "field--wide"], [1, "form-actions"], ["type", "submit", 1, "btn", "btn-primary"], [1, "label"], [1, "mono", "subtle"], ["type", "text", 1, "input", 3, "ngModelChange", "id", "name", "placeholder", "ngModel"], [1, "hint"]], template: function SettingsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, "Settings");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, " Credentials for the services StockRoom is provisioned with. Environment variables win; anything left unset falls back to the value stored here. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "a", 6);
        \u0275\u0275text(9, "Back to items");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(10, SettingsComponent_Conditional_10_Template, 6, 0, "p", 7);
        \u0275\u0275repeaterCreate(11, SettingsComponent_For_12_Template, 17, 5, "section", 8, _forTrack0);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275conditional(ctx.unconfigured().length > 0 ? 10 : -1);
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.groups());
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterLink], styles: ["\n\n.page--narrow[_ngcontent-%COMP%] {\n  max-width: 820px;\n}\n.card-head[_ngcontent-%COMP%]   .page-sub[_ngcontent-%COMP%] {\n  margin-top: var(--space-1);\n  max-width: 52ch;\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SettingsComponent, [{
    type: Component,
    args: [{ selector: "app-settings", imports: [FormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page page--narrow">
  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">Settings</h1>
      <p class="page-sub">
        Credentials for the services StockRoom is provisioned with. Environment variables win;
        anything left unset falls back to the value stored here.
      </p>
    </div>
    <div class="page-actions">
      <a routerLink="/items" class="btn">Back to items</a>
    </div>
  </div>

  @if (unconfigured().length > 0) {
    <p class="alert alert-warn" role="status">
      <span>
        <strong>The following need credentials to activate:</strong>
        @for (group of unconfigured(); track group.service; let last = $last) {
          {{ group.title }}{{ last ? '' : ', ' }}
        }
      </span>
    </p>
  }

  @for (group of groups(); track group.service) {
    <section class="card">
      <div class="card-head">
        <div>
          <h2>{{ group.title }}</h2>
          <p class="page-sub">{{ group.blurb }}</p>
        </div>
        @if (isConfigured(group)) {
          <span class="badge badge-ok">Configured</span>
        } @else {
          <span class="badge badge-low">Needs credentials</span>
        }
      </div>

      <form class="card-body form" (ngSubmit)="save(group)" novalidate>
        @if (savedKey() === group.service) {
          <p class="alert alert-info" role="status">{{ group.title }} credentials saved.</p>
        }

        <div class="form-grid">
          @for (entry of group.entries; track entry.key) {
            <div class="field field--wide">
              <label class="label" [attr.for]="entry.key">
                {{ entry.label }}
                <span class="mono subtle">{{ entry.key }}</span>
              </label>
              <input
                [id]="entry.key"
                [name]="entry.key"
                class="input"
                type="text"
                [placeholder]="entry.configured ? '' : placeholder"
                [ngModel]="draftFor(entry)"
                (ngModelChange)="setDraft(entry.key, $event)"
              />
              <p class="hint">
                @if (entry.configured) {
                  Currently set. Values are masked once stored.
                } @else {
                  Not configured \u2014 the service stays inactive until this is set.
                }
              </p>
            </div>
          }
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Save {{ group.title }}</button>
        </div>
      </form>
    </section>
  }
</div>
`, styles: ["/* src/app/pages/admin/settings/settings.component.css */\n.page--narrow {\n  max-width: 820px;\n}\n.card-head .page-sub {\n  margin-top: var(--space-1);\n  max-width: 52ch;\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SettingsComponent, { className: "SettingsComponent", filePath: "src/app/pages/admin/settings/settings.component.ts", lineNumber: 22 });
})();
export {
  SettingsComponent
};
