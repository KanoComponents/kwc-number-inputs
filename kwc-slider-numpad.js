import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import './kwc-slider.js';
import './kwc-numpad.js';

class KwcSliderNumpad extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-table;
                    background-color: var(--kwc-numpad-background, #292F35);
                    z-index: 100000;
                    border-radius: 5px;
                    padding-top: 4px;
                }
                kwc-slider {
                    display: block;
                    padding-bottom: 9.5px;
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
                observer: 'applyRange',
            },
            max: {
                type: Number,
                value: 100,
                notify: true,
                observer: 'applyRange',
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
        this.shadowRoot.querySelector('kwc-slider').addEventListener('value-changed', (e) => {
            this.updateValue(e);
        });

        this.shadowRoot.querySelector('kwc-numpad').addEventListener('value-changed', (e) => {
            this.updateValue(e);
        });
    }
    detachListeners() {
        this.shadowRoot.querySelector('kwc-slider').removeEventListener('value-changed', (e) => {
            this.updateValue(e);
        });

        this.shadowRoot.querySelector('kwc-numpad').removeEventListener('value-changed', (e) => {
            this.updateValue(e);
        });
    }

    updateValue(e) {
        this.set('value', e.detail.value);
    }

    _valueChanged() {
        const slider = this.shadowRoot.querySelector('kwc-slider');
        const numpad = this.shadowRoot.querySelector('kwc-numpad');

        slider.set('value', this.value);
        numpad.set('value', this.value);
    }

    applyRange() {
        const { min } = this;
        const { max } = this;

        this.shadowRoot.querySelector('kwc-slider').setAttribute('min', min);
        this.shadowRoot.querySelector('kwc-slider').setAttribute('max', max);
    }
}
customElements.define(KwcSliderNumpad.is, KwcSliderNumpad);
