export class SpeedometerRating extends HTMLElement {
    static observedAttributes = ['value', 'max'];
    value = 0;
    max = 4;
    topText = "";
    bottomTextPre = "";
    bottomTextAfter = "";
    constructor() {
        super();
    }
    connectedCallback() {
        this.value = parseFloat(this.getAttribute('value') || '0');
        this.max = parseFloat(this.getAttribute('max') || '4');
        this.topText = this.getAttribute('topText') || "";
        this.bottomTextPre = this.getAttribute('bottomTextPre') || "";
        this.bottomTextAfter = this.getAttribute('bottomTextAfter') || "";
        this.render();
    }
    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'value')
            this.value = parseFloat(newVal);
        if (name === 'max')
            this.max = parseFloat(newVal);
        this.render();
    }
    render() {
        const percent = Math.min(this.value / this.max, 1);
        const endAngle = percent * Math.PI;
        const describeArc = (cx, cy, r, startAngle, endAngle) => {
            const polarToCartesian = (centerX, centerY, radius, angleInRadians) => {
                return {
                    x: centerX + radius * Math.cos(angleInRadians),
                    y: centerY + radius * Math.sin(angleInRadians),
                };
            };
            const start = polarToCartesian(cx, cy, r, endAngle + Math.PI);
            const end = polarToCartesian(cx, cy, r, Math.PI);
            const largeArcFlag = endAngle > Math.PI ? 1 : 0;
            return [
                'M', start.x, start.y,
                'A', r, r, 0, largeArcFlag, 0, end.x, end.y
            ].join(' ');
        };
        const arcPath = describeArc(50, 50, 50, Math.PI, endAngle);
        this.innerHTML = `
      <style>
        .gauge {
          display: grid;
          align-content: flex-start;
          width: 100%;
          aspect-ratio: 1/0.5;
          position: relative;
        }

        .gauge svg {
          width: 100%;
          height: 100%;
        }

        .center-text {
          position: absolute;
          bottom: 0;
          left: 50%;
          translate: -50% 0;
          display: grid;
          align-content: flex-start;
          gap: var(--gapS);
          text-align: center;
        }
      </style>

      <div class="gauge">
        <svg viewBox="0 0 100 50">
          <path d="M 0 50 A 50 50 0 0 1 100 50" fill="none" stroke="var(--color4)" stroke-width="20" stroke-linecap="round" />
         
          <path d="${arcPath}" fill="none" stroke="var(--color2)" stroke-width="20" stroke-linecap="round" />
        </svg>

        <div class="center-text">
            <h2 class="largeText">${this.value}${this.topText}</h2>

            <p style="color: var(--shade1)">${this.bottomTextPre}${this.max}${this.bottomTextAfter}</p>
        </div>
      </div>
    `;
    }
}
