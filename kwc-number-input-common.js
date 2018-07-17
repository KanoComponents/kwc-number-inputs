export const KwcNumberInputCommon = base => class extends base {
    checkPagePosition() {
        if (this.parentElement && this.parentElement.offsetTop > window.innerHeight - this.clientHeight) {
            this.style.transform = "translateY(-110%)";
            this.style.webkitTransform = "translateY(-110%)";
        }
    }
}

export default KwcNumberInputCommon;
