import {
  mergeQueryParams
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
  ɵɵtextInterpolate1
} from "./chunk-VSPK3BNN.js";

// src/app/pages/items/item-form/item-form.component.ts
function ItemFormComponent_Conditional_15_Template(rf, ctx) {
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
function ItemFormComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx);
  }
}
function ItemFormComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 17);
    \u0275\u0275text(1, "Uppercased on save.");
    \u0275\u0275elementEnd();
  }
}
function ItemFormComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r1 = ctx.$implicit;
    \u0275\u0275property("value", option_r1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r1);
  }
}
function ItemFormComponent_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 33);
    \u0275\u0275listener("click", function ItemFormComponent_Conditional_56_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.askDelete());
    });
    \u0275\u0275text(1, "Delete item");
    \u0275\u0275elementEnd();
  }
}
function ItemFormComponent_Conditional_57_Conditional_7_Template(rf, ctx) {
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
function ItemFormComponent_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 34)(2, "div", 35)(3, "h2", 36);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 37);
    \u0275\u0275text(6, "This removes the item from the catalogue. It cannot be undone.");
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ItemFormComponent_Conditional_57_Conditional_7_Template, 2, 1, "p", 10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 38)(9, "button", 39);
    \u0275\u0275listener("click", function ItemFormComponent_Conditional_57_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.closeDelete());
    });
    \u0275\u0275text(10, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 40);
    \u0275\u0275listener("click", function ItemFormComponent_Conditional_57_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.confirmDelete());
    });
    \u0275\u0275text(12, "Delete item");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Delete ", (tmp_1_0 = ctx_r2.existing()) == null ? null : tmp_1_0.sku, "?");
    \u0275\u0275advance(3);
    \u0275\u0275conditional((tmp_2_0 = ctx_r2.deleteError()) ? 7 : -1, tmp_2_0);
  }
}
var ItemFormComponent = class _ItemFormComponent {
  constructor() {
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.id = input("");
    this.items = signal([
      { id: "itm-001", sku: "SKU-001", name: "Galvanised shelf bracket", description: "Heavy duty, 400mm arm", unit: "ea", reorderAt: 40, totalQty: 128 },
      { id: "itm-002", sku: "SKU-002", name: "M8 hex bolt, 100 pack", description: "Zinc plated, DIN 933", unit: "box", reorderAt: 25, totalQty: 18 },
      { id: "itm-008", sku: "SKU-008", name: "Forklift hydraulic oil 20L", description: "ISO VG 46", unit: "drum", reorderAt: 8, totalQty: 3 }
    ]);
    this.units = signal(["ea", "box", "roll", "drum", "pallet", "kg", "litre"]);
    this.editing = computed(() => this.id() !== "");
    this.existing = computed(() => this.items().find((item) => item.id === this.id()) ?? null);
    this.sku = signal("");
    this.name = signal("");
    this.description = signal("");
    this.unit = signal("ea");
    this.reorderAt = signal(0);
    this.skuError = signal(null);
    this.formError = signal(null);
    this.saved = signal(false);
    this.params = toSignal(this.route.queryParamMap, {
      initialValue: this.route.snapshot.queryParamMap
    });
    this.confirmingDelete = computed(() => this.params().get("modal") === "confirm-delete" && this.editing());
    this.deleteError = signal(null);
    effect(() => {
      const item = this.existing();
      if (!item)
        return;
      this.sku.set(item.sku);
      this.name.set(item.name);
      this.description.set(item.description ?? "");
      this.unit.set(item.unit);
      this.reorderAt.set(item.reorderAt);
    });
  }
  save() {
    this.skuError.set(null);
    this.formError.set(null);
    const sku = this.sku().trim().toUpperCase();
    if (!sku) {
      this.skuError.set("A SKU is required.");
      return;
    }
    if (!this.name().trim()) {
      this.formError.set("Give the item a name so the floor can identify it.");
      return;
    }
    if (this.reorderAt() < 0) {
      this.formError.set("The reorder point cannot be negative.");
      return;
    }
    const clash = this.items().find((item) => item.sku === sku && item.id !== this.id());
    if (clash) {
      this.skuError.set(`${sku} is already used by \u201C${clash.name}\u201D. SKUs must be unique.`);
      return;
    }
    this.saved.set(true);
    void this.router.navigate(["/items"]);
  }
  askDelete() {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: "confirm-delete", id: this.id() });
  }
  closeDelete() {
    this.deleteError.set(null);
    mergeQueryParams(this.router, { modal: null, id: null });
  }
  confirmDelete() {
    const item = this.existing();
    if (item && item.totalQty > 0) {
      this.deleteError.set(`${item.sku} is referenced by recorded movements and still holds ${item.totalQty} ${item.unit}. Movements are immutable, so this item cannot be deleted.`);
      return;
    }
    void this.router.navigate(["/items"]);
  }
  static {
    this.\u0275fac = function ItemFormComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ItemFormComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ItemFormComponent, selectors: [["app-item-form"]], inputs: { id: [1, "id"] }, decls: 58, vars: 14, consts: [[1, "page", "page--narrow"], [1, "breadcrumb"], ["routerLink", "/items"], ["aria-hidden", "true"], [1, "page-head"], [1, "page-head__text"], [1, "page-title"], [1, "page-sub"], [1, "card"], ["novalidate", "", 1, "card-body", "form", 3, "ngSubmit"], ["role", "alert", 1, "alert", "alert-danger"], [1, "form-grid"], [1, "field"], ["for", "sku", 1, "label"], [1, "req"], ["id", "sku", "name", "sku", "placeholder", "SKU-009", 1, "input", 3, "ngModelChange", "ngModel"], [1, "field-error"], [1, "hint"], ["for", "unit", 1, "label"], ["id", "unit", "name", "unit", 1, "select", 3, "ngModelChange", "ngModel"], [3, "value"], [1, "field", "field--wide"], ["for", "name", 1, "label"], ["id", "name", "name", "name", "placeholder", "Galvanised shelf bracket", 1, "input", 3, "ngModelChange", "ngModel"], ["for", "description", 1, "label"], ["id", "description", "name", "description", "placeholder", "Specification, supplier reference, anything the floor needs.", 1, "textarea", 3, "ngModelChange", "ngModel"], ["for", "reorderAt", 1, "label"], ["id", "reorderAt", "name", "reorderAt", "type", "number", "min", "0", 1, "input", 3, "ngModelChange", "ngModel"], [1, "form-actions"], ["type", "submit", 1, "btn", "btn-primary"], ["routerLink", "/items", 1, "btn"], ["type", "button", 1, "btn", "btn-danger", "row-end"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "delete-item-title", 1, "modal-backdrop"], ["type", "button", 1, "btn", "btn-danger", "row-end", 3, "click"], [1, "modal"], [1, "modal__body"], ["id", "delete-item-title"], [1, "muted"], [1, "modal__actions"], ["type", "button", 1, "btn", 3, "click"], ["type", "button", 1, "btn", "btn-danger", 3, "click"]], template: function ItemFormComponent_Template(rf, ctx) {
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
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p", 7);
        \u0275\u0275text(12, " SKUs are stored uppercase and must be unique across the whole catalogue. ");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(13, "section", 8)(14, "form", 9);
        \u0275\u0275listener("ngSubmit", function ItemFormComponent_Template_form_ngSubmit_14_listener() {
          return ctx.save();
        });
        \u0275\u0275template(15, ItemFormComponent_Conditional_15_Template, 2, 1, "p", 10);
        \u0275\u0275elementStart(16, "div", 11)(17, "div", 12)(18, "label", 13);
        \u0275\u0275text(19, "SKU ");
        \u0275\u0275elementStart(20, "span", 14);
        \u0275\u0275text(21, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(22, "input", 15);
        \u0275\u0275listener("ngModelChange", function ItemFormComponent_Template_input_ngModelChange_22_listener($event) {
          return ctx.sku.set($event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275template(23, ItemFormComponent_Conditional_23_Template, 2, 1, "p", 16)(24, ItemFormComponent_Conditional_24_Template, 2, 0, "p", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "div", 12)(26, "label", 18);
        \u0275\u0275text(27, "Unit of measure ");
        \u0275\u0275elementStart(28, "span", 14);
        \u0275\u0275text(29, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(30, "select", 19);
        \u0275\u0275listener("ngModelChange", function ItemFormComponent_Template_select_ngModelChange_30_listener($event) {
          return ctx.unit.set($event);
        });
        \u0275\u0275repeaterCreate(31, ItemFormComponent_For_32_Template, 2, 2, "option", 20, \u0275\u0275repeaterTrackByIdentity);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "div", 21)(34, "label", 22);
        \u0275\u0275text(35, "Item name ");
        \u0275\u0275elementStart(36, "span", 14);
        \u0275\u0275text(37, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(38, "input", 23);
        \u0275\u0275listener("ngModelChange", function ItemFormComponent_Template_input_ngModelChange_38_listener($event) {
          return ctx.name.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "div", 21)(40, "label", 24);
        \u0275\u0275text(41, "Description");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "textarea", 25);
        \u0275\u0275listener("ngModelChange", function ItemFormComponent_Template_textarea_ngModelChange_42_listener($event) {
          return ctx.description.set($event);
        });
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(43, "div", 12)(44, "label", 26);
        \u0275\u0275text(45, "Reorder point ");
        \u0275\u0275elementStart(46, "span", 14);
        \u0275\u0275text(47, "*");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(48, "input", 27);
        \u0275\u0275listener("ngModelChange", function ItemFormComponent_Template_input_ngModelChange_48_listener($event) {
          return ctx.reorderAt.set(+$event);
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(49, "p", 17);
        \u0275\u0275text(50, "Flagged as low stock when the total across all zones falls to this number.");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(51, "div", 28)(52, "button", 29);
        \u0275\u0275text(53);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "a", 30);
        \u0275\u0275text(55, "Cancel");
        \u0275\u0275elementEnd();
        \u0275\u0275template(56, ItemFormComponent_Conditional_56_Template, 2, 0, "button", 31);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(57, ItemFormComponent_Conditional_57_Template, 13, 2, "div", 32);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        let tmp_0_0;
        let tmp_2_0;
        let tmp_5_0;
        \u0275\u0275advance(6);
        \u0275\u0275textInterpolate1(" ", ctx.editing() ? (tmp_0_0 = ctx.existing()) == null ? null : tmp_0_0.sku : "New item", " ");
        \u0275\u0275advance(4);
        \u0275\u0275textInterpolate(ctx.editing() ? "Edit item" : "New item");
        \u0275\u0275advance(5);
        \u0275\u0275conditional((tmp_2_0 = ctx.formError()) ? 15 : -1, tmp_2_0);
        \u0275\u0275advance(7);
        \u0275\u0275classProp("is-invalid", ctx.skuError() !== null);
        \u0275\u0275property("ngModel", ctx.sku());
        \u0275\u0275advance();
        \u0275\u0275conditional((tmp_5_0 = ctx.skuError()) ? 23 : 24, tmp_5_0);
        \u0275\u0275advance(7);
        \u0275\u0275property("ngModel", ctx.unit());
        \u0275\u0275advance();
        \u0275\u0275repeater(ctx.units());
        \u0275\u0275advance(7);
        \u0275\u0275property("ngModel", ctx.name());
        \u0275\u0275advance(4);
        \u0275\u0275property("ngModel", ctx.description());
        \u0275\u0275advance(6);
        \u0275\u0275property("ngModel", ctx.reorderAt());
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.editing() ? "Save changes" : "Create item");
        \u0275\u0275advance(3);
        \u0275\u0275conditional(ctx.editing() ? 56 : -1);
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.confirmingDelete() ? 57 : -1);
      }
    }, dependencies: [FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, NumberValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, MinValidator, NgModel, NgForm, RouterLink], styles: ["\n\n.page--narrow[_ngcontent-%COMP%] {\n  max-width: 760px;\n}"], changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemFormComponent, [{
    type: Component,
    args: [{ selector: "app-item-form", imports: [FormsModule, RouterLink], changeDetection: ChangeDetectionStrategy.OnPush, template: `<div class="page page--narrow">
  <p class="breadcrumb">
    <a routerLink="/items">Items</a> <span aria-hidden="true">/</span>
    {{ editing() ? existing()?.sku : 'New item' }}
  </p>

  <div class="page-head">
    <div class="page-head__text">
      <h1 class="page-title">{{ editing() ? 'Edit item' : 'New item' }}</h1>
      <p class="page-sub">
        SKUs are stored uppercase and must be unique across the whole catalogue.
      </p>
    </div>
  </div>

  <section class="card">
    <form class="card-body form" (ngSubmit)="save()" novalidate>
      @if (formError(); as message) {
        <p class="alert alert-danger" role="alert">{{ message }}</p>
      }

      <div class="form-grid">
        <div class="field">
          <label class="label" for="sku">SKU <span class="req">*</span></label>
          <input
            id="sku"
            name="sku"
            class="input"
            [class.is-invalid]="skuError() !== null"
            placeholder="SKU-009"
            [ngModel]="sku()"
            (ngModelChange)="sku.set($event)"
          />
          @if (skuError(); as message) {
            <p class="field-error">{{ message }}</p>
          } @else {
            <p class="hint">Uppercased on save.</p>
          }
        </div>

        <div class="field">
          <label class="label" for="unit">Unit of measure <span class="req">*</span></label>
          <select id="unit" name="unit" class="select" [ngModel]="unit()" (ngModelChange)="unit.set($event)">
            @for (option of units(); track option) {
              <option [value]="option">{{ option }}</option>
            }
          </select>
        </div>

        <div class="field field--wide">
          <label class="label" for="name">Item name <span class="req">*</span></label>
          <input
            id="name"
            name="name"
            class="input"
            placeholder="Galvanised shelf bracket"
            [ngModel]="name()"
            (ngModelChange)="name.set($event)"
          />
        </div>

        <div class="field field--wide">
          <label class="label" for="description">Description</label>
          <textarea
            id="description"
            name="description"
            class="textarea"
            placeholder="Specification, supplier reference, anything the floor needs."
            [ngModel]="description()"
            (ngModelChange)="description.set($event)"
          ></textarea>
        </div>

        <div class="field">
          <label class="label" for="reorderAt">Reorder point <span class="req">*</span></label>
          <input
            id="reorderAt"
            name="reorderAt"
            type="number"
            min="0"
            class="input"
            [ngModel]="reorderAt()"
            (ngModelChange)="reorderAt.set(+$event)"
          />
          <p class="hint">Flagged as low stock when the total across all zones falls to this number.</p>
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary">{{ editing() ? 'Save changes' : 'Create item' }}</button>
        <a class="btn" routerLink="/items">Cancel</a>
        @if (editing()) {
          <button type="button" class="btn btn-danger row-end" (click)="askDelete()">Delete item</button>
        }
      </div>
    </form>
  </section>

  @if (confirmingDelete()) {
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="delete-item-title">
      <div class="modal">
        <div class="modal__body">
          <h2 id="delete-item-title">Delete {{ existing()?.sku }}?</h2>
          <p class="muted">This removes the item from the catalogue. It cannot be undone.</p>
          @if (deleteError(); as message) {
            <p class="alert alert-danger" role="alert">{{ message }}</p>
          }
        </div>
        <div class="modal__actions">
          <button type="button" class="btn" (click)="closeDelete()">Cancel</button>
          <button type="button" class="btn btn-danger" (click)="confirmDelete()">Delete item</button>
        </div>
      </div>
    </div>
  }
</div>
`, styles: ["/* src/app/pages/items/item-form/item-form.component.css */\n.page--narrow {\n  max-width: 760px;\n}\n"] }]
  }], () => [], null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ItemFormComponent, { className: "ItemFormComponent", filePath: "src/app/pages/items/item-form/item-form.component.ts", lineNumber: 15 });
})();
export {
  ItemFormComponent
};
