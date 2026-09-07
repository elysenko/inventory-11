import {
  ChangeDetectionStrategy,
  Component,
  RouterLink,
  computed,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
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

// src/app/pages/reports/low-stock/low-stock.component.ts
var _c0 = () => ({ lowStock: true });
var _c1 = (a0) => ["/items", a0];
var _c2 = (a0) => ({ itemId: a0, type: "IN" });
var _forTrack0 = ($index, $item) => $item.itemId;
function LowStockComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "section", 8)(1, "div", 9)(2, "span", 10);
    \u0275\u0275text(3, "\u2713");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 11);
    \u0275\u0275text(5, "Nothing needs reordering");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Every item is above its reorder point.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "a", 12);
    \u0275\u0275text(9, "Back to items");
    \u0275\u0275elementEnd()()();
  }
}
function LowStockComponent_Conditional_13_For_47_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 28);
    \u0275\u0275text(1, "Out of stock");
    \u0275\u0275elementEnd();
  }
}
function LowStockComponent_Conditional_13_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 25)(2, "a", 26);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 27);
    \u0275\u0275text(5);
    \u0275\u0275template(6, LowStockComponent_Conditional_13_For_47_Conditional_6_Template, 2, 0, "span", 28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 29);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 30);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 31)(12, "strong");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 32)(15, "div", 33)(16, "a", 34);
    \u0275\u0275text(17, "Restock");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const row_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(9, _c1, row_r1.itemId));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r1.sku);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", row_r1.name, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r1.totalQty === 0 ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", row_r1.totalQty, " ", row_r1.unit, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r1.reorderAt);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r1.deficit);
    \u0275\u0275advance(3);
    \u0275\u0275property("queryParams", \u0275\u0275pureFunction1(11, _c2, row_r1.itemId));
  }
}
function LowStockComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 13)(1, "div", 14)(2, "p", 15);
    \u0275\u0275text(3, "Items below threshold");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p", 16);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 17);
    \u0275\u0275text(7, "across the whole catalogue");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 14)(9, "p", 15);
    \u0275\u0275text(10, "Completely out");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "p", 16);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 17);
    \u0275\u0275text(14, "zero units on hand anywhere");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 14)(16, "p", 15);
    \u0275\u0275text(17, "Total shortfall");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "p", 16);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "p", 17);
    \u0275\u0275text(21, "units needed to clear every deficit");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "section", 8)(23, "div", 18)(24, "h2");
    \u0275\u0275text(25, "Reorder list");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 19);
    \u0275\u0275text(27, "Worst deficit first");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 20)(29, "table", 21)(30, "thead")(31, "tr")(32, "th", 22);
    \u0275\u0275text(33, "SKU");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "th", 22);
    \u0275\u0275text(35, "Item");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "th", 23);
    \u0275\u0275text(37, "On hand");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "th", 23);
    \u0275\u0275text(39, "Reorder at");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "th", 23);
    \u0275\u0275text(41, "Deficit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "th", 22)(43, "span", 24);
    \u0275\u0275text(44, "Actions");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(45, "tbody");
    \u0275\u0275repeaterCreate(46, LowStockComponent_Conditional_13_For_47_Template, 18, 13, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.rows().length);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.criticalCount());
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.totalDeficit());
    \u0275\u0275advance(27);
    \u0275\u0275repeater(ctx_r1.rows());
  }
}
var LowStockComponent = class _LowStockComponent {
  constructor() {
    this.rows = signal([
      { itemId: "itm-007", sku: "SKU-007", name: "Corrugated carton 400mm", unit: "ea", totalQty: 96, reorderAt: 150, deficit: 54 },
      { itemId: "itm-002", sku: "SKU-002", name: "M8 hex bolt, 100 pack", unit: "box", totalQty: 18, reorderAt: 25, deficit: 7 },
      { itemId: "itm-008", sku: "SKU-008", name: "Forklift hydraulic oil 20L", unit: "drum", totalQty: 3, reorderAt: 8, deficit: 5 },
      { itemId: "itm-004", sku: "SKU-004", name: "Pallet wrap core", unit: "ea", totalQty: 0, reorderAt: 4, deficit: 4 },
      { itemId: "itm-005", sku: "SKU-005", name: "Thermal label 4\xD76, 1000 pack", unit: "box", totalQty: 20, reorderAt: 20, deficit: 0 }
    ]);
    this.criticalCount = computed(() => this.rows().filter((row) => row.totalQty === 0).length);
    this.totalDeficit = computed(() => this.rows().reduce((total, row) => total + row.deficit, 0));
  }
  static {
    this.\u0275fac = function LowStockComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LowStockComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LowStockComponent, selectors: [["app-low-stock"]], decls: 14, vars: 3, consts: [[1, "page"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "page-sub"], [1, "page-actions"], ["routerLink", "/movements", 1, "btn"], ["routerLink", "/items", 1, "btn", 3, "queryParams"], [1, "card"], [1, "empty"], ["aria-hidden", "true", 1, "empty__icon"], [1, "empty__title"], ["routerLink", "/items", 1, "btn"], [1, "stat-grid"], [1, "stat"], [1, "stat__label"], [1, "stat__value"], [1, "stat__hint"], [1, "card-head"], [1, "subtle", "small"], [1, "table-wrap"], [1, "table", "table--stack"], ["scope", "col"], ["scope", "col", 1, "num"], [1, "sr-only"], ["data-label", "SKU"], [1, "mono", 3, "routerLink"], ["data-label", "Item", 1, "cell-primary"], [1, "badge", "badge-danger"], ["data-label", "On hand", 1, "num"], ["data-label", "Reorder at", 1, "num"], ["data-label", "Deficit", 1, "num"], ["data-label", ""], [1, "actions"], ["routerLink", "/movements/new", 1, "btn", "btn-sm", "btn-primary", 3, "queryParams"]], template: function LowStockComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, "Low stock");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, " Items whose total across every zone has fallen to or below their reorder point. ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "a", 6);
        \u0275\u0275text(9, "Movement log");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "a", 7);
        \u0275\u0275text(11, "View in catalogue");
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(12, LowStockComponent_Conditional_12_Template, 10, 0, "section", 8)(13, LowStockComponent_Conditional_13_Template, 48, 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(10);
        \u0275\u0275property("queryParams", \u0275\u0275pureFunction0(2, _c0));
        \u0275\u0275advance(2);
        \u0275\u0275conditional(ctx.rows().length === 0 ? 12 : 13);
      }
    }, dependencies: [RouterLink], styles: ["\n\n.cell-primary[_ngcontent-%COMP%] {\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LowStockComponent, [{
    type: Component,
    args: [{ selector: "app-low-stock", imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page">
  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">Low stock</h1>
      <p class="page-sub">
        Items whose total across every zone has fallen to or below their reorder point.
      </p>
    </div>
    <div class="page-actions">
      <a routerLink="/movements" class="btn">Movement log</a>
      <a routerLink="/items" [queryParams]="{ lowStock: true }" class="btn">View in catalogue</a>
    </div>
  </div>

  @if (rows().length === 0) {
    <section class="card">
      <div class="empty">
        <span class="empty__icon" aria-hidden="true">\u2713</span>
        <p class="empty__title">Nothing needs reordering</p>
        <p>Every item is above its reorder point.</p>
        <a class="btn" routerLink="/items">Back to items</a>
      </div>
    </section>
  } @else {
    <div class="stat-grid">
      <div class="stat">
        <p class="stat__label">Items below threshold</p>
        <p class="stat__value">{{ rows().length }}</p>
        <p class="stat__hint">across the whole catalogue</p>
      </div>
      <div class="stat">
        <p class="stat__label">Completely out</p>
        <p class="stat__value">{{ criticalCount() }}</p>
        <p class="stat__hint">zero units on hand anywhere</p>
      </div>
      <div class="stat">
        <p class="stat__label">Total shortfall</p>
        <p class="stat__value">{{ totalDeficit() }}</p>
        <p class="stat__hint">units needed to clear every deficit</p>
      </div>
    </div>

    <section class="card">
      <div class="card-head">
        <h2>Reorder list</h2>
        <span class="subtle small">Worst deficit first</span>
      </div>
      <div class="table-wrap">
        <table class="table table--stack">
          <thead>
            <tr>
              <th scope="col">SKU</th>
              <th scope="col">Item</th>
              <th scope="col" class="num">On hand</th>
              <th scope="col" class="num">Reorder at</th>
              <th scope="col" class="num">Deficit</th>
              <th scope="col"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            @for (row of rows(); track row.itemId) {
              <tr>
                <td data-label="SKU"><a class="mono" [routerLink]="['/items', row.itemId]">{{ row.sku }}</a></td>
                <td data-label="Item" class="cell-primary">
                  {{ row.name }}
                  @if (row.totalQty === 0) {
                    <span class="badge badge-danger">Out of stock</span>
                  }
                </td>
                <td data-label="On hand" class="num">{{ row.totalQty }} {{ row.unit }}</td>
                <td data-label="Reorder at" class="num">{{ row.reorderAt }}</td>
                <td data-label="Deficit" class="num"><strong>{{ row.deficit }}</strong></td>
                <td data-label="">
                  <div class="actions">
                    <a
                      class="btn btn-sm btn-primary"
                      routerLink="/movements/new"
                      [queryParams]="{ itemId: row.itemId, type: 'IN' }"
                    >Restock</a>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  }
</div>
`, styles: ["/* src/app/pages/reports/low-stock/low-stock.component.css */\n.cell-primary {\n  font-weight: 600;\n  display: flex;\n  align-items: center;\n  gap: var(--space-2);\n  flex-wrap: wrap;\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LowStockComponent, { className: "LowStockComponent", filePath: "src/app/pages/reports/low-stock/low-stock.component.ts", lineNumber: 12 });
})();
export {
  LowStockComponent
};
