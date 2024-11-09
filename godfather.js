(function ($) {
  // Define the Godfather namespace
  $.fn.godfather = function (options) {
    // Default options
    const settings = $.extend(
      {
        skeletonHTML: '<div class="skeleton"></div>', // HTML for the skeleton loader
        componentURL: "/components/navbar.html", // URL of the component to load
        data: {}, // Object to hold dynamic data for templating
      },
      options
    );

    // Function to display the skeleton loader
    const showLoader = (container) => {
      container.html(settings.skeletonHTML);
      container.find(".skeleton").addClass("loading-animation");
    };

    // Function to replace placeholders in the HTML with data values
    const applyTemplate = (html) => {
      return html.replace(/\{\{(\w+)\}\}/g, function (_, key) {
        return settings.data[key] || "";
      });
    };

    // Function to load the component using jQuery.get()
    const loadComponent = (container) => {
      $.get(settings.componentURL, function (response) {
        // Apply templating before injecting into the container
        const templatedHTML = applyTemplate(response);
        container.html(templatedHTML);
      }).fail(function (xhr) {
        console.error(
          "godfather.js - Error loading component:",
          xhr.statusText
        );
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
