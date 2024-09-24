$(document).ready(function () {
  $(".header-right-info-box__top").on("click", function () {
    $(".header-right-info__box").toggleClass("active");
  });
  $(".header-burger").on("click", function () {
    $(".header-burger,.header-left__nav,.header-mob-box").toggleClass("active");
  });
  $(".header-lang__top").on("click", function () {
    $(".header-lang").toggleClass("active");
  });
  $(document).on("click", function (e) {
    // Проверяем, находится ли клик вне header и header-burger
    if (!$(e.target).closest(".header-right-info__box").length) {
      $(".header-right-info__box").removeClass("active");
    }
  });
  $(document).on("click", function (e) {
    // Проверяем, находится ли клик вне header и header-burger
    if (!$(e.target).closest(".header-lang").length) {
      $(".header-lang").removeClass("active");
    }
  });
  function movePromoSocs() {
    if ($(window).width() < 1200) {
      $(".promo__socs").appendTo(".prome-cyclone-box");
    } else {
      // Опционально, если нужно вернуть на место при большом экране
      // $('.promo__socs').appendTo('.original-parent-selector');
    }
  }

  // Проверяем при загрузке страницы
  movePromoSocs();

  // Проверяем при изменении размера окна
  $(window).resize(function () {
    movePromoSocs();
  });
  if (window.matchMedia("(max-width: 1750px)").matches) {
    $(".species-list__item--line").remove();
    $(".species__list").owlCarousel({
      loop: false, // Зацикливать карусель
      margin: 10, // Отступ между слайдами
      nav: true, // Показать навигационные стрелки
      responsive: {
        0: {
          items: 1, // Количество слайдов для маленьких экранов
        },
        576: {
          items: 2, // Количество слайдов для маленьких экранов
        },
        768: {
          items: 3, // Количество слайдов для средних экранов
        },
        992: {
          items: 3, // Количество слайдов для средних экранов
        },
        1200: {
          items: 2, // Количество слайдов для экранов побольше
        },
        1400: {
          items: 3, // Количество слайдов для экранов побольше
        },
        1750: {
          items: 3, // Количество слайдов для экранов шире 1750px
        },
      },
    });
  }
  function updateHeight() {
    $(".gw-timer__item, .start-slder-dots__item").each(function () {
      var width = $(this).width(); // Получаем ширину элемента
      $(this).height(width); // Устанавливаем эту ширину как высоту
    });
  }

  // Запускаем функцию при загрузке страницы
  updateHeight();

  // Запускаем функцию при изменении размера окна
  $(window).resize(function () {
    updateHeight();
  });
  class gw_timeUpdate {
    constructor(el, date, startIn, lifeTime, tz) {
      this.el = el;
      this.startTime = luxon.DateTime.fromSQL(date, { zone: tz });
      this.tz = tz;
      this.startIn = startIn || "Start in";
      this.lifeTime = lifeTime || "Life time";
    }

    update() {
      // Здесь мы отключаем динамическое обновление времени.
      // Устанавливаем фиксированные значения времени для отображения в таймере.
      let days = 0; // Можно задать фиксированные значения, если необходимо.
      let hours = 0;
      let minutes = 0;
      let seconds = 0;

      // Устанавливаем заголовок
      let title = this.startIn; // или this.lifeTime, в зависимости от ситуации

      // Генерация статического HTML
      let html = `
				<div class="countdown">
						<div class="countdown__counter">
								<div class="gw-timer">
										<div class="gw-timer__item">
										  <div class="gw-timer__item-inner">
												<div class="gw-timer__amount">${days}</div>
												<div class="gw-timer__desc">${numDecline(days, __config.timer.dd[0])}</div>
											</div></div>
										
										<div class="gw-timer__item">
												<div class="gw-timer__amount">${String(hours).padStart(2, "0")}</div>
												<div class="gw-timer__desc">${numDecline(hours, __config.timer.dd[1])}</div>
										</div>
										
										<div class="gw-timer__item">
												<div class="gw-timer__amount">${String(minutes).padStart(2, "0")}</div>
												<div class="gw-timer__desc">${numDecline(minutes, __config.timer.dd[2])}</div>
										</div>
										
										<div class="gw-timer__item">
												<div class="gw-timer__amount">${String(seconds).padStart(2, "0")}</div>
												<div class="gw-timer__desc">${numDecline(seconds, __config.timer.dd[3])}</div>
										</div>
								</div>
						</div>
				</div>
			`;

      // Рендерим статичный HTML код без обновления таймера
      this.el.html(html);
    }
  }

  function numDecline(n, titles) {
    return titles[
      1 === n % 10 && 11 !== n % 100
        ? 0
        : 2 <= n % 10 && 4 >= n % 10 && (10 > n % 100 || 20 <= n % 100)
        ? 1
        : 2
    ];
  }

  $("[data-timer-start-time]").each(function (index, element) {
    const __this = $(this);
    console.log("Initializing timer for element:", __this);
    let timeREnder = new gw_timeUpdate(
      __this,
      __this.attr("data-timer-start-time"),
      __this.attr("data-timer-before"),
      __this.attr("data-timer-after"),
      __this.attr("data-timer-time-zone")
    );
    let update = function () {
      timeREnder.update();
      setTimeout(() => {
        update();
      }, 1000);
    };
    update();
  });
  var $round = $(".round"),
    roundRadius = $round.find("circle").attr("r"),
    roundPercent = $round.data("percent"),
    roundCircum = 2 * roundRadius * Math.PI,
    roundDraw = (roundPercent * roundCircum) / 100;
  $round.css("stroke-dasharray", roundDraw + " 999");

  $(document).on("click", function (e) {
    // Проверяем, находится ли клик вне header и header-burger
    if (!$(e.target).closest("header").length) {
      $(".header-burger,.header-left__nav,.header-mob-box").removeClass(
        "active"
      );
    }
  });

  if ($(window).width() > 1200) {
    var sections = new Swiper(".sections", {
      direction: "vertical",
      slidesPerView: 1,
      spaceBetween: 0,
      mousewheel: true,
      allowTouchMove: false,
      passiveListeners: false,
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      breakpoints: {
        320: {
          freeMode: true,
          allowTouchMove: true,
          slidesPerView: "auto",
        },
        1024: {
          freeMode: false,
          allowTouchMove: false,
        },
      },
      on: {
        init: function () {
          setTimeout(function () {
            $(".sections .section")
              .eq(0)
              .find(".animate")
              .addClass("animate--show");
          }, 300);
          updatePagination(this.activeIndex);
        },
        slideChangeTransitionStart: function () {
          $(".sections .section").find(".animate").removeClass("animate--show");
        },
        slideChangeTransitionEnd: function () {
          $(".sections .section")
            .eq(this.activeIndex)
            .find(".animate")
            .addClass("animate--show");
          let section_id = $(".sections .section")
            .eq(this.activeIndex)
            .attr("data-slide-name");
          updatePagination(this.activeIndex);
        },
      },
    });

    function updatePagination(activeIndex) {
      // Убираем активный класс со всех элементов
      $(".section-list__item").removeClass("swiper-pagination-bullet-active");

      // Находим все элементы, которые не имеют класс "section-nav-list__item--disabled"
      var validItems = $(".section-list__item").not(
        ".section-nav-list__item--disabled"
      );

      // Находим активный элемент на основе индекса
      var activeItem = validItems.filter(`[data-slide-index="${activeIndex}"]`);

      // Добавляем активный класс, если элемент не disabled
      if (activeItem.length) {
        activeItem.addClass("swiper-pagination-bullet-active");
      }
    }

    $(".section-list__item").on("click", function () {
      var index = $(this).data("slide-index");
      sections.slideTo(index);
    });

    // Отключение прокрутки основного слайдера при наведении на news-slider, если ширина экрана меньше 1750px
    $(".news-slider").hover(
      function () {
        if ($(window).width() < 1750) {
          sections.mousewheel.disable(); // Отключаем прокрутку при наведении на news-slider, если ширина < 1750px
        }
      },
      function () {
        if ($(window).width() < 1750) {
          sections.mousewheel.enable(); // Включаем прокрутку, когда курсор уходит с news-slider, если ширина < 1750px
        }
      }
    );
  } else {
    $(".sections, .section-class, body").addClass("lower");

    function updatePagination() {
      var scrollPos = $(document).scrollTop();
      $(".section").each(function (i) {
        if (
          $(this).position().top <= scrollPos + 100 &&
          $(this).position().top + $(this).height() > scrollPos
        ) {
          $(".section-list__item").removeClass(
            "swiper-pagination-bullet-active"
          );
          $(".section-list__item")
            .eq(i)
            .addClass("swiper-pagination-bullet-active");
        }
      });
    }
  }
  $(".section-nav-list__item").on("click", function () {
    const index = $(this).data("slide-index");
    const targetSection = $("section").eq(index); // Предполагаем, что каждая секция имеет тег <section> и расположена в порядке
    $("html, body").animate(
      {
        scrollTop: targetSection.offset().top,
      },
      800
    ); // Время анимации
  });

  // Отслеживание скролла и добавление класса 'active' к соответствующему пункту меню
  $(window).on("scroll", function () {
    let scrollPosition = $(window).scrollTop();

    $("section").each(function (index) {
      const sectionTop = $(this).offset().top - 100; // Отступ для точного срабатывания
      const sectionBottom = sectionTop + $(this).outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        $(".section-nav-list__item").removeClass(
          "swiper-pagination-bullet-active"
        );
        $(".section-nav-list__item")
          .eq(index)
          .addClass("swiper-pagination-bullet-active");
      }
    });
  });
  var syncing = false; // Флаг для предотвращения зацикливания синхронизации

  // Инициализация основного слайдера
  var mainSlider = $(".start__slider").owlCarousel({
    loop: false,
    items: 1,
    nav: true,
    dots: false, // Отключаем стандартные точки Owl
    onTranslate: syncPositionWithDots, // Синхронизация при смене слайда
  });

  var mainSlider2 = $(".news-slider").owlCarousel({
    loop: false,
    items: 1,
    nav: true,
    dots: false, // Отключаем стандартные точки Owl
    onTranslate: syncPositionWithDots2, // Синхронизация при смене слайда
  });
  function syncPositionWithDots2(event) {
    var currentIndex = event.item.index; // Получаем текущий индекс слайда

    // Убираем класс active у всех точек
    $(".news-slider-dot").removeClass("active");

    // Добавляем класс active к точке, соответствующей текущему слайду
    $(".news-slider-dot").eq(currentIndex).addClass("active");
  }

  // При клике на точки
  $(".start-slder-dots__item").on("click", function () {
    // Убираем класс active у всех элементов
    $(".start-slder-dots__item").removeClass("active");

    // Добавляем класс active к текущему элементу
    $(this).addClass("active");

    // Переходим на соответствующий слайд
    var index = $(this).index();
    mainSlider.trigger("to.owl.carousel", [index, 300]); // Переход к слайду
  });
  $(".news-slider-dot").on("click", function () {
    // Убираем класс active у всех элементов
    $(".news-slider-dot").removeClass("active");

    // Добавляем класс active к текущему элементу
    $(this).addClass("active");

    // Переходим на соответствующий слайд
    var index = $(this).index();
    mainSlider2.trigger("to.owl.carousel", [index, 300]); // Переход к слайду
  });

  // Функция синхронизации слайдов с точками
  function syncPositionWithDots(event) {
    var currentIndex = event.item.index; // Получаем текущий индекс слайда

    // Убираем класс active у всех точек
    $(".start-slder-dots__item").removeClass("active");

    // Добавляем класс active к точке, соответствующей текущему слайду
    $(".start-slder-dots__item").eq(currentIndex).addClass("active");
  }

  function moveElementsForMobile() {
    if ($(window).width() < 768) {
      // Проверяем, есть ли уже этот контейнер, чтобы не создавать дубликатов
      if ($(".mobile-box-menu").length === 0) {
        // Создаем новый контейнер
        var $mobileBoxMenu = $("<div>", { class: "mobile-box-menu" });

        // Перемещаем нужные элементы в новый контейнер
        $mobileBoxMenu.append($(".header-right-info__box"));
        $mobileBoxMenu.append($(".header-lang"));
        $mobileBoxMenu.append($(".header-right__main a"));

        // Добавляем новый контейнер в нужное место DOM-дерева, например, в .header-right
        $(".header-right").append($mobileBoxMenu);
        var headerMobBox = $('<div class="header-mob-box"></div>');

        // Помещаем этот новый блок внутрь .header__wrapper
        $(".header__wrapper").append(headerMobBox);

        // Перемещаем .header-left__nav внутрь .header-mob-box
        $(".header-left__nav").appendTo(headerMobBox);

        // После .header-left__nav добавляем .mobile-box-menu
        $(".mobile-box-menu").insertAfter(".header-left__nav");
      }
    } else {
      // Если экран больше 768, возвращаем элементы на место (по желанию)
      if ($(".mobile-box-menu").length > 0) {
        // Возвращаем элементы на исходные места
        $(".header-right").append($(".header-right-info__box"));
        $(".header-right").append($(".header-lang"));
        $(".header-right__main").append($(".header-right__main a"));

        // Удаляем контейнер
        $(".mobile-box-menu").remove();
      }
    }
  }

  // Вызываем функцию при загрузке страницы
  moveElementsForMobile();

  // Отслеживаем изменение размера окна
  $(window).resize(function () {
    moveElementsForMobile();
  });
});
