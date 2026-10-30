class MiSemaforoComponente extends HTMLElement {
    template = `
        <style>
            :host {
                display: inline-block;
            }

            .semaforo {
                background-color: black;
                display: inline-flex;
                flex-direction: column;
                gap: 15px;
                padding: 15px;
            }

            .luz {
                width: 100px;
                aspect-ratio: 1;
                border-radius: 50%;
                filter: brightness(0.2);
            }

            .luz-encendida {
                filter: brightness(1);
            }

            .luz-roja {
                background-color: red;
            }

            .luz-ambar {
                background-color: orange;
            }

            .luz-verde {
                background-color: green;
            }

            .luz-ambar-parpadeando {
                animation: parpadeo 1s steps(1) infinite;
            }

            @keyframes parpadeo {
                50% {        
                    filter: brightness(0.2);
                }
            }
        </style>

        <div class="semaforo">
            <div class="luz luz-roja"></div>
            <div class="luz luz-ambar"></div>
            <div class="luz luz-verde"></div>
        </div>
    `;

    shadowRoot;
    duracionRojo = 0;
    duracionAmbar = 0;
    duracionVerde = 0;
    static observedAttributes = ["duracion-rojo", "duracion-ambar", "duracion-verde"];

    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = this.template;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "duracion-rojo") {
            this.duracionRojo = parseInt(newValue);
        } else if (name === "duracion-ambar") {
            this.duracionAmbar = parseInt(newValue);
        } else if (name === "duracion-verde") {
            this.duracionVerde = parseInt(newValue);
        }
    }

    encenderPrecaucion() {
        const nAmbar = this.shadowRoot.querySelector('.luz-ambar');
        nAmbar.classList.add('luz-encendida');
        nAmbar.classList.add('luz-ambar-parpadeando');
    }

    encenderNormal() {
        const nLuzRoja = this.shadowRoot.querySelector('.luz-roja');
        const nLuzAmbar = this.shadowRoot.querySelector('.luz-ambar');
        const nLuzVerde = this.shadowRoot.querySelector('.luz-verde');

        nLuzRoja.classList.remove('luz-encendida');
        nLuzAmbar.classList.remove('luz-encendida');
        nLuzVerde.classList.remove('luz-encendida');

        nLuzRoja.classList.add('luz-encendida');
        this.dispatchEvent(new CustomEvent('luzencendida', {
            detail: { 
                target: this,
                color: 'rojo' 
            }
        }));

        setTimeout(
            () => {
                nLuzRoja.classList.remove('luz-encendida');
                nLuzVerde.classList.add('luz-encendida');
                this.dispatchEvent(new CustomEvent('luzencendida', {
                detail: { 
                    target: this,
                    color: 'verde' 
                }
        }));
            },
            this.duracionRojo
        );

        setTimeout(
            () => {
                nLuzVerde.classList.remove('luz-encendida');
                nLuzAmbar.classList.add('luz-encendida');
                this.dispatchEvent(new CustomEvent('luzencendida', {
                detail: { 
                    target: this,
                    color: 'ambar' 
                }
        }));
            },
            this.duracionRojo + this.duracionVerde
        );

    }


        // this.#luces = {
        //     rojo: shadowRoot.querySelector('.luz-roja'),
        //     ambar: shadowRoot.querySelector('.luz-ambar'),
        //     verde: shadowRoot.querySelector('.luz-verde')
        // };

    // get duracionRojo() {
    //     return this.#duracion('duracion-rojo', 3000);
    // }

    // get duracionAmbar() {
    //     return this.#duracion('duracion-ambar', 1000);
    // }

    // get duracionVerde() {
    //     return this.#duracion('duracion-verde', 3000);
    // }

    // connectedCallback() {
    //     this.encender();
    // }

    // disconnectedCallback() {
    //     this.#detener();
    // }

    // encender() {
    //     this.#detener();

    //     this.dispatchEvent(new CustomEvent('semaforoencendido', {
    //         bubbles: true,
    //         composed: true,
    //         detail: { color: 'ambar', intermitente: true }
    //     }));

    //     this.#parpadearAmbar();
    // }

    // #parpadearAmbar() {
    //     const ambar = this.#luces.ambar;
    //     let parpadeos = 0;
    //     const total = 6;

    //     ambar.classList.add('parpadeando');

    //     this.#intervaloAmbar = setInterval(() => {
    //         parpadeos++;

    //         if (parpadeos >= total) {
    //             clearInterval(this.#intervaloAmbar);
    //             this.#intervaloAmbar = null;
    //             ambar.classList.remove('parpadeando');
    //             this.#iniciarCiclo();
    //         }
    //     }, 500);
    // }

    // #iniciarCiclo() {
    //     const secuencia = ['rojo', 'ambar', 'verde', 'ambar'];
    //     let indice = 0;

    //     const avanzar = () => {
    //         const color = secuencia[indice];

    //         this.#encenderLuz(color);

    //         this.#temporizador = setTimeout(() => {
    //             indice = (indice + 1) % secuencia.length;
    //             avanzar();
    //         }, this.#duracionDe(color));
    //     };

    //     avanzar();
    // }

    // #encenderLuz(color) {
    //     for (const [nombre, luz] of Object.entries(this.#luces)) {
    //         luz.classList.toggle('luz-encendida', nombre === color);
    //     }
// const semaforo = document.querySelector('mi-semaforo');
// const estado = document.getElementById('estado');
// const reiniciar = document.getElementById('reiniciar');

// semaforo.addEventListener('semaforoencendido', () => {
//     estado.textContent = 'Semáforo encendido: ámbar intermitente';
// });

// semaforo.addEventListener('luzencendida', (evento) => {
//     estado.textContent = `Luz encendida: ${evento.detail.color}`;
// });

// reiniciar.addEventListener('click', () => {
//     semaforo.encender();
// });
    //     this.dispatchEvent(new CustomEvent('luzencendida', {
    //         bubbles: true,
    //         composed: true,
    //         detail: { color }
    //     }));
    // }

    // #duracionDe(color) {
    //     if (color === 'rojo') return this.duracionRojo;
    //     if (color === 'ambar') return this.duracionAmbar;
    //     return this.duracionVerde;
    // }

    // #duracion(atributo, porDefecto) {
    //     const valor = Number(this.getAttribute(atributo));
    //     return Number.isFinite(valor) && valor > 0 ? valor : porDefecto;MiSemaforo
    // }

    // #detener() {
    //     clearTimeout(this.#temporizador);
    //     clearInterval(this.#intervaloAmbar);
    //     this.#temporizador = null;
    //     this.#intervaloAmbar = null;

    //     for (const luz of Object.values(this.#luces)) {
    //         luz.classList.remove('luz-encendida', 'parpadeando');
    //     }
    // }
}

window.customElements.define('mi-semaforo', MiSemaforoComponente);

// const semaforo = document.querySelector('mi-semaforo');
// const estado = document.getElementById('estado');
// const reiniciar = document.getElementById('reiniciar');

// semaforo.addEventListener('semaforoencendido', () => {
//     estado.textContent = 'Semáforo encendido: ámbar intermitente';
// });

// semaforo.addEventListener('luzencendida', (evento) => {
//     estado.textContent = `Luz encendida: ${evento.detail.color}`;
// });

// reiniciar.addEventListener('click', () => {
//     semaforo.encender();
// });
