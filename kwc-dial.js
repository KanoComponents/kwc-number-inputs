import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/elements/custom-style.js';

class KwcDial extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-table;
                    padding: 43px;
                    background-color: var(--kwc-numpad-background, #292F35);
                    border-radius: 5px;
                    position: relative;
                }
                :host::selection,
                :host *::selection {
                    background-color: transparent;
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
                .circle { 
                    width: 99.5px; 
                    height: 98px;
                    border: 5px solid var(--kwc-numpad-dial-background, #1A1A1A); 
                    border-radius:100%;
                    margin: 0 auto;
                    position: relative;
                    transition: all 0.2s ease;
                }
                .circle:hover { 
                    border-color: var(--kwc-numpad-dial-background-hover, #1A1A1A); 
                }
                .circle:after {
                    content: '';
                    display: block;
                    width: 86px;
                    height: 86px;
                    border-radius: 100%;
                    background-color: var(--kwc-numpad-dial-background, #1A1A1A);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    transition: all 0.2s ease;
                }
                .circle:hover:after {
                    background-color: var(--kwc-numpad-dial-background-hover, #1A1A1A);
                }
                #circular-slider { 
                    position: relative;
                    top: 0;
                    left: 0;
                    height: 12px;
                    width: 12px;
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

            this.set('value', Math.ceil(deg));
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
        const radius = 49.5;
        const slider = this.$['circular-slider'];
        const sliderRect = this._getSliderRect();
        const sliderH2 = sliderRect.height / 2;
        const sliderW2 = sliderRect.width / 2;
        let X = Math.round(radius * Math.sin(this.value * Math.PI / 180));
        let Y = Math.round(radius * -Math.cos(this.value * Math.PI / 180));

        X = X + radius - sliderW2;
        Y = Y + radius - sliderH2;

        slider.style.transform = `translate(${X}px, ${Y}px) rotate(${this.value}deg)`;
    }
}
customElements.define(KwcDial.is, KwcDial);