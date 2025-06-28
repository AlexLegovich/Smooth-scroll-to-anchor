/*options for animation

linearEase

easeInQuad
easeOutQuad
easeInOutQuad

easeInCubic
easeOutCubic
easeInOutCubic

easeInQuart
easeOutQuart
easeInOutQuart

easeInQuint
easeOutQuint
easeInOutQuint

easeInSine
easeOutSine
easeInOutSine

easeInExpo
easeOutExpo
easeInOutExpo

easeInCirc
easeOutCirc
easeInOutCirc


*/

// let speed = 1000
// let speedMobile = 1000
// let easing = easeInOutCirc
// let offset = 164
// let offsetMobile = 200
// let mobileBreakpoint = 768

let scrollAnimationId = null;
function listenForManualScrollInterrupt() {
  const cancelIfScrolling = () => {
    if (scrollAnimationId !== null) {
      cancelAnimationFrame(scrollAnimationId);
      scrollAnimationId = null;
      console.log('Anchor scroll canceled by user interaction');
    }
  };

  window.addEventListener('wheel', cancelIfScrolling, { passive: true });
  window.addEventListener('touchstart', cancelIfScrolling, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  function customScrollTo(targetY, duration, easing) {

    if (scrollAnimationId !== null) {
    cancelAnimationFrame(scrollAnimationId); // Cancel previous if needed
  }
    const startY = window.pageYOffset || document.documentElement.scrollTop
    const distance = targetY - startY
    let startTime = null

    function animation(currentTime) {
      if (!startTime) startTime = currentTime
      let elapsed = currentTime - startTime
      if (elapsed > duration) elapsed = duration

      const scrollPos = easing(elapsed, startY, distance, duration)
      window.scrollTo(0, scrollPos)

      if (elapsed < duration) {
         scrollAnimationId = requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetY)
        scrollAnimationId = null;
      }
    }

     scrollAnimationId = requestAnimationFrame(animation);
  }



  function scrollToAnchor() {
    // Event listener for anchor links
    const anchors = document.querySelectorAll('a[href*="#"]')
    anchors.forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const anchorId = this.getAttribute('href')
        const targetElement = document.querySelector(anchorId)

        if (targetElement) {
          const rect = targetElement.getBoundingClientRect()
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop
          const isMobile = window.innerWidth <= mobileBreakpoint

          const offsetValue = isMobile ? offsetMobile : offset
          const targetPosition = rect.top + scrollTop - offsetValue
          customScrollTo(targetPosition, isMobile ? speedMobile : speed, easing)
        }
      })
    })
  }
  listenForManualScrollInterrupt();
  scrollToAnchor()
})

//animation functions

/*
 * This is a near-direct port of Robert Penner's easing equations. Please shower Robert with
 * praise and all of your admiration. His license is provided below.
 *
 * For information on how to use these functions in your animations, check out:
 * http://www.kirupa.com/html5/animating_with_easing_functions_in_javascript.htm
 *
 * -Kirupa
 */

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 * COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 * GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

function linearEase(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (changeInValue * currentIteration) / totalIterations + startValue
}

function easeInQuad(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue * (currentIteration /= totalIterations) * currentIteration +
    startValue
  )
}

function easeOutQuad(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    -changeInValue *
      (currentIteration /= totalIterations) *
      (currentIteration - 2) +
    startValue
  )
}

function easeInOutQuad(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (
      (changeInValue / 2) * currentIteration * currentIteration + startValue
    )
  }
  return (
    (-changeInValue / 2) * (--currentIteration * (currentIteration - 2) - 1) +
    startValue
  )
}

function easeInCubic(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue
  )
}

function easeOutCubic(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) +
    startValue
  )
}

function easeInOutCubic(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * Math.pow(currentIteration, 3) + startValue
  }
  return (
    (changeInValue / 2) * (Math.pow(currentIteration - 2, 3) + 2) + startValue
  )
}

function easeInQuart(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue
  )
}

function easeOutQuart(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) +
    startValue
  )
}

function easeInOutQuart(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * Math.pow(currentIteration, 4) + startValue
  }
  return (
    (-changeInValue / 2) * (Math.pow(currentIteration - 2, 4) - 2) + startValue
  )
}

function easeInQuint(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue
  )
}

function easeOutQuint(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) +
    startValue
  )
}

function easeInOutQuint(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (changeInValue / 2) * Math.pow(currentIteration, 5) + startValue
  }
  return (
    (changeInValue / 2) * (Math.pow(currentIteration - 2, 5) + 2) + startValue
  )
}

function easeInSine(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue *
      (1 - Math.cos((currentIteration / totalIterations) * (Math.PI / 2))) +
    startValue
  )
}

function easeOutSine(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue *
      Math.sin((currentIteration / totalIterations) * (Math.PI / 2)) +
    startValue
  )
}

function easeInOutSine(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    (changeInValue / 2) *
      (1 - Math.cos((Math.PI * currentIteration) / totalIterations)) +
    startValue
  )
}

function easeInExpo(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) +
    startValue
  )
}

function easeOutExpo(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue *
      (-Math.pow(2, (-10 * currentIteration) / totalIterations) + 1) +
    startValue
  )
}

function easeInOutExpo(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (
      (changeInValue / 2) * Math.pow(2, 10 * (currentIteration - 1)) +
      startValue
    )
  }
  return (
    (changeInValue / 2) * (-Math.pow(2, -10 * --currentIteration) + 2) +
    startValue
  )
}

function easeInCirc(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue *
      (1 -
        Math.sqrt(
          1 - (currentIteration /= totalIterations) * currentIteration
        )) +
    startValue
  )
}

function easeOutCirc(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  return (
    changeInValue *
      Math.sqrt(
        1 -
          (currentIteration = currentIteration / totalIterations - 1) *
            currentIteration
      ) +
    startValue
  )
}

function easeInOutCirc(
  currentIteration,
  startValue,
  changeInValue,
  totalIterations
) {
  if ((currentIteration /= totalIterations / 2) < 1) {
    return (
      (changeInValue / 2) *
        (1 - Math.sqrt(1 - currentIteration * currentIteration)) +
      startValue
    )
  }
  return (
    (changeInValue / 2) *
      (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) +
    startValue
  )
}
