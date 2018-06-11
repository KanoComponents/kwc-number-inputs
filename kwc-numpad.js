import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';

class KwcNumpad extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: block;
                }
            
                :host::selection,
                :host *::selection {
                    background-color: transparent;
                }
            
                button {
                    width: 56px;
                    height: 50px;
                    background-color: #22272D;
                    color: #fff;
                    border: none;
                    border-radius: 5px;
                    margin: 2px 0;
                    cursor: pointer;
                    font-family: Bariol, Helvetica, Arial, sans-serif;
                    font-size: 18px;
                    font-weight: 600;
                    transition: background-color 0.2s ease;
                }
            
                button[value='canc'] img {
                    width: 20px;
                }
            
                button:hover {
                    background-color: #FF6B00;
                }
            
                button:focus {
                    outline: none;
                }
            </style>
            <div class='row'>
                <button value='1'>1</button>
                <button value='2'>2</button>
                <button value='3'>3</button>
            </div>
            <div class='row'>
                <button value='4'>4</button>
                <button value='5'>5</button>
                <button value='6'>6</button>
            </div>
            <div class='row'>
                <button value='7'>7</button>
                <button value='8'>8</button>
                <button value='9'>9</button>
            </div>
            <div class='row'>
                <button value='.'>.</button>
                <button value='0'>0</button>
                <button value='canc'>
                    <img src='kit-app://index/node_modules/kit-app-ui/node_modules/kwc-blockly-numpad/assets/svg/canc.svg'>
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
            },
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
        });
    }
    detachListeners() {
        this.shadowRoot.querySelectorAll('button').forEach((element) => {
            element.removeEventListener('click', this.updateResult);
        });
    }

    updateResult(e) {
        const digit = e.target.value;
        let resultOverride = this.resultOverride;

        if (resultOverride) {
            this.stringValue = '0';
            this.set('resultOverride', false)
        }

        switch (digit) {
            case '.':
                {
                    if (this.stringValue.indexOf('.') === -1) {
                        this.stringValue += '.';
                    }
                    break;
                }
            case 'canc':
                {
                    if (this.stringValue.length <= 1) {
                        this.stringValue = '0';
                    } else {
                        this.stringValue = this.stringValue.slice(0, -1);
                    }
                    break;
                }
            default:
                {
                    if (this.stringValue === '0') {
                        this.stringValue = digit;
                    } else {
                        this.stringValue += digit;
                    }
                }
        }
        this.set('value', parseFloat(this.stringValue, 10));
    }
}
customElements.define(KwcNumpad.is, KwcNumpad);