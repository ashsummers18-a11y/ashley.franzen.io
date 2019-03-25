(function ( $ ) {
    $.fn.testimonials = function( options ) {
        var settings = $.extend({
            autoscroll: true,
            timeout: 10000,
        }, options );

        var current = 0;

        var items = this.find(".box .testimonial");
        var dots  = this.find(".dots .dot");

        function update() {
            current %= items.length;
            current += items.length;
            current %= items.length;

            items.each(function() {
                $(this).css("display", "none");
            });
            $(items[current]).css("display", "block");

            dots.each(function() {
              $(this).removeClass("active");
            });
            $(dots[current]).addClass("active");
        }

        function show(id) {
            current = id;
            update();
        }

        function next() {
            current += 1;
            update();
        }

        function prev() {
            current -= 1;
            update();
        }

        function timerCallback() {
            next();
            setTimeout(timerCallback, settings.timeout);
        }

        // Setup
        this.find(".next").each(function() {
            $(this).click(next);
        });

        this.find(".prev").each(function() {
            $(this).click(prev);
        });

        dots.each(function(id) {
            $(this).click(function() { show(id); });
        });

        update();

        if(settings.autoscroll)
            setTimeout(timerCallback, settings.timeout);

        return this;
    };

}( jQuery ));
