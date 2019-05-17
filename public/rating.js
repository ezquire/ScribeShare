jQuery(document).ready(function($) {
    $(".rating_stars span.r")
        .hover(
            function() {
                // get hovered value
                let rating = $(this).data("rating");
                let value = $(this).data("value");
                $(this)
                    .parent()
                    .attr("class", "")
                    .addClass("rating_stars")
                    .addClass("rating_" + rating);
                highlight_star(value);
            },
            function() {
                // get hidden field value
                let rating = $("#rating").val();
                let value = $("#rating_val").val();
                $(this)
                    .parent()
                    .attr("class", "")
                    .addClass("rating_stars")
                    .addClass("rating_" + rating);
                highlight_star(value);
            }
        )
        .click(function() {
            // Set hidden field value
            let value = $(this).data("value");
            $("#rating_val").val(value);

            let rating = $(this).data("rating");
            $("#rating").val(rating);

            highlight_star(value);
        });

    let highlight_star = function(rating) {
        $(".rating_stars span.s").each(function() {
            let low = $(this).data("low");
            let high = $(this).data("high");
            $(this)
                .removeClass("active-high")
                .removeClass("active-low");
            if (rating >= high) $(this).addClass("active-high");
            else if (rating === low) $(this).addClass("active-low");
        });
    };
});
