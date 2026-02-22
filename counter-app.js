/**
 * Copyright 2026 Mayita
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0;
    this.min = 0;
    this.max = 30;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
      min: { type: Number },
      max: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-warningLightt);
        font-family: var(--ddd-font-navigation);
      }
      :host([count="18"]) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host([count="21"]){
        color: var(--ddd-theme-default-original87Pink);
      }
      :host(.at-min) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host(.at-max) {
        color: var(--ddd-theme-default-athertonViolet);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        background-color: var(--ddd-theme-default-warningLight);
      }
      .counter {
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-l));
        display: flex;
        justify-content: center;
        margin-bottom: var(--ddd-spacing-4);
      }
      button {
        background-color: var(--ddd-theme-default-alertImmediate);
        font-size: var(--counter-app-button-font-size, var(--ddd-font-size-s));
        margin: var(--ddd-spacing-2);
        border-radius: var(--ddd-radius-lg);
        transition: background-color 0.3s, transform 0.3s;
      }
      button:hover{
        background-color: var(--ddd-theme-default-athertonViolet);
        transform: scale(1.1);
      }
      
      .buttons {
        display: flex;
        justify-content: center;
        margin-bottom: var(--ddd-spacing-4);
      }
    `];
  }

  render() {
    return html`
    <confetti-container id="confetti">
    <div class="wrapper">
       <div class="counter">${this.count}</div>
       <div class="buttons">
        <button @click="${this.decrease}" ?disabled="${this.min === this.count}">-</button>
       <button @click="${this.increase}" ?disabled="${this.max === this.count}">+</button>
      
       </div>
    </div>
    </confetti-container>
    `;
  }

  increase() {
    this.count++; //increment count up by one (depends on what the count has been set to either default or in the index)
  }

  decrease() {
    this.count--;
  }
  
  reset() {
    this.count = 0;
  }


  updated(changedProperties) { //runs every time the count property is updated, checks if the count is 21
  if (super.updated) {
    super.updated(changedProperties);
  }
  if (changedProperties.has('count')) {
    if (this.count === 21) {
      this.makeItRain(); //calls make it rain function set below (can only work when npm install @haxtheweb/multiple-choice --save is run)
    }
  }
}

updated(changedProperties) { //same logic as above, but it toggles the counter app class to at-min/max, so that we can apply css to it
  if (changedProperties.has("count")) {
    this.classList.toggle("at-min", this.count == this.min); //change class to at min when count = min
    this.classList.toggle("at-max", this.count == this.max); //change class to at max when count = max
  }
}

makeItRain() {
  import("@haxtheweb/multiple-choice/lib/confetti-container.js").then( //imports custom id tag confetti-container
    (module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}


  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);