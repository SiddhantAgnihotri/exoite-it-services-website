import { useEffect } from "react";

// Enhance visible HTML; never gate content behind an animation-ready class.
export default function useSectionReveals(pathname) {
  useEffect(() => {
    if (!window.IntersectionObserver || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const animations = new Set();
    let observer;
    const stop = () => {
      observer?.disconnect();
      animations.forEach(animation => animation.cancel());
      animations.clear();
    };
    const configure = () => {
      stop();
      if (preference.matches) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          // Keyboard users should never have to follow a moving focus target.
          if (entry.target.contains(document.activeElement)) continue;
          const animation = entry.target.animate(
            [{ transform: "translateY(12px)" }, { transform: "none" }],
            { duration: 420, easing: "cubic-bezier(.2,.7,.2,1)" },
          );
          animations.add(animation);
          const release = () => animations.delete(animation);
          animation.onfinish = release;
          animation.oncancel = release;
        }
      }, { threshold: 0.06, rootMargin: "0px 0px -32px 0px" });
      // Hero, long-form reading and form controls remain static. One target per
      // major section avoids paragraph-by-paragraph motion and stagger delays.
      document.querySelectorAll("main:not(.contact-page) > section.section > .container").forEach(element => {
        if (element.classList.contains("reading-layout")) return;
        if (element.getBoundingClientRect().top >= window.innerHeight) observer.observe(element);
      });
    };
    const onFocus = event => {
      for (const animation of animations) {
        if (animation.effect?.target?.contains(event.target)) animation.cancel();
      }
    };
    configure();
    preference.addEventListener("change", configure);
    document.addEventListener("focusin", onFocus);
    return () => {
      stop();
      preference.removeEventListener("change", configure);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);
}
