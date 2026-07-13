window.redirecionarPaginaSistema = window.redirecionarPaginaSistema || function (route) { console.log('Navegar para:', route); };
    const search = document.getElementById('moduleSearch');
    const grid = document.getElementById('areasGrid');
    const toggle = document.getElementById('categoryToggle');
    const areasSectionHeader = document.querySelector('.section-title');
    const areasSectionTitle = document.getElementById('areasSectionTitle');
    const areasSectionSubtitle = document.getElementById('areasSectionSubtitle');
    const quickStackBody = document.getElementById('quickStackBody');
    const quickList = document.getElementById('quickList');
    const quickEmptyState = document.getElementById('quickEmptyState');
    const heroGrid = document.querySelector('.hero-grid');
    const welcomeTitle = document.getElementById('welcome-title');
    const openCustomizeAreas = document.getElementById('openCustomizeAreas');
    const openCustomizeAreasHero = document.getElementById('openCustomizeAreasHero');
    const customizeAreasModal = document.getElementById('customizeAreasModal');
    const customizeAreasModalClose = document.getElementById('customizeAreasModalClose');
    const customizeApply = document.getElementById('customizeApply');
    const customizeHideAll = document.getElementById('customizeHideAll');
    const customizeGuidedTip = document.getElementById('customizeGuidedTip');
    const customizeGuidedTipOverlay = document.getElementById('customizeGuidedTipOverlay');
    const customizeGuidedTipClose = document.getElementById('customizeGuidedTipClose');
    const customizeToggles = [...document.querySelectorAll('[data-customize-toggle]')];
    const dashboardAreas = {
      welcome: document.querySelector('[data-dashboard-area="welcome"]'),
      quick: document.querySelector('[data-dashboard-area="quick"]'),
      metrics: document.querySelector('[data-dashboard-area="metrics"]')
    };
    const favoriteModal = document.getElementById('favoriteModal');
    const favoriteModalTitle = document.getElementById('favoriteModalTitle');
    const favoriteModalDescription = document.getElementById('favoriteModalDescription');
    const favoriteModalStatus = document.getElementById('favoriteModalStatus');
    const favoriteModalConfirm = document.getElementById('favoriteModalConfirm');
    const favoriteModalCancel = document.getElementById('favoriteModalCancel');
    const favoriteModalClose = document.getElementById('favoriteModalClose');
    const eventModal = document.getElementById('eventModal');
    const eventModalClose = document.getElementById('eventModalClose');
    const openEventModalButton = document.getElementById('openEventModal');
    const eventForm = document.getElementById('eventForm');
    const eventDeleteButton = document.getElementById('eventDeleteButton');
    const eventCancelButton = document.getElementById('eventCancelButton');
    const eventTitle = document.getElementById('eventTitle');
    const eventStatus = document.getElementById('eventStatus');
    const eventContentType = document.getElementById('eventContentType');
    const eventStartDate = document.getElementById('eventStartDate');
    const eventStartTime = document.getElementById('eventStartTime');
    const eventEndDate = document.getElementById('eventEndDate');
    const eventEndTime = document.getElementById('eventEndTime');
    const eventStartPickerTrigger = document.getElementById('eventStartPickerTrigger');
    const eventEndPickerTrigger = document.getElementById('eventEndPickerTrigger');
    const eventStartPickerValue = document.getElementById('eventStartPickerValue');
    const eventStartPickerHint = document.getElementById('eventStartPickerHint');
    const eventEndPickerValue = document.getElementById('eventEndPickerValue');
    const eventEndPickerHint = document.getElementById('eventEndPickerHint');
    const eventAllDay = document.getElementById('eventAllDay');
    const eventContent = document.getElementById('eventContent');
    const eventParticipants = document.getElementById('eventParticipants');
    const eventParticipantsPills = document.getElementById('eventParticipantsPills');
    const eventDropzone = document.getElementById('eventDropzone');
    const eventAttachmentInput = document.getElementById('eventAttachmentInput');
    const eventAttachmentsList = document.getElementById('eventAttachmentsList');
    const agendaList = document.getElementById('agendaList');
    const agendaDayLabel = document.getElementById('agendaDayLabel');
    const selectChipDropdowns = [...document.querySelectorAll('[data-select-dropdown]')];
    const eventDateTimeModal = document.getElementById('eventDateTimeModal');
    const eventDateTimeModalClose = document.getElementById('eventDateTimeModalClose');
    const eventDateTimeModalCancel = document.getElementById('eventDateTimeModalCancel');
    const eventDateTimeModalApply = document.getElementById('eventDateTimeModalApply');
    const eventDateTimeModalTitle = document.getElementById('eventDateTimeModalTitle');
    const eventDateTimeCurrentMonth = document.getElementById('eventDateTimeCurrentMonth');
    const eventDateTimePrevMonth = document.getElementById('eventDateTimePrevMonth');
    const eventDateTimeNextMonth = document.getElementById('eventDateTimeNextMonth');
    const eventDateTimeDays = document.getElementById('eventDateTimeDays');
    const eventDateTimeManualTime = document.getElementById('eventDateTimeManualTime');
    const eventDateTimeQuickTimes = document.getElementById('eventDateTimeQuickTimes');
    const eventDateTimeDurationInput = document.getElementById('eventDateTimeDurationInput');
    const eventDateTimeDurationPresets = document.getElementById('eventDateTimeDurationPresets');
    const eventDateTimeComputedEnd = document.getElementById('eventDateTimeComputedEnd');
    const calendarModal = document.getElementById('calendarModal');
    const calendarModalClose = document.getElementById('calendarModalClose');
    const openCalendarModalButton = document.getElementById('openCalendarModal');
    const calendarTodayButton = document.getElementById('calendarTodayButton');
    const calendarPrevButton = document.getElementById('calendarPrevButton');
    const calendarNextButton = document.getElementById('calendarNextButton');
    const calendarRangeLabel = document.getElementById('calendarRangeLabel');
    const calendarGrid = document.getElementById('calendarGrid');
    const calendarWeekdays = document.getElementById('calendarWeekdays');
    const calendarEventSummary = document.getElementById('calendarEventSummary');
    const calendarDetailModal = document.getElementById('calendarDetailModal');
    const calendarDetailModalClose = document.getElementById('calendarDetailModalClose');
    const calendarDetailContent = document.getElementById('calendarDetailContent');
    const calendarSelectedDateLabel = document.getElementById('calendarSelectedDateLabel');
    const calendarSelectedCount = document.getElementById('calendarSelectedCount');
    const calendarSelectedEvents = document.getElementById('calendarSelectedEvents');
    const calendarAddEventButton = document.getElementById('calendarAddEventButton');
    const calendarViewButtons = [...document.querySelectorAll('[data-calendar-view]')];
    const modulesModal = document.getElementById('modulesModal');
    const modulesModalClose = document.getElementById('modulesModalClose');
    const openGestaoModules = document.getElementById('openGestaoModules');
    const chips = [...document.querySelectorAll('.filter-chip[data-filter]')];
    const cards = [...document.querySelectorAll('.area-card')];
    const moduleItems = [...document.querySelectorAll('.area-card .module-item')];
    const moduleSources = [...document.querySelectorAll('[data-module-id]')];
    const moduleFavorites = new Map();
    let favoriteOrder = [];
    let draggedFavoriteId = null;
    let pendingFavoriteAction = null;
    let pendingAgendaAction = null;
    let agendaEditingId = null;
    let isCustomizeGuidedTipDismissed = false;
    let activeDateTimeTarget = 'start';
    let dateTimeDraft = null;
    let calendarView = 'week';
    let calendarCursorDate = new Date('2026-07-10T09:00:00');
    let calendarSelectedEventId = null;
    let calendarDetailEventId = null;
    let calendarSelectedDate = '2026-07-10';
    let eventAttachmentFiles = [];
    const dashboardVisibility = {
      welcome: true,
      quick: true,
      metrics: true
    };

    const gestaoCard = document.querySelector('.area-card[data-category="Gestão"]');
    const gestaoIconMarkup = gestaoCard?.querySelector('.area-card__icon').innerHTML || '';
    const gestaoAccent = gestaoCard?.style.getPropertyValue('--accent').trim() || '#ff6b00';
    const gestaoSoft = gestaoCard?.style.getPropertyValue('--soft').trim() || '#fff1e8';
    const agendaStatusPalette = {
      'Agendado': '#2563eb',
      'Confirmado': '#10b981',
      'Em andamento': '#ff6b00',
      'Concluído': '#7c3aed',
      'Cancelado': '#ef4444'
    };
    const agendaEvents = [
      {
        id: 'seed-1',
        title: 'Reunião de alinhamento',
        start: '2026-07-10T09:00',
        end: '2026-07-10T10:00',
        status: 'Em andamento',
        contentType: 'Reunião',
        content: 'Pauta geral com próximos passos.',
        participants: 'Equipe Sala 2',
        allDay: false,
        attachments: []
      },
      {
        id: 'seed-2',
        title: 'Acompanhamento de projetos',
        start: '2026-07-10T11:00',
        end: '2026-07-10T11:30',
        status: 'Agendado',
        contentType: 'Reunião',
        content: 'Checkpoint de status dos projetos ativos.',
        participants: 'Time online',
        allDay: false,
        attachments: []
      },
      {
        id: 'seed-3',
        title: 'Apresentação de resultados',
        start: '2026-07-10T14:00',
        end: '2026-07-10T15:00',
        status: 'Confirmado',
        contentType: 'Apresentação',
        content: 'Resultados do trimestre para diretoria.',
        participants: 'Sala 3',
        allDay: false,
        attachments: []
      },
      {
        id: 'seed-4',
        title: 'Revisão de campanhas',
        start: '2026-07-10T16:00',
        end: '2026-07-10T16:45',
        status: 'Concluído',
        contentType: 'Comunicado',
        content: 'Ajustes finais nas campanhas da tarde.',
        participants: 'Marketing',
        allDay: false,
        attachments: [],
        deleted: false
      }
    ];
    const durationPresets = [
      { label: '15 minutos', minutes: 15 },
      { label: '30 minutos', minutes: 30 },
      { label: '1 hora', minutes: 60 },
      { label: '2 horas', minutes: 120 }
    ];

    agendaEvents.forEach((eventRecord) => {
      if (typeof eventRecord.deleted !== 'boolean') eventRecord.deleted = false;
    });

    function generateTimeSlots() {
      const slots = [];
      for (let minutes = 0; minutes < 24 * 60; minutes += 30) {
        const hours = String(Math.floor(minutes / 60)).padStart(2, '0');
        const mins = String(minutes % 60).padStart(2, '0');
        slots.push(`${hours}:${mins}`);
      }
      return slots;
    }

    const timeSlots = generateTimeSlots();

    function populateTimeOptions(select, selectedValue) {
      if (!select) return;
      select.innerHTML = '';
      timeSlots.forEach((slot) => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        if (slot === selectedValue) option.selected = true;
        select.appendChild(option);
      });
    }

    function parseDateTime(dateValue, timeValue) {
      return new Date(`${dateValue}T${timeValue}:00`);
    }

    function formatDateForInput(date) {
      return date.toISOString().slice(0, 10);
    }

    function formatDateLabel(date) {
      return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
    }

    function formatDateTimeLabel(date, time, allDay = false) {
      const parsed = new Date(`${date}T${time || '00:00'}:00`);
      if (allDay) return formatDateLabel(parsed);
      return `${formatDateLabel(parsed)} às ${time}`;
    }

    function formatMonthLabel(date) {
      return new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
    }

    function formatShortWeekday(date) {
      return new Intl.DateTimeFormat('pt-BR', { weekday: 'short' }).format(date).replace('.', '');
    }

    function formatShortMonthDay(date) {
      return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date).replace('.', '');
    }

    function toLocalDate(dateValue, timeValue = '00:00') {
      return new Date(`${dateValue}T${timeValue}:00`);
    }

    function startOfDay(date) {
      const result = new Date(date);
      result.setHours(0, 0, 0, 0);
      return result;
    }

    function endOfDay(date) {
      const result = new Date(date);
      result.setHours(23, 59, 59, 999);
      return result;
    }

    function addDays(date, amount) {
      const result = new Date(date);
      result.setDate(result.getDate() + amount);
      return result;
    }

    function startOfWeek(date) {
      const result = startOfDay(date);
      const offset = result.getDay() === 0 ? -6 : 1 - result.getDay();
      return addDays(result, offset);
    }

    function endOfWeek(date) {
      return endOfDay(addDays(startOfWeek(date), 6));
    }

    function startOfMonth(date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }

    function endOfMonth(date) {
      return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    }

    function dateKeyFromDate(date) {
      return formatDateForInput(startOfDay(date));
    }

    function isSameDate(dateA, dateB) {
      return dateKeyFromDate(dateA) === dateKeyFromDate(dateB);
    }

    function parseDurationMinutes(value = '') {
      const normalized = value.toLowerCase().trim();
      if (!normalized) return 60;
      const hoursMatch = normalized.match(/(\d+)\s*h/);
      const minutesMatch = normalized.match(/(\d+)\s*(m|min|mins|minuto|minutos)/);
      const directMinutes = normalized.match(/^\d+$/);
      let minutes = 0;
      if (hoursMatch) minutes += Number(hoursMatch[1]) * 60;
      if (minutesMatch) minutes += Number(minutesMatch[1]);
      if (!hoursMatch && !minutesMatch && directMinutes) minutes += Number(directMinutes[0]);
      return minutes || 60;
    }

    function formatDurationInputValue(minutes) {
      const total = Math.max(0, Number(minutes) || 0);
      const hours = Math.floor(total / 60);
      const mins = total % 60;
      if (hours && mins) return `${hours}h ${mins}min`;
      if (hours) return `${hours}h`;
      return `${mins}min`;
    }

    function formatDuration(start, end, allDay) {
      if (allDay) return 'Dia inteiro';
      const diffMinutes = Math.max(30, Math.round((end.getTime() - start.getTime()) / 60000));
      if (diffMinutes % 60 === 0) return `${diffMinutes / 60}h`;
      if (diffMinutes > 60) {
        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        return `${hours}h ${minutes}min`;
      }
      return `${diffMinutes}min`;
    }

    function getEventColor(status) {
      return agendaStatusPalette[status] || '#2563eb';
    }

    function isEventDeleted(eventRecord) {
      return Boolean(eventRecord.deleted);
    }

    function getEventAccent(eventRecord) {
      return isEventDeleted(eventRecord) ? '#d91429' : getEventColor(eventRecord.status);
    }

    function getEventTitleMarkup(eventRecord) {
      return isEventDeleted(eventRecord) ? `<s>${eventRecord.title}</s>` : eventRecord.title;
    }

    function getParticipantList(value = '') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }

    function truncateEventTitle(title = '', maxLength = 10) {
      const normalized = String(title).trim();
      if (normalized.length <= maxLength) return normalized;
      return `${normalized.slice(0, Math.max(1, maxLength - 3)).trim()}...`;
    }

    function renderParticipantPills() {
      if (!eventParticipantsPills) return;
      const participants = getParticipantList(eventParticipants?.value || '');
      eventParticipantsPills.innerHTML = '';
      participants.forEach((participant, index) => {
        const pill = document.createElement('button');
        pill.className = 'participant-pill';
        pill.type = 'button';
        pill.style.setProperty('--pill-hue', String((index * 53) % 360));
        pill.setAttribute('aria-label', `Remover participante ${participant}`);
        pill.innerHTML = `
          <span>${participant}</span>
          <span class="participant-pill__remove" aria-hidden="true">x</span>
        `;
        pill.addEventListener('click', () => {
          const nextParticipants = participants.filter((_, participantIndex) => participantIndex !== index);
          eventParticipants.value = nextParticipants.join(', ');
          renderParticipantPills();
        });
        eventParticipantsPills.appendChild(pill);
      });
      eventParticipantsPills.hidden = participants.length === 0;
    }

    function getSelectDropdown(inputId) {
      return selectChipDropdowns.find((dropdown) => dropdown.dataset.selectDropdown === inputId) || null;
    }

    function createSelectedChoiceMarkup(value, variant) {
      return `<span class="selected-choice-tag selected-choice-tag--${variant}" data-choice-value="${value}">${value}</span>`;
    }

    function syncChoiceGroupsFromValues() {
      ['eventStatus', 'eventContentType'].forEach((inputId) => {
        const input = document.getElementById(inputId);
        const dropdown = getSelectDropdown(inputId);
        if (!input || !dropdown) return;
        const variant = dropdown.dataset.selectVariant;
        const trigger = dropdown.querySelector('.select-chip-dropdown__trigger');
        const options = [...dropdown.querySelectorAll('.select-chip-option')];
        if (trigger) {
          trigger.innerHTML = createSelectedChoiceMarkup(input.value, variant);
        }
        options.forEach((option) => {
          const isSelected = option.dataset.selectValue === input.value;
          option.classList.toggle('is-selected', isSelected);
          option.setAttribute('aria-selected', String(isSelected));
          option.innerHTML = createSelectedChoiceMarkup(option.dataset.selectValue, variant);
        });
      });
    }

    function closeSelectChipDropdown(dropdown) {
      const trigger = dropdown?.querySelector('.select-chip-dropdown__trigger');
      const menu = dropdown?.querySelector('.select-chip-dropdown__menu');
      dropdown?.classList.remove('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
      if (menu) menu.hidden = true;
    }

    function closeAllSelectChipDropdowns(exception = null) {
      selectChipDropdowns.forEach((dropdown) => {
        if (dropdown === exception) return;
        closeSelectChipDropdown(dropdown);
      });
    }

    function toggleSelectChipDropdown(dropdown) {
      if (!dropdown) return;
      const isOpen = dropdown.classList.contains('is-open');
      const trigger = dropdown.querySelector('.select-chip-dropdown__trigger');
      const menu = dropdown.querySelector('.select-chip-dropdown__menu');
      closeAllSelectChipDropdowns(isOpen ? null : dropdown);
      if (isOpen) {
        closeSelectChipDropdown(dropdown);
        return;
      }
      dropdown.classList.add('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
      if (menu) menu.hidden = false;
    }

    function getStatusMeta(status) {
      const map = {
        save: {
          positive: true,
          title: agendaEditingId ? 'Salvar alterações do evento?' : 'Salvar novo evento?',
          description: agendaEditingId
            ? 'As alterações serão aplicadas imediatamente na Agenda do dia.'
            : 'O novo evento será incluído imediatamente na Agenda do dia.',
          confirmLabel: 'Salvar',
          icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="m8.5 12 2.4 2.4 4.6-4.8"></path></svg>'
        },
        delete: {
          positive: false,
          title: 'Excluir este evento?',
          description: 'O evento será removido da Agenda do dia. Esta ação vale apenas para a visualização atual.',
          confirmLabel: 'Excluir',
          icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M9.5 9.5 14.5 14.5M14.5 9.5 9.5 14.5"></path></svg>'
        }
      };
      return map[status];
    }

    function formatAttachmentSize(size = 0) {
      if (size >= 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
      if (size >= 1024) return `${Math.round(size / 1024)} KB`;
      return `${size} B`;
    }

    function syncAttachmentInputFiles() {
      if (!eventAttachmentInput) return;
      const transfer = new DataTransfer();
      eventAttachmentFiles.forEach((file) => {
        if (file instanceof File) transfer.items.add(file);
      });
      eventAttachmentInput.files = transfer.files;
    }

    function renderAttachmentList() {
      if (!eventAttachmentsList) return;
      eventAttachmentsList.innerHTML = '';
      if (!eventAttachmentFiles.length) {
        eventAttachmentsList.innerHTML = '<p class="event-attachments__empty"></p>';
        return;
      }
      eventAttachmentFiles.forEach((file, index) => {
        const item = document.createElement('article');
        item.className = 'event-attachment-item';
        item.innerHTML = `
          <div class="event-attachment-item__content">
            <strong>${file.name}</strong>
            <small>${formatAttachmentSize(file.size || 0)}</small>
          </div>
          <button class="event-attachment-item__remove" type="button" aria-label="Remover ${file.name}">Remover</button>
        `;
        item.querySelector('.event-attachment-item__remove')?.addEventListener('click', () => {
          eventAttachmentFiles = eventAttachmentFiles.filter((_, fileIndex) => fileIndex !== index);
          syncAttachmentInputFiles();
          renderAttachmentList();
        });
        eventAttachmentsList.appendChild(item);
      });
    }

    function updateDropzoneState(isDragging = false) {
      eventDropzone?.classList.toggle('is-dragging', isDragging);
      eventDropzone?.classList.toggle('has-files', eventAttachmentFiles.length > 0);
    }

    function setAttachmentFiles(fileList = []) {
      const nextFiles = [...fileList]
        .filter(Boolean)
        .slice(0, 8)
        .map((file) => file instanceof File ? file : new File([], file.fileName || 'arquivo', { type: file.type || '' }));
      eventAttachmentFiles = nextFiles;
      syncAttachmentInputFiles();
      renderAttachmentList();
      updateDropzoneState(false);
    }

    function collectAttachments() {
      return eventAttachmentFiles.map((file) => ({
        fileName: file.name || '',
        size: file.size || 0,
        type: file.type || ''
      })).filter((attachment) => attachment.fileName);
    }

    function syncAllDayState() {
      const isAllDay = eventAllDay.checked;
      eventStartTime.disabled = isAllDay;
      eventEndTime.disabled = isAllDay;
      eventAllDay.closest('.event-switch')?.classList.toggle('is-active', isAllDay);
      eventStartPickerTrigger?.classList.toggle('is-all-day', isAllDay);
      eventEndPickerTrigger?.classList.toggle('is-all-day', isAllDay);
      syncDateTimeFieldSummaries();
    }

    function syncDateTimeFieldSummaries() {
      if (!eventStartPickerValue || !eventEndPickerValue) return;
      const allDay = eventAllDay.checked;
      eventStartPickerValue.textContent = formatDateTimeLabel(eventStartDate.value, eventStartTime.value, allDay);
      eventEndPickerValue.textContent = formatDateTimeLabel(eventEndDate.value, eventEndTime.value, allDay);
      eventStartPickerHint.textContent = allDay ? 'Dia inteiro' : `Termina em ${eventEndTime.value}`;
      eventEndPickerHint.textContent = allDay
        ? 'Dia inteiro'
        : `Duração: ${formatDuration(startFromFields(), endFromFields(), false)}`;
    }

    function startFromFields() {
      return eventAllDay.checked ? new Date(`${eventStartDate.value}T00:00:00`) : parseDateTime(eventStartDate.value, eventStartTime.value);
    }

    function endFromFields() {
      return eventAllDay.checked ? new Date(`${eventEndDate.value}T23:59:00`) : parseDateTime(eventEndDate.value, eventEndTime.value);
    }

    function buildDateTimeDraft(target) {
      const start = startFromFields();
      const end = endFromFields();
      const sourceDate = target === 'start' ? eventStartDate.value : eventEndDate.value;
      const sourceTime = target === 'start' ? eventStartTime.value : eventEndTime.value;
      return {
        target,
        selectedDate: sourceDate,
        selectedTime: sourceTime,
        visibleMonth: new Date(`${sourceDate}T00:00:00`),
        durationMinutes: Math.max(15, Math.round((end.getTime() - start.getTime()) / 60000))
      };
    }

    function computeDraftEndDateTime() {
      if (!dateTimeDraft) return null;
      const startBase = dateTimeDraft.target === 'start'
        ? toLocalDate(dateTimeDraft.selectedDate, dateTimeDraft.selectedTime)
        : startFromFields();
      const endBase = new Date(startBase.getTime() + parseDurationMinutes(eventDateTimeDurationInput.value) * 60000);
      return endBase;
    }

    function renderDateTimeComputedEnd() {
      if (!eventDateTimeComputedEnd) return;
      const computedEnd = computeDraftEndDateTime();
      if (!computedEnd) return;
      eventDateTimeComputedEnd.textContent = `${formatDateLabel(computedEnd)} às ${String(computedEnd.getHours()).padStart(2, '0')}:${String(computedEnd.getMinutes()).padStart(2, '0')}`;
    }

    function renderDateTimeQuickTimes() {
      if (!eventDateTimeQuickTimes) return;
      const quickTimes = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
      eventDateTimeQuickTimes.innerHTML = '';
      quickTimes.forEach((time) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'datetime-picker__chip';
        button.textContent = time;
        button.classList.toggle('is-active', time === eventDateTimeManualTime.value);
        button.addEventListener('click', () => {
          eventDateTimeManualTime.value = time;
          renderDateTimeQuickTimes();
          renderDateTimeComputedEnd();
        });
        eventDateTimeQuickTimes.appendChild(button);
      });
    }

    function renderDurationPresets() {
      if (!eventDateTimeDurationPresets) return;
      const selectedMinutes = parseDurationMinutes(eventDateTimeDurationInput.value);
      eventDateTimeDurationPresets.innerHTML = '';
      durationPresets.forEach((preset) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'datetime-picker__chip';
        button.textContent = preset.label;
        button.classList.toggle('is-active', preset.minutes === selectedMinutes);
        button.addEventListener('click', () => {
          eventDateTimeDurationInput.value = formatDurationInputValue(preset.minutes);
          renderDurationPresets();
          renderDateTimeComputedEnd();
        });
        eventDateTimeDurationPresets.appendChild(button);
      });
    }

    function renderDateTimeCalendar() {
      if (!dateTimeDraft || !eventDateTimeDays) return;
      const monthDate = new Date(dateTimeDraft.visibleMonth.getFullYear(), dateTimeDraft.visibleMonth.getMonth(), 1);
      const firstWeekday = monthDate.getDay();
      const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
      eventDateTimeCurrentMonth.textContent = formatMonthLabel(monthDate);
      eventDateTimeDays.innerHTML = '';
      for (let i = 0; i < firstWeekday; i += 1) {
        const filler = document.createElement('span');
        filler.className = 'datetime-picker__day is-empty';
        eventDateTimeDays.appendChild(filler);
      }
      for (let day = 1; day <= daysInMonth; day += 1) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'datetime-picker__day';
        const value = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        button.textContent = String(day);
        button.classList.toggle('is-active', value === dateTimeDraft.selectedDate);
        button.addEventListener('click', () => {
          dateTimeDraft.selectedDate = value;
          renderDateTimeCalendar();
          renderDateTimeComputedEnd();
        });
        eventDateTimeDays.appendChild(button);
      }
    }

    function openDateTimeModal(target) {
      activeDateTimeTarget = target;
      dateTimeDraft = buildDateTimeDraft(target);
      eventDateTimeModalTitle.textContent = target === 'start' ? 'Selecionar início' : 'Selecionar fim';
      eventDateTimeManualTime.value = dateTimeDraft.selectedTime;
      eventDateTimeDurationInput.value = formatDurationInputValue(dateTimeDraft.durationMinutes);
      renderDateTimeCalendar();
      renderDateTimeQuickTimes();
      renderDurationPresets();
      renderDateTimeComputedEnd();
      eventDateTimeModal.classList.add('is-visible', 'is-positive');
      eventDateTimeModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeDateTimeModal() {
      eventDateTimeModal.classList.remove('is-visible');
      eventDateTimeModal.setAttribute('aria-hidden', 'true');
      if (!eventModal.classList.contains('is-visible') && !favoriteModal.classList.contains('is-visible') && !modulesModal.classList.contains('is-visible') && !customizeAreasModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
      dateTimeDraft = null;
    }

    function applyDateTimeModal() {
      if (!dateTimeDraft) return;
      const selectedDate = dateTimeDraft.selectedDate;
      const selectedTime = eventDateTimeManualTime.value || '09:00';
      const durationMinutes = parseDurationMinutes(eventDateTimeDurationInput.value);
      if (dateTimeDraft.target === 'start') {
        eventStartDate.value = selectedDate;
        eventStartTime.value = selectedTime;
        const computedEnd = new Date(toLocalDate(selectedDate, selectedTime).getTime() + durationMinutes * 60000);
        eventEndDate.value = formatDateForInput(computedEnd);
        eventEndTime.value = `${String(computedEnd.getHours()).padStart(2, '0')}:${String(computedEnd.getMinutes()).padStart(2, '0')}`;
      } else {
        eventEndDate.value = selectedDate;
        eventEndTime.value = selectedTime;
      }
      syncAllDayState();
      syncDateTimeFieldSummaries();
      closeDateTimeModal();
    }

    function suggestEndTime() {
      if (eventAllDay.checked) return;
      const startIndex = timeSlots.indexOf(eventStartTime.value);
      if (startIndex === -1) return;
      const nextSlot = timeSlots[Math.min(startIndex + 1, timeSlots.length - 1)];
      if (eventStartDate.value === eventEndDate.value && timeSlots.indexOf(eventEndTime.value) <= startIndex) {
        eventEndTime.value = nextSlot;
      }
      syncDateTimeFieldSummaries();
    }

    function resetEventForm(prefilledDate = null) {
      closeAllSelectChipDropdowns();
      eventForm.reset();
      agendaEditingId = null;
      eventDeleteButton.hidden = true;
      setAttachmentFiles([]);
      const baseDate = prefilledDate || calendarSelectedDate;
      const now = calendarModal?.classList.contains('is-visible')
        ? toLocalDate(baseDate, '09:00')
        : new Date();
      const roundedMinutes = now.getMinutes() >= 30 ? 30 : 0;
      now.setMinutes(roundedMinutes, 0, 0);
      const later = new Date(now.getTime() + 30 * 60000);
      eventStartDate.value = formatDateForInput(now);
      eventEndDate.value = formatDateForInput(later);
      populateTimeOptions(eventStartTime, `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
      populateTimeOptions(eventEndTime, `${String(later.getHours()).padStart(2, '0')}:${String(later.getMinutes()).padStart(2, '0')}`);
      syncChoiceGroupsFromValues();
      syncAllDayState();
      renderParticipantPills();
      syncDateTimeFieldSummaries();
    }

    function fillEventForm(eventRecord) {
      closeAllSelectChipDropdowns();
      agendaEditingId = eventRecord.id;
      eventTitle.value = eventRecord.title;
      eventStatus.value = eventRecord.status;
      eventContentType.value = eventRecord.contentType;
      eventContent.value = eventRecord.content;
      eventParticipants.value = eventRecord.participants;
      eventAllDay.checked = eventRecord.allDay;
      const start = new Date(eventRecord.start);
      const end = new Date(eventRecord.end);
      eventStartDate.value = formatDateForInput(start);
      eventEndDate.value = formatDateForInput(end);
      populateTimeOptions(eventStartTime, `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`);
      populateTimeOptions(eventEndTime, `${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`);
      setAttachmentFiles(eventRecord.attachments || []);
      eventDeleteButton.hidden = false;
      syncChoiceGroupsFromValues();
      syncAllDayState();
      renderParticipantPills();
      syncDateTimeFieldSummaries();
    }

    function openEventModal(eventId = null, options = {}) {
      closeAllSelectChipDropdowns();
      if (eventId) {
        const record = agendaEvents.find((item) => item.id === eventId);
        if (!record) return;
        fillEventForm(record);
      } else {
        resetEventForm(options.prefilledDate || null);
      }
      eventModal.classList.add('is-visible', 'is-positive');
      eventModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      window.setTimeout(() => eventTitle?.focus(), 60);
    }

    function closeEventModal() {
      closeAllSelectChipDropdowns();
      eventModal.classList.remove('is-visible');
      eventModal.setAttribute('aria-hidden', 'true');
      if (!favoriteModal.classList.contains('is-visible') && !modulesModal.classList.contains('is-visible') && !customizeAreasModal.classList.contains('is-visible') && !calendarModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
      pendingAgendaAction = null;
    }

    function getCalendarRange() {
      const cursor = startOfDay(calendarCursorDate);
      if (calendarView === 'day') {
        return {
          start: cursor,
          end: endOfDay(cursor),
          days: [cursor],
          label: formatDateLabel(cursor)
        };
      }
      if (calendarView === 'week') {
        const start = startOfWeek(cursor);
        const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));
        const end = endOfWeek(cursor);
        return {
          start,
          end,
          days,
          label: `${formatShortMonthDay(start)} a ${formatShortMonthDay(end)}`
        };
      }
      const start = startOfMonth(cursor);
      const end = endOfMonth(cursor);
      const firstCell = startOfWeek(start);
      const days = Array.from({ length: 42 }, (_, index) => addDays(firstCell, index));
      return {
        start,
        end,
        days,
        label: formatMonthLabel(cursor)
      };
    }

    function getEventsForRange(start, end) {
      return agendaEvents
        .slice()
        .filter((eventRecord) => {
          const eventStart = new Date(eventRecord.start);
          const eventEnd = new Date(eventRecord.end);
          return eventStart <= end && eventEnd >= start;
        })
        .sort((a, b) => new Date(a.start) - new Date(b.start));
    }

    function getEventsForDate(date) {
      return getEventsForRange(startOfDay(date), endOfDay(date));
    }

    function getCalendarEmptyStateMarkup() {
      return `
        <div class="calendar-event-summary-empty">
          <span class="calendar-event-summary-empty__icon" aria-hidden="true">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="4" y="5" width="16" height="15" rx="2"></rect>
              <path d="M8 3v4"></path>
              <path d="M16 3v4"></path>
              <path d="M4 10h16"></path>
            </svg>
          </span>
          <h3>Selecione um evento</h3>
          <p>Escolha um dos eventos no calendário para visualizar os detalhes completos aqui.</p>
        </div>
      `;
    }

    function getCalendarDetailMarkup(eventRecord) {
      if (!eventRecord) return '';
      const start = new Date(eventRecord.start);
      const end = new Date(eventRecord.end);
      const participants = getParticipantList(eventRecord.participants);
      const deletedClass = isEventDeleted(eventRecord) ? ' is-deleted' : '';
      return `
        <article class="calendar-event-summary calendar-event-summary--modal${deletedClass}" style="--event-accent:${getEventAccent(eventRecord)}">
          <p class="calendar-summary__eyebrow">Resumo do evento</p>
          <span class="calendar-event-summary__badge">${isEventDeleted(eventRecord) ? 'Excluído' : eventRecord.status}</span>
          <h3 id="calendarDetailTitle">${getEventTitleMarkup(eventRecord)}</h3>
          <p>${eventRecord.content || 'Sem descrição cadastrada para este compromisso.'}</p>
          <dl class="calendar-event-summary__meta">
            <div><dt>Quando</dt><dd>${eventRecord.allDay ? formatDateLabel(start) : `${formatDateLabel(start)} às ${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`}</dd></div>
            <div><dt>Duração</dt><dd>${formatDuration(start, end, eventRecord.allDay)}</dd></div>
            <div><dt>Tipo</dt><dd>${eventRecord.contentType}</dd></div>
            <div><dt>Participantes</dt><dd>${participants.length ? participants.join(', ') : 'Não informado'}</dd></div>
          </dl>
          <div class="calendar-event-summary__actions">
            <button class="favorite-modal__btn favorite-modal__btn--danger" type="button" data-calendar-detail-edit="${eventRecord.id}" ${isEventDeleted(eventRecord) ? 'disabled' : ''}>Excluir</button>
          </div>
        </article>
      `;
    }

    function openCalendarDetailModal(eventId) {
      const record = agendaEvents.find((item) => item.id === eventId);
      if (!record || !calendarDetailModal || !calendarDetailContent) return;
      calendarDetailEventId = eventId;
      calendarDetailContent.innerHTML = getCalendarDetailMarkup(record);
      calendarDetailContent.querySelector('[data-calendar-detail-edit]')?.addEventListener('click', () => {
        closeCalendarDetailModal();
        openEventModal(eventId);
      });
      calendarDetailModal.classList.add('is-visible', 'is-positive');
      calendarDetailModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeCalendarDetailModal() {
      if (!calendarDetailModal) return;
      calendarDetailModal.classList.remove('is-visible');
      calendarDetailModal.setAttribute('aria-hidden', 'true');
      calendarDetailEventId = null;
      if (!favoriteModal.classList.contains('is-visible') && !eventModal.classList.contains('is-visible') && !modulesModal.classList.contains('is-visible') && !customizeAreasModal.classList.contains('is-visible') && !calendarModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
    }

    function renderCalendarSummary(eventRecord) {
      if (!calendarEventSummary) return;
      if (!eventRecord) {
        calendarEventSummary.innerHTML = getCalendarEmptyStateMarkup();
        return;
      }
      const start = new Date(eventRecord.start);
      const end = new Date(eventRecord.end);
      const deletedClass = isEventDeleted(eventRecord) ? ' is-deleted' : '';
      const participants = getParticipantList(eventRecord.participants);
      calendarEventSummary.innerHTML = `
        <article class="calendar-event-summary${deletedClass}" style="--event-accent:${getEventAccent(eventRecord)}">
          <span class="calendar-event-summary__badge">${isEventDeleted(eventRecord) ? 'Excluído' : eventRecord.status}</span>
          <h3>${getEventTitleMarkup(eventRecord)}</h3>
          <p>${eventRecord.content || 'Sem descrição cadastrada para este compromisso.'}</p>
          <dl class="calendar-event-summary__meta">
            <div><dt>Quando</dt><dd>${eventRecord.allDay ? formatDateLabel(start) : `${formatDateLabel(start)} às ${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`}</dd></div>
            <div><dt>Duração</dt><dd>${formatDuration(start, end, eventRecord.allDay)}</dd></div>
            <div><dt>Tipo</dt><dd>${eventRecord.contentType}</dd></div>
            <div><dt>Participantes</dt><dd>${participants.length ? participants.join(', ') : 'Não informado'}</dd></div>
          </dl>
          <div class="calendar-event-summary__actions">
            <button class="favorite-modal__btn favorite-modal__btn--danger" type="button" data-calendar-delete-event="${eventRecord.id}" ${isEventDeleted(eventRecord) ? 'disabled' : ''}>Excluir</button>
          </div>
        </article>
      `;
      calendarEventSummary.querySelector('[data-calendar-delete-event]')?.addEventListener('click', () => {
        openEventModal(eventRecord.id);
      });
    }

    function renderCalendarWeekdays(days) {
      if (!calendarWeekdays) return;
      calendarWeekdays.className = `calendar-surface__weekdays calendar-surface__weekdays--${calendarView}`;
      calendarWeekdays.innerHTML = '';
      if (calendarView === 'month') {
        ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].forEach((label) => {
          const item = document.createElement('span');
          item.textContent = label;
          calendarWeekdays.appendChild(item);
        });
        return;
      }
      days.forEach((date) => {
        const item = document.createElement('span');
        item.innerHTML = `<strong>${formatShortWeekday(date)}</strong><small>${String(date.getDate()).padStart(2, '0')}</small>`;
        calendarWeekdays.appendChild(item);
      });
    }

    function renderCalendarGrid(range) {
      if (!calendarGrid) return;
      calendarGrid.className = `calendar-surface__grid calendar-surface__grid--${calendarView}`;
      calendarGrid.innerHTML = '';
      const todayKey = dateKeyFromDate(new Date());
      if (calendarView === 'month') {
        range.days.forEach((date) => {
          const dayKey = dateKeyFromDate(date);
          const cellEvents = getEventsForDate(date);
          const cell = document.createElement('button');
          cell.className = `calendar-month-cell${dayKey === calendarSelectedDate ? ' is-selected' : ''}${dayKey === todayKey ? ' is-today' : ''}${date.getMonth() !== calendarCursorDate.getMonth() ? ' is-outside' : ''}`;
          cell.type = 'button';
          cell.innerHTML = `
            <span class="calendar-month-cell__day">${date.getDate()}</span>
            <div class="calendar-month-cell__events"></div>
          `;
          const eventsContainer = cell.querySelector('.calendar-month-cell__events');
          cellEvents.slice(0, 3).forEach((eventRecord) => {
            const eventChip = document.createElement('button');
            eventChip.className = `calendar-month-event${isEventDeleted(eventRecord) ? ' is-deleted' : ''}`;
            eventChip.type = 'button';
            eventChip.style.setProperty('--event-accent', getEventAccent(eventRecord));
            eventChip.innerHTML = getEventTitleMarkup(eventRecord);
            eventChip.addEventListener('click', (event) => {
              event.stopPropagation();
              calendarSelectedDate = dayKey;
              calendarSelectedEventId = eventRecord.id;
              renderCalendar();
              openCalendarDetailModal(eventRecord.id);
            });
            eventsContainer.appendChild(eventChip);
          });
          cell.addEventListener('click', () => {
            calendarSelectedDate = dayKey;
            calendarSelectedEventId = null;
            renderCalendar();
            openEventModal(null, { prefilledDate: dayKey });
          });
          calendarGrid.appendChild(cell);
        });
        return;
      }

      range.days.forEach((date) => {
        const column = document.createElement('section');
        const dayKey = dateKeyFromDate(date);
        const dayEvents = getEventsForDate(date);
        column.className = `calendar-day-column${dayKey === calendarSelectedDate ? ' is-selected' : ''}`;
        column.innerHTML = `
          <button class="calendar-day-column__header" type="button">
            <strong>${formatShortWeekday(date)}</strong>
            <span>${String(date.getDate()).padStart(2, '0')}</span>
          </button>
          <div class="calendar-day-column__events"></div>
        `;
        column.addEventListener('click', () => {
          calendarSelectedDate = dayKey;
          calendarSelectedEventId = null;
          renderCalendar();
          openEventModal(null, { prefilledDate: dayKey });
        });
        column.querySelector('.calendar-day-column__header')?.addEventListener('click', () => {
          event.stopPropagation();
          calendarSelectedDate = dayKey;
          calendarSelectedEventId = null;
          renderCalendar();
          openEventModal(null, { prefilledDate: dayKey });
        });
        const eventsContainer = column.querySelector('.calendar-day-column__events');
        if (!dayEvents.length) {
          eventsContainer.innerHTML = '<p class="calendar-empty-state">Sem eventos</p>';
        } else {
          dayEvents.forEach((eventRecord) => {
            const start = new Date(eventRecord.start);
            const end = new Date(eventRecord.end);
            const card = document.createElement('button');
            const isWeekView = calendarView === 'week';
            const compactTitle = truncateEventTitle(eventRecord.title, 9);
            card.className = `calendar-event-card${isWeekView ? ' calendar-event-card--week' : ''}${calendarSelectedEventId === eventRecord.id ? ' is-active' : ''}${isEventDeleted(eventRecord) ? ' is-deleted' : ''}`;
            card.type = 'button';
            card.style.setProperty('--event-accent', getEventAccent(eventRecord));
            card.innerHTML = `
              <span class="calendar-event-card__time">${eventRecord.allDay ? 'Dia inteiro' : `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')} - ${String(end.getHours()).padStart(2, '0')}:${String(end.getMinutes()).padStart(2, '0')}`}</span>
              <strong title="${eventRecord.title}">${isWeekView ? compactTitle : getEventTitleMarkup(eventRecord)}</strong>
              <small>${isEventDeleted(eventRecord) ? 'Excluído' : `${eventRecord.status} • ${eventRecord.contentType}`}</small>
            `;
            card.addEventListener('click', () => {
              event.stopPropagation();
              calendarSelectedDate = dayKey;
              calendarSelectedEventId = eventRecord.id;
              renderCalendar();
              openCalendarDetailModal(eventRecord.id);
            });
            eventsContainer.appendChild(card);
          });
        }
        calendarGrid.appendChild(column);
      });
    }

    function renderCalendar() {
      if (!calendarModal) return;
      const range = getCalendarRange();
      renderCalendarWeekdays(range.days.slice(0, calendarView === 'month' ? 7 : range.days.length));
      renderCalendarGrid(range);
      if (calendarRangeLabel) calendarRangeLabel.textContent = range.label;
      calendarViewButtons.forEach((button) => {
        button.classList.toggle('is-active', button.dataset.calendarView === calendarView);
      });
      const selectedEvent = agendaEvents.find((item) => item.id === calendarSelectedEventId) || null;
      renderCalendarSummary(selectedEvent);
    }

    function openCalendarModal() {
      calendarSelectedEventId = null;
      renderCalendar();
      calendarModal.classList.add('is-visible', 'is-positive');
      calendarModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeCalendarModal() {
      closeCalendarDetailModal();
      calendarModal.classList.remove('is-visible');
      calendarModal.setAttribute('aria-hidden', 'true');
      if (!favoriteModal.classList.contains('is-visible') && !eventModal.classList.contains('is-visible') && !modulesModal.classList.contains('is-visible') && !customizeAreasModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
    }

    function renderAgendaEmptyState() {
      if (!agendaList) return;
      const emptyItem = document.createElement('li');
      emptyItem.className = 'agenda-empty-state';
      emptyItem.innerHTML = `
        <span class="agenda-empty-state__icon" aria-hidden="true">
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="5" width="16" height="15" rx="2"></rect>
            <path d="M8 3v4"></path>
            <path d="M16 3v4"></path>
            <path d="M4 10h16"></path>
          </svg>
        </span>
        <strong>Nenhum compromisso hoje</strong>
        <small>Voce pode aproveitar o seu dia ou adicionar um novo evento para começar a agenda.</small>
      `;
      agendaList.appendChild(emptyItem);
    }

    function renderAgenda() {
      if (!agendaList) return;
      if (agendaDayLabel) {
        agendaDayLabel.textContent = formatDateLabel(new Date());
      }
      agendaList.innerHTML = '';
      const todayEvents = getEventsForDate(new Date());
        todayEvents
        .slice()
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .forEach((eventRecord) => {
          const start = new Date(eventRecord.start);
          const end = new Date(eventRecord.end);
          const item = document.createElement('li');
          item.className = `agenda-item agenda-item--interactive${isEventDeleted(eventRecord) ? ' is-deleted' : ''}`;
          item.dataset.eventId = eventRecord.id;
          item.dataset.eventStart = eventRecord.start;
          item.style.setProperty('--accent', getEventAccent(eventRecord));
          item.innerHTML = `
            <time>${eventRecord.allDay ? 'Dia inteiro' : `${String(start.getHours()).padStart(2, '0')}:${String(start.getMinutes()).padStart(2, '0')}`}</time>
            <div>
              <strong>${getEventTitleMarkup(eventRecord)}</strong>
              <small>${isEventDeleted(eventRecord) ? 'Excluído' : eventRecord.status} • ${eventRecord.contentType} • ${formatDuration(start, end, eventRecord.allDay)}</small>
            </div>
          `;
          item.addEventListener('click', () => openEventModal(eventRecord.id));
          agendaList.appendChild(item);
        });
      if (!todayEvents.length) {
        renderAgendaEmptyState();
      }
    }

    function upsertAgendaEvent() {
      const start = eventAllDay.checked
        ? new Date(`${eventStartDate.value}T00:00:00`)
        : parseDateTime(eventStartDate.value, eventStartTime.value);
      const end = eventAllDay.checked
        ? new Date(`${eventEndDate.value}T23:59:00`)
        : parseDateTime(eventEndDate.value, eventEndTime.value);
      if (end < start) {
        eventEndDate.value = eventStartDate.value;
        suggestEndTime();
        return false;
      }

      const payload = {
        id: agendaEditingId || `event-${Date.now()}`,
        title: eventTitle.value.trim(),
        start: start.toISOString().slice(0, 16),
        end: end.toISOString().slice(0, 16),
        status: eventStatus.value,
        contentType: eventContentType.value,
        content: eventContent.value.trim(),
        participants: eventParticipants.value.trim(),
        allDay: eventAllDay.checked,
        attachments: collectAttachments(),
        deleted: agendaEditingId ? Boolean(agendaEvents.find((item) => item.id === agendaEditingId)?.deleted) : false
      };

      if (agendaEditingId) {
        const index = agendaEvents.findIndex((item) => item.id === agendaEditingId);
        if (index >= 0) agendaEvents[index] = { ...agendaEvents[index], ...payload };
      } else {
        agendaEvents.push(payload);
      }
      renderAgenda();
      renderCalendar();
      closeEventModal();
      return true;
    }

    function deleteAgendaEvent() {
      if (!agendaEditingId) return;
      const index = agendaEvents.findIndex((item) => item.id === agendaEditingId);
      if (index >= 0) {
        agendaEvents[index] = {
          ...agendaEvents[index],
          deleted: true,
          status: 'Cancelado'
        };
        renderAgenda();
        renderCalendar();
      }
      closeEventModal();
    }

    function openAgendaConfirmation(action) {
      const meta = getStatusMeta(action);
      pendingAgendaAction = action;
      favoriteModal.classList.toggle('is-positive', meta.positive);
      favoriteModal.classList.toggle('is-negative', !meta.positive);
      favoriteModalTitle.textContent = meta.title;
      favoriteModalDescription.textContent = meta.description;
      favoriteModalStatus.innerHTML = meta.icon;
      favoriteModalConfirm.textContent = meta.confirmLabel;
      favoriteModal.classList.add('is-visible');
      favoriteModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function updateWelcomeTitle() {
      if (!welcomeTitle) return;
      const hour = new Date().getHours();
      const period = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
      welcomeTitle.textContent = `${period}, Bárbara! 👋`;
    }

    moduleSources.forEach((item) => {
      const card = item.closest('.area-card');
      const sourceCard = card || gestaoCard;
      const iconMarkup = card ? card.querySelector('.area-card__icon').innerHTML : gestaoIconMarkup;
      item.dataset.category = sourceCard?.dataset.category || 'Gestão';
      item.dataset.accent = sourceCard?.style.getPropertyValue('--accent').trim() || gestaoAccent;
      item.dataset.soft = sourceCard?.style.getPropertyValue('--soft').trim() || gestaoSoft;
      item.dataset.icon = iconMarkup;
      item.style.setProperty('--module-accent', item.dataset.accent);
      item.style.setProperty('--module-soft', item.dataset.soft);

      const content = item.querySelector('.module-item__content');
      const moduleTitle = content?.querySelector('span:not(.module-category-tag), strong');
      const moduleDescription = content?.querySelector('small');
      moduleTitle?.setAttribute('title', item.dataset.moduleName || moduleTitle.textContent.trim());
      moduleDescription?.setAttribute('title', item.dataset.moduleDescription || moduleDescription.textContent.trim());

      if (card) {
        if (content && !content.querySelector('.module-category-tag')) {
          const tag = document.createElement('span');
          tag.className = 'module-category-tag';
          tag.textContent = item.dataset.category;
          tag.title = item.dataset.category;
          content.prepend(tag);
        }
      }

      const moduleId = item.dataset.moduleId;
      const existing = moduleFavorites.get(moduleId);
      if (existing) {
        existing.buttons.push(item.querySelector('.module-favorite-btn'));
      } else {
        moduleFavorites.set(moduleId, {
          moduleId,
          moduleName: item.dataset.moduleName,
          moduleDescription: item.dataset.moduleDescription,
          category: item.dataset.category,
          accent: item.dataset.accent,
          soft: item.dataset.soft,
          icon: item.dataset.icon,
          route: item.dataset.moduleRoute,
          buttons: [item.querySelector('.module-favorite-btn')],
        });
      }
    });

    function setFavoriteButtonState(button, isActive, moduleName) {
      button.classList.toggle('is-active', isActive);
      button.textContent = isActive ? '★' : '☆';
      button.setAttribute('aria-pressed', String(isActive));
      button.setAttribute('aria-label', `${isActive ? 'Remover' : 'Favoritar'} ${moduleName}`);
      button.title = `${isActive ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}: ${moduleName}`;
    }

    function syncFavoriteButtons() {
      moduleFavorites.forEach((moduleRecord) => {
        const isFavorite = favoriteOrder.includes(moduleRecord.moduleId);
        moduleRecord.buttons.forEach((button) => {
          setFavoriteButtonState(button, isFavorite, moduleRecord.moduleName);
        });
      });
    }

    function renderQuickAccess() {
      quickList.innerHTML = '';
      quickEmptyState.hidden = favoriteOrder.length > 0;

      favoriteOrder.forEach((moduleId) => {
        const item = moduleFavorites.get(moduleId);
        if (!item) return;

        const quickCard = document.createElement('button');
        quickCard.type = 'button';
        quickCard.className = 'quick-card';
        quickCard.draggable = true;
        quickCard.dataset.moduleId = moduleId;
        quickCard.style.setProperty('--accent', item.accent);
        quickCard.innerHTML = `
          <span class="quick-card__icon">${item.icon}</span>
          <span class="quick-card__content">
            <strong title="${item.moduleName}">${item.moduleName}</strong>
            <small title="${item.moduleDescription}">${item.moduleDescription}</small>
          </span>
          <div class="remove-drag">
          <button class="quick-card__remove" type="button" aria-label="Remover ${item.moduleName} dos acessos rápidos" title="Remover dos acessos rápidos">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
          <span class="quick-card__drag" aria-hidden="true">⋮⋮</span>
          </div>
        `;

        quickCard.querySelector('.quick-card__remove').addEventListener('click', (event) => {
          event.stopPropagation();
          openFavoriteModal(moduleId);
        });

        quickCard.addEventListener('dragstart', () => {
          draggedFavoriteId = moduleId;
          quickCard.classList.add('is-dragging');
        });

        quickCard.addEventListener('dragend', () => {
          draggedFavoriteId = null;
          quickList.querySelectorAll('.quick-card').forEach((cardEl) => {
            cardEl.classList.remove('is-dragging', 'drag-over');
          });
        });

        quickCard.addEventListener('dragover', (event) => {
          event.preventDefault();
          if (draggedFavoriteId && draggedFavoriteId !== moduleId) {
            quickCard.classList.add('drag-over');
          }
        });

        quickCard.addEventListener('dragleave', () => {
          quickCard.classList.remove('drag-over');
        });

        quickCard.addEventListener('drop', (event) => {
          event.preventDefault();
          quickCard.classList.remove('drag-over');
          if (!draggedFavoriteId || draggedFavoriteId === moduleId) return;
          const fromIndex = favoriteOrder.indexOf(draggedFavoriteId);
          const toIndex = favoriteOrder.indexOf(moduleId);
          if (fromIndex === -1 || toIndex === -1) return;
          favoriteOrder.splice(fromIndex, 1);
          favoriteOrder.splice(toIndex, 0, draggedFavoriteId);
          renderQuickAccess();
        });

        quickCard.addEventListener('click', () => {
          if (item.route) window.location.href = item.route;
        });

        quickList.appendChild(quickCard);
      });
    }

    function toggleFavorite(moduleId) {
      const index = favoriteOrder.indexOf(moduleId);
      if (index >= 0) {
        favoriteOrder.splice(index, 1);
      } else {
        favoriteOrder.push(moduleId);
      }
      syncFavoriteButtons();
      renderQuickAccess();
    }

    function syncCustomizeToggles() {
      customizeToggles.forEach((toggleEl) => {
        const isVisible = Boolean(dashboardVisibility[toggleEl.dataset.customizeToggle]);
        const item = toggleEl.closest('.customize-item');
        const title = item?.querySelector('.customize-item__content strong')?.textContent || 'seção';
        toggleEl.setAttribute('aria-pressed', String(isVisible));
        toggleEl.setAttribute('aria-label', `${isVisible ? 'Ocultar' : 'Exibir'} ${title}`);
        item?.classList.toggle('is-hidden', !isVisible);
      });
      syncCustomizeBulkButton();
    }

    function syncCustomizeBulkButton() {
      if (!customizeHideAll) return;
      const hasVisibleItem = customizeToggles.some((toggleEl) => toggleEl.getAttribute('aria-pressed') === 'true');
      customizeHideAll.textContent = hasVisibleItem ? 'Ocultar todos' : 'Exibir todos';
      customizeHideAll.setAttribute('aria-label', hasVisibleItem ? 'Ocultar todas as seções' : 'Exibir todas as seções');
    }

    function applyDashboardVisibility() {
      const wasWelcomeHidden = dashboardAreas.welcome?.classList.contains('hide') || false;
      Object.entries(dashboardAreas).forEach(([areaId, areaEl]) => {
        if (!areaEl) return;
        areaEl.classList.toggle('hide', !dashboardVisibility[areaId]);
      });

      const isWelcomeHidden = !dashboardVisibility.welcome;
      if (isWelcomeHidden && !wasWelcomeHidden) {
        isCustomizeGuidedTipDismissed = false;
      }
      const isQuickHidden = !dashboardVisibility.quick;
      heroGrid?.classList.toggle('is-welcome-hidden', isWelcomeHidden && dashboardVisibility.quick);
      heroGrid?.classList.toggle('is-quick-hidden', isQuickHidden && dashboardVisibility.welcome);
      heroGrid?.classList.toggle('is-empty', isWelcomeHidden && isQuickHidden);
      syncCustomizeGuidedTip();
    }

    function syncCustomizeGuidedTip() {
      if (!customizeGuidedTip) return;
      const shouldHideTip = dashboardVisibility.welcome || customizeAreasModal.classList.contains('is-visible') || isCustomizeGuidedTipDismissed;
      customizeGuidedTip.hidden = shouldHideTip;
      if (customizeGuidedTipOverlay) {
        customizeGuidedTipOverlay.hidden = shouldHideTip;
      }
    }

    function dismissCustomizeGuidedTip() {
      isCustomizeGuidedTipDismissed = true;
      syncCustomizeGuidedTip();
    }

    function openCustomizeModal() {
      syncCustomizeToggles();
      customizeAreasModal.classList.add('is-visible');
      customizeAreasModal.setAttribute('aria-hidden', 'false');
      syncCustomizeGuidedTip();
      document.body.classList.add('modal-open');
    }

    function closeCustomizeModal() {
      customizeAreasModal.classList.remove('is-visible');
      customizeAreasModal.setAttribute('aria-hidden', 'true');
      if (!favoriteModal.classList.contains('is-visible') && !modulesModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
      syncCustomizeGuidedTip();
    }

    function closeFavoriteModal(options = {}) {
      const shouldRestoreModulesModal = pendingFavoriteAction?.returnToModulesModal && options.reopenModulesModal !== false;
      favoriteModal.classList.remove('is-visible');
      favoriteModal.setAttribute('aria-hidden', 'true');
      if (shouldRestoreModulesModal) {
        openModulesModal();
      } else if (!modulesModal.classList.contains('is-visible') && !eventModal.classList.contains('is-visible') && !calendarModal.classList.contains('is-visible') && !customizeAreasModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
      pendingFavoriteAction = null;
      pendingAgendaAction = null;
    }

    function openModulesModal() {
      modulesModal.classList.add('is-visible', 'is-positive');
      modulesModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    function closeModulesModal() {
      modulesModal.classList.remove('is-visible');
      modulesModal.setAttribute('aria-hidden', 'true');
      if (!favoriteModal.classList.contains('is-visible')) {
        document.body.classList.remove('modal-open');
      }
    }

    function openFavoriteModal(moduleId, options = {}) {
      const moduleItem = moduleFavorites.get(moduleId);
      if (!moduleItem) return;
      const isFavorite = favoriteOrder.includes(moduleId);
      const returnToModulesModal = Boolean(options.returnToModulesModal);
      pendingFavoriteAction = { moduleId, returnToModulesModal };

      if (returnToModulesModal && modulesModal.classList.contains('is-visible')) {
        closeModulesModal();
      }

      favoriteModal.classList.toggle('is-positive', !isFavorite);
      favoriteModal.classList.toggle('is-negative', isFavorite);
      favoriteModalTitle.textContent = isFavorite ? `Remover ${moduleItem.moduleName} do Acesso Rápido?` : `Adicionar ${moduleItem.moduleName} ao Acesso Rápido?`;
      favoriteModalDescription.textContent = isFavorite
        ? `${moduleItem.moduleName} deixará de aparecer nos seus acessos rápidos. Você pode favoritar novamente quando quiser.`
        : `O módulo de ${moduleItem.moduleName} será exibido nos seus acessos rápidos para facilitar o retorno ao módulo.`;
      favoriteModalStatus.innerHTML = isFavorite
        ? '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M9.5 9.5 14.5 14.5M14.5 9.5 9.5 14.5"></path></svg>'
        : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="m8.5 12 2.4 2.4 4.6-4.8"></path></svg>';
      favoriteModalConfirm.textContent = isFavorite ? 'Remover' : 'Adicionar';

      favoriteModal.classList.add('is-visible');
      favoriteModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }

    moduleSources.forEach((item) => {
      const button = item.querySelector('.module-favorite-btn');
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const isFromModulesModal = Boolean(item.closest('#modulesModal'));
        openFavoriteModal(item.dataset.moduleId, { returnToModulesModal: isFromModulesModal });
      });

      if (item.dataset.moduleRoute) {
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.addEventListener('click', () => {
          window.location.href = item.dataset.moduleRoute;
        });
        item.addEventListener('keydown', (event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          window.location.href = item.dataset.moduleRoute;
        });
      }
    });

    favoriteModalConfirm.addEventListener('click', () => {
      if (pendingAgendaAction) {
        const agendaAction = pendingAgendaAction;
        closeFavoriteModal({ reopenModulesModal: false });
        if (agendaAction === 'save') {
          upsertAgendaEvent();
        } else if (agendaAction === 'delete') {
          deleteAgendaEvent();
        }
        return;
      }
      if (!pendingFavoriteAction) return;
      const shouldScrollToQuickAccess = !favoriteOrder.includes(pendingFavoriteAction.moduleId);
      toggleFavorite(pendingFavoriteAction.moduleId);
      const shouldRestoreModulesModal = pendingFavoriteAction.returnToModulesModal;
      closeFavoriteModal();
      if (shouldScrollToQuickAccess && !shouldRestoreModulesModal) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
    favoriteModalCancel.addEventListener('click', closeFavoriteModal);
    favoriteModalClose.addEventListener('click', closeFavoriteModal);
    favoriteModal.querySelectorAll('[data-close-favorite-modal]').forEach((node) => {
      node.addEventListener('click', closeFavoriteModal);
    });
    openCustomizeAreas?.addEventListener('click', openCustomizeModal);
    openCustomizeAreasHero?.addEventListener('click', openCustomizeModal);
    customizeGuidedTipOverlay?.addEventListener('click', dismissCustomizeGuidedTip);
    customizeGuidedTipClose?.addEventListener('click', dismissCustomizeGuidedTip);
    customizeAreasModalClose?.addEventListener('click', closeCustomizeModal);
    customizeAreasModal.querySelectorAll('[data-close-customize-modal]').forEach((node) => {
      node.addEventListener('click', closeCustomizeModal);
    });
    customizeToggles.forEach((toggleEl) => {
      toggleEl.addEventListener('click', () => {
        const isVisible = toggleEl.getAttribute('aria-pressed') !== 'true';
        const item = toggleEl.closest('.customize-item');
        const title = item?.querySelector('.customize-item__content strong')?.textContent || 'seção';
        toggleEl.setAttribute('aria-pressed', String(isVisible));
        toggleEl.setAttribute('aria-label', `${isVisible ? 'Ocultar' : 'Exibir'} ${title}`);
        item?.classList.toggle('is-hidden', !isVisible);
        syncCustomizeBulkButton();
      });
    });
    customizeHideAll?.addEventListener('click', () => {
      const shouldShowAll = !customizeToggles.some((toggleEl) => toggleEl.getAttribute('aria-pressed') === 'true');
      customizeToggles.forEach((toggleEl) => {
        const item = toggleEl.closest('.customize-item');
        const title = item?.querySelector('.customize-item__content strong')?.textContent || 'seção';
        toggleEl.setAttribute('aria-pressed', String(shouldShowAll));
        toggleEl.setAttribute('aria-label', `${shouldShowAll ? 'Ocultar' : 'Exibir'} ${title}`);
        item?.classList.toggle('is-hidden', !shouldShowAll);
      });
      syncCustomizeBulkButton();
    });
    customizeApply?.addEventListener('click', () => {
      customizeToggles.forEach((toggleEl) => {
        dashboardVisibility[toggleEl.dataset.customizeToggle] = toggleEl.getAttribute('aria-pressed') === 'true';
      });
      applyDashboardVisibility();
      closeCustomizeModal();
    });
    openGestaoModules?.addEventListener('click', openModulesModal);
    modulesModalClose?.addEventListener('click', closeModulesModal);
    modulesModal.querySelectorAll('[data-close-modules-modal]').forEach((node) => {
      node.addEventListener('click', closeModulesModal);
    });
    openEventModalButton?.addEventListener('click', () => openEventModal());
    openCalendarModalButton?.addEventListener('click', openCalendarModal);
    calendarModalClose?.addEventListener('click', closeCalendarModal);
    calendarModal?.querySelectorAll('[data-close-calendar-modal]').forEach((node) => {
      node.addEventListener('click', closeCalendarModal);
    });
    calendarDetailModalClose?.addEventListener('click', closeCalendarDetailModal);
    calendarDetailModal?.querySelectorAll('[data-close-calendar-detail-modal]').forEach((node) => {
      node.addEventListener('click', closeCalendarDetailModal);
    });
    calendarTodayButton?.addEventListener('click', () => {
      calendarCursorDate = new Date();
      calendarSelectedDate = formatDateForInput(calendarCursorDate);
      calendarSelectedEventId = null;
      renderCalendar();
    });
    calendarPrevButton?.addEventListener('click', () => {
      if (calendarView === 'day') calendarCursorDate = addDays(calendarCursorDate, -1);
      if (calendarView === 'week') calendarCursorDate = addDays(calendarCursorDate, -7);
      if (calendarView === 'month') calendarCursorDate = new Date(calendarCursorDate.getFullYear(), calendarCursorDate.getMonth() - 1, 1);
      calendarSelectedDate = formatDateForInput(calendarCursorDate);
      calendarSelectedEventId = null;
      renderCalendar();
    });
    calendarNextButton?.addEventListener('click', () => {
      if (calendarView === 'day') calendarCursorDate = addDays(calendarCursorDate, 1);
      if (calendarView === 'week') calendarCursorDate = addDays(calendarCursorDate, 7);
      if (calendarView === 'month') calendarCursorDate = new Date(calendarCursorDate.getFullYear(), calendarCursorDate.getMonth() + 1, 1);
      calendarSelectedDate = formatDateForInput(calendarCursorDate);
      calendarSelectedEventId = null;
      renderCalendar();
    });
    calendarViewButtons.forEach((button) => {
      button.addEventListener('click', () => {
        calendarView = button.dataset.calendarView;
        calendarSelectedEventId = null;
        renderCalendar();
      });
    });
    calendarAddEventButton?.addEventListener('click', () => openEventModal());
    eventModalClose?.addEventListener('click', closeEventModal);
    eventCancelButton?.addEventListener('click', closeEventModal);
    eventModal?.querySelectorAll('[data-close-event-modal]').forEach((node) => {
      node.addEventListener('click', closeEventModal);
    });
    eventAttachmentInput?.addEventListener('change', () => {
      setAttachmentFiles(eventAttachmentInput.files ? [...eventAttachmentInput.files] : []);
    });
    eventDropzone?.addEventListener('dragenter', (event) => {
      event.preventDefault();
      updateDropzoneState(true);
    });
    eventDropzone?.addEventListener('dragover', (event) => {
      event.preventDefault();
      updateDropzoneState(true);
    });
    eventDropzone?.addEventListener('dragleave', (event) => {
      if (event.currentTarget !== event.target && eventDropzone?.contains(event.relatedTarget)) return;
      updateDropzoneState(false);
    });
    eventDropzone?.addEventListener('drop', (event) => {
      event.preventDefault();
      setAttachmentFiles(event.dataTransfer?.files ? [...event.dataTransfer.files] : []);
    });
    eventStartPickerTrigger?.addEventListener('click', () => openDateTimeModal('start'));
    eventEndPickerTrigger?.addEventListener('click', () => openDateTimeModal('end'));
    eventDateTimeModalClose?.addEventListener('click', closeDateTimeModal);
    eventDateTimeModalCancel?.addEventListener('click', closeDateTimeModal);
    eventDateTimeModal?.querySelectorAll('[data-close-datetime-modal]').forEach((node) => {
      node.addEventListener('click', closeDateTimeModal);
    });
    eventDateTimePrevMonth?.addEventListener('click', () => {
      if (!dateTimeDraft) return;
      dateTimeDraft.visibleMonth = new Date(dateTimeDraft.visibleMonth.getFullYear(), dateTimeDraft.visibleMonth.getMonth() - 1, 1);
      renderDateTimeCalendar();
    });
    eventDateTimeNextMonth?.addEventListener('click', () => {
      if (!dateTimeDraft) return;
      dateTimeDraft.visibleMonth = new Date(dateTimeDraft.visibleMonth.getFullYear(), dateTimeDraft.visibleMonth.getMonth() + 1, 1);
      renderDateTimeCalendar();
    });
    eventDateTimeManualTime?.addEventListener('input', () => {
      renderDateTimeQuickTimes();
      renderDateTimeComputedEnd();
    });
    eventDateTimeDurationInput?.addEventListener('input', () => {
      renderDurationPresets();
      renderDateTimeComputedEnd();
    });
    eventDateTimeModalApply?.addEventListener('click', applyDateTimeModal);
    eventStatus?.addEventListener('change', syncChoiceGroupsFromValues);
    eventContentType?.addEventListener('change', syncChoiceGroupsFromValues);
    selectChipDropdowns.forEach((dropdown) => {
      const inputId = dropdown.dataset.selectDropdown;
      const input = document.getElementById(inputId);
      const trigger = dropdown.querySelector('.select-chip-dropdown__trigger');
      const options = [...dropdown.querySelectorAll('.select-chip-option')];
      trigger?.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleSelectChipDropdown(dropdown);
      });
      options.forEach((option) => {
        option.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          if (input) input.value = option.dataset.selectValue;
          syncChoiceGroupsFromValues();
          closeSelectChipDropdown(dropdown);
        });
      });
    });
    eventAllDay?.addEventListener('change', syncAllDayState);
    eventParticipants?.addEventListener('input', renderParticipantPills);
    eventStartTime?.addEventListener('change', suggestEndTime);
    eventStartDate?.addEventListener('change', () => {
      if (!eventEndDate.value || eventEndDate.value < eventStartDate.value) {
        eventEndDate.value = eventStartDate.value;
      }
      suggestEndTime();
      syncDateTimeFieldSummaries();
    });
    eventEndDate?.addEventListener('change', syncDateTimeFieldSummaries);
    eventEndTime?.addEventListener('change', syncDateTimeFieldSummaries);
    eventForm?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!eventForm.reportValidity()) return;
      if (calendarModal?.classList.contains('is-visible')) {
        upsertAgendaEvent();
        return;
      }
      openAgendaConfirmation('save');
    });
    eventDeleteButton?.addEventListener('click', () => {
      openAgendaConfirmation('delete');
    });

    let activeFilter = 'all';
    function applyFilters() {
      const term = (search.value || '').trim().toLowerCase();
    //   areasSectionHeader.hidden = activeFilter !== 'all';
    //   if (activeFilter === 'all') {
    //     areasSectionTitle.textContent = 'Acesse suas áreas';
    //     areasSectionSubtitle.textContent = 'Cards maiores agrupam contexto, módulos e ação principal.';
    //   }
      grid.classList.toggle('single-filter-mode', activeFilter !== 'all');
      cards.forEach(card => {
        const byText = !term || card.dataset.search.includes(term);
        const byCategory = activeFilter === 'all' || card.dataset.category === activeFilter;
        card.classList.toggle('hide', !(byText && byCategory));
      });
    }
    search.addEventListener('input', applyFilters);
    chips.forEach(chip => chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      activeFilter = chip.dataset.filter;
      applyFilters();
    }));
    toggle.addEventListener('change', () => {
      grid.classList.toggle('category-mode', !toggle.checked);
      grid.classList.toggle('compact-mode', toggle.checked);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && customizeGuidedTip && !customizeGuidedTip.hidden) {
        dismissCustomizeGuidedTip();
        return;
      }
      if (event.key === 'Escape' && customizeAreasModal.classList.contains('is-visible')) {
        closeCustomizeModal();
        return;
      }
      if (event.key === 'Escape' && modulesModal.classList.contains('is-visible')) {
        closeModulesModal();
        return;
      }
      if (event.key === 'Escape' && calendarDetailModal?.classList.contains('is-visible')) {
        closeCalendarDetailModal();
        return;
      }
      if (event.key === 'Escape' && calendarModal.classList.contains('is-visible') && !eventModal.classList.contains('is-visible')) {
        closeCalendarModal();
        return;
      }
      if (event.key === 'Escape' && favoriteModal.classList.contains('is-visible')) {
        closeFavoriteModal();
        return;
      }
      if (event.key === 'Escape' && eventModal.classList.contains('is-visible')) {
        if (eventDateTimeModal.classList.contains('is-visible')) {
          closeDateTimeModal();
          return;
        }
        closeAllSelectChipDropdowns();
        closeEventModal();
      }
    });
    document.addEventListener('click', (event) => {
      if (event.target.closest('[data-select-dropdown]')) return;
      closeAllSelectChipDropdowns();
    });
    updateWelcomeTitle();
    applyDashboardVisibility();
    syncFavoriteButtons();
    renderQuickAccess();
    resetEventForm();
    renderAgenda();
