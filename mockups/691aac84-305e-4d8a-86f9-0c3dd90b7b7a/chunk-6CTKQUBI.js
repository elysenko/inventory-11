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
  Router,
  RouterLink,
  computed,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VSPK3BNN.js";

// src/app/pages/locations/location-form/location-form.component.ts
function LocationFormComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function LocationFormComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function LocationFormComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 18);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Shown to clerks as \u201C", ctx_r0.name() || "Main", " \xB7 ", ctx_r0.zone() || "Zone A", "\u201D.");
  }
}
var LocationFormComponent = class _LocationFormComponent {
  constructor() {
    this.router = inject(Router);
    this.id = input("");
    this.locations = signal([
      { id: "loc-a", name: "Main", zone: "Zone A", itemCount: 6, totalQty: 412 },
      { id: "loc-b", name: "Main", zone: "Zone B", itemCount: 5, totalQty: 268 },
      { id: "loc-c", name: "Overflow", zone: "Zone C", itemCount: 4, totalQty: 131 }
    ]);
    this.editing = computed(() => this.id() !== "");
    this.existing = computed(() => this.locations().find((row) => row.id === this.id()) ?? null);
    this.name = signal("");
    this.zone = signal("");
    this.nameError = signal(null);
    this.zoneError = signal(null);
    effect(() => {
      const location = this.existing();
      if (!location)
        return;
      this.name.set(location.name);
      this.zone.set(location.zone);
    });
  }
  save() {
    this.nameError.set(null);
    this.zoneError.set(null);
    if (!this.name().trim()) {
      this.nameError.set("A location name is required.");
      return;
    }
    if (!this.zone().trim()) {
      this.zoneError.set("A zone is required.");
      return;
    }
    const clash = this.locations().find((row) => row.id !== this.id() && row.name.toLowerCase() === this.name().trim().toLowerCase() && row.zone.toLowerCase() === this.zone().trim().toLowerCase());
    if (clash) {
      this.zoneError.set(`${clash.name} \xB7 ${clash.zone} already exists. Pick a different zone.`);
      return;
    }
    void this.router.navigate(["/locations"]);
  }
  static {
    this.\u0275fac = function LocationFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocationFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocationFormComponent, selectors: [["app-location-form"]], inputs: { id: [1, "id"] }, decls: 36, vars: 11, consts: [[1, "page", "page--narrow"], [1, "breadcrumb"], ["routerLink", "/locations"], ["aria-hidden", "true"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "page-sub"], [1, "card"], ["novalidate", "", 1, "card-body", "form", 3, "ngSubmit"], [1, "form-grid"], [1, "field"], ["for", "loc-name", 1, "label"], [1, "req"], ["id", "loc-name", "name", "name", "placeholder", "Main", 1, "input", 3, "ngModelChange", "ngModel"], [1, "field-error"], ["for", "loc-zone", 1, "label"], ["id", "loc-zone", "name", "zone", "placeholder", "Zone A", 1, "input", 3, "ngModelChange", "ngModel"], [1, "hint"], [1, "form-actions"], ["type", "submit", 1, "btn", "btn-primary"], ["routerLink", "/locations", 1, "btn"]], template: function LocationFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "p", 1)(2, "a", 2);
        \u0275\u0275text(3, "Locations");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "/");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "h1", 6);
        \u0275\u0275text(10);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 7);
        \u0275\u0275text(12, "A location is a name plus a zone, and the pair must be unique.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(13, "section", 8)(14, "form", 9);
        \u0275\u0275listener("ngSubmit", function LocationFormComponent_Template_form_ngSubmit_14_listener() {
          return ctx.save();
        });
        \u0275\u0275elementStart(15, "div", 10)(16, "div", 11)(17, "label", 12);
        \u0275\u0275text(18, "Location name ");
        \u0275\u0275elementStart(19, "span", 13);
        \u0275\u0275text(20, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "input", 14);
        \u0275\u0275listener("ngModelChange", function LocationFormComponent_Template_input_ngModelChange_21_listener($event) {
          return ctx.name.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(22, LocationFormComponent_Conditional_22_Template, 2, 1, "p", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "div", 11)(24, "label", 16);
        \u0275\u0275text(25, "Zone ");
        \u0275\u0275elementStart(26, "span", 13);
        \u0275\u0275text(27, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "input", 17);
        \u0275\u0275listener("ngModelChange", function LocationFormComponent_Template_input_ngModelChange_28_listener($event) {
          return ctx.zone.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(29, LocationFormComponent_Conditional_29_Template, 2, 1, "p", 15)(30, LocationFormComponent_Conditional_30_Template, 2, 2, "p", 18);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(31, "div", 19)(32, "button", 20);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "a", 21);
        \u0275\u0275text(35, "Cancel");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_4_0;
        let tmp_7_0;
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.editing() ? (tmp_0_0 = ctx.existing()) == null ? null : tmp_0_0.zone : "New location", " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.editing() ? "Edit location" : "New location");
        \u0275\u0275advance(11);
        \u0275\u0275classProp("is-invalid", ctx.nameError() !== null);
        \u0275\u0275property("ngModel", ctx.name());
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_4_0 = ctx.nameError()) ? 22 : -1, tmp_4_0);
        \u0275\u0275advance(6);
        \u0275\u0275classProp("is-invalid", ctx.zoneError() !== null);
        \u0275\u0275property("ngModel", ctx.zone());
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_7_0 = ctx.zoneError()) ? 29 : 30, tmp_7_0);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.editing() ? "Save changes" : "Create location", " ");
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, NgModel, NgForm, RouterLink], styles: ["\n\n.page--narrow[_ngcontent-%COMP%] {\n  max-width: 680px;\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocationFormComponent, [{
    type: Component,
    args: [{ selector: "app-location-form", imports: [FormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page page--narrow">
  <p class="breadcrumb">
    <a routerLink="/locations">Locations</a> <span aria-hidden="true">/</span>
    {{ editing() ? existing()?.zone : 'New location' }}
  </p>

  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">{{ editing() ? 'Edit location' : 'New location' }}</h1>
      <p class="page-sub">A location is a name plus a zone, and the pair must be unique.</p>
    </div>
  </div>

  <section class="card">
    <form class="card-body form" (ngSubmit)="save()" novalidate>
      <div class="form-grid">
        <div class="field">
          <label class="label" for="loc-name">Location name <span class="req">*</span></label>
          <input
            id="loc-name"
            name="name"
            class="input"
            [class.is-invalid]="nameError() !== null"
            placeholder="Main"
            [ngModel]="name()"
            (ngModelChange)="name.set($event)"
          />
          @if (nameError(); as message) {
            <p class="field-error">{{ message }}</p>
          }
        </div>

        <div class="field">
          <label class="label" for="loc-zone">Zone <span class="req">*</span></label>
          <input
            id="loc-zone"
            name="zone"
            class="input"
            [class.is-invalid]="zoneError() !== null"
            placeholder="Zone A"
            [ngModel]="zone()"
            (ngModelChange)="zone.set($event)"
          />
          @if (zoneError(); as message) {
            <p class="field-error">{{ message }}</p>
          } @else {
            <p class="hint">Shown to clerks as \u201C{{ name() || 'Main' }} \xB7 {{ zone() || 'Zone A' }}\u201D.</p>
          }
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">
          {{ editing() ? 'Save changes' : 'Create location' }}
        </button>
        <a class="btn" routerLink="/locations">Cancel</a>
      </div>
    </form>
  </section>
</div>
`, styles: ["/* src/app/pages/locations/location-form/location-form.component.css */\n.page--narrow {\n  max-width: 680px;\n}\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocationFormComponent, { className: "LocationFormComponent", filePath: "src/app/pages/locations/location-form/location-form.component.ts", lineNumber: 13 });
})();
export {
  LocationFormComponent
};
