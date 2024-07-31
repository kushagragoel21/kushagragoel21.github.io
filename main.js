var typed = new Typed(".text", {
  strings: ["Kushagra Goel"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

var typed = new Typed(".text-2", {
  strings: ["3D Designing", "CAD Simulations", "Web Development"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true
});

document.addEventListener('DOMContentLoaded', () => {
  const skills = [
    { name: 'Creativity', percent: 90 },
    { name: 'Communication', percent: 65 },
    { name: 'Problem Solving', percent: 75 },
    { name: 'Teamwork', percent: 85 }
  ];

  const skillElements = document.querySelectorAll('.skill');

  function setProgress(skill, percent) {
    const circle = skill.querySelector('.progress-ring__circle.progress');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percent / 100 * circumference);
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
    skill.querySelector('.percent').textContent = `${percent}%`;
  }

  function animateProgress() {
    skillElements.forEach((skill, index) => {
      const targetPercent = skills[index].percent;
      let currentPercent = 0;
      const animation = setInterval(() => {
        if (currentPercent >= targetPercent) {
          clearInterval(animation);
        } else {
          currentPercent++;
          setProgress(skill, currentPercent);
        }
      }, 50);
    });
  }

  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function handleScroll() {
    if (isInViewport(skillElements[0]) && !animationTriggered) {
      animateProgress();
      animationTriggered = true;
      window.removeEventListener('scroll', handleScroll);
    }
  }

  let animationTriggered = false;
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check on load in case the element is already in view
});
