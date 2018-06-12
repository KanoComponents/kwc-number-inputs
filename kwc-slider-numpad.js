import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import './kwc-slider.js';
import './kwc-numpad.js';

class KwcSliderNumpad extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-block;
                    background-color: var(--kwc-numpad-background, #292F35);
                    z-index: 100000;
                    border-radius: 5px;
                    padding: 4px 17px 16px;
                }
                kwc-numpad {
                    text-align: center;
                }
            </style>
            <kwc-slider></kwc-slider>
            <kwc-numpad><kwc-numpad>
        `;
    }

    static get is() { return 'kwc-slider-numpad'; }
    static get properties() {
        return {
            value: {
                type: Number,
                notify: true,
                observer: '_valueChanged',
            },
            min: {
                type: Number,
                value: 0,
                notify: true,
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
        this.applyRange();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachListeners();
    }

    attachListeners() {
        this.shadowRoot.querySelector("kwc-slider").addEventListener("value-changed", (e) => {
            this.updateValue(e);
        });

        this.shadowRoot.querySelector("kwc-numpad").addEventListener("value-changed", (e) => {
            this.updateValue(e);
        });
    }
    
    detachListeners() {
        this.shadowRoot.querySelector("kwc-slider").removeEventListener("value-changed", (e) => {
            this.updateValue(e);
        });

        this.shadowRoot.querySelector("kwc-numpad").removeEventListener("value-changed", (e) => {
            this.updateValue(e);
        });
    }

    updateValue(e) {
        this.set("value", e.detail.value);
    }

    _valueChanged() {
        let slider = this.shadowRoot.querySelector('kwc-slider');
        let numpad = this.shadowRoot.querySelector('kwc-numpad');

        slider.set("value", this.value);
        numpad.set("value", this.value);
    }

    applyRange() {
        let min = this.min;
        let max = this.max;

        this.shadowRoot.querySelector("kwc-slider").setAttribute("min", min);
        this.shadowRoot.querySelector("kwc-slider").setAttribute("max", max);
    }
}
customElements.define(KwcSliderNumpad.is, KwcSliderNumpad);