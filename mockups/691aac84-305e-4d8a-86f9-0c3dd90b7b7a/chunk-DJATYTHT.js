import {
  AuthService
} from "./chunk-4RA6UK54.js";
import {
  formatDateTime,
  readOneOf
} from "./chunk-7TOKWH2F.js";
import {
  toSignal
} from "./chunk-NZ4XK36V.js";
import {
  ActivatedRoute,
  ChangeDetectionStrategy,
  Component,
  RouterLink,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-VSPK3BNN.js";

// src/app/pages/items/item-detail/item-detail.component.ts
var _c0 = (a0) => ({ itemId: a0 });
var _c1 = () => ({ tab: "stock" });
var _c2 = () => [];
var _c3 = () => ({ tab: "history" });
var _c4 = (a0) => ["/items", a0, "edit"];
var _c5 = (a0) => ({ itemId: a0, type: "TRANSFER" });
var _forTrack0 = ($index, $item) => $item.locationId;
var _forTrack1 = ($index, $item) => $item.id;
function ItemDetailComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 7);
    \u0275\u0275text(1, "Low stock");
    \u0275\u0275elementEnd();
  }
}
function ItemDetailComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 8);
    \u0275\u0275text(1, "In stock");
    \u0275\u0275elementEnd();
  }
}
function ItemDetailComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 12);
    \u0275\u0275text(1, "Edit item");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c4, ctx_r0.item().id));
  }
}
function ItemDetailComponent_Conditional_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r0.deficit(), " below threshold ");
  }
}
function ItemDetailComponent_Conditional_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Comfortably above threshold ");
  }
}
function ItemDetailComponent_Conditional_49_For_16_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 34);
    \u0275\u0275text(1, "Empty");
    \u0275\u0275elementEnd();
  }
}
function ItemDetailComponent_Conditional_49_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 31);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 33);
    \u0275\u0275text(6);
    \u0275\u0275template(7, ItemDetailComponent_Conditional_49_For_16_Conditional_7_Template, 2, 0, "span", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 30)(9, "div", 35)(10, "a", 36);
    \u0275\u0275text(11, "Transfer");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const level_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(level_r2.locationName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(level_r2.zone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", level_r2.qty, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(level_r2.qty === 0 ? 7 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction1(5, _c5, ctx_r0.item().id));
  }
}
function ItemDetailComponent_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 21)(1, "div", 23)(2, "table", 24)(3, "thead")(4, "tr")(5, "th", 25);
    \u0275\u0275text(6, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "th", 25);
    \u0275\u0275text(8, "Zone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 26);
    \u0275\u0275text(10, "Quantity");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 25)(12, "span", 27);
    \u0275\u0275text(13, "Actions");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, ItemDetailComponent_Conditional_49_For_16_Template, 12, 7, "tr", null, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "tfoot")(18, "tr")(19, "td", 28);
    \u0275\u0275text(20, "Total on hand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "td", 29);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275element(23, "td", 30);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.item().stockLevels);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate2("", ctx_r0.onHand(), " ", ctx_r0.item().unit, "");
  }
}
function ItemDetailComponent_Conditional_50_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "span", 38);
    \u0275\u0275text(2, "\u2261");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 39);
    \u0275\u0275text(4, "No movements recorded yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Every stock change for this item will appear here.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 13);
    \u0275\u0275text(8, " Record the first movement ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction1(1, _c0, ctx_r0.item().id));
  }
}
function ItemDetailComponent_Conditional_50_Conditional_2_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 41)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 42);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 44);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td", 45);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_16_0;
    const movement_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r0.formatDateTime(movement_r3.createdAt));
    \u0275\u0275advance(2);
    \u0275\u0275classMapInterpolate1("badge badge-", movement_r3.type, "");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(movement_r3.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(movement_r3.qty);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", (tmp_16_0 = movement_r3.fromLocName) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "\u2014", " \u2192 ", (tmp_16_0 = movement_r3.toLocName) !== null && tmp_16_0 !== void 0 ? tmp_16_0 : "\u2014", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(movement_r3.userEmail);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(movement_r3.note);
  }
}
function ItemDetailComponent_Conditional_50_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "table", 24)(2, "thead")(3, "tr")(4, "th", 25);
    \u0275\u0275text(5, "When");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 25);
    \u0275\u0275text(7, "Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 26);
    \u0275\u0275text(9, "Qty");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 25);
    \u0275\u0275text(11, "From \u2192 To");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 25);
    \u0275\u0275text(13, "By");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 25);
    \u0275\u0275text(15, "Note");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, ItemDetailComponent_Conditional_50_Conditional_2_For_18_Template, 14, 10, "tr", null, _forTrack1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r0.movements());
  }
}
function ItemDetailComponent_Conditional_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 21);
    \u0275\u0275template(1, ItemDetailComponent_Conditional_50_Conditional_1_Template, 9, 3, "div", 37)(2, ItemDetailComponent_Conditional_50_Conditional_2_Template, 19, 0, "div", 23);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r0.movements().length === 0 ? 1 : 2);
  }
}
var TABS = ["stock", "history"];
var ItemDetailComponent = class _ItemDetailComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.route = inject(ActivatedRoute);
    this.id = input("");
    this.formatDateTime = formatDateTime;
    this.details = signal([
      {
        id: "itm-001",
        sku: "SKU-001",
        name: "Galvanised shelf bracket",
        description: "Heavy duty, 400mm arm",
        unit: "ea",
        reorderAt: 40,
        totalQty: 128,
        stockLevels: [
          { locationId: "loc-a", locationName: "Main", zone: "Zone A", qty: 64 },
          { locationId: "loc-b", locationName: "Main", zone: "Zone B", qty: 40 },
          { locationId: "loc-c", locationName: "Overflow", zone: "Zone C", qty: 24 }
        ]
      },
      {
        id: "itm-002",
        sku: "SKU-002",
        name: "M8 hex bolt, 100 pack",
        description: "Zinc plated, DIN 933",
        unit: "box",
        reorderAt: 25,
        totalQty: 18,
        stockLevels: [
          { locationId: "loc-a", locationName: "Main", zone: "Zone A", qty: 12 },
          { locationId: "loc-b", locationName: "Main", zone: "Zone B", qty: 6 },
          { locationId: "loc-c", locationName: "Overflow", zone: "Zone C", qty: 0 }
        ]
      },
      {
        id: "itm-008",
        sku: "SKU-008",
        name: "Forklift hydraulic oil 20L",
        description: "ISO VG 46",
        unit: "drum",
        reorderAt: 8,
        totalQty: 3,
        stockLevels: [
          { locationId: "loc-a", locationName: "Main", zone: "Zone A", qty: 3 },
          { locationId: "loc-c", locationName: "Overflow", zone: "Zone C", qty: 0 }
        ]
      }
    ]);
    this.history = signal([
      { id: "mv-101", type: "IN", itemId: "itm-001", itemSku: "SKU-001", itemName: "Galvanised shelf bracket", fromLocName: null, toLocName: "Main \xB7 Zone A", qty: 80, note: "PO-4471 delivery", userEmail: "priya.nandi@stockroom.example", createdAt: "2026-09-05T08:14:00Z" },
      { id: "mv-102", type: "TRANSFER", itemId: "itm-001", itemSku: "SKU-001", itemName: "Galvanised shelf bracket", fromLocName: "Main \xB7 Zone A", toLocName: "Overflow \xB7 Zone C", qty: 24, note: "Rebalancing pick face", userEmail: "dana.whitfield@stockroom.example", createdAt: "2026-09-05T13:02:00Z" },
      { id: "mv-103", type: "OUT", itemId: "itm-001", itemSku: "SKU-001", itemName: "Galvanised shelf bracket", fromLocName: "Main \xB7 Zone B", toLocName: null, qty: 16, note: "Works order WO-882", userEmail: "tomas.berg@stockroom.example", createdAt: "2026-09-06T09:47:00Z" },
      { id: "mv-104", type: "IN", itemId: "itm-001", itemSku: "SKU-001", itemName: "Galvanised shelf bracket", fromLocName: null, toLocName: "Main \xB7 Zone B", qty: 56, note: "PO-4488 delivery", userEmail: "priya.nandi@stockroom.example", createdAt: "2026-09-06T15:20:00Z" }
    ]);
    this.params = toSignal(this.route.queryParamMap, {
      initialValue: this.route.snapshot.queryParamMap
    });
    this.tab = computed(() => readOneOf(this.params().get("tab"), TABS, "stock"));
    this.item = computed(() => this.details().find((row) => row.id === this.id()) ?? this.details()[0]);
    this.movements = computed(() => this.history().filter((row) => row.itemId === this.item().id));
    this.onHand = computed(() => this.item().stockLevels.reduce((total, level) => total + level.qty, 0));
    this.isLow = computed(() => this.onHand() <= this.item().reorderAt);
    this.deficit = computed(() => Math.max(0, this.item().reorderAt - this.onHand()));
    this.usedLocations = computed(() => this.item().stockLevels.filter((level) => level.qty > 0).length);
  }
  static {
    this.\u0275fac = function ItemDetailComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ItemDetailComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ItemDetailComponent, selectors: [["app-item-detail"]], inputs: { id: [1, "id"] }, decls: 53, vars: 32, consts: [[1, "page"], [1, "breadcrumb"], ["routerLink", "/items"], ["aria-hidden", "true"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "badge", "badge-low"], [1, "badge", "badge-ok"], [1, "page-sub"], [1, "mono"], [1, "page-actions"], [1, "btn", 3, "routerLink"], ["routerLink", "/movements/new", 1, "btn", "btn-primary", 3, "queryParams"], [1, "stat-grid"], [1, "stat"], [1, "stat__label"], [1, "stat__value"], [1, "stat__hint"], ["aria-label", "Item detail sections", 1, "tabs"], [1, "tab", 3, "queryParams", "routerLink"], [1, "card"], ["routerLink", "/movements/new", 1, "fab", 3, "queryParams"], [1, "table-wrap"], [1, "table", "table--stack"], ["scope", "col"], ["scope", "col", 1, "num"], [1, "sr-only"], ["data-label", "Total", "colspan", "2"], ["data-label", "", 1, "num"], ["data-label", ""], ["data-label", "Location", 1, "cell-primary"], ["data-label", "Zone"], ["data-label", "Quantity", 1, "num"], [1, "badge", "badge-neutral"], [1, "actions"], ["routerLink", "/movements/new", 1, "btn", "btn-sm", 3, "queryParams"], [1, "empty"], ["aria-hidden", "true", 1, "empty__icon"], [1, "empty__title"], ["data-label", "When", 1, "nowrap"], ["data-label", "Type"], ["data-label", "Qty", 1, "num"], ["data-label", "From \u2192 To"], ["data-label", "By", 1, "small"], ["data-label", "Note", 1, "small", "muted"]], template: function ItemDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "p", 1)(2, "a", 2);
        \u0275\u0275text(3, "Items");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "span", 3);
        \u0275\u0275text(5, "/");
        \u0275\u0275elementEnd();
        \u0275\u0275text(6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 4)(8, "div", 5)(9, "h1", 6);
        \u0275\u0275text(10);
        \u0275\u0275template(11, ItemDetailComponent_Conditional_11_Template, 2, 0, "span", 7)(12, ItemDetailComponent_Conditional_12_Template, 2, 0, "span", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(13, "p", 9)(14, "span", 10);
        \u0275\u0275text(15);
        \u0275\u0275elementEnd();
        \u0275\u0275text(16);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(17, "div", 11);
        \u0275\u0275template(18, ItemDetailComponent_Conditional_18_Template, 2, 3, "a", 12);
        \u0275\u0275elementStart(19, "a", 13);
        \u0275\u0275text(20, "Record movement");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(21, "div", 14)(22, "div", 15)(23, "p", 16);
        \u0275\u0275text(24, "On hand");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "p", 17);
        \u0275\u0275text(26);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(27, "p", 18);
        \u0275\u0275text(28);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 15)(30, "p", 16);
        \u0275\u0275text(31, "Reorder at");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "p", 17);
        \u0275\u0275text(33);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "p", 18);
        \u0275\u0275template(35, ItemDetailComponent_Conditional_35_Template, 1, 1)(36, ItemDetailComponent_Conditional_36_Template, 1, 0);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(37, "div", 15)(38, "p", 16);
        \u0275\u0275text(39, "Zones holding stock");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "p", 17);
        \u0275\u0275text(41);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "p", 18);
        \u0275\u0275text(43);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(44, "nav", 19)(45, "a", 20);
        \u0275\u0275text(46, " Stock by location ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(47, "a", 20);
        \u0275\u0275text(48, " Movement history ");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(49, ItemDetailComponent_Conditional_49_Template, 24, 2, "section", 21)(50, ItemDetailComponent_Conditional_50_Template, 3, 1, "section", 21);
        \u0275\u0275elementStart(51, "a", 22);
        \u0275\u0275text(52, "\uFF0B Record movement");
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.item().sku, "");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate1(" ", ctx.item().name, " ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.isLow() ? 11 : 12);
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.item().sku);
        \u0275\u0275advance();
        \u0275\u0275textInterpolate2(" \xB7 ", ctx.item().description, " \xB7 counted in ", ctx.item().unit, " ");
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.auth.isManager() ? 18 : -1);
        \u0275\u0275advance();
        \u0275\u0275property("queryParams", \u0275\u0275pureFunction1(24, _c0, ctx.item().id));
        \u0275\u0275advance(7);
        \u0275\u0275textInterpolate(ctx.onHand());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("", ctx.item().unit, " across all zones");
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.item().reorderAt);
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.isLow() ? 35 : 36);
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate(ctx.usedLocations());
        \u0275\u0275advance(2);
        \u0275\u0275textInterpolate1("of ", ctx.item().stockLevels.length, " stocked locations");
        \u0275\u0275advance(2);
        \u0275\u0275classProp("is-active", ctx.tab() === "stock");
        \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(26, _c1))("routerLink", \u0275\u0275pureFunction0(27, _c2));
        \u0275\u0275advance(2);
        \u0275\u0275classProp("is-active", ctx.tab() === "history");
        \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(28, _c3))("routerLink", \u0275\u0275pureFunction0(29, _c2));
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.tab() === "stock" ? 49 : 50);
        \u0275\u0275advance(2);
        \u0275\u0275property("queryParams", \u0275\u0275pureFunction1(30, _c0, ctx.item().id));
      }
    }, dependencies: [RouterLink], styles: ["\n\n.tabs[_ngcontent-%COMP%] {\n  background: var(--color-surface);\n  border-radius: var(--radius-md) var(--radius-md) 0 0;\n}\n.cell-primary[_ngcontent-%COMP%] {\n  font-weight: 600;\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemDetailComponent, [{
    type: Component,
    args: [{ selector: "app-item-detail", imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page">
  <p class="breadcrumb"><a routerLink="/items">Items</a> <span aria-hidden="true">/</span> {{ item().sku }}</p>

  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">
        {{ item().name }}
        @if (isLow()) {
          <span class="badge badge-low">Low stock</span>
        } @else {
          <span class="badge badge-ok">In stock</span>
        }
      </h1>
      <p class="page-sub">
        <span class="mono">{{ item().sku }}</span> \xB7 {{ item().description }} \xB7 counted in
        {{ item().unit }}
      </p>
    </div>
    <div class="page-actions">
      @if (auth.isManager()) {
        <a class="btn" [routerLink]="['/items', item().id, 'edit']">Edit item</a>
      }
      <a
        class="btn btn-primary"
        routerLink="/movements/new"
        [queryParams]="{ itemId: item().id }"
      >Record movement</a>
    </div>
  </div>

  <div class="stat-grid">
    <div class="stat">
      <p class="stat__label">On hand</p>
      <p class="stat__value">{{ onHand() }}</p>
      <p class="stat__hint">{{ item().unit }} across all zones</p>
    </div>
    <div class="stat">
      <p class="stat__label">Reorder at</p>
      <p class="stat__value">{{ item().reorderAt }}</p>
      <p class="stat__hint">
        @if (isLow()) { {{ deficit() }} below threshold } @else { Comfortably above threshold }
      </p>
    </div>
    <div class="stat">
      <p class="stat__label">Zones holding stock</p>
      <p class="stat__value">{{ usedLocations() }}</p>
      <p class="stat__hint">of {{ item().stockLevels.length }} stocked locations</p>
    </div>
  </div>

  <nav class="tabs" aria-label="Item detail sections">
    <a class="tab" [class.is-active]="tab() === 'stock'" [queryParams]="{ tab: 'stock' }" [routerLink]="[]">
      Stock by location
    </a>
    <a class="tab" [class.is-active]="tab() === 'history'" [queryParams]="{ tab: 'history' }" [routerLink]="[]">
      Movement history
    </a>
  </nav>

  @if (tab() === 'stock') {
    <section class="card">
      <div class="table-wrap">
        <table class="table table--stack">
          <thead>
            <tr>
              <th scope="col">Location</th>
              <th scope="col">Zone</th>
              <th scope="col" class="num">Quantity</th>
              <th scope="col"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            @for (level of item().stockLevels; track level.locationId) {
              <tr>
                <td data-label="Location" class="cell-primary">{{ level.locationName }}</td>
                <td data-label="Zone">{{ level.zone }}</td>
                <td data-label="Quantity" class="num">
                  {{ level.qty }}
                  @if (level.qty === 0) {
                    <span class="badge badge-neutral">Empty</span>
                  }
                </td>
                <td data-label="">
                  <div class="actions">
                    <a
                      class="btn btn-sm"
                      routerLink="/movements/new"
                      [queryParams]="{ itemId: item().id, type: 'TRANSFER' }"
                    >Transfer</a>
                  </div>
                </td>
              </tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <td data-label="Total" colspan="2">Total on hand</td>
              <td data-label="" class="num">{{ onHand() }} {{ item().unit }}</td>
              <td data-label=""></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  } @else {
    <section class="card">
      @if (movements().length === 0) {
        <div class="empty">
          <span class="empty__icon" aria-hidden="true">\u2261</span>
          <p class="empty__title">No movements recorded yet</p>
          <p>Every stock change for this item will appear here.</p>
          <a class="btn btn-primary" routerLink="/movements/new" [queryParams]="{ itemId: item().id }">
            Record the first movement
          </a>
        </div>
      } @else {
        <div class="table-wrap">
          <table class="table table--stack">
            <thead>
              <tr>
                <th scope="col">When</th>
                <th scope="col">Type</th>
                <th scope="col" class="num">Qty</th>
                <th scope="col">From \u2192 To</th>
                <th scope="col">By</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              @for (movement of movements(); track movement.id) {
                <tr>
                  <td data-label="When" class="nowrap">{{ formatDateTime(movement.createdAt) }}</td>
                  <td data-label="Type"><span class="badge badge-{{ movement.type }}">{{ movement.type }}</span></td>
                  <td data-label="Qty" class="num">{{ movement.qty }}</td>
                  <td data-label="From \u2192 To">{{ movement.fromLocName ?? '\u2014' }} \u2192 {{ movement.toLocName ?? '\u2014' }}</td>
                  <td data-label="By" class="small">{{ movement.userEmail }}</td>
                  <td data-label="Note" class="small muted">{{ movement.note }}</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      }
    </section>
  }

  <a routerLink="/movements/new" [queryParams]="{ itemId: item().id }" class="fab">\uFF0B Record movement</a>
</div>
`, styles: ["/* src/app/pages/items/item-detail/item-detail.component.css */\n.tabs {\n  background: var(--color-surface);\n  border-radius: var(--radius-md) var(--radius-md) 0 0;\n}\n.cell-primary {\n  font-weight: 600;\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ItemDetailComponent, { className: "ItemDetailComponent", filePath: "src/app/pages/items/item-detail/item-detail.component.ts", lineNumber: 18 });
})();
export {
  ItemDetailComponent
};
