const template = `
    <style>
        dialog#tDlgSpinner {
            margin: auto;
            padding: 50px;
            border: none;
            outline: none;
            background-color: transparent;
        }

        .spinner {
            width: 200px;
            aspect-ratio: 1;
            position: relative;
            animation: spin 10s linear infinite;

            &::before, &::after {
                content: "";
                position: absolute;
                animation-name: grow;
                animation-duration: 1s;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
                animation-direction: alternate;
            }

            &::before {
                border-top: solid 20px red;
                border-left: solid 20px red;
            }

            &::after {
                bottom: 0;
                right: 0;
                border-bottom: solid 20px red;
                border-right: solid 20px red;
                animation-delay: 0.25s;
            }
        }

        @keyframes grow {
            from {
                width: 100%;
                height: 0%;
            }
            to {
                width: 0%;
                height: 100%;
            }
        }

        @keyframes spin {
            from {
                rotate: 0turn;
            }
            to {
                rotate: 1turn;
            }
        }
    </style>

    <dialog id="tDlgSpinner">
        <div class="spinner"></div>
    </dialog>
`;

export function openSpinner() {
    const nDiv = document.createElement('div');
    nDiv.id = 'tDivSpinner';
    nDiv.innerHTML = template;
    document.body.appendChild(nDiv);

    document.querySelector('dialog#tDlgSpinner').showModal();

}

export function closeSpinner() {
    document.querySelector('dialog#tDlgSpinner').close();
    document.body.removeChild(document.querySelector('div#tDivSpinner'));
}