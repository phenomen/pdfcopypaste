<template>
  <div class="container max-w-full px-4 mx-auto bg-gray-200">
    <div class="hero min-h-screen">
      <div class="text-center hero-content">
        <div class="max-w-full">
          <h1 class="mb-3 text-4xl uppercase font-bold">
            PDF Copypaste
          </h1>
          <p class="mb-5 text-gray-500 text-sm">
            An app to remove linebreaks and hyphenations
          </p>
          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold">Original Text</span>
            </label>
            <textarea
              class="textarea md:h-64 h-32 textarea-bordered"
              placeholder="Ctrl+V"
              v-model="originalCopy"
              @focus="$event.target.select()"
            ></textarea>
          </div>

          <div class="form-control">
            <label class="label">
              <span class="label-text font-bold">Fixed Text</span>
            </label>
            <textarea
              class="textarea md:h-64 h-32 textarea-success textarea-bordered"
              placeholder="Ctrl+C"
              @focus="
                $event.target.select();
                copyClipboard(fixedCopy);
              "
              >{{ fixedCopy }}</textarea
            >

            <div class="alert my-4">
              <div class="flex-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#2196f3"
                  class="w-6 h-6 mx-2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <label
                  >Fixed text is automatically copied to clipboard on
                  click</label
                >
              </div>
            </div>
          </div>
          <p class="mt-12 text-sm text-gray-500 ">
            PDF Copypaste is an open source app by @Phenomen.
            <a
              class="link link-primary"
              href="https://github.com/Phenomen/pdfcopypaste"
              target="_blank"
              >GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalCopy: ""
    };
  },

  methods: {
    copyClipboard(text) {
      navigator.clipboard.writeText(text);
    }
  },

  computed: {
    fixedCopy: function() {
      return this.originalCopy
        .replace(/(\r\n|\n|\r)/g, " ")
        .replaceAll("‑ ", "")
        .replaceAll("- ", "")
        .replaceAll("  ", " ");
    }
  }
};
</script>
