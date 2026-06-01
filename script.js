/* PAGE CHANGE */

const pages = document.querySelectorAll(".page");

function showPage() {
  const hash = window.location.hash || "#home";
  const target = document.querySelector(hash);

  pages.forEach((page) => {
    page.classList.remove("active");
  });

  if (target && target.classList.contains("page")) {
    target.classList.add("active");

    document.body.classList.toggle(
      "is-long-footer-page",
      target.classList.contains("detail-page") ||
      target.classList.contains("information-page")
    );

    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  } else {
    const home = document.querySelector("#home");
    home.classList.add("active");
    document.body.classList.remove("is-detail-page");
  }
}

window.addEventListener("hashchange", showPage);
showPage();


/* TEXT REVEAL */
/* 기존 <br> 줄바꿈은 유지하고, 좁아질 때는 단어 단위로 줄바꿈 */

const revealTexts = document.querySelectorAll(".js-reveal-text");

revealTexts.forEach((text) => {
  const originalHTML = text.innerHTML.trim();

  const lines = originalHTML.split(/<br\s*\/?>/i);

  let delayIndex = 0;

  const wrappedLines = lines.map((line) => {
    const words = line.trim().split(/\s+/);

    return words
      .map((word) => {
        const chars = [...word]
          .map((char) => {
            const span = `<span class="char" style="transition-delay:${delayIndex * 0.018}s">${char}</span>`;
            delayIndex++;
            return span;
          })
          .join("");

        return `<span class="word">${chars}</span>`;
      })
      .join(" ");
  });

  text.innerHTML = wrappedLines.join("<br>");
});

const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.35
  }
);

revealTexts.forEach((text) => {
  textObserver.observe(text);
});


/* CURSOR WORD */
/* 프로젝트 썸네일 hover 단어 + casefilm click to play 문구를 하나의 커서 텍스트로 관리 */

const cursorWord = document.createElement("span");
cursorWord.className = "cursor-word";
document.body.appendChild(cursorWord);

function showCursorWord(text) {
  cursorWord.textContent = text;
  cursorWord.style.opacity = "1";
}

function moveCursorWord(event) {
  cursorWord.style.left = `${event.clientX}px`;
  cursorWord.style.top = `${event.clientY}px`;
}

function hideCursorWord() {
  cursorWord.style.opacity = "0";
}

const hoverWords = [
  "View",
  "Go",
  "Move",
  "Alive",
  "W.I.P.",
  "Again"
];

function getRandomHoverWord() {
  return hoverWords[Math.floor(Math.random() * hoverWords.length)];
}


/* PROJECT HOVER WORD */
/* casefilm-video-box는 여기서 제외. 그래야 Click to play랑 안 겹침 */

const hoverTargets = document.querySelectorAll(
  ".project-card, .project-list-card"
);

hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    showCursorWord(getRandomHoverWord());
  });

  target.addEventListener("mousemove", (event) => {
    moveCursorWord(event);
  });

  target.addEventListener("mouseleave", () => {
    hideCursorWord();
  });
});


/* CASE FILM CLICK TO PLAY */

const casefilmBoxes = document.querySelectorAll(".casefilm-video-box");

casefilmBoxes.forEach((box) => {
  const video = box.querySelector("video");

  box.addEventListener("mouseenter", () => {
    if (video.paused) {
      showCursorWord("Click to play");
    } else {
      showCursorWord("Click to pause");
    }
  });

  box.addEventListener("mousemove", (event) => {
    moveCursorWord(event);
  });

  box.addEventListener("mouseleave", () => {
    hideCursorWord();
  });

  box.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      showCursorWord("Click to pause");
    } else {
      video.pause();
      showCursorWord("Click to play");
    }
  });

  video.addEventListener("ended", () => {
    showCursorWord("Click to play");
  });
});


const infoLinks = document.querySelectorAll(".info-link");

infoLinks.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    showCursorWord("Go");
  });

  link.addEventListener("mousemove", (event) => {
    moveCursorWord(event);
  });

  link.addEventListener("mouseleave", () => {
    hideCursorWord();
  });
});