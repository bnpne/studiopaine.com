import gsap from 'gsap'

export default class Page {
  constructor({ parent, webgl, html, path }) {
    this.webgl = webgl ?? null
    this.html = html ?? null
    this.parent = parent ?? null
    this.active = false
    this.path = path ?? null
    // this.animaTl = gsap.timeline({
    //   paused: true,
    // })
    this.template = null

    this.create()
  }

  create() {
    // Load HTML
    if (this.html) {
      this.template = render(this.html)
    } else {
      return
    }
    // Load GL
    if (this.webgl) {
      this.loadGl()
    }

    // Create In and Out
    // this.createAnima()

    this.created = true
  }

  loadGl() {
    if (this.webgl) {
      this.webgl.forEach((m, i) => {
        const plane = new THREE.PlaneGeometry(1, 1);
        // const material = new THREE.MeshBasicMaterial({ color: 0x151515 });
        const material = new THREE.ShaderMaterial({
          uniforms: {
            color: { value: new THREE.Color("white") },
            grayscale: { value: 0 },
            zoom: { value: 1 },
            opacity: { value: 1 },
            tex: { value: STATE.textures[ 0 ] },
            scale: { value: new THREE.Vector2(1, 1) },
            imageBounds: {
              value: new THREE.Vector2(
                STATE.textures[ 0 ].source.data.naturalWidth,
                STATE.textures[ 0 ].source.data.naturalHeight
              ),
            },
          },
          transparent: true,
          fragmentShader: fragmentShader,
          vertexShader: vertexShader,
        });

        const mesh = new THREE.Mesh(plane, material);

        this.webglMedia.push(mesh);
        this.webglMedia[ i ].newPos = { x: 0, y: 0 };

        STATE.scene.add(mesh);
      });
    }
  }

  createAnima() { }

  intro() { }

  in() {
    // return new Promise((resolve) => {
    //   this.animaTl.play().then((tl) => {
    //     console.log(tl)
    //     resolve()
    //   })
    // })
    return Promise.resolve()
  }

  out() {
    // return new Promise((resolve) => {
    //   this.animaTl.reverse().then((tl) => {
    //     console.log(tl)
    //     this.animaTl.seek(0).pause()
    //     resolve()
    //   })
    // })
    return Promise.resolve()

  }

  updatePath(path) {
    this.path = path
  }
}
