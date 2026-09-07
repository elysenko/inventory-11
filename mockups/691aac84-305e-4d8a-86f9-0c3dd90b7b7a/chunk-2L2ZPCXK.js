import {
  AuthService
} from "./chunk-4RA6UK54.js";
import {
  mergeQueryParams,
  readBoolean,
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
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3
} from "./chunk-VSPK3BNN.js";

// src/app/pages/items/item-list/item-list.component.ts
var _c0 = (a0) => ["/items", a0];
var _c1 = () => ["/movements/new"];
var _c2 = (a0) => ({ itemId: a0 });
var _c3 = (a0) => ["/items", a0, "edit"];
var _forTrack0 = ($index, $item) => $item.id;
function ItemListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 5)(1, "a", 19);
    \u0275\u0275text(2, "Locations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 20);
    \u0275\u0275text(4, "\uFF0B New item");
    \u0275\u0275elementEnd()();
  }
}
function ItemListComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 21);
    \u0275\u0275text(2, "\u25A3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 22);
    \u0275\u0275text(4, "No items match these filters");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Try a different search term, or clear the low-stock filter.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 14);
    \u0275\u0275listener("click", function ItemListComponent_Conditional_23_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.clearFilters());
    });
    \u0275\u0275text(8, "Clear filters");
    \u0275\u0275elementEnd()();
  }
}
function ItemListComponent_Conditional_24_For_21_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1, "Low stock");
    \u0275\u0275elementEnd();
  }
}
function ItemListComponent_Conditional_24_For_21_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1, "In stock");
    \u0275\u0275elementEnd();
  }
}
function ItemListComponent_Conditional_24_For_21_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "a", 46);
    \u0275\u0275text(1, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "button", 47);
    \u0275\u0275listener("click", function ItemListComponent_Conditional_24_For_21_Conditional_23_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r4);
      const item_r5 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.askDelete(item_r5));
    });
    \u0275\u0275text(3, "Delete");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(1, _c3, item_r5.id));
  }
}
function ItemListComponent_Conditional_24_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 32)(2, "a", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 34)(5, "a", 35);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 36);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 37);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 38);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 39)(14, "strong");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "td", 40);
    \u0275\u0275template(17, ItemListComponent_Conditional_24_For_21_Conditional_17_Template, 2, 0, "span", 41)(18, ItemListComponent_Conditional_24_For_21_Conditional_18_Template, 2, 0, "span", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "td", 43)(20, "div", 44)(21, "a", 45);
    \u0275\u0275text(22, "Move");
    \u0275\u0275elementEnd();
    \u0275\u0275template(23, ItemListComponent_Conditional_24_For_21_Conditional_23_Template, 4, 3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(12, _c0, item_r5.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.sku);
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(14, _c0, item_r5.id));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.description);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.unit);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.reorderAt);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r5.totalQty);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.isLow(item_r5) ? 17 : 18);
    \u0275\u0275advance(4);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(16, _c1))("queryParams", \u0275\u0275pureFunction1(17, _c2, item_r5.id));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.auth.isManager() ? 23 : -1);
  }
}
function ItemListComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "table", 24)(2, "thead")(3, "tr")(4, "th", 25);
    \u0275\u0275text(5, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 25);
    \u0275\u0275text(7, "Item");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 25);
    \u0275\u0275text(9, "Unit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 26);
    \u0275\u0275text(11, "Reorder at");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 26);
    \u0275\u0275text(13, "On hand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 25);
    \u0275\u0275text(15, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 25)(17, "span", 27);
    \u0275\u0275text(18, "Actions");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275repeaterCreate(20, ItemListComponent_Conditional_24_For_21_Template, 24, 19, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "div", 28)(23, "span");
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 29)(26, "button", 30);
    \u0275\u0275listener("click", function ItemListComponent_Conditional_24_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.currentPage() - 1));
    });
    \u0275\u0275text(27, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 31);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "button", 30);
    \u0275\u0275listener("click", function ItemListComponent_Conditional_24_Template_button_click_30_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goToPage(ctx_r1.currentPage() + 1));
    });
    \u0275\u0275text(31, " Next ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(20);
    \u0275\u0275repeater(ctx_r1.rows());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate3("Showing ", ctx_r1.rangeStart(), "\u2013", ctx_r1.rangeEnd(), " of ", ctx_r1.filtered().length, "");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.currentPage() <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Page ", ctx_r1.currentPage(), " of ", ctx_r1.pageCount(), "");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.currentPage() >= ctx_r1.pageCount());
  }
}
function ItemListComponent_Conditional_27_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function ItemListComponent_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 48)(2, "div", 49)(3, "h2", 50);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 51);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ItemListComponent_Conditional_27_Conditional_7_Template, 2, 1, "p", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 53)(9, "button", 14);
    \u0275\u0275listener("click", function ItemListComponent_Conditional_27_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDelete());
    });
    \u0275\u0275text(10, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 54);
    \u0275\u0275listener("click", function ItemListComponent_Conditional_27_Template_button_click_11_listener() {
      const target_r7 = \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.confirmDelete(target_r7));
    });
    \u0275\u0275text(12, "Delete item");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    const target_r7 = ctx;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Delete ", target_r7.sku, "?");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", target_r7.name, " will be removed from the catalogue. Items referenced by a recorded movement cannot be deleted. ");
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_4_0 = ctx_r1.deleteError()) ? 7 : -1, tmp_4_0);
  }
}
var PAGE_SIZE = 6;
var ItemListComponent = class _ItemListComponent {
  constructor() {
    this.auth = inject(AuthService);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.pageSize = PAGE_SIZE;
    this.items = signal([
      { id: "itm-001", sku: "SKU-001", name: "Galvanised shelf bracket", description: "Heavy duty, 400mm arm", unit: "ea", reorderAt: 40, totalQty: 128 },
      { id: "itm-002", sku: "SKU-002", name: "M8 hex bolt, 100 pack", description: "Zinc plated, DIN 933", unit: "box", reorderAt: 25, totalQty: 18 },
      { id: "itm-003", sku: "SKU-003", name: "Stretch wrap film 500mm", description: "23 micron, clear", unit: "roll", reorderAt: 30, totalQty: 96 },
      { id: "itm-004", sku: "SKU-004", name: "Euro pallet 1200\xD7800", description: "EPAL certified, grade B", unit: "ea", reorderAt: 50, totalQty: 212 },
      { id: "itm-005", sku: "SKU-005", name: "Thermal label 4\xD76, 1000 pack", description: "Direct thermal, perforated", unit: "box", reorderAt: 20, totalQty: 20 },
      { id: "itm-006", sku: "SKU-006", name: "Nitrile glove, large, 100 pack", description: "Powder free, blue", unit: "box", reorderAt: 35, totalQty: 74 },
      { id: "itm-007", sku: "SKU-007", name: "Corrugated carton 400mm", description: "Double wall, brown", unit: "ea", reorderAt: 150, totalQty: 640 },
      { id: "itm-008", sku: "SKU-008", name: "Forklift hydraulic oil 20L", description: "ISO VG 46", unit: "drum", reorderAt: 8, totalQty: 3 }
    ]);
    this.params = toSignal(this.route.queryParamMap, {
      initialValue: this.route.snapshot.queryParamMap
    });
    this.query = computed(() => readText(this.params().get("q")));
    this.lowStockOnly = computed(() => readBoolean(this.params().get("lowStock")));
    this.page = computed(() => readNumber(this.params().get("page"), 1));
    this.deleteId = computed(() => this.params().get("modal") === "confirm-delete" ? this.params().get("id") : null);
    this.filtered = computed(() => {
      const needle = this.query().toLowerCase();
      return this.items().filter((item) => {
        const matchesText = !needle || item.sku.toLowerCase().includes(needle) || item.name.toLowerCase().includes(needle);
        const matchesLow = !this.lowStockOnly() || this.isLow(item);
        return matchesText && matchesLow;
      });
    });
    this.pageCount = computed(() => Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));
    this.currentPage = computed(() => Math.min(this.page(), this.pageCount()));
    this.rows = computed(() => {
      const start = (this.currentPage() - 1) * PAGE_SIZE;
      return this.filtered().slice(start, start + PAGE_SIZE);
    });
    this.rangeStart = computed(() => this.filtered().length === 0 ? 0 : (this.currentPage() - 1) * PAGE_SIZE + 1);
    this.rangeEnd = computed(() => Math.min(this.currentPage() * PAGE_SIZE, this.filtered().length));
    this.lowCount = computed(() => this.items().filter((item) => this.isLow(item)).length);
    this.pendingDelete = computed(() => this.items().find((item) => item.id === this.deleteId()) ?? null);
    this.deleteError = signal(null);
  }
  isLow(item) {
    return item.totalQty <= item.reorderAt;
  }
  search(value) {
    mergeQueryParams(this.router, { q: value.trim(), page: null });
  }
  toggleLowStock(checked) {
    mergeQueryParams(this.router, { lowStock: checked, page: null });
  }
  clearFilters() {
    mergeQueryParams(this.router, { q: null, lowStock: null, page: null });
  }
  goToPage(page) {
    mergeQueryParams(this.router, { page: page <= 1 ? null : page });
  }
  askDelete(item) {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: "confirm-delete", id: item.id });
  }
  closeDelete() {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: null, id: null });
  }
  confirmDelete(item) {
    if (item.totalQty > 0) {
      this.deleteError.set(`${item.sku} has recorded movements and ${item.totalQty} ${item.unit} still on hand. Move the stock out before deleting it.`);
      return;
    }
    this.items.update((items) => items.filter((row) => row.id !== item.id));
    this.closeDelete();
  }
  static {
    this.\u0275fac = function ItemListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ItemListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ItemListComponent, selectors: [["app-item-list"]], decls: 28, vars: 7, consts: [[1, "page"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "page-sub"], [1, "page-actions"], [1, "filters"], [1, "field"], ["for", "q", 1, "label"], ["id", "q", "type", "search", "placeholder", "SKU or name", 1, "input", 3, "change", "value"], [1, "label"], [1, "checkbox"], ["type", "checkbox", 3, "change", "checked"], [1, "filters__actions"], ["type", "button", 1, "btn", 3, "click"], [1, "card"], [1, "empty"], ["routerLink", "/movements/new", 1, "fab"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "delete-title", 1, "modal-backdrop"], ["routerLink", "/locations", 1, "btn"], ["routerLink", "/items/new", 1, "btn", "btn-primary"], ["aria-hidden", "true", 1, "empty__icon"], [1, "empty__title"], [1, "table-wrap"], [1, "table", "table--stack"], ["scope", "col"], ["scope", "col", 1, "num"], [1, "sr-only"], [1, "pager"], [1, "pager__controls"], ["type", "button", 1, "btn", "btn-sm", 3, "click", "disabled"], [1, "pager__page"], ["data-label", "SKU"], [1, "mono", 3, "routerLink"], ["data-label", "Item", 1, "cell-primary"], [3, "routerLink"], [1, "cell-note"], ["data-label", "Unit"], ["data-label", "Reorder at", 1, "num"], ["data-label", "On hand", 1, "num"], ["data-label", "Status"], [1, "badge", "badge-low"], [1, "badge", "badge-ok"], ["data-label", ""], [1, "actions"], [1, "btn", "btn-sm", 3, "routerLink", "queryParams"], [1, "btn", "btn-sm", 3, "routerLink"], ["type", "button", 1, "btn", "btn-sm", 3, "click"], [1, "modal"], [1, "modal__body"], ["id", "delete-title"], [1, "muted"], ["role", "alert", 1, "alert", "alert-danger"], [1, "modal__actions"], ["type", "button", 1, "btn", "btn-danger", 3, "click"]], template: function ItemListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, "Items");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(7, ItemListComponent_Conditional_7_Template, 5, 0, "div", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "label", 8);
        \u0275\u0275text(11, "Search");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "input", 9);
        \u0275\u0275listener("change", function ItemListComponent_Template_input_change_12_listener($event) {
          return ctx.search($event.target.value);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(13, "div", 7)(14, "span", 10);
        \u0275\u0275text(15, "Filter");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "label", 11)(17, "input", 12);
        \u0275\u0275listener("change", function ItemListComponent_Template_input_change_17_listener($event) {
          return ctx.toggleLowStock($event.target.checked);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275text(18, " Low stock only ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(19, "div", 13)(20, "button", 14);
        \u0275\u0275listener("click", function ItemListComponent_Template_button_click_20_listener() {
          return ctx.clearFilters();
        });
        \u0275\u0275text(21, "Clear");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(22, "section", 15);
        \u0275\u0275template(23, ItemListComponent_Conditional_23_Template, 9, 0, "div", 16)(24, ItemListComponent_Conditional_24_Template, 32, 7);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "a", 17);
        \u0275\u0275text(26, "\uFF0B Record movement");
        \u0275\u0275elementEnd();
        \u0275\u0275template(27, ItemListComponent_Conditional_27_Template, 13, 3, "div", 18);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_5_0;
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate2(" ", ctx.items().length, " tracked items \xB7 ", ctx.lowCount(), " at or below their reorder point ");
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.auth.isManager() ? 7 : -1);
        \u0275\u0275advance(5);
        \u0275\u0275property("value", ctx.query());
        \u0275\u0275advance(5);
        \u0275\u0275property("checked", ctx.lowStockOnly());
        \u0275\u0275advance(6);
        \u0275\u0275conditional(ctx.rows().length === 0 ? 23 : 24);
        \u0275\u0275advance(4);
        \u0275\u0275conditional((tmp_5_0 = ctx.pendingDelete()) ? 27 : -1, tmp_5_0);
      }
    }, dependencies: [RouterLink], styles: ["\n\n.cell-note[_ngcontent-%COMP%] {\n  display: block;\n  font-size: var(--text-sm);\n  color: var(--color-ink-subtle);\n}\n.pager__page[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0 var(--space-2);\n}\n@media (max-width: 768px) {\n  .cell-note[_ngcontent-%COMP%] {\n    text-align: right;\n  }\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemListComponent, [{
    type: Component,
    args: [{ selector: "app-item-list", imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page">
  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">Items</h1>
      <p class="page-sub">
        {{ items().length }} tracked items \xB7 {{ lowCount() }} at or below their reorder point
      </p>
    </div>
    @if (auth.isManager()) {
      <div class="page-actions">
        <a routerLink="/locations" class="btn">Locations</a>
        <a routerLink="/items/new" class="btn btn-primary">\uFF0B New item</a>
      </div>
    }
  </div>

  <div class="filters">
    <div class="field">
      <label class="label" for="q">Search</label>
      <input
        id="q"
        type="search"
        class="input"
        placeholder="SKU or name"
        [value]="query()"
        (change)="search($any($event.target).value)"
      />
    </div>
    <div class="field">
      <span class="label">Filter</span>
      <label class="checkbox">
        <input type="checkbox" [checked]="lowStockOnly()" (change)="toggleLowStock($any($event.target).checked)" />
        Low stock only
      </label>
    </div>
    <div class="filters__actions">
      <button type="button" class="btn" (click)="clearFilters()">Clear</button>
    </div>
  </div>

  <section class="card">
    @if (rows().length === 0) {
      <div class="empty">
        <span class="empty__icon" aria-hidden="true">\u25A3</span>
        <p class="empty__title">No items match these filters</p>
        <p>Try a different search term, or clear the low-stock filter.</p>
        <button type="button" class="btn" (click)="clearFilters()">Clear filters</button>
      </div>
    } @else {
      <div class="table-wrap">
        <table class="table table--stack">
          <thead>
            <tr>
              <th scope="col">SKU</th>
              <th scope="col">Item</th>
              <th scope="col">Unit</th>
              <th scope="col" class="num">Reorder at</th>
              <th scope="col" class="num">On hand</th>
              <th scope="col">Status</th>
              <th scope="col"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            @for (item of rows(); track item.id) {
              <tr>
                <td data-label="SKU"><a class="mono" [routerLink]="['/items', item.id]">{{ item.sku }}</a></td>
                <td data-label="Item" class="cell-primary">
                  <a [routerLink]="['/items', item.id]">{{ item.name }}</a>
                  <span class="cell-note">{{ item.description }}</span>
                </td>
                <td data-label="Unit">{{ item.unit }}</td>
                <td data-label="Reorder at" class="num">{{ item.reorderAt }}</td>
                <td data-label="On hand" class="num"><strong>{{ item.totalQty }}</strong></td>
                <td data-label="Status">
                  @if (isLow(item)) {
                    <span class="badge badge-low">Low stock</span>
                  } @else {
                    <span class="badge badge-ok">In stock</span>
                  }
                </td>
                <td data-label="">
                  <div class="actions">
                    <a class="btn btn-sm" [routerLink]="['/movements/new']" [queryParams]="{ itemId: item.id }">Move</a>
                    @if (auth.isManager()) {
                      <a class="btn btn-sm" [routerLink]="['/items', item.id, 'edit']">Edit</a>
                      <button type="button" class="btn btn-sm" (click)="askDelete(item)">Delete</button>
                    }
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="pager">
        <span>Showing {{ rangeStart() }}\u2013{{ rangeEnd() }} of {{ filtered().length }}</span>
        <div class="pager__controls">
          <button type="button" class="btn btn-sm" [disabled]="currentPage() <= 1" (click)="goToPage(currentPage() - 1)">
            Previous
          </button>
          <span class="pager__page">Page {{ currentPage() }} of {{ pageCount() }}</span>
          <button
            type="button"
            class="btn btn-sm"
            [disabled]="currentPage() >= pageCount()"
            (click)="goToPage(currentPage() + 1)"
          >
            Next
          </button>
        </div>
      </div>
    }
  </section>

  <a routerLink="/movements/new" class="fab">\uFF0B Record movement</a>

  @if (pendingDelete(); as target) {
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="delete-title">
      <div class="modal">
        <div class="modal__body">
          <h2 id="delete-title">Delete {{ target.sku }}?</h2>
          <p class="muted">
            {{ target.name }} will be removed from the catalogue. Items referenced by a recorded
            movement cannot be deleted.
          </p>
          @if (deleteError(); as message) {
            <p class="alert alert-danger" role="alert">{{ message }}</p>
          }
        </div>
        <div class="modal__actions">
          <button type="button" class="btn" (click)="closeDelete()">Cancel</button>
          <button type="button" class="btn btn-danger" (click)="confirmDelete(target)">Delete item</button>
        </div>
      </div>
    </div>
  }
</div>
`, styles: ["/* src/app/pages/items/item-list/item-list.component.css */\n.cell-note {\n  display: block;\n  font-size: var(--text-sm);\n  color: var(--color-ink-subtle);\n}\n.pager__page {\n  display: inline-flex;\n  align-items: center;\n  padding: 0 var(--space-2);\n}\n@media (max-width: 768px) {\n  .cell-note {\n    text-align: right;\n  }\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ItemListComponent, { className: "ItemListComponent", filePath: "src/app/pages/items/item-list/item-list.component.ts", lineNumber: 18 });
})();
export {
  ItemListComponent
};
