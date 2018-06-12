import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import './kwc-slider.js';
import './kwc-dial.js';

class KwcDialSlider extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-block;
                    background-color: var(--kwc-numpad-background, #292F35);
                    z-index: 100000;
                    border-radius: 5px;
                }
                kwc-slider {
                    display: block;
                    padding-top: 0;
                }
            </style>
            <kwc-dial></kwc-dial>
            <kwc-slider></kwc-slider>
        `;
    }

    static get is() { return 'kwc-dial-slider'; }
    static get properties() {
        return {
            value: {
                type: Number,
                notify: true,
                observer: '_valueChanged',
            },
            max: {
                type: Number,
                value: 100,
                notify: true,
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.attachListeners();
        this.applyMax();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachListeners();
    }

    attachListeners() {
        this.shadowRoot.querySelector("kwc-slider").addEventListener("value-changed", (e) => {
            this.updateValue(e);
        });

        this.shadowRoot.querySelector("kwc-dial").addEventListener("value-changed", (e) => {
            this.updateValue(e);
        });
    }
    
    detachListeners() {
        this.shadowRoot.querySelector("kwc-slider").removeEventListener("value-changed", (e) => {
            this.updateValue(e);
        });

        this.shadowRoot.querySelector("kwc-dial").removeEventListener("value-changed", (e) => {
            this.updateValue(e);
        });
    }

    updateValue(e) {
        this.set("value", e.detail.value);
    }

    _valueChanged() {
        let slider = this.shadowRoot.querySelector('kwc-slider');
        let dial = this.shadowRoot.querySelector('kwc-dial');

        slider.set("value", this.value);
        dial.set("value", this.value);
    }

    applyMax() {
        let max = this.max;
        this.shadowRoot.querySelector("kwc-slider").setAttribute("max", max);
    }
}
customElements.define(KwcDialSlider.is, KwcDialSlider);