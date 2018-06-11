import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/elements/custom-style.js';

class KwcSlider extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-block;
                    padding: 16.5px 21px 23.5px 20px;
                    background-color: var(--color-5, #292F35);
                    z-index: 100000;
                    border-radius: 5px;
                }
                :host::selection,
                :host *::selection {
                    background-color: transparent;
                }
                .slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 3px;
                    background: var(--color-1, #1A1A1A);
                    position: relative;
                    right: 1.5px;
                    outline: none;
                    border-radius: 25px;
                }
                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 14px;
                    height: 20.5px;
                    background: var(--color-2, #FF6B00);
                    border: 1.5px solid var(--color-4, #FFF);
                    border-radius: 25px;
                    cursor: pointer;
                }
                .slider::-moz-range-thumb {
                    width: 14px;
                    height: 20.5px;
                    background: var(--color-2, #FF6B00);
                    border: 1.5px solid var(--color-4, #FFF);
                    border-radius: 25px;
                    cursor: pointer;
                }
            </style>
            <input type='range' min='0' max='360' value='{{value}}' class='slider' id='horizontalSlider'>
        `;
    }

    static get is() { return 'kwc-slider'; }
    static get properties() {
        return {
            value: {
                type: Number,
                notify: true,
                value: 0,
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.attachListeners();
        this.applyColors();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachListeners();
    }

    attachListeners() {
        let horizontalSlider = this.shadowRoot.querySelector('#horizontalSlider');

        horizontalSlider.addEventListener('onchange', () => {
            this.set('value', horizontalSlider.value);
        });

        horizontalSlider.addEventListener('input', () => {
            this.set('value', horizontalSlider.value);
        });
    }
    
    detachListeners() {
        let horizontalSlider = this.shadowRoot.querySelector('#horizontalSlider');

        horizontalSlider.removeEventListener('onchange', () => {
            this.set('value', horizontalSlider.value);
        });

        horizontalSlider.removeEventListener('input', () => {
            this.set('value', horizontalSlider.value);
        });
    }

    applyColors() {
        let attributes = this.attributes;

        Object.keys(attributes).forEach((attribute, index) => {
            let attrib = attributes[index];
            
            if(attrib.name.startsWith("color-")) {
                this.style.setProperty(`--${attrib.name}`, attrib.value);
            }
        });
    }
}
customElements.define(KwcSlider.is, KwcSlider);