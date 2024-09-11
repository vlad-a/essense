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
  $(document).on("click", function (e) {
    // Проверяем, находится ли клик вне header и header-burger
    if (!$(e.target).closest("header").length) {
      $(".header-burger,.header-left__nav,.header-mob-box").removeClass(
        "active"
      );
    }
  });
  if ($(window).width() > 1200 && $(window).height() > 850) {
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
          updatePagination(this.activeIndex); // Используем this, чтобы обратиться к объекту Swiper
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
          //window.location.hash = section_id;
          updatePagination(this.activeIndex); // Используем this, чтобы обратиться к объекту Swiper
        },
      },
    });

    function updatePagination(activeIndex) {
      $(".section-list__item").removeClass("swiper-pagination-bullet-active");
      $(`.section-list__item[data-slide-index="${activeIndex}"]`).addClass(
        "swiper-pagination-bullet-active"
      );
    }

    $(".section-list__item").on("click", function () {
      var index = $(this).data("slide-index");
      sections.slideTo(index);
    });

    $(".features__content-item").hover(
      function () {
        if ($(this).prop("scrollHeight") > $(this).prop("clientHeight"))
          sections.mousewheel.disable();
      },
      function () {
        sections.mousewheel.enable();
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
