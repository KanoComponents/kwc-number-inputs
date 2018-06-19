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
                    background-color: var(--kwc-numpad-background, #292F35);
                    z-index: 100000;
                    border-radius: 5px;
                }
                :host::selection,
                :host *::selection {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    user-select: none;
                }
                .slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 3px;
                    background-color: var(--kwc-numpad-slider-color, #1A1A1A);
                    position: relative;
                    right: 1.5px;
                    outline: none;
                    border-radius: 25px;
                    transition: all 0.2s ease;
                }
                .slider:hover {
                    background-color: var(--kwc-numpad-slider-color-hover, #1A1A1A);
                }
                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 14px;
                    height: 20.5px;
                    background: var(--kwc-numpad-slider-background, #FF6B00);
                    border: 1.5px solid var(--kwc-numpad-slider-border-color, #FFF);
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .slider:hover::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 14px;
                    height: 20.5px;
                    background: var(--kwc-numpad-slider-background-hover, #FF6B00);
                    border: 1.5px solid var(--kwc-numpad-slider-border-color-hover, #FFF);
                    border-radius: 25px;
                    cursor: pointer;
                }
                .slider::-moz-range-thumb {
                    width: 14px;
                    height: 20.5px;
                    background: var(--kwc-numpad-slider-background, #FF6B00);
                    border: 1.5px solid var(--kwc-numpad-slider-border-color, #FFF);
                    border-radius: 25px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .slider:hover::-moz-range-thumb {
                    width: 14px;
                    height: 20.5px;
                    background: var(--kwc-numpad-slider-background-hover, #FF6B00);
                    border: 1.5px solid var(--kwc-numpad-slider-border-color-hover, #FFF);
                    border-radius: 25px;
                    cursor: pointer;
                }
            </style>
            <input type='range' min='{{min}}' max='{{max}}' value='{{value}}' class='slider' id='horizontalSlider'>
        `;
    }

    static get is() { return 'kwc-slider'; }
    static get properties() {
        return {
            value: {
                type: Number,
                value: 0,
                notify: true,
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
            }
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

    applyMax() {
        let max = this.getAttribute("max");
        this.set("max", max);
    }
}
customElements.define(KwcSlider.is, KwcSlider);