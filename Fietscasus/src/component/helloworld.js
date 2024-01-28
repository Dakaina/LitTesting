export class HelloName extends HTMLElement{
    static get observedAttributes(){
        return ["name"];
    }

    constructor(){
        super();

        //Dit gebeurt bij het maken van het component
        console.log("Wowie ik wordt gecreeerd")

        this.name = "Human"
    }

    connectedCallback(){
        //Dit gebeurt wanneer het component voor het eerst in DOM wordt gegooid
        console.log("Hoi ik ben zojuist de DOM ingegooid")

        this.render();
    }

    render(){
        this.textContent = "Hello " + this.name;
    }

    attributeChangedCallback(property, oldValue, newValue){
        //Dit gebeurt wanneer een value veranderd wordt
        console.log(`Wowie aanpassing incoming: ${property} wordt van ${oldValue} nu ${newValue}`)

        if (oldValue === newValue) return;
        
        this[ property ] = newValue;
        this.render();
    }

    disconnectedCallback(){
        //Dit gebeurt wanneer ik uit de dom wordt gegooid
        console.log("Ze hebben me verwijderd :(")
    }
}
customElements.define("hello-name", HelloName)
