(function ($) {
  // Define the Godfather namespace
  $.fn.godfather = function (options) {
    // Default options
    const settings = $.extend(
      {
        skeletonHTML: '<div class="skeleton"></div>', // HTML for the skeleton loader
        componentURL: "/components/navbar.html", // URL of the component to load
      },
      options
    );

    // Function to display the skeleton loader
    const showLoader = (container) => {
      container.html(settings.skeletonHTML);
      container.find(".skeleton").addClass("loading-animation");
    };

    // Function to load the component using jQuery.load()
    const loadComponent = (container) => {
      container.load(settings.componentURL, function (response, status, xhr) {
        if (status === "error") {
          console.error(
            "godfather.js - Error loading component:",
            xhr.statusText
          );
        } else {
          // Remove the skeleton after the component loads
          container.find(".skeleton").remove();
        }
      });
    };

    // Apply Godfather to each selected element
    return this.each(function () {
      const container = $(this);

      // Display the skeleton loader
      showLoader(container);

      // Load the component without any artificial delays
      loadComponent(container);
    });
  };
})(jQuery);
