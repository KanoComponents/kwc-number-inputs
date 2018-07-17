import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/elements/custom-style.js';
import { KwcNumberInputCommon } from './kwc-number-input-common.js';

class KwcDial extends KwcNumberInputCommon(PolymerElement) {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-table;
                    height: 170px;
                    width: 170px;
                    background-color: var(--kwc-numpad-background, #292F35);
                    border-radius: 5px;
                    position: relative;
                }
                :host::selection,
                :host *::selection {
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    user-select: none;
                }
                .result {
                    width: 74px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    text-align: center;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                span,
                sup {
                    display: inline-block;
                    text-align: center;
                    font-family: Bariol, Helvetica, Arial, sans-serif;
                    font-weight: 600;
                    color: var(--kwc-numpad-dial-text-color, #FFF);
                    transition: all 0.2s ease;
                }
                span:hover,
                sup:hover {
                    color: var(--kwc-numpad-dial-text-color-hover, #FFF);
                }
                span {
                    font-size: 25px;
                }
                sup {
                    font-size: 20px;
                    vertical-align: top;
                    position: relative;
                    right: 2.5px;
                }
                .circle,
                .circle:before,
                .circle:after {
                    content: '';
                    display: block;
                    border-radius: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: all 0.2s ease;
                    box-sizing: border-box;
                }
                .circle { 
                    width: 90px; 
                    height: 90px;
                    border-radius:100%;
                    margin: 0 auto;
                }
                .circle:hover { 
                    border-color: var(--kwc-numpad-dial-background-hover, #1A1A1A); 
                }
                .circle:before {
                    width: calc(100% + 5px);
                    height: calc(100% + 5px);
                    border: 5px solid var(--kwc-numpad-dial-background, #1A1A1A);
                }
                .circle:after {
                    width: 80%;
                    height: 80%;
                    background-color: var(--kwc-numpad-dial-background, #1A1A1A);
                }
                .circle:hover:after {
                    background-color: var(--kwc-numpad-dial-background-hover, #1A1A1A);
                }
                #circular-slider { 
                    position: absolute;
                    top: 0;
                    left: 0;
                    cursor: pointer;
                    z-index: 1;
                }
                #circular-slider:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform: translate(-50%, -50%);
                    box-sizing: border-box;
                    height: 16px;
                    width: 16px;
                    border: 1.9px solid var(--kwc-numpad-dial-border-color, #FFF);
                    background: var(--kwc-numpad-dial-color, #FF6B00); 
                    border-radius: 100%;
                    cursor: pointer;
                    transition: border-color 0.2s ease,
                                background 0.2s ease;
                    z-index: 1;
                }
                #circular-slider:hover {
                    border-color: var(--kwc-numpad-dial-border-color-hover, #FFF);
                    background: var(--kwc-numpad-dial-color-hover, #FF6B00); 
                }
                .degrees-container {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0px;
                    left: 0px;
                    padding: 11px;
                    box-sizing: border-box;
                    display: flex;
                }
                .degrees {
                    flex: 1;
                    position: relative;
                }
                .degrees p {
                    display: inline-block;
                    margin: 0;
                    position: absolute;
                    font-family: Bariol, Helvetica, Arial, sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--kwc-numpad-dial-round-text, #FFF);
                    width: 21px;
                    text-align: center;
                    transition: all 0.2s ease;
                }
                .degrees p:hover {
                    color: var(--kwc-numpad-dial-round-text-hover, #FFF);
                }
                .degrees p#zero {
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .degrees p#quarter {
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
                .degrees p#half {
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .degrees p#three-quarters {
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
            </style>
            <div class='circle' id="container">
                <div class='result'>
                    <span>[[prefix]]</span>
                    <span>[[value]]</span>
                    <sup>[[suffix]]</sup>
                </div>
                <div id='circular-slider'></div>
            </div>
            <div class='degrees-container'>
                <div class="degrees">
                    <p id='zero'>0</p>
                    <p id='quarter'>90</p>
                    <p id='half'>180</p>
                    <p id='three-quarters'>270</p>
                </div>
            </div>
        `;
    }

    static get is() { return 'kwc-dial'; }
    static get properties() {
        return {
            value: {
                type: Number,
                notify: true,
                value: 0,
                observer: '_valueChanged',
            },
            prefix: {
                type: String,
                value: null,
            },
            suffix: {
                type: String,
                value: null,
            },
        };
    }

    constructor() {
        super();
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        this.attachListeners();
        this.checkPagePosition();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachListeners();
    }

    attachListeners() {
        const container = this;

        container.addEventListener('touchstart', this.onTouchStart);
        window.addEventListener('touchend', this.onTouchEnd);
        container.addEventListener('mousedown', this.onMouseDown);
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('mousemove', this.onMouseMove);
        window.addEventListener('touchmove', this.onTouchMove);
    }
    computeBoundingBoxes() {
        const container = this;
        const slider = this.$['circular-slider'];
        this.sliderRect = slider.getBoundingClientRect();
        this.containerRect = container.getBoundingClientRect();
    }
    onMouseDown(e) {
        this.down = true;
        this.computeBoundingBoxes();
        this.updateSlider(e.clientX, e.clientY);
    }
    onMouseUp(e) {
        this.down = false;
    }
    onMouseMove(e) {
        this.updateSlider(e.clientX, e.clientY);
    }
    onTouchStart(e) {
        if (e.touches.length > 1) {
            return;
        }
        this.down = true;
        this.computeBoundingBoxes();
        this.updateSlider(e.touches[0].clientX, e.touches[0].clientY);

    }
    onTouchEnd(e) {
        if (e.touches.length > 1) {
            return;
        }
        this.down = false;
    }
    onTouchMove(e) {
        if (e.touches.length > 1) {
            return;
        }
        this.updateSlider(e.touches[0].clientX, e.touches[0].clientY);
    }
    
    detachListeners() {
        const container = this;

        container.removeEventListener('touchstart', this.onTouchStart);
        window.removeEventListener('touchend', this.onTouchEnd);
        container.removeEventListener('mousedown', this.onMouseDown);
        window.removeEventListener('mouseup', this.onMouseUp);
        window.removeEventListener('mousemove', this.onMouseMove);
        window.removeEventListener('touchmove', this.onTouchMove);
    }

    updateSlider(x, y) {
        if (this.down) {
            const dx = x - (this.containerRect.left + (this.containerRect.width / 2));
            const dy = y - (this.containerRect.top + (this.containerRect.height / 2));
            
            let atan = Math.atan2(dx, dy);
            let deg = -atan / (Math.PI / 180) + 180;

            this.set('value', Math.floor(deg));
        }
    }

    _getSliderRect() {
        if (!this.sliderRect) {
            this.sliderRect = this.$['circular-slider'].getBoundingClientRect();
        }
        return this.sliderRect;
    }

    _getContainerRect() {
        if (!this.containerRect) {
            this.containerRect = this.getBoundingClientRect();
        }
        return this.containerRect;
    }

    _valueChanged() {
        const radius = 45;
        const slider = this.$['circular-slider'];
        const sliderRect = this._getSliderRect();
        const sliderH2 = sliderRect.height / 2;
        const sliderW2 = sliderRect.width / 2;
        let x = Math.round(radius * Math.sin(this.value * Math.PI / 180));
        let y = Math.round(radius * -Math.cos(this.value * Math.PI / 180));

        x += radius - sliderW2;
        y += radius - sliderH2;

        slider.style.transform = `translate(${x}px, ${y}px) rotate(${this.value}deg)`;
    }
}
customElements.define(KwcDial.is, KwcDial);