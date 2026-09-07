import {
  formatDateTime,
  mergeQueryParams,
  readNumber,
  readText
} from "./chunk-7TOKWH2F.js";
import {
  toSignal
} from "./chunk-NZ4XK36V.js";
import {
  ActivatedRoute,
  ChangeDetectionStrategy,
  Component,
  Router,
  RouterLink,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
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

// src/app/pages/movements/movement-log/movement-log.component.ts
var _c0 = (a0) => ["/items", a0];
var _forTrack0 = ($index, $item) => $item.id;
function MovementLogComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("value", item_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("", item_r1.sku, " \u2014 ", item_r1.name, "");
  }
}
function MovementLogComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 13);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r2 = ctx.$implicit;
    \u0275\u0275property("value", option_r2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r2);
  }
}
function MovementLogComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "span", 25);
    \u0275\u0275text(2, "\u2261");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 26);
    \u0275\u0275text(4, "No movements match these filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Widen the date range, or clear the item and type filters.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 27);
    \u0275\u0275listener("click", function MovementLogComponent_Conditional_41_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.clearFilters());
    });
    \u0275\u0275text(8, "Clear filters");
    \u0275\u0275elementEnd()();
  }
}
function MovementLogComponent_Conditional_42_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 36);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 37)(4, "a", 38);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 39);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td", 40)(9, "span");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "td", 41);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 42);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 43);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 44);
    \u0275\u0275text(18);
    \u0275\u0275elementStart(19, "span", 39);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_18_0;
    let tmp_19_0;
    const movement_r6 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.formatDateTime(movement_r6.createdAt));
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(13, _c0, movement_r6.itemId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(movement_r6.itemSku);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(movement_r6.itemName);
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("badge badge-", movement_r6.type, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(movement_r6.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(movement_r6.qty);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_18_0 = movement_r6.fromLocName) !== null && tmp_18_0 !== void 0 ? tmp_18_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((tmp_19_0 = movement_r6.toLocName) !== null && tmp_19_0 !== void 0 ? tmp_19_0 : "\u2014");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", movement_r6.userEmail, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(movement_r6.note);
  }
}
function MovementLogComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "table", 29)(2, "thead")(3, "tr")(4, "th", 30);
    \u0275\u0275text(5, "When");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 30);
    \u0275\u0275text(7, "Item");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 30);
    \u0275\u0275text(9, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 31);
    \u0275\u0275text(11, "Qty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 30);
    \u0275\u0275text(13, "From");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 30);
    \u0275\u0275text(15, "To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 30);
    \u0275\u0275text(17, "Recorded by");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, MovementLogComponent_Conditional_42_For_20_Template, 21, 15, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 32)(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 33)(25, "button", 34);
    \u0275\u0275listener("click", function MovementLogComponent_Conditional_42_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToPage(ctx_r3.currentPage() - 1));
    });
    \u0275\u0275text(26, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 35);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "button", 34);
    \u0275\u0275listener("click", function MovementLogComponent_Conditional_42_Template_button_click_29_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToPage(ctx_r3.currentPage() + 1));
    });
    \u0275\u0275text(30, " Next ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r3.rows());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r3.filtered().length, " movements match");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.currentPage() <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Page ", ctx_r3.currentPage(), " of ", ctx_r3.pageCount(), "");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.currentPage() >= ctx_r3.pageCount());
  }
}
var PAGE_SIZE = 8;
var TYPES = ["IN", "OUT", "TRANSFER"];
var MovementLogComponent = class _MovementLogComponent {
  constructor() {
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.typeOptions = TYPES;
    this.formatDateTime = formatDateTime;
    this.items = signal([
      { id: "itm-001", sku: "SKU-001", name: "Galvanised shelf bracket", description: null, unit: "ea", reorderAt: 40, totalQty: 128 },
      { id: "itm-002", sku: "SKU-002", name: "M8 hex bolt, 100 pack", description: null, unit: "box", reorderAt: 25, totalQty: 18 },
      { id: "itm-003", sku: "SKU-003", name: "Stretch wrap film 500mm", description: null, unit: "roll", reorderAt: 30, totalQty: 96 },
      { id: "itm-008", sku: "SKU-008", name: "Forklift hydraulic oil 20L", description: null, unit: "drum", reorderAt: 8, totalQty: 3 }
    ]);
    this.movements = signal([
      { id: "mv-201", type: "OUT", itemId: "itm-008", itemSku: "SKU-008", itemName: "Forklift hydraulic oil 20L", fromLocName: "Main \xB7 Zone A", toLocName: null, qty: 2, note: "Truck 3 service", userEmail: "tomas.berg@stockroom.example", createdAt: "2026-09-06T16:41:00Z" },
      { id: "mv-104", type: "IN", itemId: "itm-001", itemSku: "SKU-001", itemName: "Galvanised shelf bracket", fromLocName: null, toLocName: "Main \xB7 Zone B", qty: 56, note: "PO-4488 delivery", userEmail: "priya.nandi@stockroom.example", createdAt: "2026-09-06T15:20:00Z" },
      { id: "mv-103", type: "OUT", itemId: "itm-001", itemSku: "SKU-001", itemName: "Galvanised shelf bracket", fromLocName: "Main \xB7 Zone B", toLocName: null, qty: 16, note: "Works order WO-882", userEmail: "tomas.berg@stockroom.example", createdAt: "2026-09-06T09:47:00Z" },
      { id: "mv-202", type: "TRANSFER", itemId: "itm-003", itemSku: "SKU-003", itemName: "Stretch wrap film 500mm", fromLocName: "Overflow \xB7 Zone C", toLocName: "Main \xB7 Zone A", qty: 24, note: "Pick face top-up", userEmail: "dana.whitfield@stockroom.example", createdAt: "2026-09-05T17:05:00Z" },
      { id: "mv-102", type: "TRANSFER", itemId: "itm-001", itemSku: "SKU-001", itemName: "Galvanised shelf bracket", fromLocName: "Main \xB7 Zone A", toLocName: "Overflow \xB7 Zone C", qty: 24, note: "Rebalancing pick face", userEmail: "dana.whitfield@stockroom.example", createdAt: "2026-09-05T13:02:00Z" },
      { id: "mv-203", type: "OUT", itemId: "itm-002", itemSku: "SKU-002", itemName: "M8 hex bolt, 100 pack", fromLocName: "Main \xB7 Zone A", toLocName: null, qty: 9, note: "Line 2 replenishment", userEmail: "tomas.berg@stockroom.example", createdAt: "2026-09-05T10:26:00Z" },
      { id: "mv-101", type: "IN", itemId: "itm-001", itemSku: "SKU-001", itemName: "Galvanised shelf bracket", fromLocName: null, toLocName: "Main \xB7 Zone A", qty: 80, note: "PO-4471 delivery", userEmail: "priya.nandi@stockroom.example", createdAt: "2026-09-05T08:14:00Z" },
      { id: "mv-204", type: "IN", itemId: "itm-003", itemSku: "SKU-003", itemName: "Stretch wrap film 500mm", fromLocName: null, toLocName: "Overflow \xB7 Zone C", qty: 60, note: "PO-4460 delivery", userEmail: "priya.nandi@stockroom.example", createdAt: "2026-09-04T14:33:00Z" },
      { id: "mv-205", type: "OUT", itemId: "itm-002", itemSku: "SKU-002", itemName: "M8 hex bolt, 100 pack", fromLocName: "Main \xB7 Zone B", toLocName: null, qty: 4, note: "Maintenance stores", userEmail: "dana.whitfield@stockroom.example", createdAt: "2026-09-04T09:12:00Z" },
      { id: "mv-206", type: "IN", itemId: "itm-008", itemSku: "SKU-008", itemName: "Forklift hydraulic oil 20L", fromLocName: null, toLocName: "Main \xB7 Zone A", qty: 5, note: "PO-4402 delivery", userEmail: "priya.nandi@stockroom.example", createdAt: "2026-09-03T11:58:00Z" }
    ]);
    this.params = toSignal(this.route.queryParamMap, {
      initialValue: this.route.snapshot.queryParamMap
    });
    this.itemFilter = computed(() => readText(this.params().get("itemId")));
    this.typeFilter = computed(() => readText(this.params().get("type")));
    this.from = computed(() => readText(this.params().get("from")));
    this.to = computed(() => readText(this.params().get("to")));
    this.page = computed(() => readNumber(this.params().get("page"), 1));
    this.hasFilters = computed(() => !!(this.itemFilter() || this.typeFilter() || this.from() || this.to()));
    this.filtered = computed(() => this.movements().filter((movement) => {
      if (this.itemFilter() && movement.itemId !== this.itemFilter())
        return false;
      if (this.typeFilter() && movement.type !== this.typeFilter())
        return false;
      const day = movement.createdAt.slice(0, 10);
      if (this.from() && day < this.from())
        return false;
      if (this.to() && day > this.to())
        return false;
      return true;
    }));
    this.pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));
    this.currentPage = computed(() => Math.min(this.page(), this.pageCount()));
    this.rows = computed(() => {
      const start = (this.currentPage() - 1) * PAGE_SIZE;
      return this.filtered().slice(start, start + PAGE_SIZE);
    });
  }
  setFilter(key, value) {
    mergeQueryParams(this.router, { [key]: value.trim(), page: null });
  }
  clearFilters() {
    mergeQueryParams(this.router, { itemId: null, type: null, from: null, to: null, page: null });
  }
  goToPage(page) {
    mergeQueryParams(this.router, { page: page <= 1 ? null : page });
  }
  static {
    this.\u0275fac = function MovementLogComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _MovementLogComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MovementLogComponent, selectors: [["app-movement-log"]], decls: 45, vars: 6, consts: [[1, "page"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "page-sub"], [1, "page-actions"], ["routerLink", "/reports/low-stock", 1, "btn"], ["routerLink", "/movements/new", 1, "btn", "btn-primary"], [1, "filters"], [1, "field"], ["for", "f-item", 1, "label"], ["id", "f-item", 1, "select", 3, "change", "value"], ["value", ""], [3, "value"], ["for", "f-type", 1, "label"], ["id", "f-type", 1, "select", 3, "change", "value"], ["for", "f-from", 1, "label"], ["id", "f-from", "type", "date", 1, "input", 3, "change", "value"], ["for", "f-to", 1, "label"], ["id", "f-to", "type", "date", 1, "input", 3, "change", "value"], [1, "filters__actions"], ["type", "button", 1, "btn", 3, "click", "disabled"], [1, "card"], [1, "empty"], ["routerLink", "/movements/new", 1, "fab"], ["aria-hidden", "true", 1, "empty__icon"], [1, "empty__title"], ["type", "button", 1, "btn", 3, "click"], [1, "table-wrap"], [1, "table", "table--stack"], ["scope", "col"], ["scope", "col", 1, "num"], [1, "pager"], [1, "pager__controls"], ["type", "button", 1, "btn", "btn-sm", 3, "click", "disabled"], [1, "pager__page"], ["data-label", "When", 1, "nowrap"], ["data-label", "Item", 1, "cell-primary"], [3, "routerLink"], [1, "cell-note"], ["data-label", "Type"], ["data-label", "Qty", 1, "num"], ["data-label", "From"], ["data-label", "To"], ["data-label", "Recorded by", 1, "small"]], template: function MovementLogComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, "Movement log");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, " Every recorded movement, newest first. Movements are immutable \u2014 corrections are booked as a new movement. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "a", 6);
        \u0275\u0275text(9, "Low stock report");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "a", 7);
        \u0275\u0275text(11, "\uFF0B Record movement");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "div", 8)(13, "div", 9)(14, "label", 10);
        \u0275\u0275text(15, "Item");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "select", 11);
        \u0275\u0275listener("change", function MovementLogComponent_Template_select_change_16_listener($event) {
          return ctx.setFilter("itemId", $event.target.value);
        });
        \u0275\u0275elementStart(17, "option", 12);
        \u0275\u0275text(18, "All items");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(19, MovementLogComponent_For_20_Template, 2, 3, "option", 13, _forTrack0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "div", 9)(22, "label", 14);
        \u0275\u0275text(23, "Type");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "select", 15);
        \u0275\u0275listener("change", function MovementLogComponent_Template_select_change_24_listener($event) {
          return ctx.setFilter("type", $event.target.value);
        });
        \u0275\u0275elementStart(25, "option", 12);
        \u0275\u0275text(26, "All types");
        \u0275\u0275elementEnd();
        \u0275\u0275repeaterCreate(27, MovementLogComponent_For_28_Template, 2, 2, "option", 13, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 9)(30, "label", 16);
        \u0275\u0275text(31, "From date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "input", 17);
        \u0275\u0275listener("change", function MovementLogComponent_Template_input_change_32_listener($event) {
          return ctx.setFilter("from", $event.target.value);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "div", 9)(34, "label", 18);
        \u0275\u0275text(35, "To date");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "input", 19);
        \u0275\u0275listener("change", function MovementLogComponent_Template_input_change_36_listener($event) {
          return ctx.setFilter("to", $event.target.value);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 20)(38, "button", 21);
        \u0275\u0275listener("click", function MovementLogComponent_Template_button_click_38_listener() {
          return ctx.clearFilters();
        });
        \u0275\u0275text(39, "Clear");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(40, "section", 22);
        \u0275\u0275template(41, MovementLogComponent_Conditional_41_Template, 9, 0, "div", 23)(42, MovementLogComponent_Conditional_42_Template, 31, 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "a", 24);
        \u0275\u0275text(44, "\uFF0B Record movement");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(16);
        \u0275\u0275property("value", ctx.itemFilter());
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.items());
        \u0275\u0275advance(5);
        \u0275\u0275property("value", ctx.typeFilter());
        \u0275\u0275advance(3);
        \u0275\u0275repeater(ctx.typeOptions);
        \u0275\u0275advance(5);
        \u0275\u0275property("value", ctx.from());
        \u0275\u0275advance(4);
        \u0275\u0275property("value", ctx.to());
        \u0275\u0275advance(2);
        \u0275\u0275property("disabled", !ctx.hasFilters());
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.rows().length === 0 ? 41 : 42);
      }
    }, dependencies: [RouterLink], styles: ["\n\n.cell-primary[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.cell-note[_ngcontent-%COMP%] {\n  display: block;\n  font-size: var(--text-sm);\n  color: var(--color-ink-subtle);\n  font-weight: 400;\n}\n.pager__page[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0 var(--space-2);\n}\n@media (max-width: 768px) {\n  .cell-note[_ngcontent-%COMP%] {\n    text-align: right;\n  }\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MovementLogComponent, [{
    type: Component,
    args: [{ selector: "app-movement-log", imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page">
  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">Movement log</h1>
      <p class="page-sub">
        Every recorded movement, newest first. Movements are immutable \u2014 corrections are booked
        as a new movement.
      </p>
    </div>
    <div class="page-actions">
      <a routerLink="/reports/low-stock" class="btn">Low stock report</a>
      <a routerLink="/movements/new" class="btn btn-primary">\uFF0B Record movement</a>
    </div>
  </div>

  <div class="filters">
    <div class="field">
      <label class="label" for="f-item">Item</label>
      <select id="f-item" class="select" [value]="itemFilter()" (change)="setFilter('itemId', $any($event.target).value)">
        <option value="">All items</option>
        @for (item of items(); track item.id) {
          <option [value]="item.id">{{ item.sku }} \u2014 {{ item.name }}</option>
        }
      </select>
    </div>

    <div class="field">
      <label class="label" for="f-type">Type</label>
      <select id="f-type" class="select" [value]="typeFilter()" (change)="setFilter('type', $any($event.target).value)">
        <option value="">All types</option>
        @for (option of typeOptions; track option) {
          <option [value]="option">{{ option }}</option>
        }
      </select>
    </div>

    <div class="field">
      <label class="label" for="f-from">From date</label>
      <input id="f-from" type="date" class="input" [value]="from()" (change)="setFilter('from', $any($event.target).value)" />
    </div>

    <div class="field">
      <label class="label" for="f-to">To date</label>
      <input id="f-to" type="date" class="input" [value]="to()" (change)="setFilter('to', $any($event.target).value)" />
    </div>

    <div class="filters__actions">
      <button type="button" class="btn" [disabled]="!hasFilters()" (click)="clearFilters()">Clear</button>
    </div>
  </div>

  <section class="card">
    @if (rows().length === 0) {
      <div class="empty">
        <span class="empty__icon" aria-hidden="true">\u2261</span>
        <p class="empty__title">No movements match these filters</p>
        <p>Widen the date range, or clear the item and type filters.</p>
        <button type="button" class="btn" (click)="clearFilters()">Clear filters</button>
      </div>
    } @else {
      <div class="table-wrap">
        <table class="table table--stack">
          <thead>
            <tr>
              <th scope="col">When</th>
              <th scope="col">Item</th>
              <th scope="col">Type</th>
              <th scope="col" class="num">Qty</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
              <th scope="col">Recorded by</th>
            </tr>
          </thead>
          <tbody>
            @for (movement of rows(); track movement.id) {
              <tr>
                <td data-label="When" class="nowrap">{{ formatDateTime(movement.createdAt) }}</td>
                <td data-label="Item" class="cell-primary">
                  <a [routerLink]="['/items', movement.itemId]">{{ movement.itemSku }}</a>
                  <span class="cell-note">{{ movement.itemName }}</span>
                </td>
                <td data-label="Type"><span class="badge badge-{{ movement.type }}">{{ movement.type }}</span></td>
                <td data-label="Qty" class="num">{{ movement.qty }}</td>
                <td data-label="From">{{ movement.fromLocName ?? '\u2014' }}</td>
                <td data-label="To">{{ movement.toLocName ?? '\u2014' }}</td>
                <td data-label="Recorded by" class="small">
                  {{ movement.userEmail }}
                  <span class="cell-note">{{ movement.note }}</span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="pager">
        <span>{{ filtered().length }} movements match</span>
        <div class="pager__controls">
          <button type="button" class="btn btn-sm" [disabled]="currentPage() <= 1" (click)="goToPage(currentPage() - 1)">
            Previous
          </button>
          <span class="pager__page">Page {{ currentPage() }} of {{ pageCount() }}</span>
          <button type="button" class="btn btn-sm" [disabled]="currentPage() >= pageCount()" (click)="goToPage(currentPage() + 1)">
            Next
          </button>
        </div>
      </div>
    }
  </section>

  <a routerLink="/movements/new" class="fab">\uFF0B Record movement</a>
</div>
`, styles: ["/* src/app/pages/movements/movement-log/movement-log.component.css */\n.cell-primary {\n  font-weight: 600;\n}\n.cell-note {\n  display: block;\n  font-size: var(--text-sm);\n  color: var(--color-ink-subtle);\n  font-weight: 400;\n}\n.pager__page {\n  display: inline-flex;\n  align-items: center;\n  padding: 0 var(--space-2);\n}\n@media (max-width: 768px) {\n  .cell-note {\n    text-align: right;\n  }\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MovementLogComponent, { className: "MovementLogComponent", filePath: "src/app/pages/movements/movement-log/movement-log.component.ts", lineNumber: 17 });
})();
export {
  MovementLogComponent
};
