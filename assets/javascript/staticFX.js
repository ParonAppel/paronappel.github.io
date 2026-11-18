(() => {
    const canvas = document.querySelector('.staticFX');
    if (!canvas) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true });
    if (!gl) return;   // no WebGL: the section simply has no static

    const PIXEL = 2;   // size of one static "pixel" in screen pixels

    const vert = `
        attribute vec2 p;
        void main() { gl_Position = vec4(p, 0.0, 1.0); }
    `;

    const frag = `

        #ifdef GL_FRAGMENT_PRECISION_HIGH
            precision highp float;
        #else
            precision mediump float;
        #endif

        precision mediump float;
        uniform vec2 res;
        uniform float t;
        uniform sampler2D tex; 

        float hash(vec2 p) {
            // return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            vec3 p3 = fract(vec3(p.xyx) * 0.1031);
            p3 += dot(p3, p3.yzx + 33.33);
             return fract((p3.x + p3.y) * p3.z);
        }

        void main() {

            vec2 uv = gl_FragCoord.xy / res;
            vec2 texUV = fract(uv * 2.0);
            vec4 texCol = texture2D(tex, texUV);

            // Top fade
            float topFadeStrength = 6.0;
            float topFade = (uv.y - 0.5) * 2.0;
            topFade = clamp((1.0 - abs(topFade)) * topFadeStrength, 0.0, 1.0);
           
            // Side Fade
            float sideFadeStrength = 1.0;
            float sideFade = (uv.x - 0.5) * 2.0;
            sideFade = clamp((1.0 - abs(sideFade)) * sideFadeStrength, 0.0, 1.0);
            sideFade = 1.0 - sideFade;

            // bars
            // float numberOfBars = res.y / 1.0;
            float bar = sin(gl_FragCoord.y * 3.14159);

            float barRepeatOpacity = 0.7;
            // float barRepeatNum = res.y / 5.0;
            // float barRepeat = 1.0 - abs(sin(uv.y * barRepeatNum));
            float barRepeat = step(0.5, 1.0 - abs(sin(gl_FragCoord.y * 0.6283)));
            barRepeat = step(0.5, barRepeat);
            barRepeat = clamp(barRepeat, barRepeatOpacity, 1.0);

            bar = barRepeat * bar;

            vec2 cell = floor(gl_FragCoord.xy);
            float n = hash(cell + mod(floor(t * 12.0), 1024.0));

            bar = bar * smoothstep( 0.0, 0.5, n) * 0.5;
    
            // overall noise
            float noise = clamp(texCol.r, 0.1, 0.5);
          
            vec3 color = vec3(0.54, 0.90, 0.99);
            float opacity = bar * sideFade * noise * 0.5 * topFade;
            opacity = clamp(opacity, 0.0, 1.0);

            gl_FragColor = vec4( color * opacity, opacity);
        }
    `;

    const compile = (type, src) => {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:\n' + gl.getShaderInfoLog(s));
        }
        return s;
    };

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.error('Link error:\n' + gl.getProgramInfoLog(prog));
    }
    gl.useProgram(prog);

    const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);

        // 1x1 placeholder, so the shader works while the image loads
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));

        const img = new Image();
        img.onload = () => {
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);   // image Y is top-down, GL's is bottom-up
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        // Crisp pixels, no blur (right for pixel art)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        };
        img.src = canvas.dataset.texture;

    // Tell the shader to read from texture unit 0
    gl.uniform1i(gl.getUniformLocation(prog, 'tex'), 0);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'res');
    const uT = gl.getUniformLocation(prog, 't');

    function resize() {
        // Render at a lower resolution, then let CSS scale it up with pixelated rendering
        canvas.width  = Math.ceil(canvas.clientWidth  / PIXEL);
        canvas.height = Math.ceil(canvas.clientHeight / PIXEL);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uRes, canvas.width, canvas.height);
    }
    new ResizeObserver(resize).observe(canvas);
    resize();

    let visible = true;
    new IntersectionObserver(e => visible = e[0].isIntersecting).observe(canvas);

    const start = performance.now();
    (function frame(now) {
        if (visible) {
        gl.uniform1f(uT, (now - start) / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        requestAnimationFrame(frame);
    })(start);
})();