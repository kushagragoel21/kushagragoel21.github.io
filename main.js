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

function animateProgressRings() {
  const skills = document.querySelectorAll('.skill');
  skills.forEach(skill => {
    const circle = skill.querySelector('.progress-ring__circle.progress');
    const percentSpan = skill.querySelector('.percent span');
    const targetPercent = parseInt(percentSpan.getAttribute('data-target'));
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    let currentPercent = 0;
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 frames per second
    const increment = targetPercent / steps;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const animation = setInterval(() => {
      currentPercent += increment;
      if (currentPercent >= targetPercent) {
        currentPercent = targetPercent;
        clearInterval(animation);
      }

      const offset = circumference - (currentPercent / 100 * circumference);
      circle.style.strokeDashoffset = offset;
      percentSpan.textContent = Math.round(currentPercent);
    }, duration / steps);
  });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

let animationTriggered = false;

function handleScroll() {
  const professionalSkills = document.getElementById('professional-skills');
  if (!animationTriggered && isInViewport(professionalSkills)) {
    animateProgressRings();
    animationTriggered = true;
    window.removeEventListener('scroll', handleScroll);
  }
}

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', function() {
  // Set initial target percentages
  const targetPercentages = [90, 65, 75, 85];
  const percentSpans = document.querySelectorAll('.percent span');
  percentSpans.forEach((span, index) => {
    span.setAttribute('data-target', targetPercentages[index]);
    span.textContent = '0';
  });

  handleScroll();
});