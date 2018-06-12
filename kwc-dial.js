import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/polymer/lib/elements/custom-style.js';

class KwcDial extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    display: inline-block;
                    padding: 40px 25px 20px;
                    background-color: var(--color-5, #292F35);
                    z-index: 100000;
                    border-radius: 5px;
                }
                :host::selection,
                :host *::selection {
                    background-color: transparent;
                }
                .circular-slider {
                    padding: 0 35px;
                    margin: 7px 0 35px;
                }
                .circular-slider .result{
                    width: 60px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 1;
                    text-align: center;
                }
                .circular-slider span,
                .circular-slider sup {
                    display: inline-block;
                    text-align: center;
                    font-family: Bariol, Helvetica, Arial, sans-serif;
                    font-weight: 600;
                    color: var(--color-4, #FFF);
                }
                .circular-slider span {
                    font-size: 25px;
                }
                .circular-slider sup {
                    font-size: 20px;
                    vertical-align: top;
                    position: relative;
                    right: 2.5px;
                }
                .circle { 
                    width: 99.5px; 
                    height: 98px;
                    border: 5px solid var(--color-1, #1A1A1A); 
                    border-radius:100%;
                    margin: 0 auto;
                    position: relative;
                }
                .circle:after {
                    content: '';
                    display: block;
                    width: 86px;
                    height: 86px;
                    border-radius: 100%;
                    background-color: var(--color-1, #1A1A1A);
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                #circularSlider { 
                    position: relative; 
                    height: 12px;
                    width: 12px;
                    border: 1.9px solid var(--color-4, #FFF);
                    background: var(--color-2, #FF6B00); 
                    left: 40px;
                    top: -9px;
                    border-radius: 100%;
                    cursor: pointer;
                    z-index: 1;
                }
                .circle-degrees {
                    width: 175px;
                    height: 165px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
                .circle-degrees p {
                    display: inline-block;
                    margin: 0;
                    position: absolute;
                    font-family: Bariol, Helvetica, Arial, sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    color: var(--color-4, #FFF);
                    width: 21px;
                    text-align: center;
                }
                .circle-degrees p#zero {
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .circle-degrees p#quarter {
                    top: 50%;
                    right: 0;
                    transform: translateY(-50%);
                }
                .circle-degrees p#half {
                    bottom: 0;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .circle-degrees p#three-quarters {
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
            </style>
            <div class='circular-slider'>
                <div class='circle'>
                    <div id='circularSlider'></div>
                    <div class='result'>
                        <span>[[prefix]]</span>
                        <span>[[value]]</span>
                        <sup>[[suffix]]</sup>
                    </div>
                    <div class='circle-degrees'>
                        <p id='zero'>0</p>
                        <p id='quarter'>90</p>
                        <p id='half'>180</p>
                        <p id='three-quarters'>270</p>
                    </div>
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

    connectedCallback() {
        super.connectedCallback();
        this.attachListeners();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.detachListeners();
    }

    attachListeners() {
        let container = this.shadowRoot.querySelector('.circular-slider .circle');
        let slider = this.shadowRoot.querySelector('.circular-slider #circularSlider');
        let sliderW2 = slider.getBoundingClientRect().width / 2;
        let sliderH2 = slider.getBoundingClientRect().height / 2;
        let radius = 49.5;
        let deg = 0;
        let elP = container.getBoundingClientRect();
        let elPos = {
            x: elP.left + document.body.scrollLeft,
            y: elP.top + document.body.scrollTop,
        };
        let X = 0,
            Y = 0;
        let mouseDown = false;

        container.addEventListener('touchstart', () => {
            mouseDown = true;
        });

        container.addEventListener('touchend', () => {
            mouseDown = false;
        });

        container.addEventListener('mousedown', () => {
            mouseDown = true;
        });

        container.addEventListener('mouseup', () => {
            mouseDown = false;
        });

        container.addEventListener('mousemove', (e) => {
            this.updateSlider(slider, sliderW2, sliderH2, radius, deg, elPos, X, Y, mouseDown, e);
        });

        container.addEventListener('touchmove', (e) => {
            this.updateSlider(slider, sliderW2, sliderH2, radius, deg, elPos, X, Y, mouseDown, e);
        });
    }
    
    detachListeners() {
        let container = this.shadowRoot.querySelector('.circular-slider .circle');
        let slider = this.shadowRoot.querySelector('.circular-slider #circularSlider');
        let sliderW2 = slider.getBoundingClientRect().width / 2;
        let sliderH2 = slider.getBoundingClientRect().height / 2;
        let radius = 49.5;
        let deg = 0;
        let elP = container.getBoundingClientRect();
        let elPos = {
            x: elP.left + document.body.scrollLeft,
            y: elP.top + document.body.scrollTop,
        };
        let X = 0,
            Y = 0;
        let mouseDown = false;

        container.removeEventListener('touchstart', () => {
            mouseDown = true;
        });

        container.removeEventListener('touchend', () => {
            mouseDown = false;
        });

        container.removeEventListener('mousedown', () => {
            mouseDown = true;
        });

        container.removeEventListener('mouseup', () => {
            mouseDown = false;
        });

        container.removeEventListener('mousemove', (e) => {
            this.updateSlider(slider, sliderW2, sliderH2, radius, deg, elPos, X, Y, mouseDown, e);
        });

        container.removeEventListener('touchmove', (e) => {
            this.updateSlider(slider, sliderW2, sliderH2, radius, deg, elPos, X, Y, mouseDown, e);
        });
    }

    updateSlider(slider, sliderW2, sliderH2, radius, deg, elPos, X, Y, mouseDown, e) {
        if (mouseDown) {
            let mPos = {
                x: e.clientX - elPos.x,
                y: e.clientY - elPos.y,
            };
            
            if(typeof e.touches !== 'undefined') {
                mPos = {
                    x: e.touches[0].clientX - elPos.x,
                    y: e.touches[0].clientY - elPos.y,
                };
            }

            let atan = Math.atan2(mPos.x - radius, mPos.y - radius);

            deg = -atan / (Math.PI / 180) + 180;

            X = Math.round(radius * Math.sin(deg * Math.PI / 180));
            Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));

            slider.style.top = Y + radius - sliderH2 + 'px';
            slider.style.left = X + radius - sliderW2 + 'px';

            slider.style.transform = 'rotate(' + deg + 'deg)';

            this.set('value', Math.ceil(deg));
        }
    }

    _valueChanged() {
        const deg = this.value;

        let slider = this.shadowRoot.querySelector('.circular-slider #circularSlider');
        let sliderW2 = slider.getBoundingClientRect().width / 2;
        let sliderH2 = slider.getBoundingClientRect().height / 2;
        let radius = 49.5;

        const X = Math.round(radius * Math.sin(deg * Math.PI / 180));
        const Y = Math.round(radius * -Math.cos(deg * Math.PI / 180));

        slider.style.top = Y + radius - sliderH2 + 'px';
        slider.style.left = X + radius - sliderW2 + 'px';

        slider.style.transform = 'rotate(' + deg + 'deg)';
    }
}
customElements.define(KwcDial.is, KwcDial);