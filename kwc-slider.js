import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class KwcSlider extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-block;
                    padding: 16.5px 21px 23.5px 20px;
                    background-color: #292F35;
                    z-index: 100000;
                    border-radius: 5px;
                }
                :host::selection,
                :host *::selection {
                    background-color: transparent;
                }.slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 3px;
                    background: #1A1A1A;
                    position: relative;
                    right: 1.5px;
                    outline: none;
                    border-radius: 25px;
                }
                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 11.5px;
                    height: 18.5px;
                    background: #FF6B00;
                    border: 1.5px solid #fff;
                    border-radius: 25px;
                    cursor: pointer;
                }
                .slider::-moz-range-thumb {
                    width: 11.5px;
                    height: 18.5px;
                    background: #FF6B00;
                    border: 1.5px solid #fff;
                    border-radius: 25px;
                    cursor: pointer;
                }
            </style>
            <input type='range' min='0' max='360' value='0' class='slider' id='horizontalSlider'>
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
}
customElements.define(KwcSlider.is, KwcSlider);