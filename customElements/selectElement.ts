import { getElement } from "../utility.js";

export class CustomSelect extends HTMLElement {
    //shadow dom
    //private shadow: ShadowRoot;
    // this.shadow = this.attachShadow({ mode: "open" });
    // this.shadow.appendChild(template.cloneNode(true));

    // private shadow: ShadowRoot;
    private selected: string = '';
    private menuVisible: boolean = false;

    constructor() {
        super();

        const template = getElement<HTMLTemplateElement>("#select-element-template").content;

        // add template
        this.appendChild(template.cloneNode(true));
    }

    connectedCallback() {
        const optionsAttr = this.getAttribute('options')
        if (optionsAttr === null) throw new Error("not seeing optionsAttr passed to select element")
        const options: string[] = optionsAttr.split(',')

        const valueAttr = this.getAttribute('value')
        if (valueAttr === null) throw new Error("not seeing valueAttr passed to select element")

        let defaultValue = valueAttr !== "" ? valueAttr : options[0] !== undefined && options[0] !== "" && options[0] !== "||datePicker||" ? options[0] : "select"
        //handle date startng value with date picker
        if (defaultValue === "select" && options[0] === "||datePicker||") {
            defaultValue = new Date().toLocaleString('en-US', {
                month: 'long',
                year: 'numeric',
            });
        }
        this.selected = defaultValue

        const selectedOptionEl = getElement(".selectedOptionEl", undefined, this);
        selectedOptionEl.textContent = this.selected;

        const menu = getElement(".selectionContMenu", undefined, this);
        if (options[0] === "||datePicker||") {
            //make and show date picker
            const dateSelectionInput = getElement<HTMLInputElement>(".dateSelectionInput", undefined, this);

            dateSelectionInput.addEventListener('change', (e) => {
                const target = e.target as HTMLInputElement

                this.selected = target.value;

                selectedOptionEl.textContent = new Date(target.value).toLocaleString('en-US', {
                    month: 'long',
                    year: 'numeric',
                });

                menu.classList.remove('visible');
                this.menuVisible = false;

                // Dispatch change event
                this.dispatchEvent(new CustomEvent('change', {
                    detail: { value: this.selected }
                }));
            });

            //style
            dateSelectionInput.style.display = "block"

            //add options to menu
            menu.appendChild(dateSelectionInput);

        } else {
            //creates actual options
            options.forEach(option => {
                const div = document.createElement('div');
                div.textContent = option.trim();

                div.addEventListener('click', () => {
                    this.selected = option;
                    selectedOptionEl.textContent = this.selected;

                    menu.classList.remove('visible');
                    this.menuVisible = false;

                    // Dispatch change event
                    this.dispatchEvent(new CustomEvent('change', {
                        detail: { value: this.selected }
                    }));
                });

                //add options to menu
                menu.appendChild(div);
            });
        }

        const top = getElement(".selectionContTop", undefined, this);
        top.addEventListener('click', () => {
            this.menuVisible = !this.menuVisible;
            menu.classList.toggle('visible', this.menuVisible);
        });

        //get svg
        const iconCont = getElement(".iconCont", undefined, this);
        const svg = this.querySelector("svg");

        if (svg !== null) {
            svg.style.display = "block"
            iconCont.appendChild(svg);
        }

        // Click outside to close
        document.addEventListener('click', (e) => {
            if (!this.contains(e.target as Node)) {
                this.menuVisible = false;
                menu.classList.remove('visible');
            }
        });
    }

    get value() {
        return this.selected;
    }

    set value(val: string) {
        this.selected = val;

        const selectedEl = getElement(".selected", undefined, this);
        selectedEl.textContent = val;
    }
}

export interface CustomSelectElement extends HTMLElement {
    value: string;
    options: string
}
