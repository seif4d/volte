(() => {
  'use strict';
  const {plans,localDate,requestUrl}=window.VoltBooking;
  const dialog=document.getElementById('booking');
  const form=document.getElementById('booking-form');
  const next=document.getElementById('next-step');
  const back=form.querySelector('.back-btn');
  const send=document.getElementById('send-request');
  const error=document.getElementById('form-error');
  let step=1, goal='استرخاء', lastTrigger=null;

  function data(){return Object.fromEntries(new FormData(form));}
  function total(){
    const value=plans[form.elements.plan.value].price;
    document.getElementById('booking-total').replaceChildren(
      document.createTextNode(value.toLocaleString('en-US')+' '),
      Object.assign(document.createElement('small'),{textContent:'جنيه'})
    );
  }

  function review(){
    const d=data(), p=plans[d.plan], summary=document.getElementById('booking-summary');
    const rows=[
      ['الباقة', d.plan+' · '+p.minutes+' دقيقة'],
      ['هدف الجلسة', d.goal],
      ['المنطقة', d.area],
      ['اليوم', d.date||'نتفق عليه على واتساب'],
      ['الوقت', d.time||'نتفق عليه على واتساب']
    ];
    if(d.notes.trim()) rows.push(['ملاحظاتك', d.notes.trim()]);
    summary.replaceChildren(...rows.map(([k,v])=>{
      const row=document.createElement('div');
      const dt=document.createElement('dt'), dd=document.createElement('dd');
      dt.textContent=k; dd.textContent=v;
      row.append(dt,dd);
      return row;
    }));
    send.href=requestUrl(d);
  }

  function showStep(number,focus=true){
    step=number; error.textContent='';
    form.querySelectorAll('[data-step]').forEach(panel=>{
      panel.hidden=Number(panel.dataset.step)!==step;
    });
    dialog.querySelectorAll('[data-step-label]').forEach(label=>{
      label.classList.toggle('active', Number(label.dataset.stepLabel)<=step);
      if(Number(label.dataset.stepLabel)===step) label.setAttribute('aria-current','step');
      else label.removeAttribute('aria-current');
    });
    back.hidden=step===1; next.hidden=step===3; send.hidden=step!==3;
    if(step===3) review();
    dialog.scrollTop=0;
    if(focus){
      const target=step===3?send:form.querySelector(`[data-step="${step}"] input,[data-step="${step}"] select,[data-step="${step}"] button.custom-select-trigger`);
      target?.focus({preventScroll:true});
    }
  }

  // Creative Custom Goal Select Component
  const customSelect = document.getElementById('goal-custom-select');
  let syncGoalUI = () => {};
  if(customSelect){
    const trigger = customSelect.querySelector('.custom-select-trigger');
    const menu = customSelect.querySelector('.custom-select-menu');
    const triggerTitle = document.getElementById('goal-trigger-title');
    const triggerSub = document.getElementById('goal-trigger-sub');
    const triggerIcon = document.getElementById('goal-trigger-icon');
    const options = [...customSelect.querySelectorAll('.option-card')];
    const nativeSelect = document.getElementById('goal-native-select') || form.elements.goal;

    syncGoalUI = (val) => {
      const target = options.find(opt => opt.dataset.value === val) || options[0];
      if(!target) return;
      options.forEach(opt => {
        opt.setAttribute('aria-selected', String(opt === target));
      });
      const strong = target.querySelector('.opt-header strong');
      const small = target.querySelector('.opt-info small');
      const icon = target.querySelector('.opt-icon');
      if(strong && triggerTitle) triggerTitle.textContent = strong.textContent;
      if(small && triggerSub) triggerSub.textContent = small.textContent;
      if(icon && triggerIcon){
        triggerIcon.className = 'trigger-icon ' + (icon.className.split(' ')[1] || '');
        triggerIcon.innerHTML = icon.innerHTML;
      }
    };

    function toggleMenu(open){
      const willOpen = typeof open === 'boolean' ? open : menu.hidden;
      menu.hidden = !willOpen;
      customSelect.classList.toggle('is-open', willOpen);
      trigger.setAttribute('aria-expanded', String(willOpen));
    }

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        const val = opt.dataset.value;
        if(nativeSelect){
          nativeSelect.value = val;
          form.dispatchEvent(new Event('change'));
        }
        goal = val;
        syncGoalUI(val);
        toggleMenu(false);
        trigger.focus();
      });
    });

    customSelect.addEventListener('keydown', (e) => {
      if(e.key === 'Escape'){
        toggleMenu(false);
        trigger.focus();
      } else if(e.key === 'ArrowDown' || e.key === 'ArrowUp'){
        e.preventDefault();
        if(menu.hidden) toggleMenu(true);
        const activeIdx = options.findIndex(o => o.getAttribute('aria-selected') === 'true');
        const nextIdx = e.key === 'ArrowDown'
          ? (activeIdx + 1) % options.length
          : (activeIdx - 1 + options.length) % options.length;
        options[nextIdx].click();
      }
    });

    document.addEventListener('click', (e) => {
      if(!customSelect.contains(e.target) && !menu.hidden){
        toggleMenu(false);
      }
    });
  }

  // Creative Custom Area Select Component
  const areaSelect = document.getElementById('area-custom-select');
  let syncAreaUI = () => {};
  let toggleAreaMenu = () => {};
  if(areaSelect){
    const areaTrigger = areaSelect.querySelector('.custom-select-trigger');
    const areaMenu = document.getElementById('area-options-list');
    const areaSearch = document.getElementById('area-menu-search-input');
    const areaTitle = document.getElementById('area-trigger-title');
    const areaSub = document.getElementById('area-trigger-sub');
    const areaOptions = [...areaSelect.querySelectorAll('.area-option-row')];
    const quickChips = [...areaSelect.querySelectorAll('.quick-chip')];
    const nativeArea = document.getElementById('area-native-select') || form.elements.area;

    const normalizeText = str => (str || '').trim().replace(/[أإآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه').replace(/[\u064B-\u065F]/g, '').toLowerCase();

    syncAreaUI = (val) => {
      if(nativeArea) nativeArea.value = val || '';
      const target = areaOptions.find(opt => opt.dataset.value === val);
      areaOptions.forEach(opt => {
        opt.setAttribute('aria-selected', String(opt.dataset.value === val));
      });
      quickChips.forEach(chip => {
        chip.classList.toggle('is-active', chip.dataset.quickArea === val);
      });
      if(val && target){
        if(areaTitle) areaTitle.textContent = val;
        if(areaSub) areaSub.textContent = val === 'منطقة أخرى في القاهرة الكبرى' ? 'حدد تفاصيل العنوان في الملاحظات' : 'نوصلك لحد عندك';
      } else if(val){
        if(areaTitle) areaTitle.textContent = val;
        if(areaSub) areaSub.textContent = 'نوصلك لحد عندك';
      } else {
        if(areaTitle) areaTitle.textContent = 'اختار منطقتك';
        if(areaSub) areaSub.textContent = 'نوصلك في القاهرة الكبرى';
      }
    };

    toggleAreaMenu = (open) => {
      const willOpen = typeof open === 'boolean' ? open : areaMenu.hidden;
      areaMenu.hidden = !willOpen;
      areaSelect.classList.toggle('is-open', willOpen);
      areaTrigger.setAttribute('aria-expanded', String(willOpen));
      if(willOpen){
        if(typeof toggleDatePopover === 'function') toggleDatePopover(false);
        if(typeof toggleTimePopover === 'function') toggleTimePopover(false);
        if(customSelect){
          customSelect.querySelector('.custom-select-menu').hidden = true;
          customSelect.classList.remove('is-open');
        }
        if(areaSearch){
          areaSearch.value = '';
          areaOptions.forEach(opt => opt.hidden = false);
          setTimeout(() => areaSearch.focus(), 50);
        }
      }
    };

    areaTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleAreaMenu();
    });

    if(areaSearch){
      areaSearch.addEventListener('input', () => {
        const q = normalizeText(areaSearch.value);
        areaOptions.forEach(opt => {
          const match = normalizeText(opt.dataset.value).includes(q);
          opt.hidden = !match;
        });
      });
      areaSearch.addEventListener('keydown', (e) => {
        if(e.key === 'Escape'){
          toggleAreaMenu(false);
          areaTrigger.focus();
        } else if(e.key === 'Enter'){
          e.preventDefault();
          const firstVisible = areaOptions.find(opt => !opt.hidden);
          if(firstVisible) firstVisible.click();
        }
      });
    }

    areaOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const val = opt.dataset.value;
        syncAreaUI(val);
        form.dispatchEvent(new Event('change'));
        toggleAreaMenu(false);
        areaTrigger.focus();
      });
    });

    quickChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = chip.dataset.quickArea;
        syncAreaUI(val);
        form.dispatchEvent(new Event('change'));
        toggleAreaMenu(false);
        areaTrigger.focus();
      });
    });

    document.addEventListener('click', (e) => {
      if(!areaSelect.contains(e.target) && !areaMenu.hidden){
        toggleAreaMenu(false);
      }
    });
  }

  // Creative Custom Date Picker Component
  const datePicker = document.getElementById('date-custom-picker');
  const dateTrigger = document.getElementById('date-trigger');
  const datePopover = document.getElementById('date-popover');
  const nativeDate = document.getElementById('native-date') || form.elements.date;
  const dateTitle = document.getElementById('date-trigger-title');
  const dateSub = document.getElementById('date-trigger-sub');
  const calMonthLabel = document.getElementById('cal-month-label');
  const calDaysGrid = document.getElementById('calendar-days');
  const calPrev = document.getElementById('cal-prev');
  const calNext = document.getElementById('cal-next');
  const clearDateBtn = document.getElementById('clear-date-btn');
  const quickDateBtns = datePicker ? [...datePicker.querySelectorAll('.quick-date-btn[data-date-offset]')] : [];

  const arabicMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const arabicWeekdays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

  let viewDate = new Date();
  let selectedDateVal = '';
  let syncDateUI = () => {};
  let toggleDatePopover = () => {};

  function renderCalendar(){
    if(!calDaysGrid || !calMonthLabel) return;
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    calMonthLabel.textContent = `${arabicMonths[month]} ${year}`;

    const now = new Date();
    const isCurrentMonth = (year === now.getFullYear() && month <= now.getMonth()) || (year < now.getFullYear());
    if(calPrev) calPrev.disabled = isCurrentMonth;

    calDaysGrid.replaceChildren();
    const firstDay = new Date(year, month, 1);
    const offset = (firstDay.getDay() + 1) % 7;
    for(let i = 0; i < offset; i++){
      const empty = document.createElement('span');
      empty.className = 'cal-day-empty';
      calDaysGrid.appendChild(empty);
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayISO = localDate(now);

    for(let d = 1; d <= daysInMonth; d++){
      const dayISO = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day-cell';
      btn.textContent = String(d);
      btn.dataset.date = dayISO;

      if(dayISO < todayISO){
        btn.disabled = true;
      }
      if(dayISO === todayISO){
        btn.classList.add('is-today');
      }
      if(dayISO === selectedDateVal){
        btn.classList.add('is-selected');
      }

      btn.addEventListener('click', () => {
        syncDateUI(dayISO);
        form.dispatchEvent(new Event('change'));
        toggleDatePopover(false);
        dateTrigger.focus();
      });

      calDaysGrid.appendChild(btn);
    }
  }

  if(datePicker){
    toggleDatePopover = (open) => {
      const willOpen = typeof open === 'boolean' ? open : datePopover.hidden;
      datePopover.hidden = !willOpen;
      datePicker.classList.toggle('is-open', willOpen);
      dateTrigger.setAttribute('aria-expanded', String(willOpen));
      if(willOpen){
        if(typeof toggleAreaMenu === 'function') toggleAreaMenu(false);
        if(typeof toggleTimePopover === 'function') toggleTimePopover(false);
        renderCalendar();
      }
    };

    syncDateUI = (isoStr) => {
      selectedDateVal = isoStr || '';
      if(nativeDate) nativeDate.value = selectedDateVal;
      const today = new Date();
      const todayMid = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      if(selectedDateVal){
        const [y, m, d] = selectedDateVal.split('-').map(Number);
        const pickedDate = new Date(y, m - 1, d);
        const dayOfWeek = arabicWeekdays[pickedDate.getDay()];
        const diffDays = Math.round((pickedDate - todayMid) / 86400000);

        if(diffDays === 0){
          if(dateTitle) dateTitle.textContent = `اليوم (${dayOfWeek})`;
        } else if(diffDays === 1){
          if(dateTitle) dateTitle.textContent = `غداً (${dayOfWeek})`;
        } else if(diffDays === 2){
          if(dateTitle) dateTitle.textContent = `بعد غد (${dayOfWeek})`;
        } else {
          if(dateTitle) dateTitle.textContent = `${dayOfWeek}، ${d} ${arabicMonths[m - 1]}`;
        }
        if(dateSub) dateSub.textContent = selectedDateVal;

        quickDateBtns.forEach(b => {
          b.classList.toggle('is-active', Number(b.dataset.dateOffset) === diffDays);
        });
        viewDate = new Date(y, m - 1, 1);
      } else {
        if(dateTitle) dateTitle.textContent = 'اختار اليوم';
        if(dateSub) dateSub.textContent = 'نتفق عليه أو اختار تاريخ';
        quickDateBtns.forEach(b => b.classList.remove('is-active'));
      }
      renderCalendar();
    };

    dateTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleDatePopover();
    });

    if(calPrev) calPrev.addEventListener('click', () => {
      viewDate.setMonth(viewDate.getMonth() - 1);
      renderCalendar();
    });
    if(calNext) calNext.addEventListener('click', () => {
      viewDate.setMonth(viewDate.getMonth() + 1);
      renderCalendar();
    });

    quickDateBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const offset = Number(btn.dataset.dateOffset);
        const d = new Date();
        d.setDate(d.getDate() + offset);
        const iso = localDate(d);
        syncDateUI(iso);
        form.dispatchEvent(new Event('change'));
        toggleDatePopover(false);
        dateTrigger.focus();
      });
    });

    if(clearDateBtn){
      clearDateBtn.addEventListener('click', () => {
        syncDateUI('');
        form.dispatchEvent(new Event('change'));
        toggleDatePopover(false);
        dateTrigger.focus();
      });
    }

    document.addEventListener('click', (e) => {
      if(!datePicker.contains(e.target) && !datePopover.hidden){
        toggleDatePopover(false);
      }
    });
  }

  // Creative Custom Time Picker Component
  const timePicker = document.getElementById('time-custom-picker');
  const timeTrigger = document.getElementById('time-trigger');
  const timePopover = document.getElementById('time-popover');
  const nativeTime = document.getElementById('native-time') || form.elements.time;
  const timeTitle = document.getElementById('time-trigger-title');
  const timeSub = document.getElementById('time-trigger-sub');
  const timeSlotsContainer = document.getElementById('time-slots');
  const clearTimeBtn = document.getElementById('clear-time-btn');
  const timeTabs = timePicker ? [...timePicker.querySelectorAll('.time-tab')] : [];

  const timeSlots = {
    pm: [
      { time: '04:00 م', badge: 'عصراً', sub: 'مساءً', val: '04:00 م' },
      { time: '05:00 م', badge: 'عصراً', sub: 'مساءً', val: '05:00 م' },
      { time: '06:00 م', badge: 'مغرب', sub: 'مساءً', val: '06:00 م' },
      { time: '07:00 م', badge: 'مساءً', sub: 'مساءً', val: '07:00 م' },
      { time: '08:00 م', badge: 'الأكثر طلباً', sub: 'مساءً', val: '08:00 م' },
      { time: '09:00 م', badge: 'الأكثر طلباً', sub: 'مساءً', val: '09:00 م' },
      { time: '10:00 م', badge: 'سهرة', sub: 'مساءً', val: '10:00 م' },
      { time: '11:00 م', badge: 'سهرة', sub: 'مساءً', val: '11:00 م' },
      { time: '12:00 ص', badge: 'منتصف الليل', sub: 'سهرة', val: '12:00 منتصف الليل' }
    ],
    am: [
      { time: '10:00 ص', badge: 'صباحاً', sub: 'صباحاً', val: '10:00 ص' },
      { time: '11:00 ص', badge: 'صباحاً', sub: 'صباحاً', val: '11:00 ص' },
      { time: '12:00 م', badge: 'ظهراً', sub: 'ظهيرة', val: '12:00 ظهراً' },
      { time: '01:00 م', badge: 'ظهراً', sub: 'ظهيرة', val: '01:00 م' },
      { time: '02:00 م', badge: 'بعد الظهر', sub: 'ظهيرة', val: '02:00 م' },
      { time: '03:00 م', badge: 'بعد الظهر', sub: 'ظهيرة', val: '03:00 م' }
    ]
  };

  let activePeriod = 'pm';
  let selectedTimeVal = '';
  let syncTimeUI = () => {};
  let toggleTimePopover = () => {};

  function renderTimeSlots(){
    if(!timeSlotsContainer) return;
    timeSlotsContainer.replaceChildren();
    const slots = timeSlots[activePeriod] || [];
    slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'time-slot-btn' + (slot.val === selectedTimeVal ? ' is-selected' : '');
      const timeSpan = document.createElement('span');
      timeSpan.textContent = slot.time;
      const badgeSpan = document.createElement('span');
      badgeSpan.className = 'time-slot-badge';
      badgeSpan.textContent = slot.badge;
      btn.append(timeSpan, badgeSpan);

      btn.addEventListener('click', () => {
        syncTimeUI(slot.val, slot.time, slot.sub + ' (' + slot.badge + ')');
        form.dispatchEvent(new Event('change'));
        toggleTimePopover(false);
        timeTrigger.focus();
      });

      timeSlotsContainer.appendChild(btn);
    });
  }

  if(timePicker){
    toggleTimePopover = (open) => {
      const willOpen = typeof open === 'boolean' ? open : timePopover.hidden;
      timePopover.hidden = !willOpen;
      timePicker.classList.toggle('is-open', willOpen);
      timeTrigger.setAttribute('aria-expanded', String(willOpen));
      if(willOpen){
        if(typeof toggleAreaMenu === 'function') toggleAreaMenu(false);
        if(typeof toggleDatePopover === 'function') toggleDatePopover(false);
        renderTimeSlots();
      }
    };

    syncTimeUI = (val, displayTime, displaySub) => {
      selectedTimeVal = val || '';
      if(nativeTime) nativeTime.value = selectedTimeVal;
      if(selectedTimeVal){
        if(timeTitle) timeTitle.textContent = displayTime || selectedTimeVal;
        if(timeSub) timeSub.textContent = displaySub || 'موعد محدد';
      } else {
        if(timeTitle) timeTitle.textContent = 'اختار الوقت';
        if(timeSub) timeSub.textContent = 'مواعيد مسائية وصباحية';
      }
      renderTimeSlots();
    };

    timeTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTimePopover();
    });

    timeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        timeTabs.forEach(t => t.classList.toggle('active', t === tab));
        activePeriod = tab.dataset.period;
        renderTimeSlots();
      });
    });

    if(clearTimeBtn){
      clearTimeBtn.addEventListener('click', () => {
        syncTimeUI('');
        form.dispatchEvent(new Event('change'));
        toggleTimePopover(false);
        timeTrigger.focus();
      });
    }

    document.addEventListener('click', (e) => {
      if(!timePicker.contains(e.target) && !timePopover.hidden){
        toggleTimePopover(false);
      }
    });
  }

  function openBooking(trigger){
    lastTrigger = trigger;
    if(trigger.dataset.book && plans[trigger.dataset.book]) form.elements.plan.value = trigger.dataset.book;
    if(trigger.dataset.service) goal = trigger.dataset.service;
    form.elements.goal.value = goal;
    syncGoalUI(goal);
    if(trigger.dataset.area){
      syncAreaUI(trigger.dataset.area);
    }
    form.elements.date.min = localDate();
    total();
    showStep(1, false);
    dialog.showModal();
    document.body.classList.add('sheet-open');
  }

  document.querySelectorAll('[data-book],[data-area]').forEach(button => button.addEventListener('click', () => openBooking(button)));
  dialog.querySelector('.close-sheet').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if(event.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('sheet-open');
    if(customSelect){
      customSelect.querySelector('.custom-select-menu').hidden = true;
      customSelect.classList.remove('is-open');
    }
    if(typeof toggleAreaMenu === 'function') toggleAreaMenu(false);
    if(typeof toggleDatePopover === 'function') toggleDatePopover(false);
    if(typeof toggleTimePopover === 'function') toggleTimePopover(false);
    lastTrigger?.focus({preventScroll:true});
  });

  form.addEventListener('change', () => {
    total();
    goal = form.elements.goal.value;
    syncGoalUI(goal);
    form.elements.area.removeAttribute('aria-invalid');
    form.elements.date.removeAttribute('aria-invalid');
    error.textContent = '';
  });

  form.noValidate = true;
  form.addEventListener('submit', event => {
    event.preventDefault();
    if(step === 1){
      showStep(2);
      return;
    }
    if(step === 2){
      const area = form.elements.area, date = form.elements.date;
      if(!area.value){
        error.textContent = 'اختار منطقتك عشان نجهّز طلبك.';
        const areaTrigger = areaSelect ? areaSelect.querySelector('.custom-select-trigger') : area;
        areaTrigger?.focus();
        return;
      }
      if(date.value && date.value < localDate()){
        error.textContent = 'اختار تاريخ اليوم أو يوم بعده.';
        (dateTrigger || date).focus();
        return;
      }
      if(!date.checkValidity()){
        error.textContent = 'راجع اليوم المطلوب.';
        (dateTrigger || date).focus();
        return;
      }
      showStep(3);
    }
  });

  back.addEventListener('click', () => showStep(Math.max(1, step - 1)));

  const navLinks = [...document.querySelectorAll('.mobile-nav>a,.desktop-nav>a')];
  const anchors = [...new Set(navLinks.map(a => document.querySelector(a.hash)))].sort((a,b) => a.offsetTop - b.offsetTop);
  let scheduled = false;
  function updateNavigation(){
    let current = anchors[0];
    for(const section of anchors) if(section.getBoundingClientRect().top < window.innerHeight * .4) current = section;
    navLinks.forEach(a => {
      if(a.hash === '#' + current.id) a.setAttribute('aria-current', 'location');
      else a.removeAttribute('aria-current');
    });
    document.querySelector('.site-header').classList.toggle('scrolled', window.scrollY > 20);
    scheduled = false;
  }
  window.addEventListener('scroll', () => {
    if(!scheduled){
      requestAnimationFrame(updateNavigation);
      scheduled = true;
    }
  }, {passive:true});
  updateNavigation();

  form.elements.notes.addEventListener('input', () => {
    document.getElementById('notes-count').textContent = form.elements.notes.value.length + ' / 500';
  });

  document.querySelectorAll('.faq-list details').forEach(detail => detail.addEventListener('toggle', () => {
    if(detail.open) document.querySelectorAll('.faq-list details').forEach(other => {
      if(other !== detail) other.open = false;
    });
  }));

  if('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), {threshold: .08});
    document.querySelectorAll('.therapist-layout,.service-card,.session-heading,.package-row,.journey-grid,.story-layout,.reviews-grid,.coverage').forEach(element => {
      element.classList.add('reveal-ready');
      observer.observe(element);
    });
  }
})();
