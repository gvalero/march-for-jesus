const eventDate = new Date(2026, 4, 16, 10, 0, 0).getTime();

function updateCountdown() {
	var daysEl = document.getElementById("days");
	var hoursEl = document.getElementById("hours");
	var minutesEl = document.getElementById("minutes");
	var secondsEl = document.getElementById("seconds");

	if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
		return;
	}

	var now = new Date().getTime();
	var distance = eventDate - now;

	if (distance <= 0) {
		daysEl.textContent = "00";
		hoursEl.textContent = "00";
		minutesEl.textContent = "00";
		secondsEl.textContent = "00";
		return;
	}

	var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);

	daysEl.textContent = String(days).padStart(2, "0");
	hoursEl.textContent = String(hours).padStart(2, "0");
	minutesEl.textContent = String(minutes).padStart(2, "0");
	secondsEl.textContent = String(seconds).padStart(2, "0");
}

document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll("img").forEach(function (img, index) {
		if (!img.hasAttribute("loading")) {
			img.setAttribute("loading", index < 2 ? "eager" : "lazy");
		}
		if (!img.hasAttribute("decoding")) {
			img.setAttribute("decoding", "async");
		}
	});

	const menuToggle = document.querySelector(".menu-toggle");
	const menu = document.querySelector(".menu");
	const submenuParents = document.querySelectorAll(".menu .has-submenu > a");

	if (menuToggle && menu) {
		submenuParents.forEach(function (toggle) {
			toggle.addEventListener("click", function (event) {
				if (window.innerWidth > 900) {
					return;
				}
				event.preventDefault();
				const parent = toggle.parentElement;
				if (!parent) {
					return;
				}
				document.querySelectorAll(".menu .has-submenu.open").forEach(function (item) {
					if (item !== parent) {
						item.classList.remove("open");
					}
				});
				parent.classList.toggle("open");
			});
		});

		menuToggle.addEventListener("click", function () {
			const isOpen = menu.classList.toggle("is-open");
			menuToggle.classList.toggle("is-active", isOpen);
			menuToggle.setAttribute("aria-expanded", String(isOpen));
		});

		menu.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				if (window.innerWidth <= 900 && link.parentElement && link.parentElement.classList.contains("has-submenu")) {
					return;
				}
				if (window.innerWidth <= 900) {
					menu.classList.remove("is-open");
					menuToggle.classList.remove("is-active");
					menuToggle.setAttribute("aria-expanded", "false");
					document.querySelectorAll(".menu .has-submenu.open").forEach(function (item) {
						item.classList.remove("open");
					});
				}
			});
		});

		window.addEventListener("resize", function () {
			if (window.innerWidth > 900) {
				menu.classList.remove("is-open");
				menuToggle.classList.remove("is-active");
				menuToggle.setAttribute("aria-expanded", "false");
				document.querySelectorAll(".menu .has-submenu.open").forEach(function (item) {
					item.classList.remove("open");
				});
			}
		});
	}

	updateCountdown();
	setInterval(updateCountdown, 1000);

	const watchStats = document.querySelector(".watch-stats");
	let countersStarted = false;

	function startCounters() {
		if (countersStarted) {
			return;
		}
		countersStarted = true;

		const counters = document.querySelectorAll(".counter");
		counters.forEach(function (counter) {
			const target = Number(counter.dataset.target) || 0;
			let count = 0;

			function update() {
				count += target / 150;
				if (count < target) {
					counter.textContent = String(Math.floor(count));
					requestAnimationFrame(update);
				} else {
					counter.textContent = target.toLocaleString() + "+";
				}
			}

			update();
		});
	}

	if (watchStats && typeof IntersectionObserver !== "undefined") {
		const counterObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					startCounters();
					counterObserver.disconnect();
				}
			});
		}, { threshold: 0.2 });

		counterObserver.observe(watchStats);

		setTimeout(function () {
			if (!countersStarted) {
				startCounters();
			}
		}, 1200);
	} else if (watchStats) {
		startCounters();
	}

	if (typeof IntersectionObserver !== "undefined") {
		var sectionObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add("show");
				}
			});
		});

		document.querySelectorAll(".animate").forEach(function (el) {
			sectionObserver.observe(el);
		});
	}
});

// --- Email Signup Form (MailerLite via Cloudflare Worker) ---
var emailForm = document.getElementById('emailSignupForm');
if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = emailForm.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        var formData = {
            email: emailForm.querySelector('[name="email"]').value,
            name: emailForm.querySelector('[name="name"]').value,
            last_name: emailForm.querySelector('[name="last_name"]').value,
            phone: (emailForm.querySelector('[name="phone"]') || {}).value || '',
            church: (emailForm.querySelector('[name="church"]') || {}).value || '',
            form_type: 'website_signup'
        };

        fetch('https://mfj-mailerlite-proxy.valerogian.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(function(response) {
            if (response.ok) {
                if (typeof gtag === 'function') {
                    gtag('event', 'generate_lead', { event_category: 'signup', event_label: 'email_signup' });
                }
                btn.textContent = 'Thank you!';
                emailForm.reset();
            } else {
                btn.textContent = 'Error — try again';
            }
        }).catch(function() {
            btn.textContent = 'Error — try again';
        }).finally(function() {
            setTimeout(function() {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    });
}

// --- Contact Form (MailerLite via Cloudflare Worker) ---
var contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        var btn = contactForm.querySelector('button[type="submit"]');
        var originalText = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;

        var formData = {
            email: document.getElementById('contactEmail').value,
            name: document.getElementById('firstName').value,
            last_name: document.getElementById('lastName').value,
            phone: (document.getElementById('phone') || {}).value || '',
            form_type: 'contact_form'
        };

        fetch('https://mfj-mailerlite-proxy.valerogian.workers.dev', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(function(response) {
            if (response.ok) {
                if (typeof gtag === 'function') {
                    gtag('event', 'contact', { event_category: 'engagement', event_label: 'contact_form' });
                }
                btn.textContent = 'Sent!';
                contactForm.reset();
            } else {
                btn.textContent = 'Error — try again';
            }
        }).catch(function() {
            btn.textContent = 'Error — try again';
        }).finally(function() {
            setTimeout(function() {
                btn.textContent = originalText;
                btn.disabled = false;
            }, 3000);
        });
    });
}
