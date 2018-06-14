import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import './kwc-dial.js';
import './kwc-numpad.js';

class KwcDialNumpad extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-block;
                    background-color: var(--kwc-numpad-background, #292F35);
                    z-index: 100000;
                    border-radius: 5px;
                }
                kwc-dial {
                    display: flex;
                    flex-direction: column;
                }
                kwc-numpad {
                    display: block;
                    text-align: center;
                    padding-top: 8px;
                }
            </style>
            <kwc-dial></kwc-dial>
            <kwc-numpad><kwc-numpad>
        `;
    }

    static get is() { return 'kwc-dial-numpad'; }
    static get properties() {
        return {
            value: {
                type: Number,
                notify: true,
                observer: '_valueChanged',
            },
            prefix: {
                type: String,
                value: '',
                notify: true,
                observer: 'applyDialAttributes',
            },
            suffix: {
                type: String,
                value: '',
                notify: true,
                observer: 'applyDialAttributes',
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.attachListeners();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachListeners();
    }

    attachListeners() {
        this.shadowRoot.querySelector("kwc-dial").addEventListener("value-changed", (e) => {
            this.updateValue(e);
        });

        this.shadowRoot.querySelector("kwc-numpad").addEventListener("value-changed", (e) => {
            this.updateValue(e);
        });
    }
    
    detachListeners() {
        this.shadowRoot.querySelector("kwc-dial").removeEventListener("value-changed", (e) => {
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
        let dial = this.shadowRoot.querySelector('kwc-dial');
        let numpad = this.shadowRoot.querySelector('kwc-numpad');

        dial.set("value", this.value);
        numpad.set("value", this.value);
    }

    applyDialAttributes() {
        let prefix = this.prefix;
        let suffix = this.suffix;

        this.shadowRoot.querySelector("kwc-dial").setAttribute("prefix", prefix);
        this.shadowRoot.querySelector("kwc-dial").setAttribute("suffix", suffix);
    }
}
customElements.define(KwcDialNumpad.is, KwcDialNumpad);