import { html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators";
import { createCloseHeading } from "../../../homeassistant-frontend/src/components/ha-dialog";
import { HacsStyles } from "../../styles/hacs-common-style";
import { hacsStyleDialog, scrollBarStyle } from "../../styles/element-styles";
import { HacsDialogBase } from "./hacs-dialog-base";

@customElement("hacs-dialog")
export class HacsDialog extends HacsDialogBase {
  @property({ type: Boolean }) public hideActions = false;

  @property({ type: Boolean }) public scrimClickAction = false;

  @property({ type: Boolean }) public escapeKeyAction = false;

  @property({ type: Boolean }) public noClose = false;

  @property() public title!: string;

  protected render(): TemplateResult | void {
    if (!this.active) {
      return html``;
    }

    return html`<ha-dialog
      ?open=${this.active}
      ?scrimClickAction=${this.scrimClickAction}
      ?escapeKeyAction=${this.escapeKeyAction}
      @closed=${this.closeDialog}
      ?hideActions=${this.hideActions}
      .heading=${!this.noClose ? createCloseHeading(this.hass, this.title) : this.title}
    >
      <div class="content scroll" ?narrow=${this.narrow}>
        <slot></slot>
      </div>
      <slot class="primary" name="primaryaction" slot="primaryAction"></slot>
      <slot class="secondary" name="secondaryaction" slot="secondaryAction"></slot>
    </ha-dialog>`;
  }

  public closeDialog() {
    this.active = false;
    this.dispatchEvent(
      new CustomEvent("closed", {
        bubbles: true,
        composed: true,
      })
    );
  }

  static get styles() {
    return [hacsStyleDialog, scrollBarStyle, HacsStyles];
  }
}
