import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/elements/custom-style.js';
import { backspaceIcon } from './assets.js';

class KwcNumpad extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-table;
                    background-color: var(--kwc-numpad-background, #292F35);
                    z-index: 100000;
                    border-radius: 5px;
                    padding: 16px;
                }
                :host::selection,
                :host *::selection {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    user-select: none;
                }
                .row {
                    white-space: nowrap;
                }
                button {
                    width: var(--kwc-numpad-button-width, 56px);
                    height: var(--kwc-numpad-button-height, 50px);
                    background: var(--kwc-numpad-button-background, #22272D);
                    color: var(--kwc-numpad-button-color, #FFF);
                    border: none;
                    border-radius: 5px;
                    margin: 2px 0;
                    cursor: pointer;
                    font-family: Bariol, Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 600;
                    transition: background-color 0.2s ease;
                    touch-action: manipulation;
                }
                button[value='backspace'] svg {
                    width: 20px;
                    pointer-events: none;
                }
                button[value='plus-minus'] {
                    display: none;
                }
                button.negative[value='plus-minus'] {
                    display: initial;
                }
                button.negative[value='backspace'] {
                    display: block;
                    width: 100%;
                }
                button:hover {
                    background-color: var(--kwc-numpad-button-background-hover, #FF6B00);
                    color: var(--kwc-numpad-button-color-hover, #FFF);
                }
                button:focus {
                    outline: none;
                }
            </style>
            <div class="row">
                <button value="1">1</button>
                <button value="2">2</button>
                <button value="3">3</button>
            </div>
            <div class="row">
                <button value="4">4</button>
                <button value="5">5</button>
                <button value="6">6</button>
            </div>
            <div class="row">
                <button value="7">7</button>
                <button value="8">8</button>
                <button value="9">9</button>
            </div>
            <div class="row">
                <button value=".">.</button>
                <button value="0">0</button>
                <button class$="[[isNegative()]]" value="plus-minus">+/-</button>
                <button class$="[[isNegative()]]" value="backspace">
                    ${backspaceIcon}
                </button>
            </div>
        `;
    }

    static get is() { return 'kwc-numpad'; }
    static get properties() {
        return {
            resultOverride: {
                type: Boolean,
                value: true,
            },
            value: {
                type: Number,
                notify: true,
                value: 0,
                observer: '_valueChanged',
            },
            stringValue: {
                type: String,
                notify: true,
                value: '0',
                observer: '_stringValueChanged',
            },
            negative: {
                type: Boolean,
                value: true,
            }
        };
    }
    constructor () {
        super();
        this.stringValue = '0';
    }

    connectedCallback() {
        super.connectedCallback();
        this.updateResult = this.updateResult.bind(this);
        this.attachListeners();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachListeners();
    }
    // Enable buttons for actions
    attachListeners() {
        this.shadowRoot.querySelectorAll('button').forEach((element) => {
            element.addEventListener('click', this.updateResult);
            element.addEventListener('touchstart', this.updateResult);
        });
    }
    detachListeners() {
        this.shadowRoot.querySelectorAll('button').forEach((element) => {
            element.removeEventListener('click', this.updateResult);
            element.removeEventListener('touchstart', this.updateResult);
        });
    }

    updateResult(e) {
        const digit = e.target.getAttribute('value');
        let resultOverride = this.resultOverride;
        let stringValue = this.stringValue;

        if (resultOverride) {
            stringValue = '0';
            this.set('resultOverride', false);
        }

        switch (digit) {
            case '.':
                {
                    if (stringValue.indexOf('.') === -1) {
                        stringValue += '.';
                    }
                    break;
                }
            case 'plus-minus':
                {
                    if (stringValue != 0) {
                        stringValue *= -1;
                    }
                    break;
                }
            case 'backspace':
                {
                    if (stringValue.length <= 1) {
                        stringValue = '0';
                    } else {
                        stringValue = stringValue.slice(0, -1);
                        if (stringValue === '-') {
                            stringValue = '0';
                        }
                    }
                    break;
                }
            default:
                {
                    if (stringValue === '0') {
                        stringValue = digit;
                    } else {
                        stringValue += digit;
                    }
                }
        }
        this.stringValue = stringValue;
        e.preventDefault();
    }
    isNegative() {
        return this.negative ? "negative" : "";
    }
    _stringValueChanged() {
        this.set('value', parseFloat(this.stringValue, 10));
    }
    _valueChanged() {
        this.stringValue = typeof this.value === 'undefined' ? '0' : this.value.toString();
    }
}
customElements.define(KwcNumpad.is, KwcNumpad);
