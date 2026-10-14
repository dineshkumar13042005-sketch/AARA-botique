document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    // 1. DYNAMIC CURRENT DATE DISPLAY (SCREENSHOT 2 STYLE)
    // ============================================================
    const currentDateEl = document.getElementById('currentDateStr');
    if (currentDateEl) {
        const today = new Date();
        const options = { month: 'long', day: 'numeric' };
        let day = today.getDate();
        let suffix = 'th';
        if (day % 10 === 1 && day !== 11) suffix = 'st';
        else if (day % 10 === 2 && day !== 12) suffix = 'nd';
        else if (day % 10 === 3 && day !== 13) suffix = 'rd';

        const monthName = today.toLocaleDateString('en-US', { month: 'long' });
        currentDateEl.textContent = `${monthName} ${day}${suffix}`;
    }

    // ============================================================
    // 2. MODAL CONTROLS & HELPERS
    // ============================================================
    const welcomeModal = document.getElementById('welcomeModal');
    const enrollModal = document.getElementById('enrollModal');
    const demoModal = document.getElementById('demoModal');
    const videoReviewModal = document.getElementById('videoReviewModal');
    const reviewModalVideo = document.getElementById('reviewModalVideo');

    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (!document.querySelector('.modal-overlay.active')) {
            document.body.style.overflow = '';
        }
    }

    function closeReviewModal() {
        if (reviewModalVideo) {
            reviewModalVideo.pause();
            reviewModalVideo.currentTime = 0;
        }
        closeModal(videoReviewModal);
    }

    // Close buttons
    const closeWelcomeBtn = document.getElementById('closeWelcomeModal');
    const closeEnrollBtn = document.getElementById('closeEnrollModal');
    const closeDemoBtn = document.getElementById('closeDemoModal');
    const enrollDoneBtn = document.getElementById('enrollDoneBtn');
    const modalDemoDoneBtn = document.getElementById('modalDemoDoneBtn');

    if (closeWelcomeBtn) closeWelcomeBtn.addEventListener('click', () => closeModal(welcomeModal));
    if (closeEnrollBtn) closeEnrollBtn.addEventListener('click', () => closeModal(enrollModal));
    if (closeDemoBtn) closeDemoBtn.addEventListener('click', () => closeModal(demoModal));
    if (enrollDoneBtn) enrollDoneBtn.addEventListener('click', () => closeModal(enrollModal));
    if (modalDemoDoneBtn) modalDemoDoneBtn.addEventListener('click', () => closeModal(demoModal));

    // Backdrop click & Escape key
    [welcomeModal, enrollModal, demoModal, videoReviewModal].forEach(modal => {
        if (!modal) return;
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                if (modal === videoReviewModal) {
                    closeReviewModal();
                } else {
                    closeModal(modal);
                }
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(welcomeModal);
            closeModal(enrollModal);
            closeModal(demoModal);
            closeReviewModal();
        }
    });

    // ============================================================
    // 2B. WELCOME POPUP ACTIONS (1. APPLY, 2. ENQUIRE, 3. CLOSE TAB)
    // ============================================================
    const welcomeActionApply = document.getElementById('welcomeActionApply');
    const welcomeActionEnquire = document.getElementById('welcomeActionEnquire');
    const welcomeActionCloseTab = document.getElementById('welcomeActionCloseTab');

    // 1. Apply for the course
    if (welcomeActionApply) {
        welcomeActionApply.addEventListener('click', () => {
            closeModal(welcomeModal);
            openModal(enrollModal);
            const offerSec = document.getElementById('offerSection');
            if (offerSec) {
                offerSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // 2. Course enquires
    if (welcomeActionEnquire) {
        welcomeActionEnquire.addEventListener('click', () => {
            closeModal(welcomeModal);
            const enquiryMsg = "Hi Aara Boutique! I would like to make an enquiry regarding the 90-Day Course (syllabus details, batch timings, and fees).";
            window.open(`https://wa.me/919025927548?text=${encodeURIComponent(enquiryMsg)}`, '_blank');
        });
    }

    // 3. Close the tab
    if (welcomeActionCloseTab) {
        welcomeActionCloseTab.addEventListener('click', () => {
            // Attempt to close the browser window/tab
            window.close();
            // If browser prevents closing a tab not opened via script, gracefully close modal
            closeModal(welcomeModal);
        });
    }

    // Auto-launch welcome modal when user opens the website
    if (welcomeModal) {
        setTimeout(() => {
            openModal(welcomeModal);
        }, 400);
    }

    // ============================================================
    // 3. CTA & ENROLL TRIGGERS
    // ============================================================
    const topbarLockBtn = document.getElementById('topbarLockBtn');
    const offerCtaBtn = document.getElementById('offerCtaBtn');
    const workshopCtaBtn = document.getElementById('workshopCtaBtn');
    const finalCtaBtn = document.getElementById('finalCtaBtn');
    const navDemoBtn = document.getElementById('navDemoBtn');

    // Lock price buttons -> open Enroll Modal
    [topbarLockBtn, offerCtaBtn, workshopCtaBtn, finalCtaBtn].forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            openModal(enrollModal);
        });
    });

    // Demo triggers -> open Demo Modal
    if (navDemoBtn) {
        navDemoBtn.addEventListener('click', () => openModal(demoModal));
    }

    document.querySelectorAll('.demo-modal-trigger').forEach(btn => {
        btn.addEventListener('click', () => {
            const skill = btn.getAttribute('data-skill');
            const selectEl = document.getElementById('modalDemoSkill');
            if (selectEl && skill) {
                for (let i = 0; i < selectEl.options.length; i++) {
                    if (selectEl.options[i].value.toLowerCase().includes(skill.toLowerCase())) {
                        selectEl.selectedIndex = i;
                        break;
                    }
                }
            }
            openModal(demoModal);
        });
    });

    // ============================================================
    // 4. HERO VIDEO SALES LETTER (IMG_4583.mp4)
    // ============================================================
    const heroVideo = document.getElementById('heroVideo');
    const heroCard = document.getElementById('heroVideoCard');
    const heroAudioBtn = document.getElementById('heroAudioToggle');
    const heroPlayOverlay = document.getElementById('heroPlayOverlay');

    if (heroVideo) {
        heroVideo.muted = true; // Required for mobile autoplay compliance

        // Audio toggle
        if (heroAudioBtn) {
            heroAudioBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (heroVideo.muted) {
                    heroVideo.muted = false;
                    heroAudioBtn.classList.add('unmuted');
                    heroAudioBtn.innerHTML = '<span class="audio-icon">&#128266;</span><span class="audio-text">Sound On</span>';
                } else {
                    heroVideo.muted = true;
                    heroAudioBtn.classList.remove('unmuted');
                    heroAudioBtn.innerHTML = '<span class="audio-icon">&#128263;</span><span class="audio-text">Muted &bull; Tap for Sound</span>';
                }
            });
        }

        // Click on video to toggle play/pause
        heroCard.addEventListener('click', () => {
            if (heroVideo.paused) {
                heroVideo.play().then(() => {
                    heroCard.classList.remove('paused');
                }).catch(() => {});
            } else {
                heroVideo.pause();
                heroCard.classList.add('paused');
            }
        });

        heroVideo.addEventListener('play', () => heroCard.classList.remove('paused'));
        heroVideo.addEventListener('pause', () => heroCard.classList.add('paused'));

        // Play when scrolled into view
        if ('IntersectionObserver' in window) {
            const heroObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                        heroVideo.play().catch(() => {});
                    } else {
                        heroVideo.pause();
                    }
                });
            }, { threshold: [0.25] });

            heroObserver.observe(heroVideo);
        }
    }



    // ============================================================
    // 5B. STUDENT VIDEO REVIEWS (4.mp4, 3.mp4, 2.mp4, 1.mp4)
    // ============================================================
    const videoReviewsData = [
        {
            src: '4.mp4',
            name: 'Ashivitha.',
            city: 'Coimbatore',
            title: 'Mastered Bridal Aari & Zardosi Needlework',
            desc: 'I was scared I could never handle an aari needle. In 45 days, I learned complete bridal threadwork and now take heavy orders!'
        },
        {
            src: '3.mp4',
            name: 'mandhana.',
            city: 'Coimbatore',
            title: 'Zero Experience to 12 Designer Blouse Orders',
            desc: 'Started with zero sewing machine knowledge. Completed my final blouse project and took 12 orders from neighbors in my first month!'
        },
        {
            src: '2.mp4',
            name: 'Ishwariya.',
            city: 'Coimbatore',
            title: 'Live Tutor Checks Fixed My Neckline Fitting',
            desc: 'The tutors watched my stitching live on camera and corrected my shoulder cuts. Never had any fitting complaints since!'
        },
        {
            src: '1.mp4',
            name: 'chithra',
            city: 'Coimbatore',
            title: 'Priced My First Bridal Order at High Profit',
            desc: 'Pillar 3 taught me boutique client acquisition and pricing. Quoted high rates with confidence and got repeat bridal orders!'
        }
    ];

    let currentReviewIndex = 0;
    const videoReviewModalTitle = document.getElementById('videoReviewModalTitle');
    const videoReviewModalDesc = document.getElementById('videoReviewModalDesc');
    const videoReviewCounter = document.getElementById('videoReviewCounter');
    const closeVideoReviewBtn = document.getElementById('closeVideoReviewModal');
    const prevReviewBtn = document.getElementById('prevReviewBtn');
    const nextReviewBtn = document.getElementById('nextReviewBtn');

    function openReviewModal(index) {
        if (index < 0) index = videoReviewsData.length - 1;
        if (index >= videoReviewsData.length) index = 0;
        currentReviewIndex = index;
        const review = videoReviewsData[index];

        if (reviewModalVideo && review) {
            reviewModalVideo.pause();
            reviewModalVideo.src = review.src;
            if (videoReviewModalTitle) {
                videoReviewModalTitle.innerHTML = `${review.name} &bull; ${review.city}`;
            }
            if (videoReviewModalDesc) {
                videoReviewModalDesc.textContent = review.title;
            }
            if (videoReviewCounter) {
                videoReviewCounter.textContent = `${index + 1} / ${videoReviewsData.length}`;
            }

            openModal(videoReviewModal);
            reviewModalVideo.load();
            const playPromise = reviewModalVideo.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {});
            }
        }
    }

    if (closeVideoReviewBtn) {
        closeVideoReviewBtn.addEventListener('click', closeReviewModal);
    }
    if (prevReviewBtn) {
        prevReviewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openReviewModal(currentReviewIndex - 1);
        });
    }
    if (nextReviewBtn) {
        nextReviewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openReviewModal(currentReviewIndex + 1);
        });
    }

    // Product cards click & hover handling
    const reviewCards = document.querySelectorAll('.video-product-card');
    reviewCards.forEach((card) => {
        const index = parseInt(card.getAttribute('data-video-index'), 10) || 0;

        card.addEventListener('click', () => {
            openReviewModal(index);
        });

        // Hover preview for desktop
        const thumb = card.querySelector('.video-card-thumb');
        if (thumb) {
            card.addEventListener('mouseenter', () => {
                thumb.play().catch(() => {});
            });
            card.addEventListener('mouseleave', () => {
                thumb.pause();
                thumb.currentTime = 0;
            });
        }
    });

    // ============================================================
    // 6. FAQ ACCORDION INTERACTION
    // ============================================================
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        if (!questionBtn) return;

        questionBtn.addEventListener('click', () => {
            const wasActive = item.classList.contains('active');

            // Close all
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle clicked
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================================
    // 6B. FAQ VIDEO PLAYER (1_landscape_16x9.mp4)
    // ============================================================
    const faqVideo = document.getElementById('faqVideo');
    const faqCard = document.getElementById('faqVideoCard');
    const faqAudioBtn = document.getElementById('faqAudioToggle');
    const faqFsBtn = document.getElementById('faqFsToggle');
    const faqProgressBar = document.getElementById('faqProgressBar');
    const faqProgressFilled = document.getElementById('faqProgressFilled');

    if (faqVideo && faqCard) {
        faqVideo.muted = true; // Mobile autoplay compliance
        faqCard.classList.add('paused');

        // Audio toggle
        if (faqAudioBtn) {
            faqAudioBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (faqVideo.muted) {
                    faqVideo.muted = false;
                    faqAudioBtn.classList.add('unmuted');
                    faqAudioBtn.innerHTML = '<span class="audio-icon">&#128266;</span><span class="audio-text">Sound On</span>';
                } else {
                    faqVideo.muted = true;
                    faqAudioBtn.classList.remove('unmuted');
                    faqAudioBtn.innerHTML = '<span class="audio-icon">&#128263;</span><span class="audio-text">Muted &bull; Tap for Sound</span>';
                }
            });
        }

        // Fullscreen toggle
        if (faqFsBtn) {
            faqFsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!document.fullscreenElement) {
                    if (faqCard.requestFullscreen) {
                        faqCard.requestFullscreen();
                    } else if (faqVideo.requestFullscreen) {
                        faqVideo.requestFullscreen();
                    } else if (faqVideo.webkitRequestFullscreen) {
                        faqVideo.webkitRequestFullscreen();
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            });
        }

        // Card click toggles play/pause
        faqCard.addEventListener('click', (e) => {
            // Prevent toggling if clicked on audio button, fullscreen, or progress bar
            if (e.target.closest('#faqAudioToggle') || e.target.closest('#faqFsToggle') || e.target.closest('#faqProgressBar')) {
                return;
            }

            if (faqVideo.paused) {
                faqVideo.play().then(() => {
                    faqCard.classList.remove('paused');
                }).catch(() => {});
            } else {
                faqVideo.pause();
                faqCard.classList.add('paused');
            }
        });

        faqVideo.addEventListener('play', () => faqCard.classList.remove('paused'));
        faqVideo.addEventListener('pause', () => faqCard.classList.add('paused'));

        // Progress bar updates
        if (faqProgressBar && faqProgressFilled) {
            faqVideo.addEventListener('timeupdate', () => {
                if (faqVideo.duration) {
                    const percent = (faqVideo.currentTime / faqVideo.duration) * 100;
                    faqProgressFilled.style.width = `${percent}%`;
                }
            });

            faqProgressBar.addEventListener('click', (e) => {
                e.stopPropagation();
                const rect = faqProgressBar.getBoundingClientRect();
                const clickPos = (e.clientX - rect.left) / rect.width;
                if (faqVideo.duration) {
                    faqVideo.currentTime = clickPos * faqVideo.duration;
                }
            });
        }

        // Auto-play when scrolled into view
        if ('IntersectionObserver' in window) {
            const faqObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
                        faqVideo.play().catch(() => {});
                    } else {
                        faqVideo.pause();
                    }
                });
            }, { threshold: [0.25] });

            faqObserver.observe(faqVideo);
        }
    }

    // ============================================================
    // 7. FORM SUBMISSIONS & WHATSAPP REDIRECTS (90259 27548)
    // ============================================================
    const waNumber = '919025927548';

    // Inline Free Demo Form
    const freeDemoForm = document.getElementById('freeDemoForm');
    const demoInlineSuccess = document.getElementById('demoInlineSuccess');
    const inlineConfirmedName = document.getElementById('inlineConfirmedName');

    if (freeDemoForm) {
        freeDemoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('demoName')?.value || 'Student';
            const phone = document.getElementById('demoPhone')?.value || '';
            const skill = document.getElementById('demoSkill')?.value || 'General';
            if (inlineConfirmedName) inlineConfirmedName.textContent = name;
            freeDemoForm.style.display = 'none';
            if (demoInlineSuccess) demoInlineSuccess.style.display = 'block';

            const msg = `Hi Aara Boutique! I want to book a Free Demo Class.\nName: ${name}\nPhone: ${phone}\nInterested Skill: ${skill}`;
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // Modal Demo Form
    const modalDemoForm = document.getElementById('modalDemoForm');
    const modalDemoSuccess = document.getElementById('modalDemoSuccess');
    const modalDemoConfirmedName = document.getElementById('modalDemoConfirmedName');

    if (modalDemoForm) {
        modalDemoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('modalDemoName')?.value || 'Student';
            const phone = document.getElementById('modalDemoPhone')?.value || '';
            const skill = document.getElementById('modalDemoSkill')?.value || 'General';
            if (modalDemoConfirmedName) modalDemoConfirmedName.textContent = name;
            modalDemoForm.style.display = 'none';
            if (modalDemoSuccess) modalDemoSuccess.style.display = 'block';

            const msg = `Hi Aara Boutique! I want to book a Free Demo Class.\nName: ${name}\nPhone: ${phone}\nInterested Skill: ${skill}`;
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // Enrollment Modal Form
    const enrollForm = document.getElementById('enrollForm');
    const enrollSuccess = document.getElementById('enrollSuccess');
    const enrollConfirmedName = document.getElementById('enrollConfirmedName');

    if (enrollForm) {
        enrollForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('enrollName')?.value || 'Student';
            const phone = document.getElementById('enrollPhone')?.value || '';
            const city = document.getElementById('enrollCity')?.value || '';
            if (enrollConfirmedName) enrollConfirmedName.textContent = name;
            enrollForm.style.display = 'none';
            if (enrollSuccess) enrollSuccess.style.display = 'block';

            const msg = `Hi Aara Boutique! I want to enroll in the 90 Days Challenge (Rs. 6,000/-).\nName: ${name}\nPhone: ${phone}${city ? `\nCity: ${city}` : ''}`;
            window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }

    // ============================================================
    // 10. DYNAMIC SCROLL-DOWN EFFECTS & PROGRESS TRACKER
    // ============================================================
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const brandSubbar = document.querySelector('.brand-subbar');
    const offerBoxWrapper = document.querySelector('.offer-box-wrapper');

    // Smooth Scroll-to-Top Button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Throttled Scroll Listener (60fps requestAnimationFrame)
    let isScrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!isScrollTicking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY || window.pageYOffset;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;

                // 1. Update top glowing reading progress bar
                if (scrollProgressBar && docHeight > 0) {
                    const progressPercent = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
                    scrollProgressBar.style.width = `${progressPercent}%`;
                }

                // 2. Elevate brand header with frosted glass & shadow on scroll
                if (brandSubbar) {
                    if (scrollY > 40) {
                        brandSubbar.classList.add('scrolled');
                    } else {
                        brandSubbar.classList.remove('scrolled');
                    }
                }

                // 3. Reveal floating back-to-top button
                if (scrollTopBtn) {
                    if (scrollY > 350) {
                        scrollTopBtn.classList.add('visible');
                    } else {
                        scrollTopBtn.classList.remove('visible');
                    }
                }

                isScrollTicking = false;
            });
            isScrollTicking = true;
        }
    }, { passive: true });

    // Scroll Reveal for Cards & Sections
    const revealSelectors = [
        '.vsl-headline-wrap',
        '.vsl-video-container',
        '.offer-box-wrapper',
        '.activity-card',
        '.pillar-card',
        '.video-review-card',
        '.faq-video-wrapper',
        '.faq-accordion-item',
        '.demo-enroll-box',
        '.section-challenge-title',
        '.section-title-wrap'
    ];

    const elementsToReveal = document.querySelectorAll(revealSelectors.join(', '));
    elementsToReveal.forEach((el, index) => {
        el.classList.add('scroll-reveal');
        if (el.parentElement) {
            el.style.setProperty('--delay', (index % 4).toString());
        }
    });

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');

                    // Trigger attention glow if it's the special offer box
                    if (entry.target.classList.contains('offer-box-wrapper')) {
                        entry.target.classList.add('scrolled-glow');
                    }
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        elementsToReveal.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        elementsToReveal.forEach(el => el.classList.add('revealed'));
    }
});