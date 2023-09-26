import "./styles/index.scss"

// Core
import STORE from "Store"
import RAF from "../Core/RAF"
import Canvas from "../Core/Canvas"
import Preloader from "../Core/Preloader"
import Router from "../Core/Router"

// Pages
// Import your pages here
// These will be loaded by the preloader
import Home from "./pages/home"
import About from "./pages/about"

// import gsap from "gsap"
// import { CustomEase } from "gsap/CustomEase"

class App {
  constructor() {
    // gsap.registerPlugin(CustomEase)
    const r = document.querySelector("#r")
    const preloadElement = document.querySelector("[data-preloader]")
    this.pagesParent = document.querySelector("#main")
    this.app = document.querySelector("#app")
    STORE.url = window.location.pathname

    STORE.setUrl = function (data) {
      this.url = data
    }

    // STORE.mainTimeline = gsap.timeline({
    //   paused: true,
    //   autoRemoveChildren: true,
    //   onComplete: () => {
    //     STORE.preloader.pageLoaded = true
    //     STORE.router.showPage(STORE.router.tree.currentPage)
    //   },
    // })
    STORE.raf = new RAF()

    this.pages = {
      "/": new Home(),
      "/about": new About(),
    }

    STORE.router = new Router({
      pages: this.pages,
      pagesParent: this.pagesParent,
    })

    STORE.preloader = new Preloader({
      el: preloadElement,
      pagesParent: this.pagesParent,
    })

    this.canvas = new Canvas({ el: r })

    this.load()
  }

  load() {
    STORE.preloader.em.on("completed", () => {
      this.init()
    })
  }

  init() {
    // STORE.allez = new Allez()
    STORE.raf.on("loop", () => this.loop())

    this.resize()
    this.listeners()
    this.linkListeners()

    // STORE.mainTimeline.play()
    STORE.preloadTimeline.play()
    STORE.preloadTimeline.finished.then(() => STORE.preloader.destroy())
  }

  listeners() {
    window.addEventListener("resize", this.resize.bind(this), {
      passive: true,
    })
    window.addEventListener("popstate", this.popState.bind(this), {
      passive: true,
    })
  }

  linkListeners() {
    const links = document.querySelectorAll("a")

    links.forEach((l) => {
      const local = l.href.indexOf(window.location.origin) > -1

      if (local) {
        l.onclick = (e) => {
          e.preventDefault()

          if (l.getAttribute("href") !== window.location.pathname) {
            STORE.dispatch("setUrl", [l.getAttribute("href")])
            STORE.router.route()
          }
        }
      } else if (
        l.href.indexOf("mailto") === -1 &&
        l.href.indexOf("tel") === -1
      ) {
        l.rel = "noopener"
        l.target = "_blank"
      }
    })
  }

  popState() {
    STORE.dispatch("setUrl", [window.location.pathname])
    STORE.router.route()
  }

  resize() {
    this.canvas && this.canvas.resize()
    STORE.allez && STORE.allez.checkResize()
  }

  loop() {
    if (this.canvas) this.canvas.loop()
  }
}

new App()
