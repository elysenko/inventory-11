import {
  mergeQueryParams,
  readNumber
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
  ɵɵpureFunction1,
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

// src/app/pages/locations/location-list/location-list.component.ts
var _c0 = (a0) => ["/locations", a0, "edit"];
var _forTrack0 = ($index, $item) => $item.id;
function LocationListComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "span", 12);
    \u0275\u0275text(2, "\u2317");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 13);
    \u0275\u0275text(4, "No locations yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Add a zone before recording any stock movements.");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "a", 7);
    \u0275\u0275text(8, "Create a location");
    \u0275\u0275elementEnd()();
  }
}
function LocationListComponent_Conditional_14_For_17_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 27);
    \u0275\u0275text(1, "Empty");
    \u0275\u0275elementEnd();
  }
}
function LocationListComponent_Conditional_14_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 24);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 25);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 26);
    \u0275\u0275text(8);
    \u0275\u0275template(9, LocationListComponent_Conditional_14_For_17_Conditional_9_Template, 2, 0, "span", 27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 28)(11, "div", 29)(12, "a", 30);
    \u0275\u0275text(13, "Edit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 31);
    \u0275\u0275listener("click", function LocationListComponent_Conditional_14_For_17_Template_button_click_14_listener() {
      const location_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.askDelete(location_r3));
    });
    \u0275\u0275text(15, "Delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const location_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r3.zone);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(location_r3.itemCount);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", location_r3.totalQty, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(location_r3.totalQty === 0 ? 9 : -1);
    \u0275\u0275advance(3);
    \u0275\u0275property("routerLink", \u0275\u0275pureFunction1(6, _c0, location_r3.id));
  }
}
function LocationListComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 14)(1, "table", 15)(2, "thead")(3, "tr")(4, "th", 16);
    \u0275\u0275text(5, "Location");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 16);
    \u0275\u0275text(7, "Zone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 17);
    \u0275\u0275text(9, "Distinct items");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 17);
    \u0275\u0275text(11, "Units held");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 16)(13, "span", 18);
    \u0275\u0275text(14, "Actions");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(15, "tbody");
    \u0275\u0275repeaterCreate(16, LocationListComponent_Conditional_14_For_17_Template, 16, 8, "tr", null, _forTrack0);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 19)(19, "span");
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 20)(22, "button", 21);
    \u0275\u0275listener("click", function LocationListComponent_Conditional_14_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToPage(ctx_r3.currentPage() - 1));
    });
    \u0275\u0275text(23, " Previous ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 22);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 21);
    \u0275\u0275listener("click", function LocationListComponent_Conditional_14_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToPage(ctx_r3.currentPage() + 1));
    });
    \u0275\u0275text(27, " Next ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275repeater(ctx_r3.rows());
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("", ctx_r3.locations().length, " locations");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r3.currentPage() <= 1);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2("Page ", ctx_r3.currentPage(), " of ", ctx_r3.pageCount(), "");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r3.currentPage() >= ctx_r3.pageCount());
  }
}
function LocationListComponent_Conditional_17_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function LocationListComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11)(1, "div", 32)(2, "div", 33)(3, "h2", 34);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 35);
    \u0275\u0275text(6, "Locations that still hold stock cannot be deleted.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, LocationListComponent_Conditional_17_Conditional_7_Template, 2, 1, "p", 36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 37)(9, "button", 38);
    \u0275\u0275listener("click", function LocationListComponent_Conditional_17_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.closeDelete());
    });
    \u0275\u0275text(10, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 39);
    \u0275\u0275listener("click", function LocationListComponent_Conditional_17_Template_button_click_11_listener() {
      const target_r6 = \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.confirmDelete(target_r6));
    });
    \u0275\u0275text(12, "Delete location");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    const target_r6 = ctx;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("Delete ", target_r6.name, " \xB7 ", target_r6.zone, "?");
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_3_0 = ctx_r3.deleteError()) ? 7 : -1, tmp_3_0);
  }
}
var PAGE_SIZE = 5;
var LocationListComponent = class _LocationListComponent {
  constructor() {
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.locations = signal([
      { id: "loc-a", name: "Main", zone: "Zone A", itemCount: 6, totalQty: 412 },
      { id: "loc-b", name: "Main", zone: "Zone B", itemCount: 5, totalQty: 268 },
      { id: "loc-c", name: "Overflow", zone: "Zone C", itemCount: 4, totalQty: 131 },
      { id: "loc-d", name: "Goods in", zone: "Dock 1", itemCount: 2, totalQty: 34 },
      { id: "loc-e", name: "Quarantine", zone: "Zone Q", itemCount: 0, totalQty: 0 },
      { id: "loc-f", name: "Returns", zone: "Dock 2", itemCount: 0, totalQty: 0 }
    ]);
    this.params = toSignal(this.route.queryParamMap, {
      initialValue: this.route.snapshot.queryParamMap
    });
    this.page = computed(() => readNumber(this.params().get("page"), 1));
    this.pageCount = computed(() => Math.max(1, Math.ceil(this.locations().length / PAGE_SIZE)));
    this.currentPage = computed(() => Math.min(this.page(), this.pageCount()));
    this.rows = computed(() => {
      const start = (this.currentPage() - 1) * PAGE_SIZE;
      return this.locations().slice(start, start + PAGE_SIZE);
    });
    this.deleteId = computed(() => this.params().get("modal") === "confirm-delete" ? this.params().get("id") : null);
    this.pendingDelete = computed(() => this.locations().find((row) => row.id === this.deleteId()) ?? null);
    this.deleteError = signal(null);
  }
  goToPage(page) {
    mergeQueryParams(this.router, { page: page <= 1 ? null : page });
  }
  askDelete(location) {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: "confirm-delete", id: location.id });
  }
  closeDelete() {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: null, id: null });
  }
  confirmDelete(location) {
    if (location.totalQty > 0) {
      this.deleteError.set(`${location.name} \xB7 ${location.zone} still holds ${location.totalQty} units across ${location.itemCount} items. Transfer the stock out before deleting it.`);
      return;
    }
    this.locations.update((rows) => rows.filter((row) => row.id !== location.id));
    this.closeDelete();
  }
  static {
    this.\u0275fac = function LocationListComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LocationListComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LocationListComponent, selectors: [["app-location-list"]], decls: 18, vars: 2, consts: [[1, "page"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "page-sub"], [1, "page-actions"], ["routerLink", "/items", 1, "btn"], ["routerLink", "/locations/new", 1, "btn", "btn-primary"], [1, "card"], [1, "empty"], ["routerLink", "/locations/new", 1, "fab"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "delete-loc-title", 1, "modal-backdrop"], ["aria-hidden", "true", 1, "empty__icon"], [1, "empty__title"], [1, "table-wrap"], [1, "table", "table--stack"], ["scope", "col"], ["scope", "col", 1, "num"], [1, "sr-only"], [1, "pager"], [1, "pager__controls"], ["type", "button", 1, "btn", "btn-sm", 3, "click", "disabled"], [1, "pager__page"], ["data-label", "Location", 1, "cell-primary"], ["data-label", "Zone"], ["data-label", "Distinct items", 1, "num"], ["data-label", "Units held", 1, "num"], [1, "badge", "badge-neutral"], ["data-label", ""], [1, "actions"], [1, "btn", "btn-sm", 3, "routerLink"], ["type", "button", 1, "btn", "btn-sm", 3, "click"], [1, "modal"], [1, "modal__body"], ["id", "delete-loc-title"], [1, "muted"], ["role", "alert", 1, "alert", "alert-danger"], [1, "modal__actions"], ["type", "button", 1, "btn", 3, "click"], ["type", "button", 1, "btn", "btn-danger", 3, "click"]], template: function LocationListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, "Locations");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "p", 4);
        \u0275\u0275text(6, "Storage areas and zones stock can be booked into. Manager access only.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(7, "div", 5)(8, "a", 6);
        \u0275\u0275text(9, "Items");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "a", 7);
        \u0275\u0275text(11, "\uFF0B New location");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(12, "section", 8);
        \u0275\u0275template(13, LocationListComponent_Conditional_13_Template, 9, 0, "div", 9)(14, LocationListComponent_Conditional_14_Template, 28, 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(15, "a", 10);
        \u0275\u0275text(16, "\uFF0B New location");
        \u0275\u0275elementEnd();
        \u0275\u0275template(17, LocationListComponent_Conditional_17_Template, 13, 3, "div", 11);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_1_0;
        \u0275\u0275advance(13);
        \u0275\u0275conditional(ctx.rows().length === 0 ? 13 : 14);
        \u0275\u0275advance(4);
        \u0275\u0275conditional((tmp_1_0 = ctx.pendingDelete()) ? 17 : -1, tmp_1_0);
      }
    }, dependencies: [RouterLink], styles: ["\n\n.cell-primary[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.pager__page[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0 var(--space-2);\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LocationListComponent, [{
    type: Component,
    args: [{ selector: "app-location-list", imports: [RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page">
  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">Locations</h1>
      <p class="page-sub">Storage areas and zones stock can be booked into. Manager access only.</p>
    </div>
    <div class="page-actions">
      <a routerLink="/items" class="btn">Items</a>
      <a routerLink="/locations/new" class="btn btn-primary">\uFF0B New location</a>
    </div>
  </div>

  <section class="card">
    @if (rows().length === 0) {
      <div class="empty">
        <span class="empty__icon" aria-hidden="true">\u2317</span>
        <p class="empty__title">No locations yet</p>
        <p>Add a zone before recording any stock movements.</p>
        <a class="btn btn-primary" routerLink="/locations/new">Create a location</a>
      </div>
    } @else {
      <div class="table-wrap">
        <table class="table table--stack">
          <thead>
            <tr>
              <th scope="col">Location</th>
              <th scope="col">Zone</th>
              <th scope="col" class="num">Distinct items</th>
              <th scope="col" class="num">Units held</th>
              <th scope="col"><span class="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            @for (location of rows(); track location.id) {
              <tr>
                <td data-label="Location" class="cell-primary">{{ location.name }}</td>
                <td data-label="Zone">{{ location.zone }}</td>
                <td data-label="Distinct items" class="num">{{ location.itemCount }}</td>
                <td data-label="Units held" class="num">
                  {{ location.totalQty }}
                  @if (location.totalQty === 0) {
                    <span class="badge badge-neutral">Empty</span>
                  }
                </td>
                <td data-label="">
                  <div class="actions">
                    <a class="btn btn-sm" [routerLink]="['/locations', location.id, 'edit']">Edit</a>
                    <button type="button" class="btn btn-sm" (click)="askDelete(location)">Delete</button>
                  </div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <div class="pager">
        <span>{{ locations().length }} locations</span>
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

  <a routerLink="/locations/new" class="fab">\uFF0B New location</a>

  @if (pendingDelete(); as target) {
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="delete-loc-title">
      <div class="modal">
        <div class="modal__body">
          <h2 id="delete-loc-title">Delete {{ target.name }} \xB7 {{ target.zone }}?</h2>
          <p class="muted">Locations that still hold stock cannot be deleted.</p>
          @if (deleteError(); as message) {
            <p class="alert alert-danger" role="alert">{{ message }}</p>
          }
        </div>
        <div class="modal__actions">
          <button type="button" class="btn" (click)="closeDelete()">Cancel</button>
          <button type="button" class="btn btn-danger" (click)="confirmDelete(target)">Delete location</button>
        </div>
      </div>
    </div>
  }
</div>
`, styles: ["/* src/app/pages/locations/location-list/location-list.component.css */\n.cell-primary {\n  font-weight: 600;\n}\n.pager__page {\n  display: inline-flex;\n  align-items: center;\n  padding: 0 var(--space-2);\n}\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LocationListComponent, { className: "LocationListComponent", filePath: "src/app/pages/locations/location-list/location-list.component.ts", lineNumber: 16 });
})();
export {
  LocationListComponent
};
