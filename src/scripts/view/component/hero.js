class Hero extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="hero">
                <div class="hero__inner">
                <h1 class="hero__title animate__animated animate__fadeIn">Welcome to Hangry!</h1>
                <p class="hero__tagline animate__animated animate__fadeInUp">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                </div>
            </div>`;
    }
}

customElements.define('hero-header', Hero);