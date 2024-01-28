export class SimpleCounter extends HTMLElement{
    constructor(){
        super();

        this.DEFAULT_VALUE = 0;
        this.DEFAULT_LABEL = "Counter: ";
        this.DEFAULT_BUTTON = "Click me :)";
        this.DEFAULT_INCREMENT = 1;

        this._shadowRoot = this.attachShadow({mode: "open"});
        this._shadowRoot.innerHTML = `
                <style>
                    span {
                    color: blue;
                    }
                </style>
            `
    }

    connectedCallback(){
        this.value = this.DEFAULT_VALUE;

        this._counterView = document.createElement("span");
        this._button = document.createElement("button");
        this._button.addEventListener("mousedown", this._updateCounter.bind(this))

        this._shadowRoot.appendChild(this._counterView)
        this._shadowRoot.appendChild(this._button)

        this.render();
    }

    disconnectedCallback(){
        this._counterView.removeEventListener('mousedown', this._updateCounter.bind(this));
    }

    _updateCounter(){
        this.value += this.DEFAULT_INCREMENT;
        this.render();
    }

    render(){
        this._counterView.textContent = this.DEFAULT_LABEL + this.value;
        this._button.textContent = this.DEFAULT_BUTTON
    }
}

customElements.define("click-counter", SimpleCounter);