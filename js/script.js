$(document).ready(function () {
  $(".header-lang__top").on("click", function () {
    $(".header-lang").toggleClass("active");
  });
  $(document).on("click", function (e) {
    // Проверяем, находится ли клик вне header и header-burger
    if (!$(e.target).closest(".header-lang").length) {
      $(".header-lang").removeClass("active");
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
});
