import {
  readOneOf,
  readText
} from "./chunk-7TOKWH2F.js";
import {
  toSignal
} from "./chunk-NZ4XK36V.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MinValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  NumberValueAccessor,
  SelectControlValueAccessor,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-KK6EC5LB.js";
import {
  ActivatedRoute,
  ChangeDetectionStrategy,
  Component,
  Router,
  RouterLink,
  computed,
  effect,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
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
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VSPK3BNN.js";

// src/app/pages/movements/movement-form/movement-form.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function MovementFormComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 10);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function MovementFormComponent_For_21_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Receipt into a location ");
  }
}
function MovementFormComponent_For_21_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Issue out of a location ");
  }
}
function MovementFormComponent_For_21_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Move between two locations ");
  }
}
function MovementFormComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "label", 31)(1, "input", 32);
    \u0275\u0275listener("change", function MovementFormComponent_For_21_Template_input_change_1_listener() {
      const option_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.setType(option_r2));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 33);
    \u0275\u0275template(5, MovementFormComponent_For_21_Case_5_Template, 1, 0)(6, MovementFormComponent_For_21_Case_6_Template, 1, 0)(7, MovementFormComponent_For_21_Case_7_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const option_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("is-selected", ctx_r2.type() === option_r2);
    \u0275\u0275advance();
    \u0275\u0275property("value", option_r2)("checked", ctx_r2.type() === option_r2);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("badge badge-", option_r2, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_15_0 = option_r2) === "IN" ? 5 : tmp_15_0 === "OUT" ? 6 : 7);
  }
}
function MovementFormComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275property("value", item_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", item_r4.sku, " \u2014 ", item_r4.name, "");
  }
}
function MovementFormComponent_Conditional_33_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const location_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", location_r6.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.locationLabel(location_r6));
  }
}
function MovementFormComponent_Conditional_33_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", ctx, " ", (tmp_3_0 = ctx_r2.selectedItem()) == null ? null : tmp_3_0.unit, " currently held there.");
  }
}
function MovementFormComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "label", 34);
    \u0275\u0275text(2, "From location ");
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 35);
    \u0275\u0275listener("ngModelChange", function MovementFormComponent_Conditional_33_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.fromLocId.set($event));
    });
    \u0275\u0275elementStart(6, "option", 20);
    \u0275\u0275text(7, "Select a location\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, MovementFormComponent_Conditional_33_For_9_Template, 2, 2, "option", 21, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(10, MovementFormComponent_Conditional_33_Conditional_10_Template, 2, 2, "p", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_3_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r2.fromLocId());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.locations());
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_3_0 = ctx_r2.sourceBalance()) ? 10 : -1, tmp_3_0);
  }
}
function MovementFormComponent_Conditional_34_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const location_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", location_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.locationLabel(location_r8));
  }
}
function MovementFormComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "label", 36);
    \u0275\u0275text(2, "To location ");
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "select", 37);
    \u0275\u0275listener("ngModelChange", function MovementFormComponent_Conditional_34_Template_select_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toLocId.set($event));
    });
    \u0275\u0275elementStart(6, "option", 20);
    \u0275\u0275text(7, "Select a location\u2026");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(8, MovementFormComponent_Conditional_34_For_9_Template, 2, 2, "option", 21, _forTrack0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngModel", ctx_r2.toLocId());
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.locations());
  }
}
var TYPES = ["IN", "OUT", "TRANSFER"];
var MovementFormComponent = class _MovementFormComponent {
  constructor() {
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.typeOptions = TYPES;
    this.items = signal([
      { id: "itm-001", sku: "SKU-001", name: "Galvanised shelf bracket", description: null, unit: "ea", reorderAt: 40, totalQty: 128 },
      { id: "itm-002", sku: "SKU-002", name: "M8 hex bolt, 100 pack", description: null, unit: "box", reorderAt: 25, totalQty: 18 },
      { id: "itm-003", sku: "SKU-003", name: "Stretch wrap film 500mm", description: null, unit: "roll", reorderAt: 30, totalQty: 96 },
      { id: "itm-005", sku: "SKU-005", name: "Thermal label 4\xD76, 1000 pack", description: null, unit: "box", reorderAt: 20, totalQty: 20 },
      { id: "itm-008", sku: "SKU-008", name: "Forklift hydraulic oil 20L", description: null, unit: "drum", reorderAt: 8, totalQty: 3 }
    ]);
    this.locations = signal([
      { id: "loc-a", name: "Main", zone: "Zone A", itemCount: 6, totalQty: 412 },
      { id: "loc-b", name: "Main", zone: "Zone B", itemCount: 5, totalQty: 268 },
      { id: "loc-c", name: "Overflow", zone: "Zone C", itemCount: 4, totalQty: 131 },
      { id: "loc-d", name: "Goods in", zone: "Dock 1", itemCount: 2, totalQty: 34 }
    ]);
    this.balances = signal({
      "itm-001|loc-a": 64,
      "itm-001|loc-b": 40,
      "itm-001|loc-c": 24,
      "itm-002|loc-a": 12,
      "itm-002|loc-b": 6,
      "itm-002|loc-c": 0,
      "itm-003|loc-a": 48,
      "itm-003|loc-b": 48,
      "itm-005|loc-a": 20,
      "itm-008|loc-a": 3
    });
    this.params = toSignal(this.route.queryParamMap, {
      initialValue: this.route.snapshot.queryParamMap
    });
    this.type = signal("IN");
    this.itemId = signal("");
    this.fromLocId = signal("");
    this.toLocId = signal("");
    this.qty = signal(1);
    this.note = signal("");
    this.formError = signal(null);
    this.selectedItem = computed(() => this.items().find((item) => item.id === this.itemId()) ?? null);
    this.needsFrom = computed(() => this.type() === "OUT" || this.type() === "TRANSFER");
    this.needsTo = computed(() => this.type() === "IN" || this.type() === "TRANSFER");
    this.sourceBalance = computed(() => {
      if (!this.needsFrom() || !this.itemId() || !this.fromLocId())
        return null;
      return this.balances()[`${this.itemId()}|${this.fromLocId()}`] ?? 0;
    });
    effect(() => {
      const map = this.params();
      this.type.set(readOneOf(map.get("type"), TYPES, "IN"));
      const prefilled = readText(map.get("itemId"));
      this.itemId.set(prefilled || (this.items()[0]?.id ?? ""));
    });
  }
  locationLabel(location) {
    return `${location.name} \xB7 ${location.zone}`;
  }
  setType(value) {
    this.type.set(readOneOf(value, TYPES, "IN"));
    this.formError.set(null);
    if (!this.needsFrom())
      this.fromLocId.set("");
    if (!this.needsTo())
      this.toLocId.set("");
  }
  submit() {
    this.formError.set(null);
    if (!this.itemId()) {
      this.formError.set("Choose the item being moved.");
      return;
    }
    if (this.qty() < 1 || !Number.isInteger(this.qty())) {
      this.formError.set("Quantity must be a whole number of at least 1.");
      return;
    }
    if (this.needsFrom() && !this.fromLocId()) {
      this.formError.set("Choose the location the stock is leaving.");
      return;
    }
    if (this.needsTo() && !this.toLocId()) {
      this.formError.set("Choose the location the stock is arriving at.");
      return;
    }
    if (this.type() === "TRANSFER" && this.fromLocId() === this.toLocId()) {
      this.formError.set("A transfer needs two different locations.");
      return;
    }
    const available = this.sourceBalance();
    if (available !== null && this.qty() > available) {
      this.formError.set(`Insufficient stock \u2014 only ${available} ${this.selectedItem()?.unit ?? "units"} of ${this.selectedItem()?.sku} are held at that location. Nothing was recorded.`);
      return;
    }
    void this.router.navigate(["/items", this.itemId()], { queryParams: { tab: "history" } });
  }
  static {
    this.\u0275fac = function MovementFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MovementFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MovementFormComponent, selectors: [["app-movement-form"]], decls: 52, vars: 7, consts: [[1, "page", "page--narrow"], [1, "breadcrumb"], ["routerLink", "/items"], ["aria-hidden", "true"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "page-sub"], [1, "card"], ["novalidate", "", 1, "card-body", "form", 3, "ngSubmit"], ["role", "alert", 1, "alert", "alert-danger"], [1, "typepick"], [1, "label"], [1, "typepick__options"], [1, "typeopt", 3, "is-selected"], [1, "form-grid"], [1, "field", "field--wide"], ["for", "item", 1, "label"], [1, "req"], ["id", "item", "name", "item", 1, "select", 3, "ngModelChange", "ngModel"], ["value", ""], [3, "value"], [1, "field"], ["for", "qty", 1, "label"], ["id", "qty", "name", "qty", "type", "number", "min", "1", "step", "1", 1, "input", 3, "ngModelChange", "ngModel"], [1, "hint"], ["for", "note", 1, "label"], ["id", "note", "name", "note", "placeholder", "Purchase order, works order or reason", 1, "input", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "submit", 1, "btn", "btn-primary"], ["routerLink", "/items", 1, "btn"], [1, "typeopt"], ["type", "radio", "name", "type", 3, "change", "value", "checked"], [1, "typeopt__hint"], ["for", "from", 1, "label"], ["id", "from", "name", "from", 1, "select", 3, "ngModelChange", "ngModel"], ["for", "to", 1, "label"], ["id", "to", "name", "to", 1, "select", 3, "ngModelChange", "ngModel"]], template: function MovementFormComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "p", 1)(2, "a", 2);
        \u0275\u0275text(3, "Items");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "/");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6, " Record movement");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "h1", 6);
        \u0275\u0275text(10, "Record movement");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 7);
        \u0275\u0275text(12, " Movements are permanent. Balances are applied atomically, so a movement either lands completely or not at all. ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(13, "section", 8)(14, "form", 9);
        \u0275\u0275listener("ngSubmit", function MovementFormComponent_Template_form_ngSubmit_14_listener() {
          return ctx.submit();
        });
        \u0275\u0275template(15, MovementFormComponent_Conditional_15_Template, 2, 1, "p", 10);
        \u0275\u0275elementStart(16, "fieldset", 11)(17, "legend", 12);
        \u0275\u0275text(18, "Movement type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "div", 13);
        \u0275\u0275repeaterCreate(20, MovementFormComponent_For_21_Template, 8, 9, "label", 14, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "div", 15)(23, "div", 16)(24, "label", 17);
        \u0275\u0275text(25, "Item ");
        \u0275\u0275elementStart(26, "span", 18);
        \u0275\u0275text(27, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "select", 19);
        \u0275\u0275listener("ngModelChange", function MovementFormComponent_Template_select_ngModelChange_28_listener($event) {
          return ctx.itemId.set($event);
        });
        \u0275\u0275elementStart(29, "option", 20);
        \u0275\u0275text(30, "Select an item\u2026");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(31, MovementFormComponent_For_32_Template, 2, 3, "option", 21, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(33, MovementFormComponent_Conditional_33_Template, 11, 2, "div", 22)(34, MovementFormComponent_Conditional_34_Template, 10, 1, "div", 22);
        \u0275\u0275elementStart(35, "div", 22)(36, "label", 23);
        \u0275\u0275text(37, "Quantity ");
        \u0275\u0275elementStart(38, "span", 18);
        \u0275\u0275text(39, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "input", 24);
        \u0275\u0275listener("ngModelChange", function MovementFormComponent_Template_input_ngModelChange_40_listener($event) {
          return ctx.qty.set(+$event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "p", 25);
        \u0275\u0275text(42);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "div", 16)(44, "label", 26);
        \u0275\u0275text(45, "Note");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(46, "input", 27);
        \u0275\u0275listener("ngModelChange", function MovementFormComponent_Template_input_ngModelChange_46_listener($event) {
          return ctx.note.set($event);
        });
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(47, "div", 28)(48, "button", 29);
        \u0275\u0275text(49, "Record movement");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(50, "a", 30);
        \u0275\u0275text(51, "Cancel");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_7_0;
        \u0275\u0275advance(15);
        \u0275\u0275conditional((tmp_0_0 = ctx.formError()) ? 15 : -1, tmp_0_0);
        \u0275\u0275advance(5);
        \u0275\u0275repeater(ctx.typeOptions);
        \u0275\u0275advance(8);
        \u0275\u0275property("ngModel", ctx.itemId());
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.items());
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.needsFrom() ? 33 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.needsTo() ? 34 : -1);
        \u0275\u0275advance(6);
        \u0275\u0275property("ngModel", ctx.qty());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("Whole ", (tmp_7_0 = (tmp_7_0 = ctx.selectedItem()) == null ? null : tmp_7_0.unit) !== null && tmp_7_0 !== void 0 ? tmp_7_0 : "units", ", at least 1.");
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.note());
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, NgModel, NgForm, RouterLink], styles: ["\n\n.page--narrow[_ngcontent-%COMP%] {\n  max-width: 760px;\n}\n.typepick[_ngcontent-%COMP%] {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n.typepick[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  padding: 0 0 var(--space-2);\n}\n.typepick__options[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: var(--space-2);\n}\n.typeopt[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  min-height: 68px;\n  padding: var(--space-3);\n  border: 1px solid var(--color-border-strong);\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  background: var(--color-surface);\n}\n.typeopt[_ngcontent-%COMP%]:active {\n  background: var(--color-surface-sunken);\n}\n.typeopt.is-selected[_ngcontent-%COMP%] {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 2px var(--color-primary-soft);\n}\n.typeopt[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n.typeopt[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {\n  align-self: flex-start;\n}\n.typeopt__hint[_ngcontent-%COMP%] {\n  font-size: var(--text-sm);\n  color: var(--color-ink-muted);\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MovementFormComponent, [{
    type: Component,
    args: [{ selector: "app-movement-form", imports: [FormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page page--narrow">
  <p class="breadcrumb"><a routerLink="/items">Items</a> <span aria-hidden="true">/</span> Record movement</p>

  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">Record movement</h1>
      <p class="page-sub">
        Movements are permanent. Balances are applied atomically, so a movement either lands
        completely or not at all.
      </p>
    </div>
  </div>

  <section class="card">
    <form class="card-body form" (ngSubmit)="submit()" novalidate>
      @if (formError(); as message) {
        <p class="alert alert-danger" role="alert">{{ message }}</p>
      }

      <fieldset class="typepick">
        <legend class="label">Movement type</legend>
        <div class="typepick__options">
          @for (option of typeOptions; track option) {
            <label class="typeopt" [class.is-selected]="type() === option">
              <input
                type="radio"
                name="type"
                [value]="option"
                [checked]="type() === option"
                (change)="setType(option)"
              />
              <span class="badge badge-{{ option }}">{{ option }}</span>
              <span class="typeopt__hint">
                @switch (option) {
                  @case ('IN') { Receipt into a location }
                  @case ('OUT') { Issue out of a location }
                  @default { Move between two locations }
                }
              </span>
            </label>
          }
        </div>
      </fieldset>

      <div class="form-grid">
        <div class="field field--wide">
          <label class="label" for="item">Item <span class="req">*</span></label>
          <select id="item" name="item" class="select" [ngModel]="itemId()" (ngModelChange)="itemId.set($event)">
            <option value="">Select an item\u2026</option>
            @for (item of items(); track item.id) {
              <option [value]="item.id">{{ item.sku }} \u2014 {{ item.name }}</option>
            }
          </select>
        </div>

        @if (needsFrom()) {
          <div class="field">
            <label class="label" for="from">From location <span class="req">*</span></label>
            <select id="from" name="from" class="select" [ngModel]="fromLocId()" (ngModelChange)="fromLocId.set($event)">
              <option value="">Select a location\u2026</option>
              @for (location of locations(); track location.id) {
                <option [value]="location.id">{{ locationLabel(location) }}</option>
              }
            </select>
            @if (sourceBalance(); as available) {
              <p class="hint">{{ available }} {{ selectedItem()?.unit }} currently held there.</p>
            }
          </div>
        }

        @if (needsTo()) {
          <div class="field">
            <label class="label" for="to">To location <span class="req">*</span></label>
            <select id="to" name="to" class="select" [ngModel]="toLocId()" (ngModelChange)="toLocId.set($event)">
              <option value="">Select a location\u2026</option>
              @for (location of locations(); track location.id) {
                <option [value]="location.id">{{ locationLabel(location) }}</option>
              }
            </select>
          </div>
        }

        <div class="field">
          <label class="label" for="qty">Quantity <span class="req">*</span></label>
          <input
            id="qty"
            name="qty"
            type="number"
            min="1"
            step="1"
            class="input"
            [ngModel]="qty()"
            (ngModelChange)="qty.set(+$event)"
          />
          <p class="hint">Whole {{ selectedItem()?.unit ?? 'units' }}, at least 1.</p>
        </div>

        <div class="field field--wide">
          <label class="label" for="note">Note</label>
          <input
            id="note"
            name="note"
            class="input"
            placeholder="Purchase order, works order or reason"
            [ngModel]="note()"
            (ngModelChange)="note.set($event)"
          />
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">Record movement</button>
        <a class="btn" routerLink="/items">Cancel</a>
      </div>
    </form>
  </section>
</div>
`, styles: ["/* src/app/pages/movements/movement-form/movement-form.component.css */\n.page--narrow {\n  max-width: 760px;\n}\n.typepick {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n.typepick legend {\n  padding: 0 0 var(--space-2);\n}\n.typepick__options {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));\n  gap: var(--space-2);\n}\n.typeopt {\n  display: flex;\n  flex-direction: column;\n  gap: var(--space-1);\n  min-height: 68px;\n  padding: var(--space-3);\n  border: 1px solid var(--color-border-strong);\n  border-radius: var(--radius-md);\n  cursor: pointer;\n  background: var(--color-surface);\n}\n.typeopt:active {\n  background: var(--color-surface-sunken);\n}\n.typeopt.is-selected {\n  border-color: var(--color-primary);\n  box-shadow: 0 0 0 2px var(--color-primary-soft);\n}\n.typeopt input {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none;\n}\n.typeopt .badge {\n  align-self: flex-start;\n}\n.typeopt__hint {\n  font-size: var(--text-sm);\n  color: var(--color-ink-muted);\n}\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MovementFormComponent, { className: "MovementFormComponent", filePath: "src/app/pages/movements/movement-form/movement-form.component.ts", lineNumber: 17 });
})();
export {
  MovementFormComponent
};
